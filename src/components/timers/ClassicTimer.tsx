import { Box, rem, Transition, Text } from '@mantine/core';
import { Hourglass, Alarm } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import TimerBase from './TimerBase';

interface ClassicTimerProps {
	timeRemaining: number;
	maxTime: number;
}

export default function ClassicTimer({ timeRemaining, maxTime }: ClassicTimerProps) {
	const [pulsing, setPulsing] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;

	useEffect(() => {
		const intervalId = setInterval(() => {
			setPulsing((prev) => !prev);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	// Additional content for critical state
	const additionalContent =
		percentage <= 20 ? (
			<Transition mounted={pulsing} transition={{ in: { opacity: 1 }, out: { opacity: 0.3 }, transitionProperty: 'opacity' }} duration={800}>
				{(transitionStyles) => (
					<Text
						ta='center'
						c='red.0'
						fw={700}
						mt='xl'
						style={{
							textShadow: '0 0 8px rgba(255, 0, 0, 0.8)',
							...transitionStyles,
						}}
					>
						CRITICAL SITUATION - PREPARE FOR FINAL STAND
					</Text>
				)}
			</Transition>
		) : null;

	// Background effect
	const backgroundEffect = (
		<Box
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(30,0,0,0.3) 100%)',
				zIndex: 0,
			}}
		/>
	);

	return (
		<TimerBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='classic'
			timeIcon={Hourglass}
			statusIcon={Alarm}
			timeLabel='TIME REMAINING'
			progressLabel='SYSTEM INTEGRITY'
			statusTitle='TIMEFRAME'
			additionalContent={additionalContent}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				padding: 'var(--mantine-spacing-xl)',
				borderRadius: 'var(--mantine-radius-md)',
				backgroundColor: 'var(--mantine-color-dark-8)',
				border: `${rem(2)} solid var(--mantine-color-red-${percentage <= 15 ? '9' : percentage <= 30 ? '8' : percentage <= 50 ? '7' : '6'})`,
				position: 'relative',
				overflow: 'hidden',
				height: '100%',
			}}
		/>
	);
}
