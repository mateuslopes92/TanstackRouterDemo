export interface Pokemon {
  name: string;
  url: string;
  id?: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: Array<{
    type: { name: string };
  }>;
}

export async function pokemonList(): Promise<PokemonListResponse> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  const data = await res.json();
  
  data.results = data.results.map((p: Pokemon) => ({
    ...p,
    id: parseInt(p.url.split('/').filter(Boolean).pop() || '0', 10),
  }));
  
  return data;
}

export async function pokemonById(id: string): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return res.json();
}

export interface SearchResult {
  name: string;
  url: string;
  image: string;
}

export async function searchPokemon(query: string, selectedTypes: string[]): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const seen = new Set<string>();

  const fetchByType = async (type: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) return;
    const data = await res.json();
    for (const entry of data.pokemon) {
      const pokemon = entry.pokemon;
      if (!pokemon.name.toLowerCase().includes(query.toLowerCase())) continue;
      if (seen.has(pokemon.name)) continue;
      seen.add(pokemon.name);
      const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0', 10);
      results.push({
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      });
    }
  };

  if (selectedTypes.length === 0) {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    if (!res.ok) return [];
    const data = await res.json();
    for (const pokemon of data.results) {
      if (!pokemon.name.toLowerCase().includes(query.toLowerCase())) continue;
      const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0', 10);
      results.push({
        name: pokemon.name,
        url: pokemon.url,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      });
    }
  } else {
    await Promise.all(selectedTypes.map(fetchByType));
  }

  results.sort((a, b) => a.name.localeCompare(b.name));
  return results;
}