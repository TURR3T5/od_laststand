import { Box, rem, Transition, Text } from '@mantine/core';
import { CircleWavyWarning, Monitor } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GlitchBase from './GlitchBase';

interface ClassicGlitchProps {
	timeRemaining: number;
	maxTime: number;
}

const scanlineTransition = {
	in: { transform: 'translateY(100%)' },
	out: { transform: 'translateY(-100%)' },
	transitionProperty: 'transform',
};

const flickerTransition = {
	in: { opacity: 0.9 },
	out: { opacity: 0.7 },
	transitionProperty: 'opacity',
};

export default function ClassicGlitch({ timeRemaining, maxTime }: ClassicGlitchProps) {
	const [_glitching, setGlitching] = useState(false);
	const [microblink, setMicroblink] = useState(false);
	const [scanline, setScanline] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;

	useEffect(() => {
		const glitchInterval = setInterval(() => {
			const shouldGlitch = Math.random() < (percentage <= 30 ? 0.3 : 0.1);
			if (shouldGlitch) {
				setGlitching(true);
				setTimeout(() => {
					setGlitching(false);
				}, Math.random() * 200 + 100);
			}
		}, Math.random() * 1000 + 500);

		const microblinkInterval = setInterval(() => {
			setMicroblink((prev) => !prev);
		}, 250);

		const scanlineInterval = setInterval(() => {
			setScanline((prev) => !prev);
		}, 4000);

		return () => {
			clearInterval(glitchInterval);
			clearInterval(microblinkInterval);
			clearInterval(scanlineInterval);
		};
	}, [percentage]);

	// Background effects
	const backgroundEffect = (
		<>
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'linear-gradient(180deg, rgba(20,20,20,0.5) 0%, rgba(15,15,15,0.8) 100%)',
					zIndex: 0,
				}}
			/>

			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 1px, transparent 1px, transparent 2px)',
					backgroundSize: '100% 2px',
					zIndex: 1,
					opacity: 0.4,
				}}
			/>

			<Transition mounted={scanline} transition={scanlineTransition} duration={8000}>
				{(transitionStyles) => (
					<Box
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: rem(8),
							background: 'rgba(150,150,150,0.15)',
							zIndex: 2,
							...transitionStyles,
						}}
					/>
				)}
			</Transition>
		</>
	);

	// Custom diagnostics content
	const customDiagnostics = (
		<Box>
			<Transition mounted={microblink} transition={flickerTransition} duration={1000}>
				{(transitionStyles) => (
					<Box
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: rem(10),
							...transitionStyles,
						}}
					>
						<Monitor size={24} color='var(--mantine-color-cyan-6)' weight='duotone' />
						<Text c='cyan.3' fz='sm' fw={500}>
							SYSTEM ANALYSIS ID: SYS-{Math.floor(Math.random() * 9000 + 1000)}-X
						</Text>
					</Box>
				)}
			</Transition>

			<Box mt={rem(10)}>
				<Text c='gray.4' fz='sm' style={{ fontFamily: 'monospace' }}>
					{percentage <= 20 ? '> CRITICAL ERROR: Memory corruption detected in core systems' : percentage <= 40 ? '> WARNING: System stability compromised' : '> ALERT: Performance degradation detected'}
				</Text>
				<Text c='gray.4' fz='sm' style={{ fontFamily: 'monospace' }}>
					{percentage <= 20 ? '> FAILURE: Data integrity check failed' : percentage <= 40 ? '> ERROR: Resource allocation failure' : '> WARNING: Unexpected behavior in subsystems'}
				</Text>
				<Text c='cyan.5' fz='sm' style={{ fontFamily: 'monospace' }}>
					{percentage <= 20 ? '> EMERGENCY PROTOCOLS ACTIVATED' : percentage <= 40 ? '> INITIATING RECOVERY PROCEDURES' : '> RUNNING DIAGNOSTICS'}
				</Text>
			</Box>
		</Box>
	);

	return (
		<GlitchBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='classic'
			WarningIcon={CircleWavyWarning}
			statusIcon={Monitor}
			title='SYSTEM FAILURE'
			statusTitle='SYSTEM DIAGNOSIS'
			diagnosticTitle='DIAGNOSTIC LOG'
			customDiagnostics={customDiagnostics}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				padding: 'var(--mantine-spacing-xl)',
				borderRadius: 'var(--mantine-radius-md)',
				backgroundColor: 'rgba(var(--mantine-color-dark-9-rgb), 0.9)',
				border: `${rem(2)} solid var(--mantine-color-${percentage <= 15 ? 'red' : percentage <= 30 ? 'orange' : 'cyan'}-9)`,
				position: 'relative',
				overflow: 'hidden',
				height: '100%',
			}}
		/>
	);
}
