import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nested')({
  component: RouteComponent,
})

const activeProps = { className: 'sidesheet__link sidesheet__link--active' }

function RouteComponent() {
  return (
    <div className="sidesheet-layout">
      <aside className="sidesheet">
        <div className="sidesheet__header">
          <h2 className="sidesheet__title">Navigation</h2>
        </div>
        <nav className="sidesheet__nav">
          <Link
            to="/nested/pikachu"
            className="sidesheet__link"
            activeProps={activeProps}
          >
            Pikachu
          </Link>
          <Link
            to="/nested/charmander"
            className="sidesheet__link"
            activeProps={activeProps}
          >
            Charmander
          </Link>
        </nav>
      </aside>
      <main className="sidesheet-content">
        <Outlet />
      </main>
    </div>
  )
}
