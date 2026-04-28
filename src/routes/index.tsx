import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="page">
      <h1 className="page__title">Welcome Home</h1>
      <div className="page__card">
        <p className="page__text">
          This is the home page of your TanStack Router demo application.
          Use the navigation above to explore the app.
        </p>
      </div>
    </div>
  ),
});