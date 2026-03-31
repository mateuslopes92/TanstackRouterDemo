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

The vite plugin automatically bootstrap the routes when component is created under (`src/routes`) to something like this:
```js
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile"!</div>
}
```

