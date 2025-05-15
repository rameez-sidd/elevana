import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'

import { Bounce, ToastContainer } from 'react-toastify'
import { PersistGate } from "redux-persist/integration/react";
import Loading from './components/Loading';
import { apiSlice } from './redux/api/apiSlice';

import { GoogleOAuthProvider } from '@react-oauth/google'


const clientId = "1074928535355-f3sgg6cbjnqbelo6tjl24712hbm75fl1.apps.googleusercontent.com"

// Run async pre-render logic
const init = async () => {
  const container = document.getElementById('root');
  const root = createRoot(container);

  try {
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
  } catch (err) {
    console.error("User preload failed", err);
  }

  root.render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<Loading size='screen' />} persistor={persistor}>
          <GoogleOAuthProvider clientId={clientId}>
            <App />
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
          </GoogleOAuthProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

init();