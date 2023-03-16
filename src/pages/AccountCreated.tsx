import { useNavigate } from 'react-router-dom';

function AccountCreatedPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="AccountCreatedPageContainer">
      <h2>Your account has been created!</h2>
      <button onClick={handleClick}>Go to login</button>
    </div>
  );
}

export default AccountCreatedPage;
