import ConnectStatus from './ConnectStatus';
import logo from '../img/logodegrade.png';
function Header({ username }) {
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <div className="logo">
          <a className="navbar-item" href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>

        <div className="connected-user">
          <ConnectStatus username={username} />
        </div>
      </nav>
    </div>
  );
}

export default Header;
