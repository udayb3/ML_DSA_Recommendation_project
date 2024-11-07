import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './context/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={new QueryClient()}>
       <BrowserRouter>
         <App />
       </BrowserRouter>
       </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
)
