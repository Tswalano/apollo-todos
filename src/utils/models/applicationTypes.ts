export type SignUpModel = {
    username: string,
    email: string,
    password: string
}

export type LgoinModel = {
    email: string,
    password: string
}


export type TodosModel = {
    id?: number;
    title: string;
    status: boolean;
    description: string;
}
