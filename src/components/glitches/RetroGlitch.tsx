import { Box, rem, Transition, Text, Group } from '@mantine/core';
import { WarningOctagon, Scan, Terminal } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GlitchBase from './GlitchBase';

interface RetroGlitchProps {
	timeRemaining: number;
	maxTime: number;
}

// Define custom transitions
const glitchTransition = {
	in: { transform: 'translate(-2px, 2px)' },
	out: { transform: 'translate(2px, -2px)' },
	transitionProperty: 'transform',
};

export default function RetroGlitch({ timeRemaining, maxTime }: RetroGlitchProps) {
	const [scanline, setScanline] = useState(0);
	const [blinking, setBlinking] = useState(false);
	const [flickering, setFlickering] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;
	const isCritical = percentage <= 15;
	const isWarning = percentage <= 30;

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

	// Custom diagnostics content
	const customDiagnostics = (
		<Box>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					<Terminal
						size={24}
						color='#30ff30'
						weight='bold'
						style={{
							opacity: blinking && isCritical ? 0.5 : 1,
							transition: 'opacity 300ms ease',
						}}
					/>
					<Text
						fz='md'
						fw={700}
						style={{
							color: '#30ff30',
							fontFamily: 'monospace',
							textShadow: '0 0 5px rgba(0, 255, 0, 0.7)',
						}}
					>
						SYSTEM.DEBUG
					</Text>
				</Group>
				<Box
					style={{
						fontFamily: 'monospace',
						color: '#30ff30',
						backgroundColor: '#052505',
						border: '1px solid #25a025',
						padding: `${rem(1)} ${rem(6)}`,
					}}
				>
					ERR_LVL:{isCritical ? '3' : isWarning ? '2' : '1'}
				</Box>
			</Group>

			<Box>
				<Transition mounted={true} transition={isCritical ? glitchTransition : undefined} duration={200}>
					{(styles) => (
						<Box
							style={{
								...styles,
								fontFamily: 'monospace',
								color: '#30ff30',
								marginBottom: rem(5),
							}}
						>
							$ run diagnostic.exe --verbose
						</Box>
					)}
				</Transition>

				<Box
					style={{
						backgroundColor: '#052505',
						border: '1px solid #25a025',
						padding: rem(10),
						marginTop: rem(10),
						boxShadow: 'inset 0 0 10px rgba(0,50,0,0.5)',
					}}
				>
					<Text style={{ color: '#30ff30', fontFamily: 'monospace' }}>{percentage <= 20 ? '> CRITICAL_FAILURE: MEMORY_CORRUPTION_DETECTED' : percentage <= 40 ? '> WARNING: SYSTEM_INSTABILITY' : '> ALERT: PERFORMANCE_DEGRADATION'}</Text>
					<Text style={{ color: '#30ff30', fontFamily: 'monospace' }}>{percentage <= 20 ? '> ERR_CODE: 0xC0000374 - HEAP_CORRUPTION' : percentage <= 40 ? '> ERR_CODE: 0x80070057 - INVALID_PARAM' : '> ERR_CODE: 0x8007000E - OUT_OF_MEMORY'}</Text>
					<Text
						style={{
							color: isCritical ? '#ff3030' : isWarning ? '#ffcc30' : '#30ff30',
							fontFamily: 'monospace',
							textShadow: `0 0 5px ${isCritical ? 'rgba(255, 0, 0, 0.7)' : isWarning ? 'rgba(255, 204, 48, 0.7)' : 'rgba(0, 255, 0, 0.7)'}`,
						}}
					>
						{percentage <= 20 ? '> INITIATING_EMERGENCY_PROTOCOLS...' : percentage <= 40 ? '> ATTEMPTING_SYSTEM_RECOVERY...' : '> RUNNING_DIAGNOSTICS...'}
					</Text>
				</Box>
			</Box>
		</Box>
	);

	// Additional content for critical state
	const additionalContent =
		percentage <= 30 ? (
			<Transition mounted={true} transition='slide-up' duration={300}>
				{(styles) => (
					<Box
						style={{
							...styles,
							backgroundColor: percentage <= 15 ? '#500000' : '#503000',
							border: `2px solid ${percentage <= 15 ? '#cc0000' : '#cc6000'}`,
							padding: rem(15),
							marginTop: rem(20),
							boxShadow: 'inset 0 0 10px rgba(100,0,0,0.5)',
						}}
					>
						<Text
							ta='center'
							c={percentage <= 15 ? '#ff3030' : '#ffcc30'}
							fz='xl'
							fw={700}
							style={{
								fontFamily: 'monospace',
								textShadow: `0 0 5px ${percentage <= 15 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 204, 48, 0.7)'}`,
								letterSpacing: rem(2),
								opacity: blinking ? 1 : 0.7,
								transition: 'opacity 300ms ease',
							}}
						>
							{percentage <= 15 ? 'CRITICAL MEMORY VIOLATION' : 'DATA CORRUPTION DETECTED'}
						</Text>
					</Box>
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
					background: 'radial-gradient(ellipse at center, rgba(11, 40, 10, 0.3) 0%, rgba(0, 20, 0, 0.6) 100%)',
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
					backgroundColor: 'rgba(100, 255, 100, 0.1)',
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
					backgroundColor: 'rgba(0, 255, 0, 0.03)',
					zIndex: 3,
					pointerEvents: 'none',
					opacity: flickering ? 0.5 : 0,
					transition: 'opacity 50ms ease',
				}}
			/>
		</>
	);

	// Custom progress bar with retro styling
	const customProgressBar = (
		<Box>
			<Group justify='space-between' mb={rem(10)}>
				<Text
					c='#30ff30'
					fz='md'
					fw={700}
					style={{
						fontFamily: 'monospace',
						textShadow: '0 0 3px rgba(0, 255, 0, 0.7)',
					}}
				>
					SYSTEM INTEGRITY
				</Text>
				<Transition mounted={true} transition={blinking && isCritical ? glitchTransition : undefined} duration={300}>
					{(transitionStyles) => (
						<Text
							c={isCritical ? '#ff3030' : isWarning ? '#ffcc30' : '#30ff30'}
							fz='md'
							fw={700}
							style={{
								...transitionStyles,
								fontFamily: 'monospace',
								textShadow: `0 0 3px ${isCritical ? 'rgba(255, 0, 0, 0.7)' : isWarning ? 'rgba(255, 204, 48, 0.7)' : 'rgba(0, 255, 0, 0.7)'}`,
							}}
						>
							{percentage.toFixed(1)}%
						</Text>
					)}
				</Transition>
			</Group>

			<Box
				style={{
					width: '100%',
					height: rem(25),
					backgroundColor: '#052505',
					border: '1px solid #25a025',
					position: 'relative',
					overflow: 'hidden',
					boxShadow: 'inset 0 0 10px rgba(0,50,0,0.5)',
				}}
			>
				<Box
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: `${percentage}%`,
						backgroundColor: isCritical ? '#ff3030' : isWarning ? '#ffcc30' : '#30ff30',
						transition: 'width 0.5s ease-in-out',
						boxShadow: `0 0 8px ${isCritical ? 'rgba(255, 0, 0, 0.7)' : isWarning ? 'rgba(255, 204, 48, 0.7)' : 'rgba(0, 255, 0, 0.7)'}`,
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

	return (
		<GlitchBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='retro'
			WarningIcon={WarningOctagon}
			statusIcon={Scan}
			title='CRITICAL ERROR'
			statusTitle='SYSTEM ERROR'
			diagnosticTitle='DEBUG CONSOLE'
			customDiagnostics={customDiagnostics}
			customProgressBar={customProgressBar}
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
