import { useState } from "react";

function Square({value, onclickSquare}) {
  // const [value, setValue] = useState(null)
  
  return <button className="square" onClick={onclickSquare} >{value} </button>;
}
export default function Board() {
 
  const [xisnext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const[tiescore, setTieScore] = useState(0);
  function Handleclick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
  
    const nextSquare = squares.slice();
    if (xisnext) {
      nextSquare[i] = 'X';
    } else {
      nextSquare[i] = 'O';
    }
  
    setSquares(nextSquare);
    setXIsNext(!xisnext);
  }
  
  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    function isDraw() {
      return squares.every(square => square !== null);
  }
    for ( let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      } 
      
    }
      // Check for a draw
      if (isDraw()) {
        return "Draw"; // All squares are filled, but there is no winner, so it's a draw.
    }
      
    return null;
  }

//



const winner = calculateWinner(squares);
let status;
if (winner) {
  if (winner === "Draw") {
    status = "It's a Draw!";
    resetGame();
  
  } else {
    status = "Winner: " + winner;
    resetGame();
    
  
  }
} else {
  status = "Next Player: " + (xisnext ? "X" : "O");
}

function resetGame() {
  // Display a message indicating the reset is about to happen
  console.log("Resetting game in 10 seconds...");

  // Wait for 10 seconds before resetting the game
  setTimeout(() => {
    // Reset the game state
    setSquares(Array(9).fill(null));

    // Update the display or any other necessary steps
    // For example, you might want to clear any status messages or update the UI
    // You can call a function to render the updated game state on the UI.

    // Check the winner and update scores
    if (winner) {
      if (winner === "X") {
        setPlayer1Score(player1Score + 1);
      } else if (winner === "O") {
        setPlayer2Score(player2Score + 1);
      } else  if (winner === "Draw") {
        setTieScore(tiescore + 1)
      }
    }

    // For demonstration purposes, let's log a message
    console.log("Game reset!");
  }, 1000); // 10000 milliseconds = 10 seconds
}
  return  <>
  <div className="app">
    <div className="game-app">
  <div className="status">{status}</div>
   <div className="board-row">
       <Square value={squares[0] } onclickSquare={() => Handleclick(0)} />
       <Square value={squares[1]} onclickSquare={() => Handleclick(1)}/>
       <Square value={squares[2]} onclickSquare={() => Handleclick(2)} />
      </div>
      <div className="board-row">
      <Square value={squares[3]}  onclickSquare={() => Handleclick(3)}/>
       <Square  value={squares[4]} onclickSquare={() => Handleclick(4)}/>
       <Square value={squares[5]} onclickSquare={() => Handleclick(5)}/>     
     </div>
      <div className="board-row">
      <Square value={squares[6]} onclickSquare={() => Handleclick(6)}/>
       <Square value={squares[7]} onclickSquare={() => Handleclick(7)}/>
       <Square value={squares[8]} onclickSquare={() => Handleclick(8)}/>
      </div>
      <div className="scores">
        <div className="player1">Player X
        <div className="num">{player1Score}</div>
        </div>
        <div className="tie">Tie
        <div className="num"></div>{tiescore}</div>
        <div className="player2">Player O
        <div className="num"></div>{player2Score}</div>
      </div>
      </div>
      </div>
  </> ;
}
