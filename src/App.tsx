import './App.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { useAuth } from './hooks/useAuth'

// routerTree is a auto generate file that contains all the routes in the src/routes directory
const router = createRouter({
  routeTree,
  context: { authentication: undefined! }, // The documentation says to use undefined! here
  defaultNotFoundComponent: () => (
    <div className="not-found">
      <div className="not-found__pokeball">
        <div className="not-found__pokeball-top" />
        <div className="not-found__pokeball-bottom" />
        <div className="not-found__pokeball-button" />
      </div>
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">Wild page not found!</p>
      <p className="not-found__hint">The page you're looking for has fled.</p>
      <a href="/" className="not-found__link">Go back home</a>
    </div>
  ),
})

// expand the interface to make autocomplete work with the router
declare module '@tanstack/react-router' {
  // This infers the type of our router and registers it across your entire project
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()

  return (
    <RouterProvider router={router} context={{ authentication: auth }} />
  )
}

export default App
