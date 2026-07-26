import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import logo from './images (4).jpeg'
import './LoginPage.css'

export default function LoginPage() {
  const [mode, setMode] = useState('student')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, error, setError } = useAuth()

  const submit = (event) => {
    event.preventDefault()
    const result = login({ mode, identifier, password })
    if (result.success) {
      navigate(mode === 'student' ? '/student' : '/admin')
      setIdentifier('')
      setPassword('')
    }
  }

  return (
    <div className="login-page-shell">
      <div className="brand-box">
        <img src={logo} alt="Nationbuilders logo" className="brand-logo" />
        <div className="brand-text">
          <div className="school-name-top">NATIONBUILDERS</div>
          <div className="school-name-bottom">POLYTECHNIC (NABPOLY)</div>
          <div className="page-title">Exam Verification System</div>
        
        </div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>{mode === 'student' ? 'Student Login' : 'Admin Login'}</h1>
          <p>
            {mode === 'student'
              ? 'Sign in with your school email and password to access the student portal.'
              : 'Sign in with your admin ID and password to access the admin portal.'}
          </p>
        </div>

        <div className="toggle-buttons">
          <button
            type="button"
            className={mode === 'student' ? 'active' : ''}
            onClick={() => {
              setMode('student')
              setError(null)
            }}
          >
            Student
          </button>
          <button
            type="button"
            className={mode === 'admin' ? 'active' : ''}
            onClick={() => {
              setMode('admin')
              setError(null)
            }}
          >
            Admin
          </button>
        </div>

        <form className="login-form" onSubmit={submit}>
          <label>
            {mode === 'student' ? 'Student Email' : 'Admin ID'}
            <input
              type={mode === 'student' ? 'email' : 'text'}
              placeholder={mode === 'student' ? 'Enter your school email' : 'Enter admin ID'}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <p className="login-note">
          {mode === 'student'
            ? 'Use your official NationBuilders Polytechnic email and password.'
            : 'Admin login is for authorized staff only.'}
        </p>

        <div className="login-links">
          {mode === 'student' ? (
            <Link to="/signup">Create new student account</Link>
          ) : null}
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}
