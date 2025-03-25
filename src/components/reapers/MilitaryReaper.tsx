import { Box, rem, Group, Text, Divider, Progress, Transition } from '@mantine/core';
import { ShieldWarning, Crosshair, Skull, Person } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import ReaperBase from './ReaperBase';
import { getTimestamp } from '../../utils/formatTime';

interface MilitaryReaperProps {
	percentRemaining: number;
}

export default function MilitaryReaper({ percentRemaining }: MilitaryReaperProps) {
	const [blinking, setBlinking] = useState(false);
	const [timestamp, setTimestamp] = useState(getTimestamp());
	const isDangerous = percentRemaining <= 25;
	const isCritical = percentRemaining <= 10;

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

	// Custom progress bar with military design
	const customProgressBar = (
		<Box
			mt={rem(30)}
			mb={rem(30)}
			style={{
				backgroundColor: '#0e0e0e',
				border: '2px solid #404040',
				borderRadius: rem(4),
				padding: rem(20),
			}}
		>
			<Group justify='space-between' mb={rem(15)}>
				<Text
					fz='sm'
					fw={500}
					c='gray.4'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					HOSTILE DISTANCE:
				</Text>
				<Text
					fz='sm'
					fw={700}
					c={isCritical ? 'red.4' : isDangerous ? 'yellow.4' : 'green.4'}
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					{percentRemaining.toFixed(1)}% SAFETY MARGIN
				</Text>
			</Group>

			<Box style={{ position: 'relative' }}>
				<Progress
					value={100 - percentRemaining}
					color={isCritical ? 'red' : isDangerous ? 'yellow' : 'green'}
					size='lg'
					radius={0}
					striped={isCritical}
					animated={isCritical}
					style={{
						backgroundColor: '#1a1a1a',
						border: '1px solid #404040',
						height: rem(30),
					}}
				/>

				<Box
					style={{
						position: 'absolute',
						top: rem(-15),
						left: `${100 - percentRemaining}%`,
						transform: 'translateX(-50%)',
						transition: 'left 0.5s ease',
					}}
				>
					<Skull
						size={24}
						weight='fill'
						color={isCritical ? '#ff4747' : isDangerous ? '#ffa500' : '#75d675'}
						style={{
							opacity: isCritical && blinking ? 0.7 : 1,
							transition: 'opacity 0.3s ease',
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
					<Person size={24} weight='fill' color='#cccccc' />
				</Box>
			</Box>

			<Group justify='space-between' mt={rem(8)}>
				<Text
					fz='xs'
					c='gray.6'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					SAFE ZONE
				</Text>
				<Text
					fz='xs'
					c='gray.6'
					style={{
						fontFamily: '"Courier New", monospace',
					}}
				>
					DANGER ZONE
				</Text>
			</Group>
		</Box>
	);

	// Additional content for warning or critical state
	const additionalContent = isDangerous ? (
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
						{isCritical ? 'MULTIPLE HOSTILES DETECTED. DEFENSIVE PERIMETER BREACHED. EVACUATION ADVISED.' : 'HOSTILE FORCES APPROACHING. DEFENSIVE MEASURES RECOMMENDED.'}
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
					<ShieldWarning size={24} weight='fill' color={isCritical ? '#ff4747' : isDangerous ? '#ffa500' : '#75d675'} />
					<Text
						fz='md'
						fw={700}
						c='gray.2'
						style={{
							fontFamily: '"Courier New", monospace',
							letterSpacing: rem(1),
						}}
					>
						THREAT ASSESSMENT
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
				color={isCritical ? 'red.8' : isDangerous ? 'yellow.8' : 'green.8'}
				size='sm'
				mb={rem(20)}
				style={{
					boxShadow: `0 0 5px ${isCritical ? '#ff4747' : isDangerous ? '#ffa500' : '#75d675'}`,
				}}
			/>
		</>
	);

	return (
		<ReaperBase
			percentRemaining={percentRemaining}
			themeType='military'
			personIcon={Person}
			reaperIcon={Skull}
			statusIcon={Crosshair}
			customProgressBar={customProgressBar}
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
