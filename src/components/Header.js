import ConnectStatus from './ConnectStatus';

function Header({ username }) {
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <div className="logo">
          <a className="navbar-item" href="/">
            <img src="/img/logodegrade.png" alt="logo" />
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
