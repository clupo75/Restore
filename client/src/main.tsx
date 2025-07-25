import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes/Routes.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Getting the App and other page components to load from the Routes.tsx */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
