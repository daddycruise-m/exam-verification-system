import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
import logo from './images (4).jpeg'
import './LoginPage.css'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const { signup, error, setError } = useAuth()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    const result = signup({ email, password, fullName })
    if (result.success) {
      navigate('/')
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
          <h1>Create Student Account</h1>
          <p>Register with your school email so you can sign in to the student portal.</p>
        </div>

        <form className="login-form" onSubmit={submit}>
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </label>

          <label>
            Student Email
            <input
              type="email"
              placeholder="Enter your school email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>

        <p className="login-note">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  )
}
