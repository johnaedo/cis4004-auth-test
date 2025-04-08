import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from  './Login'
import Profile from   './Profile'
import UserDashboard from './UserDashboard'
import './App.css'


function App() {
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  const [user, setUser] = useState(null);

  // Load Google Identity Services script
  useEffect(() => {
    // Add Google's script to the document
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => setIsGoogleScriptLoaded(true);
    
    document.body.appendChild(script);

    return () => {
      // Clean up when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Google Sign-In button when script is loaded
  useEffect(() => {
    if (isGoogleScriptLoaded && window.google && !user) {
      window.google.accounts.id.initialize({
        client_id: "671866723703-b9dktngq6u83bb3c6i0tj1h7k3f28jno.apps.googleusercontent.com", // Replace with your actual client ID
        callback: handleGoogleSignIn
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large", width: 250 }
      );
    }
  }, [isGoogleScriptLoaded, user]);

  const handleGoogleSignIn = (response) => {
    // This is a simplified example of handling Google sign-in
    if (response.credential) {
      // In a real app, you would verify this token on your server
      const decodedToken = parseJwt(response.credential);
      console.log(decodedToken);
      
      // Store user info (for demo purposes - in a real app, use secure auth)
      const userData = {
        name: decodedToken.name,
        email: decodedToken.email,
        googleId: decodedToken.sub,
        picture: decodedToken.picture,
        emailVerified: decodedToken.email_verified ? "Yes" : "No",
        locale: decodedToken.locale || "Not specified",
        signInTime: new Date().toLocaleString()
      };
      
      localStorage.setItem(userData.email, JSON.stringify(userData));
      setUser(userData);
      alert(`Signed in as ${userData.name} (${userData.email})`);
    }
  };

  // Helper function to decode JWT token
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleLogout = () => {
    setUser(null);
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user 
            ? <UserDashboard user={user} onLogout={handleLogout} /> 
            : <Login onGoogleSignIn={handleGoogleSignIn} isGoogleScriptLoaded={isGoogleScriptLoaded} />
        } />
        <Route path="/Profile" element={<Profile user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
