import { useContext } from 'react';
import { AuthContext } from '../../../user/AuthContext';

function UserProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="UserProfileContainer"
      style={{ display: 'flex', alignItems: 'center' }}
    >
      {user?.avatarUrl && (
        <img
          referrerPolicy="no-referrer"
          width={40}
          height={40}
          src={user.avatarUrl}
          alt=""
          style={{ borderRadius: '50%' }}
        />
      )}
    </div>
  );
}

export default UserProfile;
