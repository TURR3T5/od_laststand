import { Box, rem, Group, Text, RingProgress, Transition } from '@mantine/core';
import { CircleWavyWarning, Hexagon, Skull, Person } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import ReaperBase from './ReaperBase';

interface HoloReaperProps {
	percentRemaining: number;
}

export default function HoloReaper({ percentRemaining }: HoloReaperProps) {
	const [pulseState, setPulseState] = useState(0);
	const [pulsing, setPulsing] = useState(false);
	const isDangerous = percentRemaining <= 25;

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
		if (percentRemaining <= 10) return `rgba(255, 80, 80, ${opacity})`;
		if (percentRemaining <= 25) return `rgba(255, 200, 80, ${opacity})`;
		return `rgba(120, 220, 255, ${opacity})`;
	};

	const baseColor = getHoloColor();

	// Custom progress bar with holographic elements
	const customProgressBar = (
		<Box
			style={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: rem(250),
				margin: `${rem(30)} 0`,
			}}
		>
			{/* Outer RingProgress */}
			<RingProgress
				size={230}
				thickness={8}
				roundCaps
				sections={[{ value: percentRemaining, color: isDangerous ? 'red.4' : 'blue.3' }]}
				style={{
					position: 'absolute',
					filter: `drop-shadow(0 0 8px ${baseColor})`,
				}}
			/>

			{/* Threat Indicator */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Transition mounted={true} transition='fade' duration={300}>
					{(styles) => (
						<Text
							fz={20}
							fw={700}
							ta='center'
							style={{
								...styles,
								color: baseColor,
								textShadow: `0 0 15px ${baseColor}`,
								fontFamily: '"Orbitron", sans-serif',
								position: 'absolute',
								top: rem(50),
								letterSpacing: rem(1),
								opacity: 0.8 + Math.sin(pulseState / 10) * 0.2,
							}}
						>
							PROXIMITY ANALYSIS
						</Text>
					)}
				</Transition>

				{/* Icons */}
				<Box
					style={{
						width: '100%',
						height: '100%',
						position: 'relative',
					}}
				>
					{/* Person Icon */}
					<Box
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<Person
							size={40}
							weight='duotone'
							color={percentRemaining <= 25 ? 'rgba(255, 150, 150, 0.9)' : 'rgba(150, 200, 255, 0.9)'}
							style={{
								filter: `drop-shadow(0 0 8px ${percentRemaining <= 25 ? 'rgba(255, 100, 100, 0.7)' : 'rgba(100, 150, 255, 0.7)'})`,
							}}
						/>
					</Box>

					{/* Reaper Icon */}
					<Box
						style={{
							position: 'absolute',
							left: '50%',
							top: '50%',
							transform: `
                translate(-50%, -50%) 
                rotate(${(360 * (100 - percentRemaining)) / 100}deg) 
                translateX(${(100 - percentRemaining) * 0.9}px)
              `,
							transition: 'transform 0.5s ease',
							opacity: pulsing ? 0.9 : 0.7,
						}}
					>
						<Skull
							size={40}
							weight='duotone'
							color={baseColor}
							style={{
								filter: `drop-shadow(0 0 12px ${baseColor})`,
							}}
						/>
					</Box>
				</Box>

				<Transition mounted={true} transition='fade' duration={300}>
					{(styles) => (
						<Text
							fz={28}
							fw={700}
							ta='center'
							style={{
								...styles,
								color: baseColor,
								textShadow: `0 0 15px ${baseColor}`,
								fontFamily: '"Orbitron", sans-serif',
								position: 'absolute',
								bottom: rem(50),
								letterSpacing: rem(1),
							}}
						>
							{percentRemaining.toFixed(1)}%
						</Text>
					)}
				</Transition>
			</Box>
		</Box>
	);

	// Additional content for warning state
	const additionalContent =
		percentRemaining <= 30 ? (
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
							{percentRemaining <= 10 ? 'FATAL THRESHOLD IMMINENT' : 'WARNING: THREAT PROXIMITY CRITICAL'}
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
							background: isDangerous ? 'radial-gradient(circle at 50% 50%, rgba(255, 100, 100, 0.05) 0%, transparent 70%)' : 'radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.05) 0%, transparent 70%)',
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
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23${isDangerous ? '401515' : '1e3045'}' fill-opacity='0.2' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.5,
				}}
			/>
		</>
	);

	// Header group with branding
	const headerGroup = (
		<Group justify='space-between' mb={rem(20)}>
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
					PROXIMITY WARNING
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
		<ReaperBase
			percentRemaining={percentRemaining}
			themeType='holo'
			personIcon={Person}
			reaperIcon={Skull}
			statusIcon={CircleWavyWarning}
			customProgressBar={customProgressBar}
			additionalContent={additionalContent}
			backgroundEffect={
				<>
					{backgroundEffect}
					{headerGroup}
				</>
			}
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
