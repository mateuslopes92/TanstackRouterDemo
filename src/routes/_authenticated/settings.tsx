import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="page">
      <h1 className="page__title" style={{ textAlign: "center", fontSize: "2.5rem", marginTop: "1rem" }}>
        Settings
      </h1>

      <div className="settings-section">
        <h2 className="settings-section__title">Profile</h2>
        <div className="settings-section__body">
          <div className="settings-field">
            <label className="settings-field__label" htmlFor="name">Name</label>
            <input className="settings-field__input" id="name" type="text" defaultValue="Ash Ketchum" />
          </div>
          <div className="settings-field">
            <label className="settings-field__label" htmlFor="email">Email</label>
            <input className="settings-field__input" id="email" type="email" defaultValue="ash@pokemon.com" />
          </div>
          <div className="settings-field">
            <label className="settings-field__label" htmlFor="bio">Bio</label>
            <textarea className="settings-field__input settings-field__input--textarea" id="bio" rows={3} defaultValue="Pokémon Trainer from Pallet Town." />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section__title">Notifications</h2>
        <div className="settings-section__body">
          <div className="settings-field settings-field--row">
            <div>
              <div className="settings-field__label">Email Notifications</div>
              <div className="settings-field__hint">Receive updates about Pokémon events</div>
            </div>
            <label className="settings-toggle">
              <input className="settings-toggle__input" type="checkbox" defaultChecked />
              <span className="settings-toggle__slider" />
            </label>
          </div>
          <div className="settings-field settings-field--row">
            <div>
              <div className="settings-field__label">Push Notifications</div>
              <div className="settings-field__hint">Get notified when new Pokémon are discovered</div>
            </div>
            <label className="settings-toggle">
              <input className="settings-toggle__input" type="checkbox" defaultChecked />
              <span className="settings-toggle__slider" />
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="settings-section__title">Danger Zone</h2>
        <div className="settings-section__body">
          <p className="page__text" style={{ marginBottom: "1rem" }}>
            This action cannot be undone. This will permanently delete your account and remove all data.
          </p>
          <button className="page__button page__button--danger">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
