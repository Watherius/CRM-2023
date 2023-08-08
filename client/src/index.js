import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import Store from './store/store'

import App from './pages/App';
import { AppProvider } from './hooks/useContext';

const store = new Store();

export const StoreContext = createContext({store});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>   
    <StoreContext.Provider value={{store}}>
      <AppProvider>
        <App />
      </AppProvider>
    </StoreContext.Provider>   
    </div>
);