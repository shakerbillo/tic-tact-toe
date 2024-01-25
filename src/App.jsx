import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning_combination.js';
import GameOver from './components/GameOver.jsx';


const PLAYERS = {
	X: 'Player 1',
	O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];



const derivedActivePlayer = (gameTurns) => {
	let currentPlayer = 'X';

	if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
		currentPlayer = 'O';
	}
	return currentPlayer;
};

const derivedGameBoard = (gameTurns) => {
	let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		gameBoard[row][col] = player;
	}
	return gameBoard;
};

const derivedWinner = (gameBoard, players) => {
	let winner;

	for (const combination of WINNING_COMBINATIONS) {
		const firstGameSymbol =
			gameBoard[combination[0].row][combination[0].column];
		const secondGameSymbol =
			gameBoard[combination[1].row][combination[1].column];
		const thirdGameSymbol =
			gameBoard[combination[2].row][combination[2].column];

		if (
			firstGameSymbol &&
			firstGameSymbol === secondGameSymbol &&
			firstGameSymbol === thirdGameSymbol
		) {
			winner = players[firstGameSymbol];
		}
	}
	return winner;
};



const App = () => {
	const [players, setPlayers] = useState(PLAYERS);
	const [gameTurns, setGameTurns] = useState([]);

	const activePlayer = derivedActivePlayer(gameTurns);

	const gameBoard = derivedGameBoard(gameTurns);

	const winner = derivedWinner(gameBoard, players);
	const hasDraw = gameTurns.length === 9 && !winner;

	const handleSelectSquare = (rowIndex, colIndex) => {
		setGameTurns((prevTurns) => {
			const currentPlater = derivedActivePlayer(prevTurns);
			const updatedTurns = [
				{ square: { row: rowIndex, col: colIndex }, player: currentPlater },
				...prevTurns,
			];
			return updatedTurns;
		});
	};

	const handleRematch = () => {
		setGameTurns([]);
	};

	const handlePlayerNameChange = (symbol, newName) => {
		setPlayers((prevPlayers) => {
			return {
				...prevPlayers,
				[symbol]: newName,
			};
		});
	};

	return (
		<>
			<main>
				<div id="game-container">
					<ol id="players" className="highlight-player">
						<Player
							initialName={PLAYERS.X}
							symbol="X"
							isActive={activePlayer === 'X'}
							onChangeName={handlePlayerNameChange}
						/>
						<Player
							initialName={PLAYERS.O}
							symbol="O"
							isActive={activePlayer === 'O'}
							onChangeName={handlePlayerNameChange}
						/>
					</ol>
					{(winner || hasDraw) && (
						<GameOver onRematch={handleRematch} winner={winner} />
					)}
					<GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
				</div>
				<Log turns={gameTurns} />
			</main>
		</>
	);
};

export default App;
