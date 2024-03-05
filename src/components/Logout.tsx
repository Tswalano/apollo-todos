import { useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils'

type Props = {}

function Logout({ }: Props) {
    const navigate = useNavigate()
    const { logout } = useAuth()

    useEffect(() => {
        console.log("clearing session");

        logout()
        navigate(routes.LOGIN_PAGE, { replace: true })
    }, [])


    return (
        <div>Logout</div>
    )
}

export default Logout