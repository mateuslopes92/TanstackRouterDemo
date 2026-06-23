import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  beforeLoad: ({ context }) => {
    // This doesn't work because the useAuth hook is a React hook and can't be used outside of a React component.
    // Is not a valid React placement. It can only be used inside a React component or another hook.
    // Instead we can create a context provider for it.
    // const { authenticated, signIn, signOut } = useAuth()

    const { isLogged } = context.authentication;

    if (!isLogged()) {
      throw redirect({
        to: "/auth",
      });
    }
  },
  component: Profile,
  //notFoundComponent: () => <div>Page not found inside /profile</div>,
});

const user = {
  name: "Ash Ketchum",
  email: "ash@pokemon.com",
  bio: "Pokémon Trainer from Pallet Town. Aiming to be a Pokémon Master!",
  joined: "October 2024",
  avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/25.png",
  stats: [
    { label: "Pokémon Caught", value: 151 },
    { label: "Badges", value: 8 },
    { label: "Region", value: "Kanto" },
    { label: "Traveled", value: "10,000 km" },
  ],
};

function Profile() {
  return (
    <div className="page">
      <h1 className="page__title" style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "1rem" }}>
        Profile
      </h1>

      <div className="profile-header">
        <img className="profile-header__avatar" src={user.avatar} alt={user.name} />
        <div className="profile-header__info">
          <h2 className="profile-header__name">{user.name}</h2>
          <p className="profile-header__email">{user.email}</p>
          <p className="profile-header__bio">{user.bio}</p>
          <p className="profile-header__joined">Joined {user.joined}</p>
        </div>
      </div>

      <div className="page__divider" />

      <h2 className="page__title" style={{ fontSize: "1.25rem" }}>Stats</h2>
      <div className="profile-stats">
        {user.stats.map((stat) => (
          <div key={stat.label} className="profile-stat">
            <div className="profile-stat__value">{stat.value}</div>
            <div className="profile-stat__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
