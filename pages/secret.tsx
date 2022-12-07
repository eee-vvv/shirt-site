import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className="page-container">
      {isAuthenticated ?
      <button onClick={() => logout()}>Log Out</button>
      :
        <button onClick={() => loginWithRedirect()}>Log In</button>
        }
    </div>
  );
};

export default LoginPage;
