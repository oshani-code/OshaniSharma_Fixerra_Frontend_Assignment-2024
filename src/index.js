import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import scissors from "./images/scissors.png";
import paper from "./images/paper.png";
import rock from "./images/rock.png";

const Player = ({ weapon, playerName }) => (
  <div className="player-main-container">
    <h2>{playerName}</h2>
    <div className="player">
      <img
        className="player-image"
        src={
          weapon === "rock"
            ? rock
            : weapon === "scissors"
            ? scissors
            : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </div>
);

const PlayerTwo = ({ weapon, playerName }) => (
  <div className="player-main-container">
    <h2>{playerName}</h2>
    <div className="player">
      <img
        className="player-image2"
        src={
          weapon === "rock"
            ? rock
            : weapon === "scissors"
            ? scissors
            : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </div>
);

const weapons = ["rock", "paper", "scissors"];

const App = () => {
  const [playerOne, setPlayerOne] = useState(weapons[0]);
  const [playerTwo, setPlayerTwo] = useState(weapons[0]);
  const [winner, setWinner] = useState("");
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [overallWinner, setOverallWinner] = useState(null);
  const [round, setRound] = useState(0);
  const [playerOneName, setPlayerOneName] = useState("Player One");
  const [playerTwoName, setPlayerTwoName] = useState("Player Two");
  const [totalRounds, setTotalRounds] = useState(5);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "totalRounds") {
      setRound(0);
      setPlayerOneScore(0);
      setPlayerTwoScore(0);
      setOverallWinner(null);
    }
    if (name === "playerOneName") {
      setPlayerOneName(value);
    }
    if (name === "playerTwoName") {
      setPlayerTwoName(value);
    }
    if (name === "totalRounds") {
      setTotalRounds(value);
    }
  };

  const startGame = () => {
    if (round === parseInt(totalRounds)) {
      resetGame();
      return;
    }

    let counter = 0;
    let gameInterval = setInterval(() => {
      counter++;
      setPlayerTwo(weapons[Math.floor(Math.random() * weapons.length)]);
      setWinner("");
      if (counter > 5) {
        clearInterval(gameInterval);
        let overallWinner = null;
        if (playerOneScore > 2) {
          overallWinner = playerOneName;
          updateLeaderboard(playerOneName, playerOneScore);
        } else if (playerTwoScore > 2) {
          overallWinner = playerTwoName;
          updateLeaderboard(playerTwoName, playerTwoScore);
        }
        setWinner(selectWinner());
        setOverallWinner(overallWinner);
        setRound((prevRound) => prevRound + 1);
      }
    }, 100);
  };

  const selectWinner = () => {
    let winner = "";

    if (playerOne === playerTwo) {
      winner = "It's a Tie Try Again!";
    } else if (
      (playerOne === "rock" && playerTwo === "scissors") ||
      (playerOne === "scissors" && playerTwo === "paper") ||
      (playerOne === "paper" && playerTwo === "rock")
    ) {
      winner = playerOneName;
      setPlayerOneScore((prevScore) => prevScore + 1);
    } else {
      winner = playerTwoName;
      setPlayerTwoScore((prevScore) => prevScore + 1);
    }

    return winner;
  };

  const resetGame = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setOverallWinner(null);
    setRound(0);
  };

  const updateLeaderboard = (name, score) => {
    const updatedLeaderboard = [...leaderboard, { name, score }];
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    setLeaderboard(updatedLeaderboard);
  };

  const clearLeaderboard = () => {
    localStorage.removeItem("leaderboard");
    setLeaderboard([]);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Enter Player One Name"
          name="playerOneName"
          value={playerOneName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Player Two Name"
          name="playerTwoName"
          value={playerTwoName}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter Total Rounds"
          name="totalRounds"
          value={totalRounds}
          onChange={handleChange}
        />
        <h1>
          {playerOneName} Score: {playerOneScore}
        </h1>
        <h1>
          {playerTwoName} Score: {playerTwoScore}
        </h1>
        <h2>
          Round: {round}/{totalRounds}
        </h2>
        <div className="player-container">
          <Player weapon={playerOne} playerName={playerOneName} />
          <PlayerTwo weapon={playerTwo} playerName={playerTwoName} />
        </div>
        <div className="button-container">
          <button className="weaponBtn" onClick={() => setPlayerOne("rock")}>
            rock
          </button>
          <button className="weaponBtn" onClick={() => setPlayerOne("paper")}>
            paper
          </button>
          <button
            className="weaponBtn"
            onClick={() => setPlayerOne("scissors")}
          >
            scissors
          </button>
        </div>
        <div className="winner">
          {winner ? `${winner} wins!` : null}
          {overallWinner ? `Overall winner: ${overallWinner}` : null}
        </div>
        <h3>Leaderboard</h3>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.name}: {entry.score}
            </li>
          ))}
        </ul>
        <button type="button" onClick={startGame}>
          {round === parseInt(totalRounds) ? "Reset Game" : "Start Game"}
        </button>
        <button type="button" onClick={clearLeaderboard}>
          Clear Leaderboard
        </button>
      </div>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
