import { Box, rem } from '@mantine/core';
import { HeartBreak, Skull, Clock, GameController } from '@phosphor-icons/react';
import GameOverBase from './GameOverBase';

interface ClassicGameOverProps {
	percentRemaining: number;
}

export default function ClassicGameOver({ percentRemaining }: ClassicGameOverProps) {

	// Background effect
	const backgroundEffect = (
		<>
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `
            linear-gradient(0deg, 
            rgba(0,0,0,0.9) 0%, 
            rgba(50,0,0,0.4) 50%,
            rgba(0,0,0,0.9) 100%)
          `,
					zIndex: 0,
				}}
			/>

			{/* CRT effect overlay */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 2,
					pointerEvents: 'none',
					background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.4) 100%)',
					opacity: 0.5,
				}}
			/>
		</>
	);

	return (
		<GameOverBase
			percentRemaining={percentRemaining}
			themeType='classic'
			heartIcon={HeartBreak}
			warningIcon={Skull}
			gameIcon={GameController}
			statusIcon={Clock}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				padding: 'var(--mantine-spacing-xl)',
				borderRadius: 'var(--mantine-radius-md)',
				backgroundColor: 'var(--mantine-color-dark-9)',
				border: `${rem(2)} solid var(--mantine-color-dark-7)`,
				position: 'relative',
				overflow: 'hidden',
				height: '100%',
			}}
		/>
	);
}
