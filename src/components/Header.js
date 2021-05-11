import ConnectStatus from './ConnectStatus';
import logo from '../img/logodegrade.png';
import { Link } from 'react-router-dom';
function Header({ username }) {
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <div className="logo">
          <Link className="navbar-item" to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="connected-user">
          <ConnectStatus username={username} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
