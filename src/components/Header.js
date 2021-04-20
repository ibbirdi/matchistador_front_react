import '../index.scss';

function Header() {
  return (
    <div className="Header">
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="/img/logodegrade.png" />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Header;
