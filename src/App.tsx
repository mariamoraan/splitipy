import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { GroupsPage } from "./groups/pages/GroupsPage";
import { GroupPage } from "./groups/pages/GroupPage";



const App = () => {   
    const router = createBrowserRouter([
       {
        path: '/',
        element: <GroupsPage />
       },
       {
        path: '/group',
        element: <GroupPage />
       }
    ]);

   return (
    <RouterProvider router={router} />
   )
};

export default App;