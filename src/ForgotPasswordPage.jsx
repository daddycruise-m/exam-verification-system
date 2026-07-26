import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import logo from './images (4).jpeg'
import './LoginPage.css'

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetDone, setResetDone] = useState(false)
  const { resetPassword, error, setError } = useAuth()

  const submit = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const result = resetPassword({ identifier, password })
    if (result.success) {
      setError(null)
      setResetDone(true)
    }
  }

  return (
    <div className="login-page-shell">
      <div className="brand-box">
        <img src={logo} alt="Nationbuilders logo" className="brand-logo" />
        <div className="brand-text">
          <div className="school-name-top">NATIONBUILDERS</div>
          <div className="school-name-bottom">COLLEGE OF TECHNOLOGY</div>
        </div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1>Reset Password</h1>
          <p>Enter your school email or admin ID to update your account password.</p>
        </div>

        <form className="login-form" onSubmit={submit}>
          <label>
            Email or Admin ID
            <input
              type="text"
              placeholder="Enter your school email or admin ID"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
          </label>

          <label>
            New Password
            <input
              type="password"
              placeholder="Enter a new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}
          {resetDone && <div className="login-success">Password updated successfully. You can now <Link to="/">login</Link>.</div>}

          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>

        <p className="login-note">
          Remembered it? <Link to="/">Back to login</Link>
        </p>
      </div>
    </div>
  )
}
