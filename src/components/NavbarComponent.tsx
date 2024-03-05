import { useAuth } from '../auth/AuthContext';
import { routes } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { HiMenu } from 'react-icons/hi';

type Props = {}

export default function NavbarComponent({ }: Props) {
    const navigate = useNavigate()
    const { isAuthenticated, logout, userData } = useAuth();


    const logUserOut = () => {
        logout()
        navigate(routes.LOGIN_PAGE, { replace: true })
    }

    return (
        <nav className="bg-indigo-200 border-gray-200">
            <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <HiMenu className='w-5 h-5' />
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        {isAuthenticated ? (
                            <div className='items-center flex justify-center space-x-2'>
                                <li>
                                    <span className="py-2 px-3 text-indigo-600">
                                        Welcome {userData?.username}
                                    </span>
                                </li>
                                <li>
                                    <Link onClick={logUserOut} to={routes.AUTH_PAGE} className="py-2 px-3 hover:bg-blue-800 hover:text-white text-gray-900 rounded">
                                        Logout
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <div className='items-center flex justify-center space-x-2'>
                                <li>
                                    <Link to={routes.LOGIN_PAGE} className="py-2 px-3 hover:bg-blue-800 hover:text-white text-gray-900 rounded">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-3 py-2 text-center">
                                        <Link to={routes.SIGNUP_PAGE}>
                                            Signup
                                        </Link>
                                    </button>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>

    )
}