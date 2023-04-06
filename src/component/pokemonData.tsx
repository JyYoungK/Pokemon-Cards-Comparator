import { useState } from "react";

type ComparePokemonProps = {
  number: number;
  pokemonData: any;
};

type PokemonCardProps = {
  number: number;
  cardData: any;
};

export function PokemonPreview({ number, pokemonData }: ComparePokemonProps) {
  return (
    <img
      src={pokemonData?.sprites?.other["official-artwork"].front_default}
      alt="Pokemon Preview"
      className={`h-24 w-24 ${number === 1 ? "mr-6" : "ml-6"}`}
    />
  );
}

export function PokemonCard({ number, cardData }: PokemonCardProps) {
  const { data } = cardData;
  console.log(data);

  const [selectedCard, setSelectedCard] = useState(1);

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <div className={`flex h-full w-full flex-col  `}>
      {/* {number === 1 && (
        <ul className="grid grid-cols-5">
        {data.map((card: any, index: number) => (
            <li key={index}>
            <button onClick={() => handleCardClick(index)}>
            {index + 1}
            </button>
            </li>
            ))}
            </ul>
          )} */}
      {data !== undefined && (
        <div className="flex h-full w-full flex-col">
          <div className={`h-3/4 ${number === 1 ? "text-left" : "ml-auto"} `}>
            {selectedCard !== null && (
              <div className="card h-full">
                <img
                  src={data[selectedCard].images.small}
                  className="h-full"
                  alt="Selected card"
                />
              </div>
            )}
          </div>

          <ul className="grid h-1/4 w-full grid-cols-5 border-2 border-white text-2xl text-white">
            {data.slice(0, 15).map((card: any, index: number) => (
              <li key={index}>
                <button
                  className={`h-full w-full border-2 border-white ${
                    number === 1 ? "bg-red-400" : "bg-blue-400"
                  }         ${
                    selectedCard === index && number === 1
                      ? "bg-red-500"
                      : selectedCard === index && number !== 1
                      ? "bg-blue-500"
                      : ""
                  }
                  ${
                    selectedCard !== index && number === 1
                      ? "hover:bg-red-500"
                      : selectedCard !== index && number !== 1
                      ? "hover:bg-blue-500"
                      : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
