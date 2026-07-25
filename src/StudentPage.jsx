import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function StudentPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <h1>Student Portal</h1>
        <p>Welcome, {user?.displayName || 'Student'}.</p>
        <p>Your student account has been verified successfully.</p>
        <div className="dashboard-info">
          <div>
            <span>Role</span>
            <strong>Student</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{user?.email || 'student@nabcotech.edu.ng'}</strong>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
