import Login from '@/views/login'
import Layout from "@/views/layout";
import {useRoutes} from "react-router-dom";
import './App.css'


function App() {
    const routers = [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/',
            element: <Layout/>
        }
    ]

    return (
        <div className="App">
            {
                useRoutes(routers)
            }
        </div>
    )
}

export default App
