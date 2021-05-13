import ConnectStatus from './ConnectStatus';
import logo from '../img/logodegrade.png';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function Header({ username }) {
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <Fade left big>
          <div className="logo">
            <Link className="navbar-item" to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </Fade>
        <Fade right big>
          <div className="connected-user">
            <ConnectStatus username={username} />
          </div>
        </Fade>
      </nav>
    </div>
  );
}

export default Header;
