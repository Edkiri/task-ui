import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../user/AuthContext';
import { logout } from '../../../user/services/api';

function UserProfile() {
  const { user, updateAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data.status === 200) {
        updateAuthUser(null);
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="UserProfileContainer"
      style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
    >
      {user && (
        <button
          style={{
            color: '#f1707b',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          className="LogoutButton"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
      {user?.avatarUrl && (
        <>
          <img
            referrerPolicy="no-referrer"
            width={40}
            height={40}
            src={user.avatarUrl}
            alt=""
            style={{ borderRadius: '50%' }}
          />
        </>
      )}
    </div>
  );
}

export default UserProfile;
