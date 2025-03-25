import { Box, rem, Group, Text, Paper, Code, Transition } from '@mantine/core';
import { ArrowsHorizontal, CircleWavyWarning, Terminal } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GlitchBase from './GlitchBase';

interface MinimalGlitchProps {
	timeRemaining: number;
	maxTime: number;
}

export default function MinimalGlitch({ timeRemaining, maxTime }: MinimalGlitchProps) {
	const [glitching, setGlitching] = useState(false);
	const [microblink, setMicroblink] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;
	const isCritical = percentage <= 15;
	const isWarning = percentage <= 30;

	useEffect(() => {
		const glitchInterval = setInterval(() => {
			const shouldGlitch = Math.random() < (percentage <= 30 ? 0.3 : 0.1);
			if (shouldGlitch) {
				setGlitching(true);
				setTimeout(() => {
					setGlitching(false);
				}, Math.random() * 100 + 50);
			}
		}, 1000);

		const microblinkInterval = setInterval(() => {
			setMicroblink((prev) => !prev);
		}, 250);

		return () => {
			clearInterval(glitchInterval);
			clearInterval(microblinkInterval);
		};
	}, [percentage]);

	// Get status color based on percentage
	const getStatusColor = () => {
		if (percentage <= 15) return 'red';
		if (percentage <= 30) return 'orange';
		if (percentage <= 50) return 'yellow';
		return 'cyan';
	};

	// Custom diagnostics content
	const customDiagnostics = (
		<Box
			style={{
				opacity: percentage <= 15 && microblink ? 0.8 : 1,
				transition: 'opacity 0.2s ease',
			}}
		>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					<Terminal size={16} color={`var(--mantine-color-${getStatusColor()}-4)`} weight='bold' />
					<Text fz='xs' fw={500} c={`${getStatusColor()}.4`}>
						DIAGNOSTIC LOG
					</Text>
				</Group>
				<Code
					fz='xs'
					c={`${getStatusColor()}.4`}
					style={{
						padding: `${rem(2)} ${rem(6)}`,
						backgroundColor: 'rgba(0,0,0,0.2)',
						fontWeight: 500,
					}}
				>
					{isCritical ? 'CRITICAL' : isWarning ? 'WARNING' : 'INFO'}
				</Code>
			</Group>

			<Box>
				<Text fz='xs' c='gray.4' mb={rem(5)}>
					$ sys.check --verbose
				</Text>

				<Text fz='xs' c={percentage <= 15 ? 'red.4' : percentage <= 30 ? 'orange.4' : 'cyan.4'}>
					{percentage <= 15 ? '> ERROR: Memory corruption detected at 0x483A' : percentage <= 30 ? '> WARNING: Unstable signal detected' : '> INFO: System running at reduced capacity'}
				</Text>

				<Text fz='xs' c='gray.5' mt={rem(5)}>
					{percentage <= 15 ? '> Attempting system recovery...' : percentage <= 30 ? '> Running diagnostic protocols...' : '> Monitoring system parameters...'}
				</Text>

				{percentage <= 30 && (
					<Transition mounted={microblink} transition={{ in: { opacity: 1 }, out: { opacity: 0.7 }, transitionProperty: 'opacity' }} duration={250}>
						{(styles) => (
							<Text fz='xs' c={percentage <= 15 ? 'red.4' : 'orange.4'} mt={rem(5)} style={styles}>
								{percentage <= 15 ? '> CRITICAL: Failure imminent in T-minus ' + timeRemaining + 's' : '> WARNING: System degradation accelerating'}
							</Text>
						)}
					</Transition>
				)}
			</Box>
		</Box>
	);

	// Header with status tag
	const headerGroup = (
		<Group justify='space-between' align='center' mb={rem(20)}>
			<Group gap={rem(8)}>
				<ArrowsHorizontal
					size={18}
					color={`var(--mantine-color-${getStatusColor()}-5)`}
					weight='bold'
					style={{
						transform: glitching ? 'translateX(2px)' : 'none',
						transition: 'transform 0.1s ease',
					}}
				/>
				<Text
					fz='sm'
					c='cyan.3'
					style={{
						fontWeight: 500,
						letterSpacing: rem(1),
						transform: glitching ? 'translateX(-1px)' : 'none',
						transition: 'transform 0.1s ease',
					}}
				>
					SYSTEM.STATUS
				</Text>
			</Group>

			<Code
				fz='xs'
				c={`${getStatusColor()}.5`}
				style={{
					padding: `${rem(2)} ${rem(10)}`,
					backgroundColor: 'rgba(0,20,30,0.7)',
					fontFamily: 'monospace',
					fontWeight: 500,
					border: `1px solid var(--mantine-color-${getStatusColor()}-7)`,
					opacity: microblink && percentage <= 15 ? 0.8 : 1,
				}}
			>
				{isCritical ? 'CRITICAL' : isWarning ? 'WARNING' : 'UNSTABLE'}
			</Code>
		</Group>
	);

	// Additional content for critical state
	const additionalContent =
		percentage <= 15 ? (
			<Box
				mt={rem(15)}
				style={{
					padding: `${rem(8)} ${rem(15)}`,
					backgroundColor: microblink ? 'rgba(255,0,0,0.1)' : 'transparent',
					border: '1px solid rgba(255,0,0,0.2)',
					borderRadius: rem(4),
					transition: 'background-color 0.2s ease',
				}}
			>
				<Text
					ta='center'
					fz='sm'
					c='red.4'
					fw={500}
					style={{
						fontFamily: 'monospace',
						letterSpacing: rem(1),
						opacity: microblink ? 0.9 : 1,
						transition: 'opacity 0.2s ease',
					}}
				>
					EMERGENCY PROTOCOLS INITIATED
				</Text>
			</Box>
		) : null;

	return (
		<Paper
			style={{
				padding: rem(25),
				height: '100%',
				backgroundColor: 'rgba(12, 12, 14, 0.8)',
				border: isCritical ? `1px solid rgba(255, 50, 50, ${microblink ? '0.6' : '0.2'})` : '1px solid rgba(0, 200, 255, 0.1)',
				borderRadius: rem(8),
				position: 'relative',
				overflow: 'hidden',
				transition: 'border 0.3s ease',
			}}
		>
			{/* Scanline effect */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,200,255,0.03), rgba(0,200,255,0.03) 1px, transparent 1px, transparent 2px)',
					backgroundSize: '100% 2px',
					zIndex: 0,
					opacity: 0.5,
					pointerEvents: 'none',
				}}
			/>

			{/* Glitch overlay */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'rgba(0,30,50,0.02)',
					opacity: glitching ? 0.3 : 0,
					transition: 'opacity 0.1s ease',
					zIndex: 0,
					pointerEvents: 'none',
					mixBlendMode: 'overlay',
				}}
			/>

			<Box style={{ position: 'relative', zIndex: 1 }}>
				<GlitchBase
					timeRemaining={timeRemaining}
					maxTime={maxTime}
					themeType='minimal'
					WarningIcon={CircleWavyWarning}
					statusIcon={Terminal}
					customDiagnostics={customDiagnostics}
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
