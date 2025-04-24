import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const AuthorizeRoles = ({children}) => {
    const {user} = useSelector(store=>store.auth)

    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.role !== "admin"){
            navigate('/')
        }
    }, [])

    return (
        <>
         {children}
        </>
    )
}

export default AuthorizeRoles