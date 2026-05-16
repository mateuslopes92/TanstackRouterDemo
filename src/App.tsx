import './App.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { useAuth } from './hooks/useAuth'

// routerTree is a auto generate file that contains all the routes in the src/routes directory
const router = createRouter({
  routeTree,
  context: { authentication: undefined! } // The documentation says to use undefined! here
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
