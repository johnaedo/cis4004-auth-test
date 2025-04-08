import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

// UserDashboard component
function UserDashboard({ user, onLogout }) {
  return (
    <div className="dashboard-container">
      {user.picture && (
        <img 
          src={user.picture} 
          alt={`${user.name}'s profile`} 
          className="dashboard-profile-image"
        />
      )}
      <h2>Welcome, {user.name}!</h2>
      <p>You are logged in as {user.email}</p>
      <div className="button-group">
        <Link to="/Profile" className="view-profile-btn">
          View Profile
        </Link>
        <button 
          onClick={onLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard