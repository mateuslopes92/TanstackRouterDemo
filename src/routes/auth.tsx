import { createFileRoute, useRouter } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../utils/auth";

import { useState } from "react";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  const router = useRouter();
  const [, refresh] = useState(0);

  return (
    <>
      <h2>Auth</h2>
      {isAuthenticated() ? (
        <>
          <p>Hello user!</p>
          <button
            onClick={() => {
              signOut();
              // Invalidate the router to trigger the beforeLoad of the protected routes and redirect the user to the login page
              router.invalidate();
              // just to update content on this page
              refresh((n) => n + 1);
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            signIn();
            // Invalidate the router to trigger the beforeLoad of the protected routes and redirect the user to the login page
            router.invalidate();
            // just to update content on this page
            refresh((n) => n + 1);
          }}
        >
          Sign in
        </button>
      )}
    </>
  );
}
