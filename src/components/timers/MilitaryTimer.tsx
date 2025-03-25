import { Box, rem, Group, Divider, Transition, Text } from '@mantine/core';
import { ShieldWarning, Crosshair, RadioButton } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import TimerBase from './TimerBase';
import { getTimestamp } from '../../utils/formatTime';

interface MilitaryTimerProps {
	timeRemaining: number;
	maxTime: number;
}

export default function MilitaryTimer({ timeRemaining, maxTime }: MilitaryTimerProps) {
	const [blinking, setBlinking] = useState(false);
	const [timestamp, setTimestamp] = useState(getTimestamp());
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

		return () => {
			clearInterval(blinkInterval);
			clearInterval(timestampInterval);
		};
	}, [isCritical]);

	// Additional content for warning state
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
						{isCritical ? 'MISSION COMPROMISED. IMMEDIATE ACTION REQUIRED.' : 'CAUTION: OPERATIONAL PARAMETERS DETERIORATING.'}
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
						TACTICAL COUNTDOWN
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
		<TimerBase
			timeRemaining={timeRemaining}
			maxTime={maxTime}
			themeType='military'
			timeIcon={RadioButton}
			statusIcon={Crosshair}
			timeLabel='T-MINUS:'
			progressLabel='MISSION STATUS:'
			statusTitle='SITUATION REPORT'
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
