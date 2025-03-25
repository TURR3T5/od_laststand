import { Box, rem, Group, Text, RingProgress, Transition } from '@mantine/core';
import { HeartBreak, CircleWavyWarning, GameController, Hexagon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GameOverBase from './GameOverBase';

interface HoloGameOverProps {
	percentRemaining: number;
}

export default function HoloGameOver({ percentRemaining }: HoloGameOverProps) {
	const [pulseState, setPulseState] = useState(0);
	const [pulsing, setPulsing] = useState(false);
	const [glitching, setGlitching] = useState(false);
	const isNearDeath = percentRemaining <= 5;
	const isDying = percentRemaining <= 20;

	useEffect(() => {
		const pulseInterval = setInterval(() => {
			setPulseState((prev) => (prev + 1) % 100);
		}, 30);

		const blinkInterval = setInterval(() => {
			setPulsing((prev) => !prev);
		}, 500);

		const glitchInterval = setInterval(() => {
			if (Math.random() < (isNearDeath ? 0.3 : isDying ? 0.15 : 0.05)) {
				setGlitching(true);
				setTimeout(() => {
					setGlitching(false);
				}, Math.random() * 200 + 50);
			}
		}, 1000);

		return () => {
			clearInterval(pulseInterval);
			clearInterval(blinkInterval);
			clearInterval(glitchInterval);
		};
	}, [isNearDeath, isDying]);

	// Get holo color based on percentage
	const getHoloColor = (opacity = 1) => {
		if (percentRemaining <= 5) return `rgba(255, 50, 50, ${opacity})`;
		if (percentRemaining <= 20) return `rgba(255, 80, 80, ${opacity})`;
		return `rgba(255, 120, 120, ${opacity})`;
	};

	const baseColor = getHoloColor();

	// Custom progress bar with health ring
	const customProgressBar = (
		<Box
			mt={rem(30)}
			style={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: rem(180),
			}}
		>
			{/* Outer RingProgress */}
			<RingProgress
				size={180}
				thickness={8}
				roundCaps
				sections={[{ value: percentRemaining, color: isNearDeath ? 'red.4' : isDying ? 'red.3' : 'pink.3' }]}
				style={{
					position: 'absolute',
					filter: `drop-shadow(0 0 8px ${baseColor})`,
				}}
			/>

			{/* Inner RingProgress with glitch effect */}
			<Transition mounted={true} transition={glitching ? { in: { transform: 'scale(0.98)' }, out: { transform: 'scale(1.02)' }, transitionProperty: 'transform' } : undefined} duration={100}>
				{(transitionStyles) => (
					<RingProgress
						size={140}
						thickness={4}
						roundCaps
						sections={[{ value: percentRemaining * 0.9, color: isNearDeath ? 'red.3' : isDying ? 'red.2' : 'pink.2' }]}
						style={{
							...transitionStyles,
							position: 'absolute',
							filter: `drop-shadow(0 0 5px ${baseColor})`,
							opacity: 0.7 + Math.sin(pulseState / 15) * 0.1,
							transform: `rotate(${180 - pulseState / 2}deg)`,
						}}
					/>
				)}
			</Transition>

			{/* Health percentage */}
			<Transition mounted={true} transition='fade' duration={300}>
				{(styles) => (
					<Box
						style={{
							...styles,
							textAlign: 'center',
							zIndex: 2,
						}}
					>
						<Text
							fz={50}
							fw={700}
							style={{
								color: baseColor,
								textShadow: `0 0 15px ${baseColor}`,
								fontFamily: '"Orbitron", sans-serif',
								opacity: glitching ? 0.7 : 1,
								transition: 'opacity 0.1s ease',
							}}
						>
							{percentRemaining}%
						</Text>
						<Text
							fz='sm'
							style={{
								color: getHoloColor(0.8),
								fontFamily: '"Rajdhani", sans-serif',
								letterSpacing: rem(1),
								textTransform: 'uppercase',
							}}
						>
							Health Remaining
						</Text>
					</Box>
				)}
			</Transition>
		</Box>
	);

	// Custom lives display
	const customLives = (
		<Group
			gap={rem(10)}
			my={rem(20)}
			style={{
				justifyContent: 'center',
			}}
		>
			{Array.from({ length: 5 }).map((_, index) => {
				const isActive = index < Math.ceil((percentRemaining / 100) * 5);
				return (
					<HeartBreak
						key={index}
						size={30}
						weight='fill'
						color={isActive ? baseColor : 'rgba(50, 50, 70, 0.5)'}
						style={{
							filter: isActive ? `drop-shadow(0 0 5px ${baseColor})` : 'none',
							opacity: isActive && isNearDeath && pulsing ? 0.7 : 1,
							transition: 'opacity 0.3s ease',
						}}
					/>
				);
			})}
		</Group>
	);

	// Custom status display
	const customStatus = (
		<Box
			style={{
				backgroundColor: `rgba(${isNearDeath ? '40, 0, 0' : '40, 10, 20'}, 0.4)`,
				borderRadius: rem(6),
				border: `1px solid ${getHoloColor(0.3)}`,
				backdropFilter: 'blur(4px)',
				padding: rem(15),
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				gap: rem(10),
			}}
		>
			<GameController
				size={28}
				weight='duotone'
				color={baseColor}
				style={{
					filter: `drop-shadow(0 0 5px ${baseColor})`,
					opacity: pulsing && isNearDeath ? 0.7 : 1,
					transition: 'opacity 0.3s ease',
				}}
			/>

			<Transition mounted={isNearDeath ? pulsing : true} transition={{ in: { opacity: 1 }, out: { opacity: 0.6 }, transitionProperty: 'opacity' }} duration={300}>
				{(styles) => (
					<Text
						style={{
							...styles,
							color: baseColor,
							textShadow: `0 0 5px ${baseColor}`,
							fontFamily: '"Rajdhani", sans-serif',
							letterSpacing: rem(1),
							fontSize: rem(16),
							fontWeight: 600,
						}}
					>
						{isNearDeath ? 'CRITICAL FAILURE IMMINENT' : isDying ? 'SYSTEM FAILURE DETECTED' : 'PREPARE FOR FINAL STAND'}
					</Text>
				)}
			</Transition>
		</Box>
	);

	// Additional content for near-death state
	const additionalContent = isNearDeath ? (
		<Transition mounted={pulsing} transition={{ in: { opacity: 1 }, out: { opacity: 0.5 }, transitionProperty: 'opacity' }} duration={300}>
			{(styles) => (
				<Text
					ta='center'
					style={{
						...styles,
						color: baseColor,
						textShadow: `0 0 10px ${baseColor}`,
						fontFamily: '"Orbitron", sans-serif',
						fontSize: rem(22),
						fontWeight: 700,
						letterSpacing: rem(1),
						marginTop: rem(20),
						position: 'absolute',
						bottom: rem(20),
						left: 0,
						right: 0,
					}}
				>
					FINAL WARNING: SYSTEM TERMINATION
				</Text>
			)}
		</Transition>
	) : null;

	// Background effects
	const backgroundEffect = (
		<>
			{/* Holographic background effects */}
			<Transition mounted={true} transition='fade' duration={1000}>
				{(styles) => (
					<Box
						style={{
							...styles,
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 0,
							background: 'radial-gradient(circle at 50% 50%, rgba(255, 50, 50, 0.05) 0%, transparent 70%)',
							opacity: 0.6 + Math.sin(pulseState / 15) * 0.1,
						}}
					/>
				)}
			</Transition>

			{/* Hexagonal grid */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 0,
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23401515' fill-opacity='0.2' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.3,
				}}
			/>

			{/* Glitch overlay effect */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 1,
					background: 'linear-gradient(0deg, rgba(0,0,0,0) 97%, rgba(255,100,100,0.2) 100%)',
					backgroundSize: '100% 100%',
					backgroundPosition: `0 ${Math.random() * 100}%`,
					opacity: glitching ? 0.5 : 0,
					transition: 'opacity 0.1s ease',
				}}
			/>
		</>
	);

	// Header group with branding
	const headerGroup = (
		<Group justify='space-between' mb={rem(10)}>
			<Group gap={rem(10)}>
				<Hexagon
					size={24}
					weight='fill'
					color={baseColor}
					style={{
						filter: `drop-shadow(0 0 5px ${baseColor})`,
					}}
				/>
				<Text
					fz='lg'
					fw={500}
					style={{
						color: baseColor,
						textShadow: `0 0 5px ${baseColor}`,
						fontFamily: '"Rajdhani", sans-serif',
						letterSpacing: rem(1),
					}}
				>
					SYSTEM TERMINAL
				</Text>
			</Group>

			<Transition mounted={true} transition='fade' duration={300}>
				{(styles) => (
					<CircleWavyWarning
						size={24}
						weight='fill'
						color={baseColor}
						style={{
							...styles,
							filter: `drop-shadow(0 0 5px ${baseColor})`,
							opacity: 0.5 + Math.sin(pulseState / 10) * 0.2,
						}}
					/>
				)}
			</Transition>
		</Group>
	);

	return (
		<GameOverBase
			percentRemaining={percentRemaining}
			themeType='holo'
			heartIcon={HeartBreak}
			warningIcon={CircleWavyWarning}
			gameIcon={GameController}
			statusIcon={Hexagon}
			customLives={customLives}
			customProgressBar={customProgressBar}
			customStatus={customStatus}
			additionalContent={additionalContent}
			backgroundEffect={
				<>
					{backgroundEffect}
					{headerGroup}
				</>
			}
			containerStyles={{
				height: '100%',
				background: 'linear-gradient(135deg, rgba(20,8,8,0.95) 0%, rgba(40,15,15,0.95) 100%)',
				borderRadius: rem(12),
				position: 'relative',
				overflow: 'hidden',
				border: '1px solid rgba(255, 100, 100, 0.1)',
				boxShadow: '0 0 30px rgba(255, 0, 0, 0.1)',
				padding: rem(30),
			}}
		/>
	);
}
