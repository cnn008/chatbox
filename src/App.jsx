import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  const publicUrl = process.env.PUBLIC_URL || '';

  const getRedirectUri = () => {
    if (process.env.NODE_ENV === 'production') {
      return `${publicUrl}/`;
    }
    return window.location.origin + (window.location.hostname === 'localhost' ? '/callback' : '');
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
      <BrowserRouter basename={publicUrl}>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}