function Header(props) {
  const isLoggedIn = props.name;
  return (
    <div className="Header">
      <nav className="" role="navigation" aria-label="main navigation">
        <div className="logo">
          <a className="navbar-item" href="/">
            <img src="/img/logodegrade.png" />
          </a>
        </div>
        {isLoggedIn ? (
          <div className="connected-user">
            <div className="user">{props.name}</div>
            <img src="/img/profile-user.png" alt="" />
          </div>
        ) : null}
      </nav>
    </div>
  );
}

export default Header;
