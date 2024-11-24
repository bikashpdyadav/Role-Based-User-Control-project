import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from './Body';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from "./components/AuthProvider";

const App = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/home",
            element: <Body />,
        },
        {
            path: "/signup",
            element: <Signup />,
        },
    ]);
    return (
        <AuthProvider>
            <RouterProvider router={appRouter} />
        </AuthProvider>
    )
};

export default App;
