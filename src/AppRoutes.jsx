import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import LoginPage from './LoginPage'
import StudentPage from './StudentPage'
import AdminPage from './AdminPage'
import SignupPage from './SignupPage'
import ForgotPasswordPage from './ForgotPasswordPage'

function ProtectedRoute({ element: Element, allowedRoles }) {
  const { user } = useAuth()
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  return <Element />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<ProtectedRoute element={StudentPage} allowedRoles={[ 'student' ]} />} />
      <Route path="/student" element={<Navigate to="/dashboard" replace />} />
      <Route path="/admin" element={<ProtectedRoute element={AdminPage} allowedRoles={[ 'admin' ]} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
