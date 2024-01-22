import React, { useState } from 'react';

const Player = ({ name, symbol }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleEdit = () => {
		setIsEditing(true);
	};
	return (
		<>
			<li>
				<span className="player">
					{isEditing ? (
						<input type="text" required />
					) : (
						<span className="player-name">{name}</span>
					)}
					<span className="player-symbol">{symbol}</span>
					<button onClick={handleEdit}>Edit</button>
				</span>
			</li>
		</>
	);
};

export default Player;
