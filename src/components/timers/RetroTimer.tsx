import { Box, rem, Group, Transition } from '@mantine/core';
import { Hourglass, WarningOctagon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import TimerBase from './TimerBase';

interface RetroTimerProps {
	timeRemaining: number;
	maxTime: number;
}

export default function RetroTimer({ timeRemaining, maxTime }: RetroTimerProps) {
	const [scanline, setScanline] = useState(0);
	const [blinking, setBlinking] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;

	useEffect(() => {
		const scanlineInterval = setInterval(() => {
			setScanline((prev) => (prev + 1) % 100);
		}, 50);

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		return () => {
			clearInterval(scanlineInterval);
			clearInterval(blinkInterval);
		};
	}, []);

	// Additional content for warning state
	const additionalContent =
		percentage <= 30 ? (
			<Transition mounted={true} transition='slide-up' duration={300}>
				{(styles) => (
					<Group
						style={{
							...styles,
							backgroundColor: percentage <= 15 ? '#500000' : '#503000',
							border: `2px solid ${percentage <= 15 ? '#cc0000' : '#cc6000'}`,
							padding: rem(10),
							justifyContent: 'center',
							gap: rem(10),
							boxShadow: 'inset 0 0 10px rgba(100,0,0,0.5)',
							marginTop: rem(20),
						}}
					>
						<WarningOctagon
							size={24}
							color={percentage <= 15 ? '#ff3030' : '#ffcc30'}
							weight='fill'
							style={{
								opacity: blinking ? 1 : 0.5,
								transition: 'opacity 300ms ease',
							}}
						/>
						<Box
							style={{
								fontFamily: 'monospace',
								textShadow: `0 0 5px ${percentage <= 15 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 200, 0, 0.7)'}`,
								color: percentage <= 15 ? '#ff3030' : '#ffcc30',
								fontSize: rem(18),
								fontWeight: 700,
							}}
						>
							{percentage <= 15 ? 'CRITICAL WARNING' : 'CAUTION: LOW TIME'}
						</Box>
						<WarningOctagon
							size={24}
							color={percentage <= 15 ? '#ff3030' : '#ffcc30'}
							weight='fill'
							style={{
								opacity: blinking ? 1 : 0.5,
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
			{/* CRT screen overlay */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(ellipse at center, rgba(11, 40, 10, 0.2) 0%, rgba(0, 20, 0, 0.5) 100%)',
					pointerEvents: 'none',
					zIndex: 2,
					opacity: 0.6,
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
					backgroundColor: 'rgba(100, 255, 100, 0.1)',
					zIndex: 3,
					pointerEvents: 'none',
					transition: 'top 50ms linear',
				}}
			/>

			{/* Flicker effect */}
			<Transition mounted={true} transition='fade' duration={100} timingFunction='ease'>
				{(styles) => (
					<Box
						style={{
							...styles,
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: 'rgba(0, 255, 0, 0.02)',
							zIndex: 4,
							pointerEvents: 'none',
							opacity: Math.random() > 0.97 ? 0.5 : 0,
						}}
					/>
				)}
			</Transition>
		</>
	);

	return (
		<TimerBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='retro'
			timeIcon={Hourglass}
			statusIcon={WarningOctagon}
			title='SYSTEM COUNTDOWN'
			timeLabel='TIME REMAINING:'
			progressLabel='SYSTEM INTEGRITY'
			statusTitle='SYSTEM STATUS'
			additionalContent={additionalContent}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				height: '100%',
				backgroundColor: '#072905',
				borderRadius: rem(8),
				position: 'relative',
				overflow: 'hidden',
				border: '10px solid #2c2c2c',
				boxShadow: 'inset 0 0 20px rgba(0,100,0,0.5), 0 0 15px rgba(0,0,0,0.7)',
				padding: rem(25),
			}}
		/>
	);
}
