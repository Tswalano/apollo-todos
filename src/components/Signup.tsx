import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpModel, createUserAccount, routes } from '../utils';
import { HiCog } from 'react-icons/hi';

interface Props { }
const initialValues: SignUpModel = {
    username: '',
    email: '',
    password: '',
}

const Signup: React.FC<Props> = ({ }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>()

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values: SignUpModel) => {
            createUserAccount(values).then((result) => {
                const { error, data } = result;

                if (data.code === "USER_EXISTS") {
                    setErrorMessage(`User ${values.email} already exists`);
                } else if (error) {
                    setErrorMessage("Error occured, please try again later");
                }

                if (data.code === 'SUCCESS') {
                    navigate('/auth/login');
                }

                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                setErrorMessage("Error occured, please try again later");
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
                <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create an account
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

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {formik.touched.username && formik.errors.username && (
                            <span className='text-xs text-red-500'>{formik.errors.username}</span>
                        )}
                    </div>

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

                    <button
                        type="submit"
                        className="flex w-full justify-center items-center space-x-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 "
                    >
                        {loading ? (
                            <span>Loading... <HiCog className='animate-spin' /></span>
                        ) : (
                            <span>Create Account</span>
                        )}
                    </button>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to={routes.LOGIN_PAGE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div >
    );
};

export default Signup;
