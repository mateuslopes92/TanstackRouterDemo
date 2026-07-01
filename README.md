# Tanstack Router Demo

## Tanstack
Is a suite of tools built from Tanner Linsley in 2025. Some of those tools:
- Tanstack Router
- Tanstack Query(React Query)
- Tanstack Table
- much more...


## Tanstack Router Features
- **Typesafe & powerful** — 100% typesafe routing
- **Built-in Data Fetching with Caching** — loader API avoids waterfalls, built-in caching and preloading
- **Search Param APIs** — state-manager-grade search params with schemas, validation, and full type-safety
- **File system based routes** - Is just create a folder/file inside routes folder.

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

</br>

## Query Parameters & Validation (search.tsx)

Query parameters can **replace React `useState`** for filter/search state — the URL becomes the single source of truth. This makes state shareable, bookmarkable, and persistable across refreshes.

### Defining & validating with Zod (or Valibot)

Use `z.object` to define the shape and types of your query params, then wire it to the route with `validateSearch`:

```tsx
const SearchFiltersSchema = z.object({
  query: z.string().default(''),
  types: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val
      if (typeof val === 'string') return val.split(',').filter(Boolean)
      return []
    },
    z.array(PokemonTypeSchema)
  ).catch([]),
})

export const Route = createFileRoute('/search')({
  validateSearch: (search) => SearchFiltersSchema.parse(search ?? {}),
  // ...
})
```

### `loaderDeps` — react to query changes

`loaderDeps` tells the loader to re-run when query params change. The deps are available inside the loader via `deps`:

```tsx
export const Route = createFileRoute('/search')({
  validateSearch: (search) => SearchFiltersSchema.parse(search ?? {}),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps }) => {
    const { query, types } = SearchFiltersSchema.parse(deps.search ?? {})
    if (!query) return []
    return searchPokemon(query, types)
  },
})
```

### Reading search & navigating

`Route.useSearch()` reads the validated query params. `Route.useNavigate()` can update them — which **changes the URL**, so the state survives a refresh:

```tsx
function Search() {
  const { query, types: selectedTypes } = Route.useSearch()
  const navigate = Route.useNavigate({ from: Route.fullPath })

  const updateFilters = (name: string, value: string | string[]) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) })
  }

  return (
    <input
      value={query}
      onChange={(e) => updateFilters('query', e.target.value)}
    />
  )
}
```

No `useState`, no `useEffect` to sync — the URL is the state. On refresh the filters persist because they live in the URL.

</br>

## Authenticated Routes (_authenticated.tsx, auth.tsx, hooks/useAuth.ts)

Protect certain pages behind an authentication check. Uses a simple localStorage flag to track auth state and `router.invalidate()` to re-trigger route guards after sign in/out.

### The `useAuth` hook (`hooks/useAuth.ts`)

Returns `{ signIn, signOut, isLogged }`. `isLogged` is a **function** (reads localStorage on every call) — this avoids stale-state issues because route guards (`beforeLoad`) run outside React's render cycle:

```tsx
const isLogged = () => localStorage.getItem("isAuthenticated") === "true";
```

### Typing the context (`__root.tsx`)

Use `createRootRouteWithContext` to type the context that flows through your router:

```tsx
type RouterContext = { authentication: AuthContext };
export const Route = createRootRouteWithContext<RouterContext>()({...})
```

### The `beforeLoad` guard (`_authenticated.tsx`)

The underscore prefix creates a **pathless layout route** — it wraps children without adding a URL segment. `beforeLoad` runs before the component renders, making it the right place to check auth:

```tsx
beforeLoad: async ({ context }) => {
  const { isLogged } = context.authentication;
  if (!isLogged()) throw redirect({ to: "/auth" });
}
```

Protected routes go inside `_authenticated/`:
- `_authenticated/profile.tsx` → URL: `/profile`
- `_authenticated/settings.tsx` → URL: `/settings`

### Passing context (`App.tsx`)

Wire the hook into the router at runtime via `RouterProvider`'s `context` prop:

