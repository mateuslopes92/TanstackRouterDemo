import './App.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

// routerTree is a auto generate file that contains all the routes in the src/routes directory
const router = createRouter({ routeTree })

// expand the interface to make autocomplete work with the router
declare module '@tanstack/react-router' {
  export interface RegisterRouter {
    router: typeof router
  }
}

function App() {

  return (
    <RouterProvider router={router} >
    </RouterProvider>
  )
}

export default App
