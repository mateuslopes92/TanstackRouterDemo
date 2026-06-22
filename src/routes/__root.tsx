import "../App.css";

import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { AuthContext } from "../hooks/useAuth";

const activeProps = { className: "header__link header__link--active" };

type RouterContext = {
  authentication: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <header className="header">
        <div className="header__inner">
          <div className="header__left">
            <img
              src="/pokeball.svg"
              alt="Pokeball"
              className="header__pokeball"
            />
            <h1 className="header__title">Pokemon Tanstack Router App</h1>
          </div>
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
              <li>
                <Link
                  to="/search"
                  className="header__link"
                  activeProps={activeProps}
                >
                  Search
                </Link>
              </li>

              <li className="header__nav--spacer" />
              <li>
                <Link
                  to="/auth"
                  className="header__link"
                  activeProps={activeProps}
                >
                  Auth
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="header__link"
                  activeProps={activeProps}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="header__link"
                  activeProps={activeProps}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </>
  ),
});