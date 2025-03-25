import { Box, Text, Group, rem, Transition } from '@mantine/core';
import { formatTime } from '../../utils/formatTime';
import { IconProps } from '@phosphor-icons/react';
import { ReactNode } from 'react';

interface TimeDisplayProps {
	time: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	percentage: number;
	pulsing?: boolean;
	label?: string;
	icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	secondaryContent?: ReactNode;
}

export default function TimeDisplay({ time, themeType, percentage, pulsing = false, label, icon: Icon, secondaryContent }: TimeDisplayProps) {
	// Get styling based on theme
	const getTimeStyles = () => {
		const isCritical = percentage <= 15;
		const isWarning = percentage <= 30;

		switch (themeType) {
			case 'classic':
				return {
					fontSize: 76,
					fontWeight: 700,
					color: isCritical ? 'var(--mantine-color-red-9)' : 'var(--mantine-color-red-5)',
					style: {
						background: 'linear-gradient(90deg, var(--mantine-color-red-9), var(--mantine-color-orange-5))',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					},
				};

			case 'neon':
				const neonColor = isCritical ? '#ff1744' : isWarning ? '#ff9100' : '#00e676';
				return {
					fontSize: 100,
					fontWeight: 700,
					color: neonColor,
					style: {
						fontFamily: 'Orbitron, sans-serif',
						lineHeight: 1,
						textShadow: `0 0 ${isCritical ? '20px' : '15px'} ${neonColor}`,
					},
				};

			case 'retro':
				return {
					fontSize: 80,
					fontWeight: 700,
					color: '#30ff30',
					style: {
						fontFamily: 'monospace',
						textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
						letterSpacing: rem(2),
					},
				};

			case 'holo':
				const holoColor = isCritical ? 'rgba(255, 80, 80, 1)' : isWarning ? 'rgba(255, 200, 80, 1)' : 'rgba(120, 220, 255, 1)';
				return {
					fontSize: 60,
					fontWeight: 700,
					color: holoColor,
					style: {
						fontFamily: '"Orbitron", sans-serif',
						letterSpacing: rem(2),
						textShadow: `0 0 15px ${holoColor}`,
					},
				};

			case 'military':
				return {
					fontSize: 60,
					fontWeight: 700,
					color: isCritical ? 'var(--mantine-color-red-4)' : isWarning ? 'var(--mantine-color-yellow-4)' : 'var(--mantine-color-green-4)',
					style: {
						fontFamily: '"Digital-7", "Courier New", monospace',
						letterSpacing: rem(2),
						textShadow: `0 0 5px ${isCritical ? 'var(--mantine-color-red-4)' : isWarning ? 'var(--mantine-color-yellow-4)' : 'var(--mantine-color-green-4)'}`,
					},
				};

			case 'minimal':
				return {
					fontSize: 86,
					fontWeight: 300,
					color: isCritical ? 'var(--mantine-color-red-3)' : 'var(--mantine-color-gray-1)',
					style: {
						fontVariantNumeric: 'tabular-nums',
						letterSpacing: rem(2),
						lineHeight: 1,
					},
				};

			default:
				return {
					fontSize: 60,
					fontWeight: 700,
					color: 'var(--mantine-color-gray-3)',
				};
		}
	};

	const getContainerStyles = () => {
		switch (themeType) {
			case 'classic':
				return {};
			case 'neon':
				return {
					margin: `${rem(20)} 0 ${rem(40)}`,
				};
			case 'retro':
				return {
					backgroundColor: '#052505',
					border: '2px solid #25a025',
					padding: rem(15),
					marginBottom: rem(20),
					boxShadow: 'inset 0 0 10px rgba(0,100,0,0.5)',
				};
			case 'holo':
				return {
					position: 'relative' as 'relative',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: rem(200),
					marginBottom: rem(40),
				};
			case 'military':
				return {
					backgroundColor: '#0e0e0e',
					border: '2px solid #404040',
					borderRadius: rem(4),
					padding: rem(20),
					marginBottom: rem(20),
				};
			case 'minimal':
				return {
					textAlign: 'center' as 'center',
					margin: `${rem(40)} 0`,
				};
			default:
				return {};
		}
	};

	const getLabelStyles = () => {
		switch (themeType) {
			case 'classic':
				return {
					color: 'var(--mantine-color-red-1)',
					fontSize: 'sm',
					style: { letterSpacing: rem(2) },
				};
			case 'neon':
				return {
					color: percentage <= 30 ? 'var(--mantine-color-pink-4)' : 'var(--mantine-color-cyan-4)',
					fontSize: 'md',
					style: {
						textShadow: `0 0 5px ${percentage <= 30 ? 'var(--mantine-color-pink-5)' : 'var(--mantine-color-cyan-5)'}`,
					},
				};
			case 'retro':
				return {
					color: '#30ff30',
					fontSize: 'lg',
					fontWeight: 700,
					style: {
						fontFamily: 'monospace',
					},
				};
			case 'holo':
				return {
					color: percentage <= 30 ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 200, 255, 0.8)',
					fontSize: 'sm',
					style: {
						fontFamily: '"Rajdhani", sans-serif',
						letterSpacing: rem(2),
						textTransform: 'uppercase' as 'uppercase',
					},
				};
			case 'military':
				return {
					color: 'var(--mantine-color-gray-4)',
					fontSize: 'sm',
					fontWeight: 500,
					style: {
						fontFamily: '"Courier New", monospace',
					},
				};
			case 'minimal':
				return {
					color: 'var(--mantine-color-gray-5)',
					fontSize: 'xs',
				};
			default:
				return {
					color: 'var(--mantine-color-gray-5)',
					fontSize: 'sm',
				};
		}
	};

	const styles = getTimeStyles();
	const containerStyles = getContainerStyles();
	const labelStyles = getLabelStyles();
	const isCritical = percentage <= 15;
	const isWarning = percentage <= 30;

	return (
		<Box style={containerStyles}>
			{themeType === 'retro' && (
				<Group justify='space-between' align='center'>
					<Text
						c='#30ff30'
						fz='lg'
						fw={700}
						style={{
							fontFamily: 'monospace',
						}}
					>
						{label || 'TIME REMAINING:'}
					</Text>
					{Icon && (
						<Transition mounted={true} transition='fade' duration={300}>
							{(styles) => (
								<Icon
									size={28}
									color='#30ff30'
									weight='fill'
									style={{
										...styles,
										filter: 'drop-shadow(0 0 3px rgba(0, 255, 0, 0.7))',
										opacity: pulsing && isWarning ? 0.5 : 1,
										transition: 'opacity 300ms ease',
									}}
								/>
							)}
						</Transition>
					)}
				</Group>
			)}

			{themeType === 'military' && (
				<Group justify='space-between' mb={rem(10)}>
					<Text
						fz='sm'
						fw={500}
						c='gray.4'
						style={{
							fontFamily: '"Courier New", monospace',
						}}
					>
						{label || 'T-MINUS:'}
					</Text>
					{Icon && (
						<Transition mounted={true} transition='fade'>
							{(styles) => (
								<Icon
									size={18}
									weight='fill'
									color={isCritical ? '#ff4747' : isWarning ? '#ffa500' : '#75d675'}
									style={{
										...styles,
										opacity: pulsing && isCritical ? 0.5 : 1,
										transition: 'opacity 0.3s ease',
									}}
								/>
							)}
						</Transition>
					)}
				</Group>
			)}

			<Transition mounted={true} transition={isCritical && pulsing && themeType !== 'classic' ? 'scale' : 'fade'} duration={themeType === 'military' ? 200 : 300}>
				{(transitionStyles) => (
					<Box
						ta='center'
						style={{
							...transitionStyles,
							zIndex: themeType === 'holo' ? 2 : 1,
						}}
					>
						<Text
							fz={styles.fontSize}
							fw={styles.fontWeight}
							c={styles.color}
							style={{
								...styles.style,
								opacity: isCritical && pulsing && ['minimal', 'military', 'holo'].includes(themeType) ? 0.8 : 1,
								transition: 'opacity 0.2s ease',
							}}
						>
							{formatTime(time)}
						</Text>

						{label && themeType !== 'retro' && themeType !== 'military' && (
							<Text c={labelStyles.color} fz={labelStyles.fontSize} fw={labelStyles.fontWeight} ta={themeType === 'holo' ? 'center' : undefined} mt={themeType === 'minimal' ? rem(5) : undefined} style={labelStyles.style}>
								{label}
							</Text>
						)}
					</Box>
				)}
			</Transition>

			{secondaryContent}
		</Box>
	);
}