import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Apply the redux store to the application */}
    <Provider store={store}>
      {/* Getting the App and other page components to load from the Routes.tsx */}
      <RouterProvider router={router} />
    </Provider>

  </StrictMode>,
)
