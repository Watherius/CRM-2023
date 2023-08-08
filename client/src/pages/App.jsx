import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../routers/AppRoutes';
import { AuthContext } from '../hooks/useContext';
import { StoreContext } from '../index';

function App() {
  //const [isAuth, setIsAuth] = useState(false);
  return (
    //<AuthContext.Provider value={{isAuth, setIsAuth}}>   
        <Router>   
            <AppRouter />
        </Router>
    //</AuthContext.Provider>
  );
}

export default App;