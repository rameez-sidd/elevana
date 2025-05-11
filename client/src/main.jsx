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
import socketIO from 'socket.io-client'
import { GoogleOAuthProvider } from '@react-oauth/google'

const ENDPOINT = import.meta.env.VITE_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

const clientId = "287147152534-n1hkmo0ht88gnjt77hqin59v0o522n51.apps.googleusercontent.com"

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
        await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    socketId.on("connection", () => {

    })
  }, [])

  if (isLoading) {
    return <Loading size='screen' />;
  }

  return (
    <StrictMode>
      <GoogleOAuthProvider clientId={clientId}>

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
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
