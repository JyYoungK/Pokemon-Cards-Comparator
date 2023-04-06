import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type ComparePokemonProps = {
  number: number;
  pokemonData: any;
};

type PokemonCardProps = {
  pokemonData: any;
  pokemonData2: any;
  cardData: any;
  cardData2: any;
};

export function PokemonPreview({ number, pokemonData }: ComparePokemonProps) {
  return (
    <img
      src={pokemonData?.sprites?.other["official-artwork"].front_default}
      alt="Pokemon Preview"
      className={`h-0 w-0 lg:h-24 lg:w-24 ${number === 1 ? "mr-6" : "ml-6"}`}
    />
  );
}

export function PokemonCard({
  pokemonData,
  pokemonData2,
  cardData,
  cardData2,
}: PokemonCardProps) {
  const [selectedCard, setSelectedCard] = useState(1);
  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };
  const [selectedCard2, setSelectedCard2] = useState(1);
  const handleCardClick2 = (index: number) => {
    setSelectedCard2(index);
  };

  const summaryData1 = {
    name: cardData.data[selectedCard].name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    hp: parseInt(cardData.data[selectedCard].hp.replace(/\D/g, "")),
    attack1: parseInt(
      cardData.data[selectedCard].attacks[0].damage.replace(/\D/g, "")
    ),
    attack2:
      cardData.data[selectedCard].attacks.length > 1
        ? parseInt(
            cardData.data[selectedCard].attacks[1].damage.replace(/\D/g, "")
          )
        : 0,
    resistance: cardData.data[selectedCard]?.resistances?.length
      ? parseInt(
          cardData.data[selectedCard].resistances[0].value.replace(/\D/g, "")
        )
      : 0,
    image: cardData.data[selectedCard].images.large,
  };

  const summaryData2 = {
    name: cardData2.data[selectedCard2].name,
    height: pokemonData2.height,
    weight: pokemonData2.weight,
    hp: parseInt(cardData2.data[selectedCard2].hp.replace(/\D/g, "")),
    attack1: parseInt(
      cardData2.data[selectedCard2].attacks[0].damage.replace(/\D/g, "")
    ),
    attack2:
      cardData2.data[selectedCard2].attacks.length > 1
        ? parseInt(
            cardData2.data[selectedCard2].attacks[1].damage.replace(/\D/g, "")
          )
        : 0,
    resistance: cardData2.data[selectedCard2]?.resistances?.length
      ? parseInt(
          cardData2.data[selectedCard2].resistances[0].value.replace(/\D/g, "")
        )
      : 0,
    image: cardData2.data[selectedCard2].images.large,
  };

  let configObj = {
    chart: {
      type: "bar",
    },
    title: {
      text: `${summaryData1.name} vs ${summaryData2.name}`,
    },
    xAxis: {
      categories: [
        "HP",
        "Attack1",
        "Attack2",
        "Resistance",
        "Height",
        "Weight",
      ],
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      bar: {
        showInLegend: true,
      },
      series: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: summaryData2.name,
        data: [
          summaryData2.hp,
          summaryData2.attack1,
          summaryData2.attack2,
          summaryData2.resistance,
          summaryData2.height,
          summaryData2.weight,
        ],
        color: "rgb(96 165 250)", // blue color
      },
      {
        name: summaryData1.name,
        data: [
          summaryData1.hp,
          summaryData1.attack1,
          summaryData1.attack2,
          summaryData1.resistance,
          summaryData1.height,
          summaryData1.weight,
        ],
        color: "rgb(248 113 113)", // red color
      },
    ],
  };

  return (
    <div className={`flex h-full w-full flex-col  `}>
      <div className="flex h-full w-full flex-col">
        <div className={`flex h-3/4 w-full flex-row justify-evenly`}>
          <div className="card h-full w-1/4">
            <img
              src={cardData.data[selectedCard].images.small}
              className="h-full"
              alt="Selected card"
            />
          </div>
          <HighchartsReact highcharts={Highcharts} options={configObj} />
          <div className="card h-full w-1/4">
            <img
              src={cardData2.data[selectedCard2].images.small}
              className="h-full"
              alt="Selected card"
            />
          </div>
        </div>
        <div className="grid h-1/4 w-full grid-cols-2">
          <ul className="grid h-full w-full grid-cols-5 border-2 border-white text-2xl text-white">
            {cardData.data.slice(0, 15).map((card: any, index: number) => (
              <li key={index}>
                <button
                  className={`h-full w-full border-2 border-white bg-red-400 hover:bg-red-500 ${
                    selectedCard === index ? "bg-red-500" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
          <ul className="grid h-full w-full grid-cols-5 border-2 border-white text-2xl text-white">
            {cardData2.data.slice(0, 15).map((card: any, index: number) => (
              <li key={index}>
                <button
                  className={`h-full w-full border-2 border-white bg-blue-400 hover:bg-blue-500 ${
                    selectedCard2 === index ? "bg-blue-500" : ""
                  }`}
                  onClick={() => handleCardClick2(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
