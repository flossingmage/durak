import React from "react";
import "./durak.css";
import  C2 from "../cards/clubs_2.png";
import  C3 from "../cards/clubs_3.png";
import  C4 from "../cards/clubs_4.png";
import  C5 from "../cards/clubs_5.png";
import  C6 from "../cards/clubs_6.png";
import  C7 from "../cards/clubs_7.png";
import  C8 from "../cards/clubs_8.png";
import  C9 from "../cards/clubs_9.png";
import  C10 from "../cards/clubs_10.png";
import  CJ from "../cards/clubs_J.png";
import  CQ from "../cards/clubs_Q.png";
import  CK from "../cards/clubs_K.png";
import  CA from "../cards/clubs_A.png";
import  D2 from "../cards/diamonds_2.png";
import  D3 from "../cards/diamonds_3.png";
import  D4 from "../cards/diamonds_4.png";
import  D5 from "../cards/diamonds_5.png";
import  D6 from "../cards/diamonds_6.png";
import  D7 from "../cards/diamonds_7.png";
import  D8 from "../cards/diamonds_8.png";
import  D9 from "../cards/diamonds_9.png";
import  D10 from "../cards/diamonds_10.png";
import  DJ from "../cards/diamonds_J.png";
import  DQ from "../cards/diamonds_Q.png";
import  DK from "../cards/diamonds_K.png";
import  DA from "../cards/diamonds_A.png";
import  H2 from "../cards/hearts_2.png";
import  H3 from "../cards/hearts_3.png";
import  H4 from "../cards/hearts_4.png";
import  H5 from "../cards/hearts_5.png";
import  H6 from "../cards/hearts_6.png";
import  H7 from "../cards/hearts_7.png";
import  H8 from "../cards/hearts_8.png";
import  H9 from "../cards/hearts_9.png";
import  H10 from "../cards/hearts_10.png";
import  HJ from "../cards/hearts_J.png";
import  HQ from "../cards/hearts_Q.png";
import  HK from "../cards/hearts_K.png";
import  HA from "../cards/hearts_A.png";
import  S2 from "../cards/spades_2.png";
import  S3 from "../cards/spades_3.png";
import  S4 from "../cards/spades_4.png";
import  S5 from "../cards/spades_5.png";
import  S6 from "../cards/spades_6.png";
import  S7 from "../cards/spades_7.png";
import  S8 from "../cards/spades_8.png";
import  S9 from "../cards/spades_9.png";
import  S10 from "../cards/spades_10.png";
import  SJ from "../cards/spades_J.png";
import  SQ from "../cards/spades_Q.png";
import  SK from "../cards/spades_K.png";
import  SA from "../cards/spades_A.png";




const Durak = () => {
    type card = { suit: string; value: string; img: string}
    type person = { cards: card[]; name: string}
    const suits = ['spades', 'diamonds', 'hearts', 'clubs']
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
    const images = [S2, S3, S4, S5, S6, S7, S8, S9, S10, SJ, SQ, SK, SA, D2, D3, D4, D5, D6, D7, D8, D9, D10, DJ, DQ, DK, DA, H2, H3, H4, H5, H6, H7, H8, H9, H10, HJ, HQ, HK, HA, C2, C3, C4, C5, C6, C7, C8, C9, C10, CJ, CQ, CK, CA]
    const deck: card[] = []
    const attack: card[] = []
    const defend: card[] = []
    const cardsInPlay: card[] = []
    let i = 0
    for (const suit of suits) {
        for (const value of values) {
        deck.push({ suit, value, img: images[i]})
        ++i;
        }
    }
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }

    // this function draws a card from the deck
    const drawCard = () => {
        const drawnCard = deck[0]
        deck.splice(0, 1)
        return drawnCard
    }
    
    const player: person = { cards: [], name: 'Kevin'}

    while (player.cards.length < 6) {
        player.cards.push(drawCard())
    }
    
    return (
        <div className='container'>
            <h1>help</h1>
            <div className="board">
            </div>
            <div className="Hand">
            <img className="card" src={player.cards[0].img} alt="" id="0" />
            <img className="card" src={player.cards[1].img} alt="" id="1" />
            <img className="card" src={player.cards[2].img} alt="" id="2" />
            <img className="card" src={player.cards[3].img} alt="" id="3" />
            <img className="card" src={player.cards[4].img} alt="" id="4" />
            <img className="card" src={player.cards[5].img} alt="" id="5" />
         </div>
        </div>
    );
    }

export default Durak;