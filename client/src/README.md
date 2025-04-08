# Login flow:
1. Load default page, App.jsx
2. Check if session exists.
3. If session exists, redirect to Profile.jsx
4. Else, redirect to Login.jsx
5. On successful login, Google Auth redirects to Profile.jsx
6. On successful logout, redirect to Login.jsx
7. On successful registration, redirect to Login.jsx