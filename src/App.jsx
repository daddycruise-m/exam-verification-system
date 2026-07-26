import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import AppRoutes from './AppRoutes'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
