import { useState } from "react";
import "./App.css";

function App() {
    const [array, setArray] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);
    const classes = Array(9).fill("button ");
    let isWon = false;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    function Cell({ elementId }) {
        return (
            <div
                className={classes[elementId] + `b${elementId + 1}`}
                onClick={() => clickHandler(elementId)}
            >
                <span className="button-text">{array[elementId]}</span>
            </div>
        );
    }
    function isPlayerWon() {
        for (const combo of winningCombos) {
            let [a, b, c] = combo;
            if (array[a] && array[a] == array[b] && array[a] == array[c]) {
                isWon = true;
                combo.map((boxId) => {
                    classes[boxId] = "winning-button button ";
                });
                return true;
            }
        }
        return false;
    }
    function isDraw() {
        console.log(array);
        for (const box of array) {
            if (box == null) {
                return false;
            }
        }
        return true;
    }
    function clickHandler(id) {
        let condition = !isWon && !array[id];
        if (condition) {
            setArray((prevArray) =>
                prevArray.map((value, valueId) =>
                    valueId === id && !value ? (isX ? "X" : "O") : value
                )
            );
            setIsX((prevIsX) => !prevIsX);
        }
    }
    function restartGame() {
        setArray(Array(9).fill(null));
        setIsX(true);
        isWon = false;
    }
    return (
        <div className="app">
            <h1 className="title">Tic Tac Toe</h1>
            <h3 className="game-text">
                {!isPlayerWon()
                    ? isDraw()
                        ? "Draw"
                        : `Player ${isX ? "1" : "2"}'s Turn`
                    : `Player ${!isX ? 1 : 2} Won`}
            </h3>
            <div className="board">
                <div className="row">
                    <Cell elementId={0} />
                    <Cell elementId={1} />
                    <Cell elementId={2} />
                </div>
                <div className="row">
                    <Cell elementId={3} />
                    <Cell elementId={4} />
                    <Cell elementId={5} />
                </div>
                <div className="row">
                    <Cell elementId={6} />
                    <Cell elementId={7} />
                    <Cell elementId={8} />
                </div>
            </div>
            <div>
                <div className="reset-button" onClick={restartGame}>
                    Restart
                </div>
            </div>
        </div>
    );
}

export default App;
