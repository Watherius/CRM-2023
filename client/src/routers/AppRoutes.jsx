import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/useContext";
import { managerRoutes, publicRoutes, studentRoutes } from "./routes";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from "../components/Header";
import { StoreContext } from "../index";
import { observer } from "mobx-react-lite";
import LeftMenu from '../components/LeftMenu';

function AppRouter() 
{  
    const [role, setRole] = useState('');
    const {store} = useContext(StoreContext);

    useEffect(() => {
        if (store.user) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setRole(JSON.parse(savedUser).role);
            }
        }
    }, [store.user]);
    

    /*useEffect(() => {
        setRole(store.user.role)
        console.log('role: ',store.user.role)
    }, [store.user])*/

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
          store.checkAuth()
        }
    }, [])

    if(store.isLoading)
    {
        //Подключить крутилку свою
        return <div>Загрузка...</div>
    }

    return (
        store.isAuth
            ?
            <div className="app__page">
                <Header />
                <LeftMenu />
                {role === 'manager' || role === 'admin'
                ?
                    <Routes>
                        {managerRoutes.map(route =>
                            <Route 
                                key={route.path}
                                path={route.path} 
                                element={route.element}
                                exact={route.exact}
                            />
                        )}
                        <Route path="*" element={ <Navigate to='/applications'/> }/>
                    </Routes>
                :
                //<div>{role}</div>
                <Routes>
                        {studentRoutes.map(route =>
                            <Route 
                                key={route.path}
                                path={route.path} 
                                element={route.element}
                                exact={route.exact}
                            />
                        )}
                        <Route path="*" element={ <Navigate to='/applications'/> }/>
                </Routes>
                }
            </div>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route 
                        key={route.path}
                        path={route.path} 
                        element={route.element}
                        exact={route.exact}
                    />
                )}
                <Route path="*" element={ <Navigate to='/login' /> } />
            </Routes>
    )
}

//удалить если собираюсь отказаться от mobx и mobx-react-lite
export default observer(AppRouter);