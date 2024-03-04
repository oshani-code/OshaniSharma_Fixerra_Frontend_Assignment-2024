import React from "react";
import scissors from "./images/scissors.png";
import paper from "./images/paper.png";
import rock from "./images/rock.png";

export const Player = ({ weapon, playerName }) => (
  <div className="player-main-container">
    <h2>{playerName}</h2>
    <div className="player">
      <img
        className="player-image"
        src={
          weapon === "rock" ? rock : weapon === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </div>
);

export const PlayerTwo = ({ weapon, playerName }) => (
  <div className="player-main-container">
    <h2>{playerName}</h2>
    <div className="player">
      <img
        className="player-image2"
        src={
          weapon === "rock" ? rock : weapon === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </div>
);
