import { Box, rem, Transition, Group, Text } from '@mantine/core';
import { HeartBreak, WarningOctagon, GameController, Skull } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GameOverBase from './GameOverBase';

interface RetroGameOverProps {
	percentRemaining: number;
}

export default function RetroGameOver({ percentRemaining }: RetroGameOverProps) {
	const [scanline, setScanline] = useState(0);
	const [blinking, setBlinking] = useState(false);
	const [flickering, setFlickering] = useState(false);
	const isNearDeath = percentRemaining <= 5;
	const isDying = percentRemaining <= 20;

	useEffect(() => {
		const scanlineInterval = setInterval(() => {
			setScanline((prev) => (prev + 1) % 100);
		}, 50);

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		const flickerInterval = setInterval(() => {
			setFlickering(Math.random() > 0.97);
		}, 100);

		return () => {
			clearInterval(scanlineInterval);
			clearInterval(blinkInterval);
			clearInterval(flickerInterval);
		};
	}, []);

	// Custom progress bar with retro styling
	const customProgressBar = (
		<Box mt={rem(20)} mb={rem(20)}>
			<Group justify='space-between' mb={rem(10)}>
				<Text
					c='#ff3030'
					fz='lg'
					fw={700}
					style={{
						fontFamily: 'monospace',
						textShadow: '0 0 5px rgba(255, 48, 48, 0.7)',
					}}
				>
					HEALTH REMAINING
				</Text>
				<Text
					c='#ff3030'
					fz='lg'
					fw={700}
					style={{
						fontFamily: 'monospace',
						textShadow: '0 0 5px rgba(255, 48, 48, 0.7)',
						opacity: blinking && isNearDeath ? 0.5 : 1,
						transition: 'opacity 0.3s ease',
					}}
				>
					{percentRemaining}%
				</Text>
			</Group>

			<Box
				style={{
					width: '100%',
					height: rem(25),
					backgroundColor: '#500000',
					border: '2px solid #cc0000',
					boxShadow: 'inset 0 0 10px rgba(100,0,0,0.5)',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Box
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: `${percentRemaining}%`,
						backgroundColor: '#ff3030',
						transition: 'width 0.5s ease-in-out',
						boxShadow: '0 0 8px rgba(255, 48, 48, 0.7)',
					}}
				/>

				{/* Bar segments for retro effect */}
				{Array.from({ length: 20 }).map((_, index) => (
					<Box
						key={index}
						style={{
							position: 'absolute',
							top: 0,
							left: `${index * 5}%`,
							height: '100%',
							width: '1px',
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
						}}
					/>
				))}
			</Box>
		</Box>
	);

	// Custom status box
	const customStatus = (
		<Box
			style={{
				backgroundColor: '#500000',
				border: '2px solid #cc0000',
				boxShadow: 'inset 0 0 10px rgba(100,0,0,0.5)',
				padding: rem(15),
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: rem(10),
			}}
		>
			<Group justify='center' gap={rem(15)}>
				<GameController
					size={28}
					color='#ff3030'
					weight='duotone'
					style={{
						opacity: blinking && isNearDeath ? 0.5 : 1,
						transition: 'opacity 0.3s ease',
					}}
				/>
				<Text
					c='#ff3030'
					fz='lg'
					fw={700}
					style={{
						fontFamily: 'monospace',
						textShadow: '0 0 5px rgba(255, 48, 48, 0.7)',
						letterSpacing: rem(1),
					}}
				>
					{isNearDeath ? 'CRITICAL FAILURE IMMINENT' : isDying ? 'SYSTEM FAILURE DETECTED' : 'PREPARE FOR FINAL STAND'}
				</Text>
				<GameController
					size={28}
					color='#ff3030'
					weight='duotone'
					style={{
						opacity: blinking && isNearDeath ? 0.5 : 1,
						transition: 'opacity 0.3s ease',
					}}
				/>
			</Group>

			<Text
				c='#ff3030'
				fz='sm'
				style={{
					fontFamily: 'monospace',
					textAlign: 'center',
				}}
			>
				{isNearDeath ? 'NO RECOVERY POSSIBLE - TERMINAL ERROR' : 'PRESS ANY KEY TO ATTEMPT RECOVERY'}
			</Text>
		</Box>
	);

	// Additional content
	const additionalContent = isNearDeath ? (
		<Transition mounted={blinking} transition={{ in: { opacity: 1 }, out: { opacity: 0.5 }, transitionProperty: 'opacity' }} duration={300}>
			{(styles) => (
				<Text
					ta='center'
					c='#ff3030'
					fz='xl'
					fw={700}
					mt={rem(20)}
					style={{
						...styles,
						fontFamily: 'monospace',
						letterSpacing: rem(2),
						textShadow: '0 0 8px rgba(255, 0, 0, 0.7)',
					}}
				>
					TERMINAL SYSTEM FAILURE
				</Text>
			)}
		</Transition>
	) : null;

	// Background effects
	const backgroundEffect = (
		<>
			{/* CRT screen overlay */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(ellipse at center, rgba(40, 11, 10, 0.3) 0%, rgba(20, 0, 0, 0.6) 100%)',
					pointerEvents: 'none',
					zIndex: 1,
					opacity: 0.7,
					mixBlendMode: 'multiply',
				}}
			/>

			{/* Scanline effect */}
			<Box
				style={{
					position: 'absolute',
					top: `${scanline}%`,
					left: 0,
					right: 0,
					height: '5px',
					backgroundColor: 'rgba(255, 100, 100, 0.1)',
					zIndex: 2,
					pointerEvents: 'none',
					transition: 'top 50ms linear',
				}}
			/>

			{/* Flicker effect */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(255, 0, 0, 0.03)',
					zIndex: 3,
					pointerEvents: 'none',
					opacity: flickering ? 0.5 : 0,
					transition: 'opacity 50ms ease',
				}}
			/>
		</>
	);

	return (
		<GameOverBase
			percentRemaining={percentRemaining}
			themeType='retro'
			heartIcon={HeartBreak}
			warningIcon={WarningOctagon}
			gameIcon={GameController}
			statusIcon={Skull}
			customProgressBar={customProgressBar}
			customStatus={customStatus}
			additionalContent={additionalContent}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				height: '100%',
				backgroundColor: '#300a09',
				borderRadius: rem(8),
				position: 'relative',
				overflow: 'hidden',
				border: '10px solid #2c2c2c',
				boxShadow: 'inset 0 0 20px rgba(100,0,0,0.5), 0 0 15px rgba(0,0,0,0.7)',
				padding: rem(25),
			}}
		/>
	);
}
