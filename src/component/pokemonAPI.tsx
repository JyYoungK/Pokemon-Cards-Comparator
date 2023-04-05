export default async function fetchPokemon(selectedPokemon: string) {
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
