# Tanstack Router Demo

## Tanstack Router Features
- 100% inferred TypeScript support

## Project
This project was created using vite and typescript template with the command:
```
npm create vite@latest tanstack-router-demo -- --template react-ts
```

I`ve added the tanstack router package:
``
npm install @tanstack/react-router
``

As uses vite, also added the vite plugin to help regenerating the routes every time the app compiles.
```
npm i -D @tanstack/router-plugin
```

The plugin automatically bootstrap the routes when component is created under (`src/routes`) to something like this:
`stop the app and run again`
```js
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/pokemon"!</div>
}
```

</br>

## Entry point (App.tsx)
- Router creation
- routeTree auto generated
- Inference of route types

</br>

## Link component (__root.tsx)
The Link component as other libraries do is to handle navigation instead of using `<a>` tags.

- The `Link` component has cool props like for example the `activeProps` that are style props shown when that route is active.
- Or even more interesting `Link` components can receive a function that have a parameter `isActive` and you can do whatever you want

```tsx
<>
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
 <>
```
</br>

## Path Parameters & Loader (Pokemon/index and Pokemon/$id)
To define a route which uses a path parameter on route creation we can have:

```tsx
export const Route = createFileRoute('/pokemon/$id')({ // $id defines the parameter
  component: Pokemon,
})
```

when using link to a route that have path parameters we need to user `params` prop which infers the accepted parameter.

```tsx
<Link
  key={p.id}
  to={`/pokemon/$id`} // Route that have parameter
  params={{ id: String(p.id) }} // Param should be passed here
  className="pokemon-item"
>
  {...}
</Link>
```

### Loaders
The loader is defined on Route creation like this:
```tsx
export const Route = createFileRoute('/pokemon/')({
  component: PokemonList,
  loader: async () => pokemonList(), // Here the loader is defined
})
```

To access the loader response we can get it from our `Route`:
```tsx
export const Route = createFileRoute('/pokemon/')({
  component: PokemonList,
  loader: async () => pokemonList(), // call api
})

function PokemonList() {
  const pokemons = Route.useLoaderData(); // get response
  ...
```
