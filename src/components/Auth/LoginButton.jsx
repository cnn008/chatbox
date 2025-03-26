import { useAuth0 } from '@auth0/auth0-react'
import '../../styles/auth.css' 

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <button 
      className="auth-button login-button"
      onClick={() => loginWithRedirect()}
      aria-label="Login"
    >
      <span className="button-text">Login</span>
    </button>
  )
}

export default LoginButton