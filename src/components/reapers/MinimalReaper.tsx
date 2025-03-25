import { Box, rem, Group, Text, Paper, Progress } from '@mantine/core';
import { Skull, Person, ArrowsHorizontal } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import ReaperBase from './ReaperBase';

interface MinimalReaperProps {
	percentRemaining: number;
}

export default function MinimalReaper({ percentRemaining }: MinimalReaperProps) {
	const [blinking, setBlinking] = useState(false);
	const isDangerous = percentRemaining <= 25;
	const isCritical = percentRemaining <= 10;

	useEffect(() => {
		if (!isCritical) return;

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		return () => clearInterval(blinkInterval);
	}, [isCritical]);

	// Get progress color
	const getProgressColor = () => {
		if (percentRemaining <= 10) return 'red.7';
		if (percentRemaining <= 25) return 'orange.7';
		return 'gray.6';
	};

	// Custom progress bar with reaper and person icons
	const customProgressBar = (
		<Box style={{ position: 'relative' }} my={rem(40)}>
			<Progress
				value={100 - percentRemaining}
				color={getProgressColor()}
				size='lg'
				radius='xs'
				style={{
					height: rem(30),
					backgroundColor: 'rgba(0,0,0,0.3)',
					border: '1px solid rgba(255,255,255,0.05)',
					position: 'relative',
					overflow: 'visible',
				}}
			/>

			<Box
				style={{
					position: 'absolute',
					top: rem(-12),
					left: `${100 - percentRemaining}%`,
					transform: 'translateX(-50%)',
					transition: 'left 0.5s ease',
				}}
			>
				<Skull size={24} weight='fill' color={isCritical ? 'var(--mantine-color-red-5)' : isDangerous ? 'var(--mantine-color-orange-5)' : 'var(--mantine-color-gray-5)'} />
			</Box>

			<Box
				style={{
					position: 'absolute',
					top: rem(-10),
					left: 0,
					transform: 'translateX(-50%)',
				}}
			>
				<Person size={20} weight='fill' color='var(--mantine-color-gray-2)' />
			</Box>

			<Group justify='space-between' mt={rem(8)}>
				<Text fz='xs' c='gray.6'>
					SAFE
				</Text>
				<Text fz='xs' c='red.6'>
					DANGER
				</Text>
			</Group>
		</Box>
	);

	// Additional content for critical state
	const additionalContent = isCritical ? (
		<Group mt={rem(10)} gap={rem(5)}>
			<ArrowsHorizontal size={14} color='var(--mantine-color-red-5)' />
			<Text
				fz='xs'
				c='red.5'
				fw={500}
				style={{
					opacity: blinking ? 0.7 : 1,
					transition: 'opacity 0.2s ease',
				}}
			>
				EVASIVE ACTION REQUIRED
			</Text>
		</Group>
	) : null;

	return (
		<Paper
			style={{
				padding: rem(25),
				height: '100%',
				backgroundColor: 'rgba(12, 12, 14, 0.8)',
				border: isCritical ? `1px solid rgba(255, 50, 50, ${blinking ? '0.6' : '0.2'})` : '1px solid rgba(255, 255, 255, 0.05)',
				borderRadius: rem(8),
				transition: 'border 0.3s ease',
			}}
		>
			<ReaperBase
				percentRemaining={percentRemaining}
				themeType='minimal'
				personIcon={Person}
				reaperIcon={Skull}
				statusIcon={ArrowsHorizontal}
				customProgressBar={customProgressBar}
				additionalContent={additionalContent}
				containerStyles={{
					padding: 0,
				}}
			/>
		</Paper>
	);
}
