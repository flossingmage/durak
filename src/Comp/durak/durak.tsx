import React from "react";
import "./durak.css";
import cardBack from "../cards/back.png";

const Durak = () => {
  type card = { suit: string; value: number; img: string };
  type person = { cards: card[]; name: string };
  const suits = ["spades", "diamonds", "hearts", "clubs"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const images: string[] = [];

  suits.forEach((suit) => {
    values.forEach((rank) => {
      switch (rank) {
        case 11:
          images.push(require(`../cards/${suit}_J.png`));
          break;
        case 12:
          images.push(require(`../cards/${suit}_Q.png`));
          break;
        case 13:
          images.push(require(`../cards/${suit}_K.png`));
          break;
        case 14:
          images.push(require(`../cards/${suit}_A.png`));
          break;
        default:
          images.push(require(`../cards/${suit}_${rank}.png`));
          break;
      }
    });
  });

  const deck: card[] = [];
  let cardsInPlay: card[] = [];
  let defend: card[] = [];
  let attack: card[] = [];
  const player: person = { cards: [], name: "Kevin" };
  let attacker = false;

  let i = 0;
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value, img: images[i] });
      ++i;
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  // this function draws a card from the deck
  const drawCard = () => {
    const drawnCard = deck[0];
    deck.splice(0, 1);
    console.log("click");
    return drawnCard;
  };
  const trump = drawCard();

  while (player.cards.length < 6) {
    player.cards.push(drawCard());
  }
  const refreshHand = () => {
    for (let i = 0; i < 6; i++) {
      if (player.cards[i] === undefined) {
        document.getElementById(i.toString()).src = undefined;
      } else {
        document.getElementById(i.toString()).src = player.cards[i].img;
      }
    }
  };

  const playCard = (e, cardPlayed: card) => {
    if (attacker === true) {
      try {
        cardsInPlay.push(cardPlayed);
        attack.push(cardPlayed);
        document.getElementById(`a${attack.length - 1}`).src =
          attack[attack.length - 1].img;
        player.cards.splice(player.cards.indexOf(cardPlayed), 1);
        e.target.src = undefined;
        refreshHand();
      } catch (error) {
        console.log(error);
      }
    } else {
      attack.every((card, index) => {
        console.log(defend[attack.indexOf(card)]);
        console.log(attack.indexOf(card));
        if (
          ((cardPlayed.value > card.value && cardPlayed.suit === card.suit) ||
            (cardPlayed.suit === trump.suit && card.suit !== trump.suit)) &&
          defend[attack.indexOf(card)] === undefined
        ) {
          cardsInPlay.push(cardPlayed);
          defend.splice(attack.indexOf(card), 1, cardPlayed);
          document.getElementById(`d${index}`).src = cardPlayed.img;
          player.cards.splice(player.cards.indexOf(cardPlayed), 1);
          e.target.src = undefined;
          refreshHand();
          console.log(
            `${cardPlayed.value} ${card.value} ${cardPlayed.suit} ${card.suit}`
          );
          return false;
        }
        return true;
      });
    }
  };

  const refreshCards = () => {
    for (let i = 0; i < 6; i++) {
      attack = [];
      cardsInPlay = [];
      defend = [];
      document.getElementById(`a${i}`).src = undefined;
      document.getElementById(`d${i}`).src = undefined;
      if (player.cards[i] === undefined) {
        if (deck.length > 0) {
          player.cards.splice(i, 1, drawCard());
          document.getElementById(i.toString()).src = player.cards[i].img;
        }
      }
    }
  };
  const attackButten = () => {
    try {
      if (attack.length < 6) {
        const temp = drawCard();
        attack.push(temp);
        document.getElementById(`a${attack.length - 1}`).src = temp.img;
        cardsInPlay.push(temp);
      }
    } catch (error) {
      document.getElementById("butten").innerHTML = "outOfCards";
    }
  };

  console.log(player.cards);
  return (
    <div className="container">
      <h1>help</h1>
      <div className="board">
        <button className="attack" onClick={() => attackButten()} id="butten">
          attack
        </button>
        <img src={trump.img} alt="" className="trump" />
        <img
          className="deck"
          src={cardBack}
          alt=""
          onClick={() => refreshCards()}
        />
        <div className="attack">
          <img className="card" src={attack[0]?.img} alt="" id="a0" />
          <img className="card" src={attack[1]?.img} alt="" id="a1" />
          <img className="card" src={attack[2]?.img} alt="" id="a2" />
          <img className="card" src={attack[3]?.img} alt="" id="a3" />
          <img className="card" src={attack[4]?.img} alt="" id="a4" />
          <img className="card" src={attack[5]?.img} alt="" id="a5" />
        </div>
        <div className="defend">
          <img className="card" src={defend[0]?.img} alt="" id="d0" />
          <img className="card" src={defend[1]?.img} alt="" id="d1" />
          <img className="card" src={defend[2]?.img} alt="" id="d2" />
          <img className="card" src={defend[3]?.img} alt="" id="d3" />
          <img className="card" src={defend[4]?.img} alt="" id="d4" />
          <img className="card" src={defend[5]?.img} alt="" id="d5" />
        </div>
      </div>
      <div className="Hand">
        <img
          className="card"
          src={player.cards[0].img}
          alt=""
          id="0"
          onClick={(e) => playCard(e, player.cards[0])}
        />
        <img
          className="card"
          src={player.cards[1].img}
          alt=""
          id="1"
          onClick={(e) => playCard(e, player.cards[1])}
        />
        <img
          className="card"
          src={player.cards[2].img}
          alt=""
          id="2"
          onClick={(e) => playCard(e, player.cards[2])}
        />
        <img
          className="card"
          src={player.cards[3].img}
          alt=""
          id="3"
          onClick={(e) => playCard(e, player.cards[3])}
        />
        <  
          className="card"
          src={player.cards[4].img}
          alt=""
          id="4"
          onClick={(e) => playCard(e, player.cards[4])}
        />
        <img
          className="card"
          src={player.cards[5].img}
          alt=""
          id="5"
          onClick={(e) => playCard(e, player.cards[5])}
        />
      </div>
    </div>
  );
};

export default Durak;
