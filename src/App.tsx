import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { GroupsPage } from "./groups/pages/GroupsPage";
import { GroupPage } from "./groups/pages/GroupPage";
import { createContext } from "react";
import { getActiveUserId } from "./users/services/users";
import { OnboardingPage } from "./onboarding/pages/OnboardingPage";

export const AppContext = createContext({
    hasActiveUser: false,
    setHasActiveUser: (hasActiveUser: boolean) => {},
})

const App = () => {   
    const [hasActiveUser, setHasActiveUser] = useState(false)

    useEffect(() => {
        const isActive = !!getActiveUserId()
        setHasActiveUser(isActive)
    }, [])

    const onboardingRouter = createBrowserRouter([
        {
         path: '/',
         element: <OnboardingPage />
        }
     ]);

    const router = createBrowserRouter([
       {
        path: '/',
        element: <GroupsPage />
       },
       {
        path: '/group',
        element: <GroupPage />
       },
    ]);

   return (
    <AppContext.Provider value={{hasActiveUser, setHasActiveUser}}>
        <RouterProvider router={hasActiveUser ? router : onboardingRouter} />
    </AppContext.Provider>
   )
};

export default App;