import { Box, rem, Group, Paper, Text } from '@mantine/core';
import { Timer as TimerIcon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import TimerBase from './TimerBase';

interface MinimalTimerProps {
	timeRemaining: number;
	maxTime: number;
}

export default function MinimalTimer({ timeRemaining, maxTime }: MinimalTimerProps) {
	const [blinking, setBlinking] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;

	useEffect(() => {
		if (percentage > 15) return;

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		return () => clearInterval(blinkInterval);
	}, [percentage]);

	// Get status color
	const getStatusColor = () => {
		if (percentage <= 15) return 'red.5';
		if (percentage <= 30) return 'orange.5';
		if (percentage <= 50) return 'yellow.5';
		return 'teal.5';
	};

	// Additional content for critical state
	const additionalContent =
		percentage <= 15 ? (
			<Text
				ta='center'
				c='red.4'
				fz='sm'
				fw={500}
				mt={rem(30)}
				style={{
					opacity: blinking ? 0.8 : 1,
					transition: 'opacity 0.2s ease',
					letterSpacing: rem(0.5),
				}}
			>
				SYSTEM FAILURE IMMINENT
			</Text>
		) : null;

	// Header group with status tag
	const headerGroup = (
		<Group justify='space-between' align='center' mb={rem(20)}>
			<Group gap={rem(8)}>
				<TimerIcon size={18} color={`var(--mantine-color-${getStatusColor()})`} weight='bold' />
				<Text
					fz='sm'
					c='gray.3'
					style={{
						fontWeight: 500,
						letterSpacing: rem(1),
					}}
				>
					COUNTDOWN
				</Text>
			</Group>

			<Text
				fz='xs'
				c={getStatusColor()}
				style={{
					padding: `${rem(2)} ${rem(10)}`,
					backgroundColor: 'rgba(20,20,20,0.9)',
					borderRadius: rem(12),
					fontWeight: 500,
					border: `1px solid var(--mantine-color-${getStatusColor()})`,
					opacity: percentage <= 15 && blinking ? 0.7 : 1,
					transition: 'opacity 0.2s ease',
				}}
			>
				{percentage <= 15 ? 'CRITICAL' : percentage <= 30 ? 'WARNING' : 'ACTIVE'}
			</Text>
		</Group>
	);

	return (
		<Paper
			style={{
				padding: rem(25),
				height: '100%',
				backgroundColor: 'rgba(12, 12, 14, 0.8)',
				border: percentage <= 15 ? `1px solid rgba(255, 50, 50, ${blinking ? '0.6' : '0.2'})` : '1px solid rgba(255, 255, 255, 0.05)',
				borderRadius: rem(8),
				boxShadow: percentage <= 15 ? `0 0 15px rgba(255, 50, 50, ${blinking ? '0.2' : '0.1'})` : 'none',
				transition: 'border 0.3s ease, box-shadow 0.3s ease',
			}}
		>
			<Box style={{ position: 'relative' }}>
				<TimerBase
					timeRemaining={timeRemaining}
					maxTime={maxTime}
					themeType='minimal'
					timeIcon={TimerIcon}
					timeLabel='TIME REMAINING'
					additionalContent={additionalContent}
					backgroundEffect={headerGroup}
					containerStyles={{
						padding: 0,
					}}
				/>
			</Box>
		</Paper>
	);
}