import { useEffect, useState } from 'react';
import { Box, Text, Progress, rem, Group, Paper } from '@mantine/core';
import { X, HeartBreak, WarningCircle } from '@phosphor-icons/react';

interface MinimalisticGameOverProps {
	percentRemaining: number;
}

export default function MinimalisticGameOver({ percentRemaining }: MinimalisticGameOverProps) {
	const [typingComplete, setTypingComplete] = useState(false);
	const [blinking, setBlinking] = useState(false);

	const isNearDeath = percentRemaining <= 5;

	useEffect(() => {
		const timer = setTimeout(() => {
			setTypingComplete(true);
		}, 1500);

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		return () => {
			clearTimeout(timer);
			clearInterval(blinkInterval);
		};
	}, []);

	const getHearts = () => {
		const total = 5;
		const remaining = Math.ceil((percentRemaining / 100) * total);

		return Array(total)
			.fill(0)
			.map((_, i) => <HeartBreak key={i} size={20} weight='fill' color={i < remaining ? 'var(--mantine-color-red-5)' : 'var(--mantine-color-dark-5)'} />);
	};

	return (
		<Paper
			style={{
				padding: rem(25),
				height: '100%',
				backgroundColor: 'rgba(10, 10, 12, 0.95)',
				border: '1px solid rgba(255, 0, 0, 0.1)',
				borderRadius: rem(8),
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Background gradient */}
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: 'radial-gradient(circle at center, rgba(50,0,0,0.2) 0%, rgba(0,0,0,0) 70%)',
					zIndex: 0,
					pointerEvents: 'none',
				}}
			/>

			<Box style={{ position: 'relative', zIndex: 1 }}>
				<Box
					ta='center'
					my={rem(30)}
					style={{
						overflow: 'hidden',
					}}
				>
					<Text
						fz={48}
						fw={700}
						c='red.5'
						style={{
							letterSpacing: rem(2),
							textShadow: '0 0 10px rgba(255,0,0,0.3)',
							fontFamily: 'monospace',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
							width: typingComplete ? '100%' : '0%',
							transition: 'width 1.5s steps(10, end)',
							margin: '0 auto',
							display: 'inline-block',
						}}
					>
						GAME OVER
					</Text>

					{typingComplete && (
						<Text
							fz='sm'
							c='gray.5'
							mt={rem(5)}
							style={{
								fontFamily: 'monospace',
								opacity: blinking ? 0.7 : 1,
								transition: 'opacity 0.3s ease',
							}}
						>
							{isNearDeath ? 'NO CONTINUES REMAINING' : 'INSERT COIN TO CONTINUE'}
						</Text>
					)}
				</Box>

				<Group justify='center' mt={rem(20)} mb={rem(40)}>
					{getHearts()}
				</Group>

				<Box mb={rem(20)}>
					<Group justify='space-between' mb={rem(5)}>
						<Text fz='xs' c='gray.6'>
							HEALTH
						</Text>
						<Text
							fz='xs'
							fw={500}
							c={isNearDeath ? 'red.5' : 'gray.5'}
							style={{
								opacity: isNearDeath && blinking ? 0.7 : 1,
								transition: 'opacity 0.3s ease',
							}}
						>
							{percentRemaining}%
						</Text>
					</Group>

					<Progress
						value={percentRemaining}
						color={isNearDeath ? 'red.8' : 'red.6'}
						size='md'
						radius='xs'
						style={{
							backgroundColor: 'rgba(20,0,0,0.2)',
							border: '1px solid rgba(255,0,0,0.1)',
							overflow: 'hidden',
						}}
					/>
				</Box>

				<Box
					style={{
						padding: rem(15),
						backgroundColor: 'rgba(20,0,0,0.2)',
						borderRadius: rem(4),
						border: '1px solid rgba(255,0,0,0.1)',
					}}
				>
					<Group justify='space-between' mb={rem(10)}>
						<Group gap={rem(8)}>
							<X size={16} color='var(--mantine-color-red-5)' weight='bold' />
							<Text fz='xs' fw={500} c='gray.4'>
								SYSTEM STATUS
							</Text>
						</Group>

						<WarningCircle
							size={16}
							color='var(--mantine-color-red-5)'
							weight='fill'
							style={{
								opacity: blinking ? 0.7 : 1,
								transition: 'opacity 0.3s ease',
							}}
						/>
					</Group>

					<Text fz='sm' c='gray.5' style={{ fontWeight: 300 }}>
						{isNearDeath ? 'Critical system failure. Recovery impossible. Shutdown imminent.' : 'System compromised. Recovery protocols failed. Prepare for shutdown.'}
					</Text>

					{isNearDeath && typingComplete && (
						<Text
							ta='center'
							fz='sm'
							c='red.5'
							fw={500}
							mt={rem(10)}
							style={{
								opacity: blinking ? 0.7 : 1,
								transition: 'opacity 0.3s ease',
								letterSpacing: rem(0.5),
							}}
						>
							FINAL WARNING: TERMINATION SEQUENCE INITIATED
						</Text>
					)}
				</Box>
			</Box>
		</Paper>
	);
}
