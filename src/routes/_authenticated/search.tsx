import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { searchPokemon, type SearchResult } from '../../api/pokemon'
// import React from 'react';

const PokemonTypeSchema = z.enum([
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
])
type PokemonType = z.infer<typeof PokemonTypeSchema>

const SearchFiltersSchema = z.object({
  query: z.string().default(''),
  types: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val
      if (typeof val === 'string') return val.split(',').filter(Boolean)
      return []
    },
    z.array(PokemonTypeSchema)
  ).catch([]),
})

const types: { value: PokemonType; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'fire', label: 'Fire' },
  { value: 'water', label: 'Water' },
  { value: 'electric', label: 'Electric' },
  { value: 'grass', label: 'Grass' },
  { value: 'ice', label: 'Ice' },
  { value: 'fighting', label: 'Fighting' },
  { value: 'poison', label: 'Poison' },
  { value: 'ground', label: 'Ground' },
  { value: 'flying', label: 'Flying' },
  { value: 'psychic', label: 'Psychic' },
  { value: 'bug', label: 'Bug' },
  { value: 'rock', label: 'Rock' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'dragon', label: 'Dragon' },
  { value: 'dark', label: 'Dark' },
  { value: 'steel', label: 'Steel' },
  { value: 'fairy', label: 'Fairy' },
];

export const Route = createFileRoute('/_authenticated/search')({
  component: Search,
  validateSearch: (search) => SearchFiltersSchema.parse(search ?? {}),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ search, deps }) => {
    const { query, types } = SearchFiltersSchema.parse(deps.search ?? {});
    if (!query) return [];
    return searchPokemon(query, types);
  },
})

function Search() {
  const { query, types: selectedTypes } = Route.useSearch();
  const results: SearchResult[] = Route.useLoaderData();
  const navigate = Route.useNavigate({ from: Route.fullPath });

  const updateFilters = (name: keyof z.infer<typeof SearchFiltersSchema>, value: string | string[]) => {
    navigate({ search: (prev) => ({ ...prev, [name]: value }) }); // this updates the url, so if we refresh the page, we keep the query
  }

  /**
   * this is what we do with only react,
   * but with router we can just use the query from the url and update it when the user types
   */
  // const [localQuery, setLocalQuery] = React.useState(query);

  return (
    <div className="page">
      <h1 className="page__title" style={{ textAlign: 'center', fontSize: '2.5rem', marginTop: '1rem' }}>
        Search
      </h1>

      <div className="search-filters">
        <div className="search-filters__form">
          <div className="search-filters__field">
            <label className="search-filters__label" htmlFor="query">Query</label>
            <input
              id="query"
              className="search-filters__input"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => updateFilters('query', e.target.value)} // this updates the url, so if we refresh the page, we keep the query
            />

            {/* This is how we would do it with only react,
            but with router we can just use the query from the url and update it when the user types */}
            {/* <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)} // this does not change the url, so if we refresh the page, we lose the query
            /> */}
          </div>

          <div className="search-filters__field">
            <label className="search-filters__label">Type</label>
            <div className="search-filters__checks">
              {types.map((t) => (
                <label key={t.value} className="search-filters__checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={selectedTypes?.includes(t.value)}
                    onChange={(e) => {
                      const newTypes = e.target.checked
                        ? [...(selectedTypes || []), t.value]
                        : (selectedTypes || []).filter((v) => v !== t.value);
                      updateFilters('types', newTypes); // this updates the url, so if we refresh the page, we keep the query
                    }}
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {query ? (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((result) => {
              const id = result.url.split('/').filter(Boolean).pop();
              return (
                <div
                  key={result.name}
                  className="search-result-item"
                  onClick={() => navigate({ to: '/pokemon/$id', params: { id } })}
                >
                  <img src={result.image} alt={result.name} className="search-result-item__image" />
                  <div className="search-result-item__title">{result.name}</div>
                </div>
              );
            })
          ) : (
            <div className="search-empty">
              <div className="search-empty__icon">🔍</div>
              <div className="search-empty__text">No Pokémon found for "{query}" in {selectedTypes?.join(', ') || 'all'} types.</div>
            </div>
          )}
        </div>
      ) : (
        <div className="search-empty">
          <div className="search-empty__icon">🔍</div>
          <div className="search-empty__text">Enter a search query to find Pokémon by type.</div>
        </div>
      )}
    </div>
  )
}
