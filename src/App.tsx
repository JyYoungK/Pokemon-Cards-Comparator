import { useState, useEffect } from "react";
import "./App.css";
import { PokemonDataType, generation1 } from "./assets/data/generation";
import ComparePokemon from "./component/comparePokemon";
import { fetchPokemon, fetchPokemonCard } from "./component/pokemonAPI";
import { PokemonPreview, PokemonCard } from "./component/pokemonData";

function App() {
  // List of generations
  const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // List of Pokemon types
  const types = [
    "Normal",
    "Fire",
    "Water",
    "Electric",
    "Grass",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];

  // <------------------------------------ Find ------------------------------------ >

  // State variables to store the selected generation and type
  const [generation, setGeneration] = useState<string>("1");
  const [type, setType] = useState<string>("Normal");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDataType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState("Pidgey");
  const [pokemonData, setPokemonData] = useState<Object>({});
  const [pokemonCardData, setPokemonCardData] = useState<Object>({});

  // State variables to store the selected generation and type
  const [generation2, setGeneration2] = useState<string>("1");
  const [type2, setType2] = useState<string>("Normal");
  const [filteredPokemon2, setFilteredPokemon2] = useState<PokemonDataType[]>(
    []
  );
  const [selectedPokemon2, setSelectedPokemon2] = useState("Pidgey");
  const [pokemonData2, setPokemonData2] = useState<Object>({});
  const [pokemonCardData2, setPokemonCardData2] = useState<Object>({});

  useEffect(() => {
    pokemonPreview();
    comparePokemon();
  }, [selectedPokemon, selectedPokemon2]);

  useEffect(() => {
    const filtered = filterPokemon(generation, type);
    if (filtered) setFilteredPokemon(filtered);
  }, [generation, type]);

  useEffect(() => {
    const filtered = filterPokemon(generation2, type2);
    if (filtered) setFilteredPokemon2(filtered);
  }, [generation2, type2]);

  // Handler function for when the generation dropdown is changed
  const handleGenerationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGeneration(event.target.value);
  };

  // Handler function for when the generation dropdown is changed
  const handleGenerationChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGeneration2(event.target.value);
  };

  // Handler function for when the type dropdown is changed
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType(selectedType);
  };

  const handleTypeChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType2(selectedType);
  };

  const filterPokemon = (gen: string, t: string): PokemonDataType[] => {
    const pokemonList = getGenerationList(gen);
    const filteredList = pokemonList.filter(
      (p) => p.type1 === t || p.type2 === t
    );
    return filteredList || [];
  };

  const getGenerationList = (gen: string): PokemonDataType[] => {
    switch (gen) {
      case "1":
        return generation1;
      // Add other generations here
      default:
        return [];
    }
  };

  async function pokemonPreview() {
    try {
      const fetchPokemonData = await fetchPokemon(
        selectedPokemon.toLocaleLowerCase()
      );
      const fetchPokemonData2 = await fetchPokemon(
        selectedPokemon2.toLocaleLowerCase()
      );

      setPokemonData(fetchPokemonData);
      setPokemonData2(fetchPokemonData2);
    } catch (error) {
      console.error(error);
    }
  }

  async function comparePokemon() {
    try {
      const fetchPokemonCardData = await fetchPokemonCard(
        selectedPokemon.toLocaleLowerCase()
      );
      const fetchPokemonCardData2 = await fetchPokemonCard(
        selectedPokemon2.toLocaleLowerCase()
      );

      setPokemonCardData(fetchPokemonCardData);
      setPokemonCardData2(fetchPokemonCardData2);
    } catch (error) {
      console.error(error);
    }
  }
  // <------------------------------------ Search ------------------------------------ >

  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [showResults, setShowResults] = useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  //   const results: any = [];
  //   const generations = [generation1];
  //   // const generations = [generation1, generation2, generation3, generation4, generation5];
  //   generations.forEach((generation) => {
  //     generation.forEach((pokemon: PokemonDataType) => {
  //       if (
  //         pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())
  //       ) {
  //         results.push(pokemon.name);
  //       }
  //     });
  //   });
  //   setSearchResults(results.slice(0, 5)); // Only show top 5 results
  //   setShowResults(true);
  // };

  // const handleBlur = () => {
  //   setShowResults(false);
  // };

  // const handleFocus = () => {
  //   if (searchTerm) {
  //     setShowResults(true);
  //   }
  // };

  return (
    <div className="App flex h-screen w-full flex-col items-center justify-center border-4 border-black text-center">
      <div className="relative w-full">
        <div className="flex w-full flex-row border-4 border-black">
          <ComparePokemon
            pokemonNumber={"1"}
            handleGenerationChange={handleGenerationChange}
            generation={generation}
            generations={generations}
            handleTypeChange={handleTypeChange}
            type={type}
            types={types}
            filteredPokemon={filteredPokemon}
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
          <ComparePokemon
            pokemonNumber={"2"}
            handleGenerationChange={handleGenerationChange2}
            generation={generation2}
            generations={generations}
            handleTypeChange={handleTypeChange2}
            type={type2}
            types={types}
            filteredPokemon={filteredPokemon2}
            selectedPokemon={selectedPokemon2}
            setSelectedPokemon={setSelectedPokemon2}
          />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <div className="flex flex-row">
              <PokemonPreview number={1} pokemonData={pokemonData} />
              <PokemonPreview number={2} pokemonData={pokemonData2} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-row justify-stretch">
        <PokemonCard number={1} cardData={pokemonCardData} />
        <PokemonCard number={2} cardData={pokemonCardData2} />
      </div>
    </div>
  );
}

export default App;
