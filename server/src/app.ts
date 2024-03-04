// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { comparePasswords, encryptPassword } from './utils/authUtil';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Adjust the type of user property based on your needs
        }
    }
}

const prisma = new PrismaClient();
const app = express();
const port = 3000;


app.use(bodyParser.json());

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY || '', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log("verifyToken", req);

        req.user = decoded;
        next();
    });
};

app.get('/', async (req: Request, res: Response) => {
    try {
        res.status(201).json({ message: 'Hello apollo APIs' });
    } catch (err) {
        console.error(err);
    }
});

app.post('/signup', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const { error, errorMessage, response } = await encryptPassword(password)

        if (error) {
            console.log(errorMessage);
            res.status(401).json({ message: errorMessage });
        } else if (response) {

            console.log(response);

            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: response
                }
            })

            console.log('created user', user);

            res.status(201).json({ message: 'User created successfully' });
        } else {
            res.status(401).json({ message: "Error, something went wrong" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { username } });

        console.log(user);


        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials...' });
        }

        const { error, errorMessage, response } = await comparePasswords(password, user.password)

        if (error) {
            console.log(errorMessage);
            res.status(401).json({ message: errorMessage });
        } else if (response) {

            console.log("Login success", response);
            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY || '', { expiresIn: '1h' });
            console.log("Token", token);

            res.status(200).json({ token });

        } else {
            res.status(401).json({ message: "Error, something went wrong" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.get('/todos', verifyToken, async (req: Request, res: Response) => {
    const userId = (req.user as any)?.userId;

    console.log(userId);


    try {
        const todos = await prisma.todo.findMany({ where: { userId } });
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

app.post('/create-todo', verifyToken, async (req: Request, res: Response) => {
    const userId = (req.user as any)?.userId;
    const { title } = req.body;

    console.log(userId);

    try {
        const todos = await prisma.todo.create({
            data: {
                title,
                userId
            }
        })
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating a todo' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
