import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  // Get environment variables
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  // Dynamic redirect URI handling
  const getRedirectUri = () => {
    if (process.env.NODE_ENV === 'production') {
      return `${process.env.PUBLIC_URL}/`;
    }
    // For local development with callback path support
    return window.location.hostname === 'localhost' 
      ? `${window.location.origin}/callback`
      : window.location.origin;
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: getRedirectUri(),
        audience: audience,
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}