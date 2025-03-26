import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const ProfileButton = ({ user }) => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleProfile = () => {
    // Use nickname if available, otherwise use name without spaces
    const username = user?.nickname || 
                    user?.name?.replace(/\s+/g, '-').toLowerCase() || 
                    'user';
    navigate(`/profile/${username}`);
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="profile-button-group">
      <button 
        className="auth-button profile-button"
        onClick={handleProfile}
        aria-label="View profile"
      >
        <img 
          src={user.picture} 
          alt={user.name} 
          className="profile-avatar"
        />
      </button>
      
      <button 
        className="auth-button logout-button"
        onClick={handleLogout}
        aria-label="Logout"
      >
        <span className="button-text">Logout</span>
      </button>
    </div>
  );
};

export default ProfileButton;