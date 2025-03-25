import { Box, rem, Group, Transition, Text } from '@mantine/core';
import { CircleWavyCheck, CircleWavyWarning } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import TimerBase from './TimerBase';

interface HoloTimerProps {
	timeRemaining: number;
	maxTime: number;
}

export default function HoloTimer({ timeRemaining, maxTime }: HoloTimerProps) {
	const [pulseState, setPulseState] = useState(0);
	const [pulsing, setPulsing] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;
	const isDanger = percentage <= 30;

	useEffect(() => {
		const pulseInterval = setInterval(() => {
			setPulseState((prev) => (prev + 1) % 100);
		}, 30);

		const blinkInterval = setInterval(() => {
			setPulsing((prev) => !prev);
		}, 500);

		return () => {
			clearInterval(pulseInterval);
			clearInterval(blinkInterval);
		};
	}, []);

	// Get holo color based on percentage
	const getHoloColor = (opacity = 1) => {
		if (percentage <= 15) return `rgba(255, 80, 80, ${opacity})`;
		if (percentage <= 30) return `rgba(255, 200, 80, ${opacity})`;
		return `rgba(120, 220, 255, ${opacity})`;
	};

	const baseColor = getHoloColor();

	// Additional content for warning state
	const additionalContent =
		percentage <= 30 ? (
			<Transition mounted={true} transition='slide-up' duration={400}>
				{(styles) => (
					<Group
						mt={rem(15)}
						style={{
							...styles,
							justifyContent: 'center',
							gap: rem(8),
						}}
					>
						<CircleWavyWarning
							size={20}
							weight='fill'
							color={baseColor}
							style={{
								opacity: pulsing ? 1 : 0.6,
								filter: `drop-shadow(0 0 3px ${baseColor})`,
								transition: 'opacity 300ms ease',
							}}
						/>
						<Text
							fz='sm'
							fw={600}
							style={{
								color: baseColor,
								textShadow: `0 0 5px ${baseColor}`,
								fontFamily: '"Rajdhani", sans-serif',
								letterSpacing: rem(1),
								opacity: pulsing ? 1 : 0.7,
								transition: 'opacity 300ms ease',
							}}
						>
							{percentage <= 15 ? 'CRITICAL SYSTEM FAILURE IMMINENT' : 'WARNING: SYSTEM STABILITY COMPROMISED'}
						</Text>
						<CircleWavyWarning
							size={20}
							weight='fill'
							color={baseColor}
							style={{
								opacity: pulsing ? 1 : 0.6,
								filter: `drop-shadow(0 0 3px ${baseColor})`,
								transition: 'opacity 300ms ease',
							}}
						/>
					</Group>
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
							background: isDanger ? 'radial-gradient(circle at 50% 50%, rgba(255, 100, 100, 0.05) 0%, transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.05) 0%, transparent 70%)',
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
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23${isDanger ? '401515' : '1e3045'}' fill-opacity='0.2' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.5,
				}}
			/>
		</>
	);

	return (
		<TimerBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='holo'
			timeIcon={CircleWavyCheck}
			statusIcon={CircleWavyWarning}
			timeLabel='Time Remaining'
			progressLabel='SYSTEM INTEGRITY'
			statusTitle='SYSTEM STATUS'
			additionalContent={additionalContent}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				height: '100%',
				background: 'linear-gradient(135deg, rgba(8,8,20,0.95) 0%, rgba(15,15,40,0.95) 100%)',
				borderRadius: rem(12),
				position: 'relative',
				overflow: 'hidden',
				border: '1px solid rgba(100, 200, 255, 0.1)',
				boxShadow: '0 0 30px rgba(0, 100, 255, 0.1)',
				padding: rem(30),
			}}
		/>
	);
}