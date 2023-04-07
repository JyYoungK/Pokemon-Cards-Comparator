import { useState, useEffect } from "react";
import "./App.css";
import {
  generationI,
  generationII,
  generationIII,
  generationIV,
  generationV,
  generationVI,
  generationVII,
} from "./assets/data/generation";
import ComparePokemon from "./component/comparePokemon";
import { fetchPokemon, fetchPokemonCard } from "./component/pokemonAPI";
import { PokemonPreview, PokemonCard } from "./component/pokemonData";
import loading from "./assets/loading.gif";
import { PokemonDataType } from "./types";

function App() {
  // List of generations
  // const generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const generations = [1, 2, 3, 4, 5, 6, 7];

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

  const [showCard, setShowCard] = useState(false);
  // // <------------------------------------ Find ------------------------------------ >

  // // Pokemon1 generation and type
  const [generation, setGeneration] = useState<string>("1");
  const [type, setType] = useState<string>("Normal");
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDataType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState("Pidgey");
  const [pokemonData, setPokemonData] = useState<Object>({});
  const [pokemonBaseData, setPokemonBaseData] = useState<Object>({});
  const [pokemonCardData, setPokemonCardData] = useState<Object>({
    // name: "",
    // height: 0,
    // weight: 0,
    // hp: 0,
    // attack1: 0,
    // attack2: 0,
    // resistance: 0,
    // image: "",
  });
  const [loadingCard, setLoadingCard] = useState(false);

  // Pokemon2 generation and type
  const [generation2, setGeneration2] = useState<string>("1");
  const [type2, setType2] = useState<string>("Normal");
  const [filteredPokemon2, setFilteredPokemon2] = useState<PokemonDataType[]>(
    []
  );
  const [selectedPokemon2, setSelectedPokemon2] = useState("Pidgey");
  const [pokemonData2, setPokemonData2] = useState<Object>({});
  const [pokemonBaseData2, setPokemonBaseData2] = useState<Object>({});
  const [pokemonCardData2, setPokemonCardData2] = useState<Object>({
    // name: "",
    // height: 0,
    // weight: 0,
    // hp: 0,
    // attack1: 0,
    // attack2: 0,
    // resistance: 0,
    // image: "",
  });
  const [loadingCard2, setLoadingCard2] = useState(false);

  useEffect(() => {
    comparePokemon(1);
    comparePokemon(2);
  }, []);

  useEffect(() => {
    comparePokemon(1);
  }, [generation, type, selectedPokemon]);

  useEffect(() => {
    comparePokemon(2);
  }, [generation2, type2, selectedPokemon2]);

  useEffect(() => {
    setPokemonBaseData(filterPokemon(generation, type)[0]);
    setPokemonBaseData2(filterPokemon(generation, type)[0]);
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
    const selectedGen = event.target.value;
    setGeneration(selectedGen);
    setSelectedPokemon(filterPokemon(selectedGen, type)[0].name.english);
    setPokemonBaseData(filterPokemon(selectedGen, type)[0]);
    comparePokemon(1);
  };

  // Handler function for when the generation dropdown is changed
  const handleGenerationChange2 = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGen = event.target.value;
    setGeneration2(selectedGen);
    setSelectedPokemon2(filterPokemon(selectedGen, type2)[0].name.english);
    setPokemonBaseData2(filterPokemon(selectedGen, type2)[0]);
    comparePokemon(2);
  };

  // Handler function for when the type dropdown is changed
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType(selectedType);
    setSelectedPokemon(filterPokemon(generation, selectedType)[0].name.english);
    setPokemonBaseData(filterPokemon(generation, selectedType)[0]);
    comparePokemon(1);
  };

  const handleTypeChange2 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setType2(selectedType);
    setSelectedPokemon2(
      filterPokemon(generation2, selectedType)[0].name.english
    );
    setPokemonBaseData2(filterPokemon(generation2, selectedType)[0]);
    comparePokemon(2);
  };

  const filterPokemon = (gen: string, t: string): PokemonDataType[] => {
    const pokemonList = getGenerationList(gen);
    const filteredList = pokemonList.filter((p) =>
      (p.type as Array<string>).includes(t)
    );
    return filteredList || [];
  };

  const getGenerationList = (gen: string): PokemonDataType[] => {
    switch (gen) {
      case "1":
        return generationI;
      case "2":
        return generationII;
      case "3":
        return generationIII;
      case "4":
        return generationIV;
      case "5":
        return generationV;
      case "6":
        return generationVI;
      case "7":
        return generationVII;
      default:
        return [];
    }
  };

  async function comparePokemon(num: number) {
    if (num === 1) {
      setLoadingCard(true);
      try {
        const [fetchPokemonData, fetchPokemonCardData] = await Promise.all([
          fetchPokemon(selectedPokemon.toLocaleLowerCase()),
          fetchPokemonCard(selectedPokemon.toLocaleLowerCase()),
        ]);
        setPokemonData(fetchPokemonData);
        setPokemonCardData(fetchPokemonCardData);
        setLoadingCard(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setLoadingCard2(true);
      try {
        const [fetchPokemonData, fetchPokemonCardData] = await Promise.all([
          fetchPokemon(selectedPokemon2.toLocaleLowerCase()),
          fetchPokemonCard(selectedPokemon2.toLocaleLowerCase()),
        ]);
        setShowCard(true);
        setPokemonData2(fetchPokemonData);
        setPokemonCardData2(fetchPokemonCardData);
        setLoadingCard2(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

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
            setPokemonBaseData={setPokemonBaseData}
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
            setPokemonBaseData={setPokemonBaseData2}
          />
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform sm:block">
            <div className="flex flex-row">
              <PokemonPreview number={1} pokemonData={pokemonData} />
              <PokemonPreview number={2} pokemonData={pokemonData2} />
            </div>
          </div>
        </div>
      </div>
      {showCard ? (
        <div className="flex h-full w-full flex-row justify-stretch">
          <PokemonCard
            pokemonData={pokemonData}
            pokemonData2={pokemonData2}
            cardData={pokemonCardData}
            cardData2={pokemonCardData2}
            pokemonBaseData={pokemonBaseData}
            pokemonBaseData2={pokemonBaseData2}
            loadingCard={loadingCard}
            loadingCard2={loadingCard2}
          />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default App;
