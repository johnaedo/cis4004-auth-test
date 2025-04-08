// Profile component to display user profile information with image
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

function Profile({ user }) {
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    // Format long text values for better display
    const formatValue = (key, value) => {
      if (typeof value !== 'string') {
        return value;
      }
      
      // Handle long values like GoogleId
      if (key === 'googleId' && value.length > 25) {
        return (
          <div className="truncated-value" title={value}>
            {value}
          </div>
        );
      }
      
      return value;
    };
  
    return (
      <div className="profile-container">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-card">
          {user.picture && (
            <div className="profile-image-container">
              <img 
                src={user.picture} 
                alt={`${user.name}'s profile`} 
                className="profile-image"
              />
            </div>
          )}
          <h3>{user.name}</h3>
          <table className="profile-table">
            <tbody>
              {Object.entries(user).filter(([key]) => key !== 'picture').map(([key, value]) => (
                <tr key={key}>
                  <td className="profile-label">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                  <td className="profile-value">{formatValue(key, value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="profile-navigation">
            <Link to="/" className="back-link">
              Back to Main
            </Link>
          </div>
        </div>
      </div>
    );
  }

export default Profile
  