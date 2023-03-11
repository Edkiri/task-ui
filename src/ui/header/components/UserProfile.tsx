import { useState, useEffect } from 'react';
import { getUserFromSession } from '../../../user/services/api';
import { User } from '../../../user/types';

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserFromSession()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
