import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function AdminPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.displayName || 'Admin'}.</p>
        <div className="dashboard-info">
          <div>
            <span>Role</span>
            <strong>Admin</strong>
          </div>
          <div>
            <span>Admin ID</span>
            <strong>{user?.adminId || 'admin'}</strong>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
