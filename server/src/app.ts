import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
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

app.use(cors());

app.use(bodyParser.json());

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY || '', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token', code: 'INVALID_TOKEN' });
        }

        console.log("verifyToken", req);

        req.user = decoded;
        next();
    });
};

app.get('/', async (req: Request, res: Response) => {
    try {
        res.status(201).json({ message: 'Hello apollo APIs', code: 'SUCCESS' });
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

            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: response
                }
            })

            console.log('created user', user);

            res.status(201).json({ message: 'User created successfully', code: 'SUCCESS' });
        } else {
            res.status(401).json({ message: "Error, something went wrong", code: "INTERNAL_ERROR" });
        }

    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
            res.status(400).json({ message: 'User already exists', code: 'USER_EXISTS' });
            return;
        }
        console.error(err);
        res.status(500).json({ message: 'Error creating user', code: 'INTERNAL_ERROR' });
    }
});

app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { username } });

        console.log(user);


        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials...', code: 'INVALID_CREDENTIALS' });
        }

        const { error, errorMessage, response } = await comparePasswords(password, user.password)

        if (error) {
            console.log(errorMessage);
            res.status(401).json({ message: errorMessage, code: 'PASSWORD_HASH_ERROR' });
        } else if (response) {

            console.log("Login success", response);
            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY || '', { expiresIn: '1h' });
            console.log("Token", token);

            res.status(200).json({ token, user: { userId: user.id, username: user.username, email: user.email }, code: 'SUCCESS' });

        } else {
            res.status(401).json({ message: "Error, something went wrong", cdoe: "INTERNAL_ERROR" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in', code: 'INTERNAL_ERROR' });
    }
});

app.get('/todos', verifyToken, async (req: Request, res: Response) => {
    const userId = (req.user as any)?.userId;

    console.log(userId);


    try {
        const todos = await prisma.todo.findMany({ where: { userId } });
        res.status(200).json({ todos, code: 'SUCCESS' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching todos', code: 'INTERNAL_ERROR' });
    }
});

app.post('/create-todo', verifyToken, async (req: Request, res: Response) => {
    const userId = (req.user as any)?.userId;
    const { title, description } = req.body;

    console.log(userId, title, description);

    try {
        const todos = await prisma.todo.create({
            data: {
                title,
                userId,
                description,
            }
        })
        res.status(200).json({ todos, code: 'SUCCESS' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating a todo', code: 'INTERNAL_ERROR' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
