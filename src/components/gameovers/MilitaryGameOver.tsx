import { Box, rem, Group, Text, Divider, Transition, Code, Progress } from '@mantine/core';
import { HeartBreak, ShieldWarning, GameController, Skull, Crosshair } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import GameOverBase from './GameOverBase';
import { getTimestamp } from '../../utils/formatTime';

interface MilitaryGameOverProps {
	percentRemaining: number;
}

export default function MilitaryGameOver({ percentRemaining }: MilitaryGameOverProps) {
	const [blinking, setBlinking] = useState(false);
	const [timestamp, setTimestamp] = useState(getTimestamp());
	const isNearDeath = percentRemaining <= 5;
	const isDying = percentRemaining <= 20;

	useEffect(() => {
		const blinkInterval = setInterval(
			() => {
				setBlinking((prev) => !prev);
			},
			isNearDeath ? 300 : 800
		);

		const timestampInterval = setInterval(() => {
			setTimestamp(getTimestamp());
		}, 1000);

		return () => {
			clearInterval(blinkInterval);
			clearInterval(timestampInterval);
		};
	}, [isNearDeath]);

	// Custom lives display with military-style health indicators
	const customLives = (
		<Group gap={rem(5)} justify='center' mt={rem(15)}>
			{Array.from({ length: 5 }).map((_, index) => {
				const isActive = index < Math.ceil((percentRemaining / 100) * 5);
				return (
					<Box
						key={index}
						style={{
							width: rem(30),
							height: rem(15),
							backgroundColor: isActive ? (isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#75d675') : '#404040',
							border: `1px solid ${isActive ? '#606060' : '#303030'}`,
							opacity: isActive && isNearDeath && blinking ? 0.5 : 1,
							transition: 'opacity 0.3s ease, background-color 0.3s ease',
						}}
					/>
				);
			})}
		</Group>
	);

	// Custom progress bar with military styling
	const customProgressBar = (
		<Box
			mt={rem(20)}
			style={{
				backgroundColor: '#0e0e0e',
				border: '2px solid #404040',
				borderRadius: rem(4),
				padding: rem(15),
			}}
		>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					<HeartBreak
						size={16}
						weight='fill'
						color={isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#75d675'}
						style={{
							opacity: isNearDeath && blinking ? 0.5 : 1,
							transition: 'opacity 0.3s ease',
						}}
					/>
					<Text
						fz='sm'
						fw={500}
						c='gray.4'
						style={{
							fontFamily: '"Courier New", monospace',
						}}
					>
						HEALTH STATUS:
					</Text>
				</Group>
				<Code
					fz='xs'
					style={{
						fontFamily: '"Courier New", monospace',
						backgroundColor: '#0e0e0e',
						border: `1px solid ${isNearDeath ? '#600' : isDying ? '#660' : '#060'}`,
						color: isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#75d675',
					}}
				>
					{isNearDeath ? 'CRITICAL' : isDying ? 'UNSTABLE' : 'LOW'}
				</Code>
			</Group>

			<Box
				style={{
					position: 'relative',
				}}
			>
				<Progress
					value={percentRemaining}
					color={isNearDeath ? 'red' : isDying ? 'yellow' : 'green'}
					size='md'
					striped={isNearDeath}
					animated={isNearDeath}
					style={{
						backgroundColor: '#1a1a1a',
						border: '1px solid #404040',
						height: rem(20),
					}}
				/>
			</Box>

			<Group justify='space-between' mt={rem(5)}>
				<Text
					fz='xs'
					c='gray.6'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					{percentRemaining.toFixed(0)}% REMAINING
				</Text>
				<Text
					fz='xs'
					c='gray.6'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					CRITICAL: {isNearDeath ? 'YES' : 'NO'}
				</Text>
			</Group>
		</Box>
	);

	// Custom status box with military styling
	const customStatus = (
		<Box
			mt={rem(20)}
			style={{
				backgroundColor: isNearDeath ? '#300' : isDying ? '#330' : '#1a1a1a',
				border: `2px solid ${isNearDeath ? '#600' : isDying ? '#660' : '#404040'}`,
				borderRadius: rem(4),
				padding: rem(15),
			}}
		>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					<GameController
						size={18}
						weight='fill'
						color={isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#cccccc'}
						style={{
							opacity: isNearDeath && blinking ? 0.5 : 1,
							transition: 'opacity 0.3s ease',
						}}
					/>
					<Text
						fz='sm'
						fw={700}
						c={isNearDeath ? 'red.3' : isDying ? 'yellow.3' : 'gray.3'}
						style={{
							fontFamily: '"Courier New", monospace',
						}}
					>
						{isNearDeath ? 'MISSION FAILURE' : 'OPERATIONAL STATUS'}
					</Text>
				</Group>
				<Text
					fz='xs'
					c='gray.5'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					CODE: {isNearDeath ? 'BLACK' : isDying ? 'RED' : 'AMBER'}
				</Text>
			</Group>

			<Text
				mt={rem(5)}
				fz='sm'
				c='gray.3'
				style={{
					fontFamily: '"Courier New", monospace',
				}}
			>
				{isNearDeath ? 'CRITICAL SYSTEMS FAILURE. MISSION ABORTED. ALL PERSONNEL EVACUATE IMMEDIATELY.' : isDying ? 'SYSTEM FAILURE DETECTED. BACKUP PROTOCOLS UNAVAILABLE. PREPARE FOR SHUTDOWN.' : 'SYSTEM COMPROMISED. DEFENSIVE CAPABILITIES REDUCED. PROCEED WITH CAUTION.'}
			</Text>

			<Transition mounted={isNearDeath} transition={{ in: { opacity: 1 }, out: { opacity: 0.5 }, transitionProperty: 'opacity' }} duration={300}>
				{(styles) => (
					<Text
						ta='center'
						fz='sm'
						fw={700}
						c='red.3'
						mt={rem(10)}
						style={{
							...styles,
							fontFamily: '"Courier New", monospace',
							letterSpacing: rem(1),
						}}
					>
						MISSION TERMINATION IN PROGRESS
					</Text>
				)}
			</Transition>
		</Box>
	);

	// Additional content
	const additionalContent = (
		<Box
			mt={rem(20)}
			style={{
				backgroundColor: '#0e0e0e',
				border: '1px solid #404040',
				borderRadius: rem(4),
				padding: rem(10),
			}}
		>
			<Group justify='space-between'>
				<Text
					fz='xs'
					c='gray.5'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					LAST STAND MODE
				</Text>
				<Text
					fz='xs'
					c='gray.5'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					DIFFICULTY: EXTREME
				</Text>
			</Group>
		</Box>
	);

	// Header with top bar
	const headerGroup = (
		<>
			<Group justify='space-between' mb={rem(15)}>
				<Group gap={rem(10)}>
					<ShieldWarning size={24} weight='fill' color={isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#75d675'} />
					<Text
						fz='md'
						fw={700}
						c='gray.2'
						style={{
							fontFamily: '"Courier New", monospace',
							letterSpacing: rem(1),
						}}
					>
						MISSION TERMINATED
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
				color={isNearDeath ? 'red.8' : isDying ? 'yellow.8' : 'gray.8'}
				size='sm'
				mb={rem(20)}
				style={{
					boxShadow: `0 0 5px ${isNearDeath ? '#ff4747' : isDying ? '#ffa500' : '#cccccc'}`,
				}}
			/>
		</>
	);

	return (
		<GameOverBase
			percentRemaining={percentRemaining}
			themeType='military'
			heartIcon={HeartBreak}
			warningIcon={Skull}
			gameIcon={GameController}
			statusIcon={Crosshair}
			customLives={customLives}
			customProgressBar={customProgressBar}
			customStatus={customStatus}
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
