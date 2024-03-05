import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { routes } from '../utils/routes/routes'

const AuthPage = () => (
    <Routes>
        <Route path={routes.LOGIN_PAGE} element={<Login />} />
        <Route path={routes.SIGNUP_PAGE} element={<Signup />} />
        <Route index element={<Login />} />
    </Routes>
)

export { AuthPage }