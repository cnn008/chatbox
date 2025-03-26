import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/profile.css';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }

      const currentUserNormalized = (user?.nickname || user?.name?.replace(/\s+/g, '-').toLowerCase());
      const requestedNormalized = username?.toLowerCase();

      if (currentUserNormalized !== requestedNormalized) {
        navigate(`/profile/${currentUserNormalized}`);
        return;
      }

      setProfile({
        name: user.name,
        picture: user.picture,
        email: user.email,
        lastActive: new Date().toISOString()
      });
    }
  }, [isAuthenticated, isLoading, user, username, navigate]);

  if (isLoading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-page">
      {profile && (
        <>
          <h1>{profile.name}'s Profile</h1>
          <div className="profile-card">
            <img src={profile.picture} alt={profile.name} />
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
              <p>Last active: {new Date(profile.lastActive).toLocaleString()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}