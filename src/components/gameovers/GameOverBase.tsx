import { useEffect, useState, ReactNode } from 'react';
import { Box, Text, rem, Transition, Group } from '@mantine/core';
import { IconProps } from '@phosphor-icons/react';
import ProgressBar from '../common/ProgressBar';

export interface GameOverBaseProps {
	percentRemaining: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	containerStyles?: React.CSSProperties;
	heartIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	warningIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	gameIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	statusIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	additionalTitle?: string;
	additionalContent?: ReactNode;
	backgroundEffect?: ReactNode;
	customLives?: ReactNode;
	customProgressBar?: ReactNode;
	customStatus?: ReactNode;
}

export default function GameOverBase({ percentRemaining, themeType, containerStyles, heartIcon: HeartIcon, warningIcon: WarningIcon, gameIcon: GameIcon, statusIcon: StatusIcon, additionalTitle, additionalContent, backgroundEffect, customLives, customProgressBar, customStatus }: GameOverBaseProps) {
	const [typingComplete, setTypingComplete] = useState(false);
	const [blinking, setBlinking] = useState(false);
	const [shaking, setShaking] = useState(false);
	const [_pulsing, setPulsing] = useState(false);

	const isNearDeath = percentRemaining <= 5;
	const isDying = percentRemaining <= 20;

	useEffect(() => {
		const timer = setTimeout(() => {
			setTypingComplete(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isDying) return;

		const intervalId = setInterval(() => {
			const shouldShake = Math.random() < (isNearDeath ? 0.4 : 0.2);

			if (shouldShake) {
				setShaking(true);
				setTimeout(() => {
					setShaking(false);
				}, 500);
			}
		}, 2000);

		return () => clearInterval(intervalId);
	}, [isDying, isNearDeath]);

	useEffect(() => {
		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		const pulseInterval = setInterval(() => {
			setPulsing((prev) => !prev);
		}, 1000);

		return () => {
			clearInterval(blinkInterval);
			clearInterval(pulseInterval);
		};
	}, []);

	// Generate lives icons
	const livesIcons = () => {
		if (!HeartIcon) return null;
		if (customLives) return customLives;

		const lives = [];
		const totalHearts = 5;
		const fullHearts = Math.ceil((percentRemaining / 100) * totalHearts);

		for (let i = 0; i < fullHearts; i++) {
			lives.push(<HeartIcon key={`heart-${i}`} size={24} weight='fill' color={themeType === 'neon' ? (percentRemaining <= 20 ? '#ff1744' : '#ff9cee') : themeType === 'retro' ? '#30ff30' : 'var(--mantine-color-red-5)'} />);
		}

		for (let i = fullHearts; i < totalHearts; i++) {
			lives.push(<HeartIcon key={`broken-${i}`} size={24} weight='fill' color='var(--mantine-color-gray-7)' />);
		}

		return lives;
	};

	// Get title style based on theme
	const getTitleStyle = () => {
		switch (themeType) {
			case 'classic':
				return {
					color: 'var(--mantine-color-red-7)',
					textShadow: '0 0 15px rgba(255, 0, 0, 0.7)',
					letterSpacing: rem(3),
					fontFamily: 'monospace',
				};
			case 'neon':
				const neonColor = '#ff1744';
				return {
					color: neonColor,
					textShadow: `0 0 20px ${neonColor}`,
					fontFamily: 'Orbitron, sans-serif',
					letterSpacing: rem(3),
					textTransform: 'uppercase',
				};
			case 'retro':
				return {
					color: '#ff3030',
					textShadow: '0 0 8px rgba(255, 48, 48, 0.7)',
					fontFamily: 'monospace',
					letterSpacing: rem(3),
				};
			case 'holo':
				return {
					color: 'rgba(255, 80, 80, 1)',
					textShadow: '0 0 15px rgba(255, 80, 80, 1)',
					fontFamily: '"Orbitron", sans-serif',
					letterSpacing: rem(3),
				};
			case 'military':
				return {
					color: 'var(--mantine-color-red-7)',
					fontFamily: '"Courier New", monospace',
					letterSpacing: rem(2),
					textTransform: 'uppercase',
					border: '2px solid var(--mantine-color-red-9)',
					background: 'rgba(60, 0, 0, 0.2)',
					padding: `${rem(5)} ${rem(10)}`,
				};
			case 'minimal':
				return {
					color: 'var(--mantine-color-red-5)',
					letterSpacing: rem(2),
					textShadow: '0 0 10px rgba(255,0,0,0.3)',
					fontFamily: 'monospace',
				};
			default:
				return {};
		}
	};

	// Get subtitle style based on theme
	const getSubtitleStyle = () => {
		switch (themeType) {
			case 'classic':
				return {
					color: 'var(--mantine-color-gray-5)',
					fontFamily: 'monospace',
				};
			case 'neon':
				return {
					color: 'rgba(255, 255, 255, 0.7)',
					textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
					fontFamily: 'monospace',
					letterSpacing: rem(1),
				};
			case 'retro':
				return {
					color: '#ffcc30',
					fontFamily: 'monospace',
					textShadow: '0 0 5px rgba(255, 204, 48, 0.7)',
				};
			case 'holo':
				return {
					color: 'rgba(255, 180, 180, 0.8)',
					fontFamily: '"Rajdhani", sans-serif',
					letterSpacing: rem(1),
				};
			case 'military':
				return {
					color: 'var(--mantine-color-gray-5)',
					fontFamily: '"Courier New", monospace',
				};
			case 'minimal':
				return {
					color: 'var(--mantine-color-gray-5)',
					fontFamily: 'monospace',
				};
			default:
				return {};
		}
	};

	// Get typewriter transition style
	const typewriterTransition = {
		in: { width: '100%' },
		out: { width: '0%' },
		transitionProperty: 'width',
	};

	// Get blink transition style
	const blinkTransition = {
		in: { opacity: 1 },
		out: { opacity: 0 },
		transitionProperty: 'opacity',
	};

	// Get shake transition style
	const shakeTransition = {
		in: { transform: 'translateX(5px)' },
		out: { transform: 'translateX(-5px)' },
		common: { transform: 'translateX(0)' },
		transitionProperty: 'transform',
	};

	return (
		<Transition mounted={true} transition={shaking ? shakeTransition : undefined} duration={500}>
			{(shakeStyles) => (
				<Box
					style={{
						...containerStyles,
						...(shaking ? shakeStyles : {}),
					}}
				>
					{/* Background effects */}
					{backgroundEffect}

					<Box style={{ position: 'relative', zIndex: 1 }}>
						<Box
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<Transition mounted={true} transition={typewriterTransition} duration={2000}>
								{(typewriterStyles) => (
									<Text
										ta='center'
										fz={48}
										fw={900}
										style={{
											...getTitleStyle(),
											overflow: 'hidden',
											whiteSpace: 'nowrap',
											...typewriterStyles,
										} as React.CSSProperties}
									>
										GAME OVER
									</Text>
								)}
							</Transition>

							{typingComplete && (
								<Transition mounted={blinking} transition={blinkTransition} duration={1000} timingFunction='ease'>
									{(blinkStyles) => (
										<Text
											ta='center'
											style={{
												...getSubtitleStyle(),
												...blinkStyles,
												marginTop: rem(10),
											} as React.CSSProperties}
										>
											{isNearDeath ? 'NO CONTINUES REMAINING' : 'INSERT COIN TO CONTINUE'}
										</Text>
									)}
								</Transition>
							)}

							{additionalTitle && (
								<Text
									ta='center'
									c='gray.4'
									mt={rem(5)}
									style={{
										fontFamily: ['retro', 'military', 'classic'].includes(themeType) ? 'monospace' : undefined,
									}}
								>
									{additionalTitle}
								</Text>
							)}
						</Box>

						<Group mt={rem(40)} justify='center'>
							{livesIcons()}
						</Group>

						<Box mt={rem(40)}>
							{customProgressBar || (
								<>
									<Group justify='space-between' mb='xs'>
										<Text fz='sm' c='gray.6'>
											HEALTH REMAINING
										</Text>
										<Text fz='sm' fw={700} c={isNearDeath ? 'red.7' : 'gray.5'}>
											{percentRemaining}%
										</Text>
									</Group>

									<ProgressBar percentage={percentRemaining} themeType={themeType} height={themeType === 'classic' ? 20 : undefined} />
								</>
							)}
						</Box>

						<Group mt={rem(40)} justify='space-between'>
							<Box style={{ display: 'flex', alignItems: 'center', gap: rem(10) }}>
								{StatusIcon && <StatusIcon size={24} color='var(--mantine-color-gray-5)' />}
								<Text c='gray.5' fz='sm'>
									LAST STAND MODE
								</Text>
							</Box>

							<Box style={{ display: 'flex', alignItems: 'center', gap: rem(10) }}>
								<Text c='gray.5' fz='sm'>
									DIFFICULTY: EXTREME
								</Text>
								{WarningIcon && <WarningIcon size={24} color='var(--mantine-color-red-6)' />}
							</Box>
						</Group>

						{customStatus || (
							<Box
								mt={rem(30)}
								style={{
									padding: 'var(--mantine-spacing-md)',
									backgroundColor: 'rgba(var(--mantine-color-dark-7-rgb), 0.7)',
									borderRadius: 'var(--mantine-radius-sm)',
									border: '1px solid var(--mantine-color-dark-6)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: rem(15),
								}}
							>
								{GameIcon && <GameIcon size={28} color='var(--mantine-color-gray-5)' weight='duotone' />}
								<Transition mounted={isNearDeath ? blinking : true} transition={blinkTransition} duration={500}>
									{(blinkStyles) => (
										<Text
											c='gray.5'
											style={{
												fontFamily: 'monospace',
												...(isNearDeath ? blinkStyles : {}),
											}}
										>
											{isNearDeath ? 'CRITICAL FAILURE IMMINENT' : isDying ? 'SYSTEM FAILURE DETECTED' : 'PREPARE FOR FINAL STAND'}
										</Text>
									)}
								</Transition>
							</Box>
						)}

						{additionalContent}

						{/* CRT effect overlay */}
						{themeType === 'classic' && (
							<Box
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									zIndex: 2,
									pointerEvents: 'none',
									background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0.4) 100%)',
									opacity: 0.5,
								}}
							/>
						)}

						{isNearDeath && (
							<Transition mounted={blinking} transition={blinkTransition} duration={500}>
								{(blinkStyles) => (
									<Text
										ta='center'
										c='red.6'
										fz='xl'
										fw={700}
										mt={rem(20)}
										style={{
											position: 'absolute',
											bottom: rem(20),
											left: 0,
											right: 0,
											textShadow: '0 0 10px rgba(255, 0, 0, 0.6)',
											fontFamily: 'monospace',
											letterSpacing: rem(2),
											...blinkStyles,
										}}
									>
										FINAL WARNING: SYSTEM TERMINATION
									</Text>
								)}
							</Transition>
						)}
					</Box>
				</Box>
			)}
		</Transition>
	);
}
