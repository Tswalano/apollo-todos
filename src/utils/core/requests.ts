import { LgoinModel, SignUpModel, TodosModel } from "..";

const API_URL = 'http://localhost:3000'

export const createUserAccount = async (credentials: SignUpModel) => {
    try {
        const url = `${API_URL}/signup`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...credentials }),
        });

        const results = await response.json()

        console.log(results, credentials);

        if (results.error) {
            return {
                error: results.error,
                status: response.status,
            }
        }

        return {
            error: false,
            data: results,
            status: response.status,
        }


    } catch (error) {
        console.error(error);

        return {
            error: true,
            status: 'UNKNOWN',
        }
    }

}

export const authenticateUser = async (credentials: LgoinModel) => {
    try {
        const url = `${API_URL}/login`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...credentials }),
        });

        const results = await response.json()

        console.log(results);

        if (results.error) {
            return {
                error: results.error,
                status: response.status,
            }
        }

        return {
            error: false,
            data: results,
            status: response.status,
        }


    } catch (error) {
        console.error(error);

        return {
            error: true,
            status: 'UNKNOWN',
        }
    }
}

export const getApolloTasks = async (token: string) => {
    try {
        const url = `${API_URL}/todos`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        });

        const results = await response.json()


        if (results.error) {
            return {
                error: results.error,
                status: response.status,
            }
        }

        if (results.code === "INVALID_TOKEN") {
            return {
                error: true,
                status: "INVALID_TOKEN",
            }
        }

        return {
            error: false,
            data: results,
            status: response.status,
        }


    } catch (error) {
        console.error("error xx", error);

        return {
            error: true,
            status: 'UNKNOWN',
        }
    }
}

export const createApolloTasks = async (todo: TodosModel, token: string) => {
    try {
        const url = `${API_URL}/create-todo`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
            body: JSON.stringify({ ...todo })
        });

        const results = await response.json()

        console.log(results);

        if (results.error) {
            return {
                error: results.error,
                status: response.status,
            }
        }

        return {
            error: false,
            data: results,
            status: response.status,
        }


    } catch (error) {
        console.error(error);

        return {
            error: true,
            status: 'UNKNOWN',
        }
    }
}