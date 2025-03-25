import { Box, rem, Transition, Group, Text, Progress } from '@mantine/core';
import { Skull, Person, WarningOctagon, Target } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import ReaperBase from './ReaperBase';

interface RetroReaperProps {
	percentRemaining: number;
}

export default function RetroReaper({ percentRemaining }: RetroReaperProps) {
	const [scanline, setScanline] = useState(0);
	const [blinking, setBlinking] = useState(false);
	const isDangerous = percentRemaining <= 25;
	const isCritical = percentRemaining <= 10;

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

	// Custom progress bar with reaper and person icons
	const customProgressBar = (
		<Box mt={rem(40)} mb={rem(40)}>
			<Group justify='space-between' mb={rem(10)}>
				<Text
					c='#30ff30'
					fz='lg'
					fw={700}
					style={{
						fontFamily: 'monospace',
					}}
				>
					THREAT PROXIMITY:
				</Text>
				<Text
					c='#30ff30'
					fz='lg'
					fw={700}
					style={{
						fontFamily: 'monospace',
					}}
				>
					{percentRemaining.toFixed(1)}%
				</Text>
			</Group>

			<Box style={{ position: 'relative' }}>
				<Progress
					value={100 - percentRemaining}
					color={isCritical ? 'red' : isDangerous ? 'yellow' : 'lime'}
					size='xl'
					radius={0}
					style={{
						backgroundColor: '#052505',
						border: '1px solid #25a025',
						boxShadow: 'inset 0 0 5px rgba(0,50,0,0.5)',
						height: rem(30),
						'.mantine-Progress-bar': {
							backgroundColor: isCritical ? '#ff3030' : isDangerous ? '#ffcc30' : '#30ff30',
							boxShadow: 'inset 0 0 10px rgba(100,255,100,0.5)',
						},
					}}
				/>

				<Box
					style={{
						position: 'absolute',
						top: rem(-15),
						left: `${100 - percentRemaining}%`,
						transform: 'translateX(-50%)',
						transition: 'left 0.5s ease-in-out',
					}}
				>
					<Skull
						size={30}
						weight='fill'
						color={isCritical ? '#ff3030' : isDangerous ? '#ffcc30' : '#30ff30'}
						style={{
							opacity: blinking ? 1 : 0.5,
							transition: 'opacity 300ms ease',
						}}
					/>
				</Box>

				<Box
					style={{
						position: 'absolute',
						top: rem(-15),
						left: 0,
						transform: 'translateX(-50%)',
					}}
				>
					<Person size={30} weight='fill' color='#30ff30' />
				</Box>
			</Box>
		</Box>
	);

	// Additional content for warning or critical state
	const additionalContent =
		percentRemaining <= 30 ? (
			<Transition mounted={true} transition='slide-up' duration={300}>
				{(styles) => (
					<Group
						style={{
							...styles,
							backgroundColor: percentRemaining <= 15 ? '#500000' : '#503000',
							border: `2px solid ${percentRemaining <= 15 ? '#cc0000' : '#cc6000'}`,
							padding: rem(10),
							justifyContent: 'center',
							gap: rem(10),
							boxShadow: 'inset 0 0 10px rgba(100,0,0,0.5)',
							marginTop: rem(20),
						}}
					>
						<WarningOctagon
							size={24}
							color={percentRemaining <= 15 ? '#ff3030' : '#ffcc30'}
							weight='fill'
							style={{
								opacity: blinking ? 1 : 0.5,
								transition: 'opacity 300ms ease',
							}}
						/>
						<Text
							c={percentRemaining <= 15 ? '#ff3030' : '#ffcc30'}
							fz='lg'
							fw={700}
							style={{
								fontFamily: 'monospace',
								textShadow: `0 0 5px ${percentRemaining <= 15 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 200, 0, 0.7)'}`,
							}}
						>
							{percentRemaining <= 15 ? 'TERMINAL DANGER' : 'THREAT CLOSING'}
						</Text>
						<WarningOctagon
							size={24}
							color={percentRemaining <= 15 ? '#ff3030' : '#ffcc30'}
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
		<ReaperBase
			percentRemaining={percentRemaining}
			themeType='retro'
			personIcon={Person}
			reaperIcon={Skull}
			statusIcon={Target}
			title='HOSTILE DETECTED'
			progressLabel='THREAT PROXIMITY'
			statusTitle='DANGER ASSESSMENT'
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
