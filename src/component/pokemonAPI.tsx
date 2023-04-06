export async function fetchPokemon(selectedPokemon: string) {
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchPokemonCard(selectedPokemon: string) {
  const url = `https://api.pokemontcg.io/v2/cards?q=name:${selectedPokemon}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
