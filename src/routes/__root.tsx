import { Link, createRootRoute } from "@tanstack/react-router";

const activeProps = { style: { fontWeight: 'bold' } }

export const Route = createRootRoute({
  component: () => (
    <>
      <h1>My Tanstack App</h1>
      <ul>
        <li>
          <Link to="/" activeProps={activeProps}> Home</Link>
        </li>
        <li>
          <Link to="/profile" activeProps={activeProps}>{({ isActive }) => <>Profile {isActive && ' (Active)'}</>}</Link>
        </li>
      </ul>
    </>
  )
});