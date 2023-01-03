import Login from '@/views/login'
import Layout from "@/views/layout";
import Home from '@/views/home'
import {useRoutes, Navigate} from "react-router-dom";

function App() {
    const routers = [
        {
            path: '/',
            element: <Navigate to={'/home'}/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: 'home',
                    element: <Home/>
                }
            ]
        }
    ]

    return (
        <>
            {
                useRoutes(routers)
            }
        </>
    )
}

export default App
