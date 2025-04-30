import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { Bounce, ToastContainer } from 'react-toastify'
import { PersistGate } from "redux-persist/integration/react";
import Loading from './components/Loading';
import { apiSlice } from './redux/api/apiSlice';

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <Loading size='screen'/>;
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
