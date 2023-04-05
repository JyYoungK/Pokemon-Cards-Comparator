import React from "react";

type ComparePokemonProps = {
  number: number;
  pokemonData: any;
};

function pokemonData({ number, pokemonData }: ComparePokemonProps) {
  console.log(pokemonData);
  return (
    <div className="">
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <img
        src={pokemonData.sprites.other["official-artwork"].front_default}
        alt="Pokemon"
        className={`border-4 border-black ${
          number === 1 ? "scale-x-[-1] bg-red-400" : "bg-blue-400"
        }`}
      />
    </div>
  );
}

export default pokemonData;
