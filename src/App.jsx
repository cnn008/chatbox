import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  // Auth0 config (uses process.env.NODE_ENV automatically)
  const redirectUri = process.env.NODE_ENV === 'development' 
    ? `${window.location.origin}/callback` 
    : `${process.env.PUBLIC_URL}/`;

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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