```tsx
const router = createRouter({
  routeTree,
  context: { authentication: undefined! }, // placeholder
});

function App() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
}
```

### `router.invalidate()` after auth change (`auth.tsx`)

After `signIn()` / `signOut()`, call `router.invalidate()` to re-run load functions (including `beforeLoad`) so protected routes re-evaluate access:

```tsx
signIn();
router.invalidate(); // re-runs beforeLoad on all active matches
refresh((n) => n + 1); // forces UI re-render on this page
```

</br>

### Flow summary
1. **Sign in** → localStorage set → `router.invalidate()` → `beforeLoad` re-runs → `isLogged()` reads localStorage → access granted on protected routes
2. **Unauthenticated visit** to `/profile` → `beforeLoad` → `isLogged()` returns `false` → `redirect("/auth")`
3. **Sign out** → localStorage removed → `router.invalidate()` → `refresh()` updates UI

## Non-route folders (the `-` prefix trick)

Folders starting with a hyphen inside `src/routes` are **ignored by the router** — they won't become URL segments. This lets you colocate components, hooks, or utils close to your routes without polluting the URL:

```
src/routes/_authenticated/pokemon/
  -components/
    PokemonCardStats.tsx   ← not a route
  $id.tsx                  ← /pokemon/$id
  index.tsx                ← /pokemon
```

Import like any relative module:

```tsx
import { PokemonCardStats } from './-components/PokemonCardStats'
```

</br>

## Not Found Handling (`defaultNotFoundComponent` & `notFoundComponent`)

TanStack Router has two levels for handling 404s:

### Router-level: `defaultNotFoundComponent`

Set on `createRouter()` in `App.tsx`. Catches **every URL that doesn't match any route**:

```tsx
const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultNotFoundComponent: () => <div>Default 404</div>,
})
```

### Route-level: `notFoundComponent`

Set on a specific route. Two ways it triggers:

**1. Explicit `notFound()` call** — throw `notFound()` in `beforeLoad` or `loader` when a resource doesn't exist. The route's own `notFoundComponent` renders instead of the regular component:

```tsx
export const Route = createFileRoute("/_authenticated/profile")({
  beforeLoad: async ({ notFound }) => {
    const data = await fetchData()
    if (!data) throw notFound()
  },
  component: Profile,
  notFoundComponent: () => <div>Page not found inside /profile</div>,
})
```

**2. Unmatched child paths** — if the route has children (`<Outlet>`) and no child route matches the URL, the route's `notFoundComponent` renders. Leaf routes (no children) **cannot** catch unmatched sub-paths — they bubble up to the nearest parent with children or to `defaultNotFoundComponent`.

> 💡 `defaultNotFoundComponent` = no route matched at all
> 💡 `notFoundComponent` = route matched but content wasn't found

</br>

## Nested Routes & Layouts (`nested/`)

`nested/route.tsx` defines a layout route at `/nested` with a sidebar and `<Outlet />`. Child routes render inside the outlet — the layout persists as you navigate between them:

```
src/routes/nested/
  route.tsx        ← layout at /nested (sidebar + <Outlet />)
  pikachu.tsx      ← /nested/pikachu
  charmander.tsx   ← /nested/charmander
```

```tsx
// nested/route.tsx
function RouteComponent() {
  return (
    <div className="sidesheet-layout">
      <aside className="sidesheet">
        <nav>
          <Link to="/nested/pikachu">Pikachu</Link>
          <Link to="/nested/charmander">Charmander</Link>
        </nav>
      </aside>
      <main>
        <Outlet /> {/* child route renders here */}
      </main>
    </div>
  )
}
```

The sidebar stays mounted — only the outlet content swaps. This is how you build persistent UIs like dashboards, settings panels, or multi-step flows without re-rendering shared chrome.

> 💡 `nested/route.tsx` = layout at `/nested`
> 💡 `nested/pikachu.tsx` = content renders inside the layout
> 💡 `<Outlet />` = where the matched child renders