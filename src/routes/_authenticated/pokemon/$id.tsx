import { createFileRoute } from '@tanstack/react-router'
import { pokemonById } from '../../../api/pokemon'
import { PokemonCardStats } from './-components/PokemonCardStats'

export const Route = createFileRoute('/_authenticated/pokemon/$id')({
  component: Pokemon,
  loader: async ({ params }) => await pokemonById(params.id),
})

function Pokemon() {
  const pokemon = Route.useLoaderData()
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

  return (
    <div className="page">
      <h1 className="page__title" style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '1rem' }}>{name}</h1>
      <div className="pokemon-card">
        <img className="pokemon-card__image" src={pokemon.sprites.front_default} alt={name} />

        <div className="pokemon-card__types">
          {pokemon.types.map((t) => (
            <span key={t.type.name} className={`pokemon-type pokemon-type--${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
        </div>

        <PokemonCardStats pokemon={pokemon} />
      </div>
    </div>
  )
}