// Login component
function Login({ onGoogleSignIn, isGoogleScriptLoaded }) {
    return (
      <>
        <p className="title">Google Sign-In</p>
        
        {/* Google Sign-In Button */}
        <div className="google-signin-container">
          <div id="googleSignInButton"></div>
        </div>
      </>
    );
  }

export default Login
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     port: 8084,
//    },  
//   plugins: [react()],