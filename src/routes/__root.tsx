import "../App.css";

import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

const activeProps = { className: "header__link header__link--active" };

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">
        <h1 className="header__title">My Tanstack App</h1>
        <nav>
          <ul className="header__nav">
            <li>
              <Link to="/" className="header__link" activeProps={activeProps}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="header__link"
                activeProps={activeProps}
              >
                {({ isActive }) => (
                  <span className={isActive ? "header__link--active" : ""}>
                    Profile {isActive && "(You are here)"}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  ),
});