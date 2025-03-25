import { Box, rem, Group, Text, Divider, Transition, Code } from '@mantine/core';
import { ShieldWarning, Crosshair, Virus } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GlitchBase from './GlitchBase';
import { getTimestamp } from '../../utils/formatTime';

interface MilitaryGlitchProps {
	timeRemaining: number;
	maxTime: number;
}

export default function MilitaryGlitch({ timeRemaining, maxTime }: MilitaryGlitchProps) {
	const [blinking, setBlinking] = useState(false);
	const [timestamp, setTimestamp] = useState(getTimestamp());
	const [glitchEffect, setGlitchEffect] = useState(false);
	const percentage = (timeRemaining / maxTime) * 100;
	const isCritical = percentage <= 15;
	const isWarning = percentage <= 30;

	useEffect(() => {
		const blinkInterval = setInterval(
			() => {
				setBlinking((prev) => !prev);
			},
			isCritical ? 300 : 800
		);

		const timestampInterval = setInterval(() => {
			setTimestamp(getTimestamp());
		}, 1000);

		const glitchInterval = setInterval(() => {
			if (Math.random() < (isCritical ? 0.3 : isWarning ? 0.15 : 0.05)) {
				setGlitchEffect(true);
				setTimeout(() => {
					setGlitchEffect(false);
				}, Math.random() * 200 + 50);
			}
		}, 1000);

		return () => {
			clearInterval(blinkInterval);
			clearInterval(timestampInterval);
			clearInterval(glitchInterval);
		};
	}, [isCritical, isWarning]);

	// Custom diagnostics content
	const customDiagnostics = (
		<Box>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					<Virus
						size={18}
						weight='fill'
						color={isCritical ? '#ff4747' : isWarning ? '#ffa500' : '#75d675'}
						style={{
							opacity: blinking && isCritical ? 0.5 : 1,
							transition: 'opacity 0.3s ease',
						}}
					/>
					<Text
						fz='sm'
						fw={700}
						c={isCritical ? 'red.3' : isWarning ? 'yellow.3' : 'green.3'}
						style={{
							fontFamily: '"Courier New", monospace',
						}}
					>
						SECURITY BREACH DETECTED
					</Text>
				</Group>
				<Code
					fz='xs'
					style={{
						fontFamily: '"Courier New", monospace',
						backgroundColor: '#0e0e0e',
						border: `1px solid ${isCritical ? '#600' : isWarning ? '#660' : '#060'}`,
						color: isCritical ? '#ff4747' : isWarning ? '#ffa500' : '#75d675',
					}}
				>
					THREAT LEVEL {isCritical ? 'ALPHA' : isWarning ? 'BRAVO' : 'CHARLIE'}
				</Code>
			</Group>

			<Box
				style={{
					backgroundColor: '#0e0e0e',
					border: `1px solid ${isCritical ? '#600' : isWarning ? '#660' : '#060'}`,
					padding: rem(10),
					fontFamily: '"Courier New", monospace',
				}}
			>
				<Transition mounted={true} transition={glitchEffect ? { in: { transform: 'translateX(2px)' }, out: { transform: 'translateX(-2px)' }, transitionProperty: 'transform' } : undefined} duration={100}>
					{(styles) => (
						<Box style={{ ...styles }}>
							<Text c='gray.4' fz='sm' mb={rem(5)}>
								$ security_scan.exe --deep --log-level=debug
							</Text>

							<Text
								c={isCritical ? 'red.4' : isWarning ? 'yellow.4' : 'green.4'}
								fz='sm'
								style={{
									opacity: blinking && isCritical ? 0.7 : 1,
									transition: 'opacity 0.2s ease',
								}}
							>
								{isCritical ? '> [ERROR] Multiple memory violations detected in sectors 0xC4-0xE2' : isWarning ? '> [WARNING] System resource allocation failure in module DEFENSE.SYS' : '> [INFO] Unexpected behavior detected in 3 subsystems'}
							</Text>

							<Text c='gray.5' fz='sm' mt={rem(5)}>
								{isCritical ? '> [CRITICAL] Data corruption spreading at an accelerated rate' : isWarning ? '> [WARNING] System stability declining - defensive measures initiated' : '> [INFO] Diagnostic scan in progress - 47% complete'}
							</Text>

							<Text c={isCritical ? 'red.4' : isWarning ? 'yellow.4' : 'green.4'} fz='sm' mt={rem(5)} fw={500}>
								{isCritical ? '> [ACTION REQUIRED] Immediate isolation protocol implementation advised' : isWarning ? '> [RECOMMENDED] System isolation and diagnostic reboot required' : '> [STATUS] Containment procedures active'}
							</Text>
						</Box>
					)}
				</Transition>
			</Box>
		</Box>
	);

	// Additional content for critical or warning state
	const additionalContent = isWarning ? (
		<Transition mounted={true} transition='slide-up' duration={400}>
			{(styles) => (
				<Box
					style={{
						...styles,
						backgroundColor: isCritical ? '#300' : '#330',
						border: `2px solid ${isCritical ? '#600' : '#660'}`,
						borderRadius: rem(4),
						padding: rem(15),
						marginTop: rem(20),
					}}
				>
					<Group justify='space-between'>
						<Group gap={rem(8)}>
							<Crosshair
								size={18}
								weight='fill'
								color={isCritical ? '#ff4747' : '#ffa500'}
								style={{
									opacity: blinking ? 0.5 : 1,
									transition: 'opacity 0.3s ease',
								}}
							/>
							<Text
								fz='sm'
								fw={700}
								c={isCritical ? 'red.3' : 'yellow.3'}
								style={{
									fontFamily: '"Courier New", monospace',
								}}
							>
								{isCritical ? 'CRITICAL ALERT' : 'WARNING ALERT'}
							</Text>
						</Group>
						<Text
							fz='xs'
							c='gray.5'
							style={{
								fontFamily: '"Courier New", monospace',
							}}
						>
							CODE: {isCritical ? 'RED-7' : 'YELLOW-3'}
						</Text>
					</Group>

					<Text
						mt={rem(10)}
						fz='sm'
						c='gray.3'
						style={{
							fontFamily: '"Courier New", monospace',
						}}
					>
						{isCritical ? 'SYSTEM COMPROMISED. MULTIPLE SECURITY BREACHES DETECTED. ISOLATION PROTOCOL ENGAGED.' : 'DEFENSIVE SYSTEMS DEGRADING. DATA CORRUPTION DETECTED. COUNTERMEASURES DEPLOYED.'}
					</Text>
				</Box>
			)}
		</Transition>
	) : null;

	// Header with top bar
	const headerGroup = (
		<>
			<Group justify='space-between' mb={rem(15)}>
				<Group gap={rem(10)}>
					<ShieldWarning size={24} weight='fill' color={isCritical ? '#ff4747' : isWarning ? '#ffa500' : '#75d675'} />
					<Text
						fz='md'
						fw={700}
						c='gray.2'
						style={{
							fontFamily: '"Courier New", monospace',
							letterSpacing: rem(1),
						}}
					>
						SYSTEM MALFUNCTION
					</Text>
				</Group>

				<Text
					fz='sm'
					c='gray.4'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					{timestamp}
				</Text>
			</Group>

			<Divider
				color={isCritical ? 'red.8' : isWarning ? 'yellow.8' : 'green.8'}
				size='sm'
				mb={rem(20)}
				style={{
					boxShadow: `0 0 5px ${isCritical ? '#ff4747' : isWarning ? '#ffa500' : '#75d675'}`,
				}}
			/>
		</>
	);

	return (
		<GlitchBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='military'
			WarningIcon={Virus}
			statusIcon={Crosshair}
			customDiagnostics={customDiagnostics}
			additionalContent={additionalContent}
			backgroundEffect={headerGroup}
			containerStyles={{
				height: '100%',
				backgroundColor: '#1a1a1a',
				borderRadius: rem(4),
				position: 'relative',
				overflow: 'hidden',
				border: '5px solid #323232',
				boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
				padding: rem(20),
			}}
		/>
	);
}
