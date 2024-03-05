import { HiAcademicCap } from "react-icons/hi2";
import * as Yup from 'yup';
import { TodosModel, createApolloTasks, deleteApolloTasks, getApolloTasks, updateApolloTasks } from "../utils";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import Logo from "./Logo";
import { FormikHelpers, useFormik } from "formik";
import { HiCheck, HiOutlineTrash } from "react-icons/hi";

const initialValues: TodosModel = {
    title: '',
    description: '',
    status: false,
}

export default function Welcome() {
    const { logout } = useAuth()
    const [errorMessage, setErrorMessage] = useState<string>()
    const [todos, setTodos] = useState<TodosModel[]>([])
    const { token } = useAuth()

    useEffect(() => {
        if (token) {
            getApolloTasks(token).then((result) => {

                const { error, data, status } = result

                console.log("getApolloTasks", result);

                if (error) {
                    // TODO handle error
                    if (status === "INVALID_TOKEN") {
                        console.log("Sign out");
                        logout()
                    }

                    return;
                }
                if (data.code === "SUCCESS") {
                    setTodos(data.todos)
                }


            }).catch((err) => {
                console.error("error occured", err);

            });
        }
    }, [])


    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            title: Yup.string().required('Task title is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values: TodosModel, { resetForm }: FormikHelpers<TodosModel>) => {
            console.log("authen");

            if (token) {
                createApolloTasks(values, token).then((result) => {
                    const { error, status, data } = result;

                    if (error) {
                        setErrorMessage("Error occured, please try again later");

                        if (status === "INVALID_TOKEN") {
                            console.log("Sign out");
                            logout()
                        }

                        return;
                    }

                    if (status === 200 && data.code === 'SUCCESS') {
                        console.log('Successs', data);
                        setTodos([...todos, data.todos]);
                    }

                    resetForm();
                }).catch((err) => {
                    console.log("Error occured", err);
                });
            }
        },
    });


    const handleCompleTodo = async (id: number | undefined) => {
        console.log("handleComplete", id);

        if (id && token) {
            updateApolloTasks(id, token).then((result) => {
                const { error, status, data } = result;

                if (error) {
                    setErrorMessage("Error occured, please try again later");

                    if (status === "INVALID_TOKEN") {
                        console.log("Sign out");
                        logout()
                    }

                    return;
                }

                if (status === 200 && data.code === 'SUCCESS') {
                    console.log('Successs', data);
                    setTodos(todos.map((todo) => {
                        if (todo.id === id) {
                            return { ...todo, status: !todo.status }
                        }
                        return todo;
                    }));
                }

                console.log("results", result);

            }).catch((err) => {
                console.error("error", err);
            });
        }
    }

    const handleDeleteTodo = async (id: number | undefined) => {
        console.log("handleDelete", id);

        if (id && token) {
            deleteApolloTasks(id, token).then((result) => {
                const { error, status, data } = result;

                if (error) {
                    setErrorMessage("Error occured, please try again later");

                    if (status === "INVALID_TOKEN") {
                        console.log("Sign out");
                        logout()
                    }

                    return;
                }

                if (status === 200 && data.code === 'SUCCESS') {
                    console.log('Successs', data);
                    setTodos(todos.filter((todo) => todo.id !== id));
                }

                console.log("results", result);

            }).catch((err) => {
                console.error("error", err);
            });
        }
    }

    return (
        <div className="">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Your Apollo Tasks
                </h2>

                {errorMessage &&
                    <div className="mt-2 p-2 text-center justify-center w-full bg-red-500 items-center text-white leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                        <span className="flex rounded-full bg-red-700 uppercase px-2 py-1 text-xs font-bold mr-3">Error</span>
                        <span className="text-sm mr-2 text-center flex-auto">
                            {errorMessage}
                        </span>
                    </div>
                }
            </div>

            {/* Todo Form */}
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Task Title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="mt-2">
                            <textarea rows={2} cols={2}
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {formik.touched.description && formik.errors.description && (
                            <span className='text-xs text-red-500'>
                                {formik.errors.description}
                            </span>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <ul role="list" className="divide-y divide-gray-100">
                    {todos.map((todo) => (
                        <li key={todo.id}
                            className={`flex w-full justify-between items-center p-4 m-2 ${todo.status ? 'bg-green-300' : 'bg-red-300'} rounded-md`}>
                            <div className="flex min-w-0">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {todo.title}
                                    </p>
                                    <p className="truncate text-xs leading-5 text-gray-100">{todo.description}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col  sm:items-end">
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    {todo.status ? (
                                        <button
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className={`flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500`}
                                        >
                                            <HiOutlineTrash />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleCompleTodo(todo.id)}
                                            className={`flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500`}
                                        >
                                            <HiCheck className="text-white" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
