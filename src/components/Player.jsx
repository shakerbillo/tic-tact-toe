import React, { useState } from 'react';

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
	const [playerName, setPlayerName] = useState(initialName);
	const [isEditing, setIsEditing] = useState(false);

	const handleEdit = () => {
		setIsEditing((editing) => !editing);

		if (isEditing) {
			onChangeName(symbol, playerName);
		}
	};

	const handleChange = (e) => {
		setPlayerName(e.target.value);
	};
	return (
		<>
			<li className={isActive ? 'active' : undefined}>
				<span className="player">
					{isEditing ? (
						<input
							type="text"
							required
							value={playerName}
							onChange={handleChange}
						/>
					) : (
						<span className="player-name">{playerName}</span>
					)}
					<span className="player-symbol">{symbol}</span>
					<button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
				</span>
			</li>
		</>
	);
};

export default Player;
