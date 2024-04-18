import React from 'react'
import ReactDOM from 'react-dom/client'

import { ApiProvider } from '@reduxjs/toolkit/query/react'

import App from './App.tsx'
import { todoSlice } from './features/api/todoSlice.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={todoSlice}>
      <App />
    </ApiProvider>
  </React.StrictMode>
)
