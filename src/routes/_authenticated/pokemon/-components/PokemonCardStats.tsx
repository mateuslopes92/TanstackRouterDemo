export function PokemonCardStats({ pokemon }: { pokemon: { height: number; weight: number; id: number; types: { length: number } } }) {
  return (
    <div className="pokemon-card__stats">
      <div className="pokemon-stat">
        <div className="pokemon-stat__label">Height</div>
        <div className="pokemon-stat__value">{pokemon.height / 10}m</div>
      </div>
      <div className="pokemon-stat">
        <div className="pokemon-stat__label">Weight</div>
        <div className="pokemon-stat__value">{pokemon.weight / 10}kg</div>
      </div>
      <div className="pokemon-stat">
        <div className="pokemon-stat__label">ID</div>
        <div className="pokemon-stat__value">#{pokemon.id}</div>
      </div>
      <div className="pokemon-stat">
        <div className="pokemon-stat__label">Types</div>
        <div className="pokemon-stat__value">{pokemon.types.length}</div>
      </div>
    </div>
  )
}
