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