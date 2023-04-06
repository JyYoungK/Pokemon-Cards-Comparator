import React from "react";
import { PokemonDataType } from "../assets/data/generation";

type ComparePokemonProps = {
  pokemonNumber: string;
  handleGenerationChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  generation: string;
  generations: number[];
  handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  type: string;
  types: string[];
  filteredPokemon: PokemonDataType[];
  selectedPokemon: string;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
};

function comparePokemon({
  pokemonNumber,
  handleGenerationChange,
  generation,
  generations,
  handleTypeChange,
  type,
  types,
  filteredPokemon,
  selectedPokemon,
  setSelectedPokemon,
}: ComparePokemonProps) {
  return (
    <div
      className={`flex w-full flex-col text-center ${
        pokemonNumber === "1" ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      <div className="text-2xl font-bold">Pokemon {pokemonNumber}</div>
      <div>
        <div className="text-lg font-semibold">
          Selected Pokemon: {selectedPokemon}
        </div>
        <div className="flex flex-col justify-center text-center md:flex-row md:space-x-8">
          <div>
            <h1 className="">Generation</h1>
            <select onChange={handleGenerationChange} value={generation}>
              {generations.map((gen) => (
                <option key={gen} value={gen}>
                  Generation {gen}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Type</h1>
            <select onChange={handleTypeChange} value={type}>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h1>Name</h1>
            <select
              value={selectedPokemon}
              onChange={(event) => setSelectedPokemon(event.target.value)}
            >
              {filteredPokemon.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <div>
              <div className="text-lg font-semibold"> Search by Name</div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className="w-1/2"
                />
                {showResults && (
                  <ul className="absolute left-[25%] z-10 w-1/2 bg-black text-white">
                    {searchResults.slice(0, 5).map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div> */}
    </div>
  );
}

export default comparePokemon;
