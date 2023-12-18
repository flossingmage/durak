import React from "react";
import "./durak.css";
import cardBack from "../cards/back.png";

const Durak = () => {
  type card = { suit: string; value: number; img: string };
  const suits = ["spades", "diamonds", "hearts", "clubs"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const deck: card[] = [];
  const emptyCard: card = {suit: "temp", value: 0, img: ""};
  let attack: card[] = [];
  let defend: card[] = [];
  let handarr: card[] = [];
  let cardsInPlay: card[] = [];
  let clickedCard: {card: card, id: string} = {card: {suit: "", value: 0, img: ""}, id: ""};

  
 suits.forEach((suit) => {
  values.forEach((rank) => {
    switch (rank) {
      case 11:
        deck.push({ suit: suit, value: rank, img: require(`../cards/${suit}_J.png`)});
        break;
      case 12:
        deck.push({ suit: suit, value: rank, img: require(`../cards/${suit}_Q.png`)});
        break;
      case 13:
        deck.push({ suit: suit, value: rank, img: require(`../cards/${suit}_K.png`)});
        break;
      case 14:
        deck.push({ suit: suit, value: rank, img: require(`../cards/${suit}_A.png`)});
        break;
      default:
        deck.push({ suit: suit, value: rank, img: require(`../cards/${suit}_${rank}.png`)});
        break;
    }
  });
});

for (let i = deck.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * i);
  const temp = deck[i];
  deck[i] = deck[j];
  deck[j] = temp;
}

console.log(deck);

const trump = deck[51].suit;

const hand = document.createElement("div");
hand.className = "hand";
document.body.append(hand);

const attackDiv = document.createElement("div");
attackDiv.className = "attack";
document.body.append(attackDiv);

const defendDiv = document.createElement("div");
defendDiv.className = "defend";
document.body.append(defendDiv);


function attackButten() {
  try{
  if (attack.length < 6) {
  const x = document.createElement("IMG");
  x.setAttribute("src", deck[0].img);
  attack.push(deck[0]);
  deck.splice(0, 1);
  x.setAttribute("id", attack.length.toString());
  x.setAttribute("class", "card");
  x.addEventListener("click", (e) => makeAttack(e,attack[Number(x.id)-1]));
  attackDiv.append(x);
  }
} catch (err) {
  ifError();
}
}

// make the card not make the id be the position in the array
function cardToHand() {
  try{

  if (handarr.length < 6) {
  const x = document.createElement("IMG");
  handarr.push(deck[0]);
  x.setAttribute("id", handarr.length.toString());
  x.setAttribute("src", handarr[Number(x.id)-1].img);
  deck.splice(0, 1);
  x.setAttribute("class", "card");
  x.addEventListener("click", () => clickedCard = {card: handarr[Number(x.id)-1], id: x.id} );
  hand.append(x);
  }
  } catch (err) {
    ifError();
  }
}

function refresh() {
attackDiv.innerHTML = "";
defendDiv.innerHTML = "";
attack = [];
defend = [];
cardsInPlay = [];
}

function makeAttack(e,card) {
  console.log(clickedCard);
  console.log(card);
  if ((clickedCard.card.value > card.value && clickedCard.card.suit === card.suit) || (card.suit !== trump && clickedCard.card.suit === trump)) {
    defend.push(card);
    const x = document.createElement("IMG");
    x.setAttribute("src", clickedCard.card.img);
    x.setAttribute("class", "card");
    defendDiv.append(x);
    cardsInPlay.push(clickedCard.card);
    handarr.splice(Number(clickedCard.id)-1, 1, emptyCard);
    document.getElementById(clickedCard.id).remove();
    

  }
}

function printHand(){
    console.log(handarr);
}

function ifError() {
try{
  document.getElementById("trump").remove();
  document.getElementById("deck").remove();
  document.getElementById("cth").innerHTML = "no more cards";
  document.getElementById("ab").innerHTML = "no more cards";
}catch (err) {}
}

  return (
  <div className="body">
    <button onClick={attackButten} id ="ab">attack butten</button>
    <button onClick={cardToHand} id = "cth">take card</button>
    <button onClick={printHand} id = "ph">print hand</button>
    <img className="trump" id="trump" src={deck[51].img} alt=""></img>
    <img className="deck" id="deck" src={cardBack} alt="" onClick={refresh}></img>
  </div>
  );
};

export default Durak;