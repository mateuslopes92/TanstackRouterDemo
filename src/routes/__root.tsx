import "../App.css";

import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

const activeProps = { className: "header__link header__link--active" };

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="header">
        <h1 className="header__title">Pokemon Tanstack Router App</h1>
        <nav>
          <ul className="header__nav">
            <li>
              <Link to="/" className="header__link" activeProps={activeProps}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/pokemon"
                className="header__link"
                activeProps={activeProps}
              >
                {({ isActive }) => (
                  <span className={isActive ? "header__link--active" : ""}>
                    Pokemons {isActive && "(You are here)"}
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