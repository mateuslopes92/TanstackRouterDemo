import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: () => (
    <div className="page">
      <h1 className="page__title">Profile</h1>
      <div className="page__card">
        <p className="page__text">
          This is the profile page.
        </p>
      </div>
    </div>
  ),
});