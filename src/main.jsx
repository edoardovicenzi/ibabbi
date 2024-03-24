import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import CreateList from './components/CreateList.jsx'
import SecretFriend, {loader as namesLoader} from './components/SecretFriend.jsx'

const router = createBrowserRouter([
    {
        path: "/ibabbi/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { 
                index: true,
                element: <Navigate to="/ibabbi/home" replace />
            },
            {
                path: "/ibabbi/home",
                element: <Home />
            },
            {
                path: "/ibabbi/christmas",
                element: <CreateList />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/ibabbi/easter",
                element: <CreateList festivity='easter'/>,
                errorElement: <ErrorPage />,
            },
            {
                path: "/ibabbi/christmas/:id",
                loader: namesLoader,
                element: <SecretFriend />
            },
            {
                path: "/ibabbi/easter/:id",
                loader: namesLoader,
                element: <SecretFriend festivity="easter" />
            }


        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
