import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LgoinModel, authenticateUser, routes } from '../utils';
import { useAuth } from '../auth/AuthContext';

type Props = {}

const initialValues: LgoinModel = {
    email: '',
    password: '',
}

const Login: React.FC<Props> = ({ }) => {

    const { login } = useAuth()
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>()

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values: LgoinModel) => {
            console.log("authen");

            authenticateUser(values).then((result) => {
                const { error, status, data } = result;

                if (data.code === "INVALID_CREDENTIALS") {
                    setErrorMessage(`Invalid credentials, please try again`);
                } else if (error) {
                    setErrorMessage("Error occured, please try again later");
                }

                if (status === 200 && data.code === 'SUCCESS') {

                    console.log(data);

                    login(data.token, data.user)
                    navigate('/dashbord');
                }

            }).catch((err) => {
                console.log("Error occured", err);
            });
        },
    });

    return (
        <div className="">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='text-center items-center flex justify-center'>
                    Apollo
                    <p className="text-lg font-bold tracking-tight sm:text-xl text-indigo-600">Tasks</p>
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
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

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <span className='text-xs text-red-500'>{formik.errors.email}</span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <span className='text-xs text-red-500'>{formik.errors.password}</span>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to={routes.SIGNUP_PAGE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login