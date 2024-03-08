import { Outlet, Navigate } from 'react-router-dom'
import Auth from '../data/Auth'
const PrivateRoutes = () => {
    console.log('Auth', Auth.isAuthenticated())
    return(
        Auth.isAuthenticated() ? <Outlet/> : <Navigate to="login"/>
    )
}

export default PrivateRoutes