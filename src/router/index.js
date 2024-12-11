import { createBrowserRouter, Navigate } from 'react-router-dom';
import Main from '../views/main';
import Home from '../views/home/index';
import Mall from '../views/mall';
import User from '../views/user/index';
import PageOne from '../views/other/pageOne';
import PageTwo from '../views/other/pageTwo';
import Login from '../views/login';
import Schedule from "../views/schedule";

const routers = [
    {
        path: '/',
        Component: Main,
        children: [
            // 重定向
            {
                path: '/',
                element: <Navigate to='/home' replace />, // replace: '/home'
            },
            {
                path: '/home',
                Component: Home
            },
            {
                path: '/mall',
                Component: Mall
            },
            {
                path: '/user',
                Component: Schedule
            },
            {
                path: '/user',
                Component: User
            },
            {
                path: '/other',
                children: [
                    // 重定向
                    {
                        path: '/other',
                        element: <Navigate to='/other/pageOne' replace />, // replace: '/other/pageOne'
                    },
                    {
                        path: '/other/pageOne',
                        Component: PageOne
                    },
                    {
                        path: '/other/pageTwo',
                        Component: PageTwo
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    }
];

export default createBrowserRouter(routers);