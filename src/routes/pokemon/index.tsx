import { Link, createFileRoute } from '@tanstack/react-router'

import { pokemonList } from '../../api/pokemon'

export const Route = createFileRoute('/pokemon/')({
  component: PokemonList,
  loader: async () => pokemonList(),
})

function PokemonList() {
  const pokemons = Route.useLoaderData();

  return (
    <div className="page">
      <h1 className="page__title" style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '1rem' }}>
        Pokemon List
      </h1>
      <div className="pokemon-list">
        {pokemons.results.map((p) => (
          <Link 
            key={p.id} 
            to={`/pokemon/$id`} 
            params={{ id: String(p.id) }}
            className="pokemon-item"
          >
            <span className="pokemon-item__number">#{String(p.id).padStart(3, '0')}</span>
            <img 
              className="pokemon-item__image"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name}
            />
            <span className="pokemon-item__name">{p.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}