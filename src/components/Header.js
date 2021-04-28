import ConnectStatus from './ConnectStatus';

function Header(props) {
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <div className="logo">
          <a className="navbar-item" href="/">
            <img src="/img/logodegrade.png" />
          </a>
        </div>

        <div className="connected-user">
          <ConnectStatus connectedUser={props.connectedUser} />
          <img src="/img/profile-user.png" alt="" />
        </div>
      </nav>
    </div>
  );
}

export default Header;
