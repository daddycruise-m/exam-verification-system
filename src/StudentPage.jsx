import { useState } from 'react'
import { useAuth } from './AuthContext'
import './StudentPage.css'
import logo from './images (4).jpeg'

export default function StudentPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    matricNumber: '',
    registeredCourses: '',
    department: '',
    program: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="student-page-shell">
      <div className="brand-box">
        <img src={logo} alt="Nationbuilders logo" className="brand-logo" />
        <div className="brand-text">
          <div className="school-name-top">NATIONBUILDERS</div>
          <div className="school-name-bottom">POLYTECHNIC (NABPOLY)</div>
          <div className="page-title">Exam Verification System</div>
        </div>
      </div>

      <div className="student-dashboard-card">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome, {user?.name || 'Student'}. Fill in your details below to continue your exam verification process.</p>
        </div>

        <form className="student-dashboard-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Matric Number
              <input
                name="matricNumber"
                value={formData.matricNumber}
                onChange={handleChange}
                placeholder="Enter your matric number"
                required
              />
            </label>

            <label>
              Registered Courses
              <input
                name="registeredCourses"
                value={formData.registeredCourses}
                onChange={handleChange}
                placeholder="e.g. MTH 101, GST 101"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Department
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="">Select department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Electrical/Electronic Engineering">Electrical / Electronic Engineering</option>
                <option value="Hospitality Management">Hospitality Management</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </label>

            <label>
              Program
              <select name="program" value={formData.program} onChange={handleChange} required>
                <option value="">Select program</option>
                <option value="ND 1">ND 1</option>
                <option value="ND 2">ND 2</option>
              </select>
            </label>
          </div>

          <label>
            Additional Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any extra information"
            />
          </label>

          <button type="submit" className="submit-button">
            Submit Details
          </button>
        </form>

        {submitted && (
          <div className="submission-success">
            Your information has been submitted successfully. The verification team will review your request shortly.
          </div>
        )}
      </div>
    </div>
  )
}
