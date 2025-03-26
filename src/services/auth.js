import { Auth0Client } from '@auth0/auth0-spa-js';

const config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN ,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE 
};

let auth0Client = null;

export const initializeAuth0 = async () => {
  if (!auth0Client) {
    auth0Client = new Auth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: config.audience,
        scope: 'read:current_user update:current_user_metadata'
      },
      cacheLocation: 'localstorage',
      useRefreshTokens: true
    });
  }
  return auth0Client;
};

export const getAuthenticatedUser = async () => {
  const client = await initializeAuth0();
  const isAuthenticated = await client.isAuthenticated();
  
  if (isAuthenticated) {
    const user = await client.getUser();
    localStorage.setItem('auth0_user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const useAuth = () => {
  return {
    login: async () => {
      const client = await initializeAuth0();
      await client.loginWithRedirect();
    },
    logout: () => {
      localStorage.removeItem('auth0_user');
      return auth0Client.logout({
        logoutParams: { returnTo: window.location.origin }
      });
    }
  };
};