import { useNavigate } from 'react-router-dom';
import { cleanLocalConfig } from '../utils';


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-row my-4">
      <nav className="flex justify-center mx-auto" />
      <div className="cursor-pointer p-2 mr-4 border border-[#34558B] rounded-lg">
        <button onClick={() => {
          cleanLocalConfig();
          navigate('/login', { replace: true });
        }}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;