import { useEffect, useState, ReactNode } from 'react';
import { Box, Text, rem, Transition } from '@mantine/core';
import { IconProps } from '@phosphor-icons/react';
import { formatTime } from '../../utils/formatTime';
import StatusBox from '../common/StatusBox';
import ProgressBar from '../common/ProgressBar';

export interface GlitchBaseProps {
	timeRemaining: number;
	maxTime: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	containerStyles?: React.CSSProperties;
	WarningIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	statusIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	title?: string;
	statusTitle?: string;
	diagnosticTitle?: string;
	additionalContent?: ReactNode;
	backgroundEffect?: ReactNode;
	customProgressBar?: ReactNode;
	customDiagnostics?: ReactNode;
}

export default function GlitchBase({ timeRemaining, maxTime, themeType, containerStyles, WarningIcon: WarningIcon, statusIcon: StatusIcon, title, diagnosticTitle = 'DIAGNOSTIC LOG', additionalContent, backgroundEffect, customProgressBar, customDiagnostics }: GlitchBaseProps) {
	const [time, setTime] = useState(timeRemaining);
	const [glitching, setGlitching] = useState(false);
	const [blinking, setBlinking] = useState(false);
	const percentage = (time / maxTime) * 100;
	const isCritical = percentage <= 15;
	const isWarning = percentage <= 30;

	useEffect(() => {
		if (time <= 0) return;

		const timer = setInterval(() => {
			setTime((prev) => Math.max(0, prev - 1));
		}, 1000);

		return () => clearInterval(timer);
	}, [time]);

	useEffect(() => {
		const glitchInterval = setInterval(() => {
			const shouldGlitch = Math.random() < (percentage <= 30 ? 0.3 : 0.1);
			setGlitching(shouldGlitch);

			if (shouldGlitch) {
				setTimeout(() => {
					setGlitching(false);
				}, Math.random() * 200 + 100);
			}
		}, Math.random() * 1000 + 500);

		const blinkInterval = setInterval(
			() => {
				setBlinking((prev) => !prev);
			},
			isCritical ? 300 : 1000
		);

		return () => {
			clearInterval(glitchInterval);
			clearInterval(blinkInterval);
		};
	}, [percentage, isCritical]);

	// Get title based on theme or use provided title
	const getTitle = () => {
		if (title) return title;

		switch (themeType) {
			case 'classic':
				return 'SYSTEM FAILURE';
			case 'neon':
				return 'SYSTEM CORRUPTION';
			case 'retro':
				return 'CRITICAL ERROR';
			case 'holo':
				return 'SYSTEM INTEGRITY BREACH';
			case 'military':
				return 'SYSTEM MALFUNCTION';
			case 'minimal':
				return 'SYSTEM ERROR';
			default:
				return 'SYSTEM FAILURE';
		}
	};

	// Get danger level based on percentage
	const getDangerLevel = () => {
		if (percentage <= 15) return 'CRITICAL';
		if (percentage <= 30) return 'SEVERE';
		if (percentage <= 50) return 'MODERATE';
		return 'STABLE';
	};

	// Get diagnostic messages based on percentage
	const getDiagnosticMessages = () => {
		if (percentage <= 15) {
			return ['> CRITICAL ERROR: Memory corruption detected in core systems', '> FAILURE: Data integrity check failed', '> EMERGENCY PROTOCOLS ACTIVATED'];
		} else if (percentage <= 30) {
			return ['> WARNING: System stability compromised', '> ERROR: Resource allocation failure', '> INITIATING RECOVERY PROCEDURES'];
		} else {
			return ['> ALERT: Performance degradation detected', '> WARNING: Unexpected behavior in subsystems', '> RUNNING DIAGNOSTICS'];
		}
	};

	// Default diagnostic content
	const defaultDiagnostics = (
		<Box>
			<Text fz='xs' c='gray.4' mb={rem(5)}>
				$ sys.check --verbose
			</Text>

			{getDiagnosticMessages().map((message, index) => (
				<Text key={index} fz='xs' c={message.includes('CRITICAL') || message.includes('FAILURE') ? 'red.4' : message.includes('WARNING') || message.includes('ERROR') ? 'orange.4' : 'cyan.4'} mt={index > 0 ? rem(5) : 0}>
					{message}
				</Text>
			))}
		</Box>
	);

	return (
		<Box style={containerStyles}>
			{/* Background effects */}
			{backgroundEffect}

			{/* Content */}
			<Box style={{ position: 'relative', zIndex: 3 }}>
				{/* Title */}
				<Transition mounted={true} transition={glitching ? { in: { transform: 'translate(-3px, 3px)' }, out: { transform: 'translate(3px, -3px)' }, transitionProperty: 'transform' } : undefined} duration={200}>
					{(transitionStyles) => (
						<Text
							ta='center'
							fz={themeType === 'minimal' ? 'lg' : 36}
							fw={themeType === 'minimal' ? 500 : 900}
							c={themeType === 'classic' ? 'cyan.4' : themeType === 'neon' ? (isCritical ? '#ff1744' : isWarning ? '#ff9100' : '#00e676') : themeType === 'retro' ? '#30ff30' : themeType === 'minimal' ? 'cyan.3' : 'cyan.4'}
							style={{
								textShadow: themeType === 'classic' ? '0 0 10px rgba(0, 200, 255, 0.6)' : themeType === 'neon' ? `0 0 10px ${isCritical ? '#ff1744' : isWarning ? '#ff9100' : '#00e676'}` : themeType === 'retro' ? '0 0 5px rgba(0, 255, 0, 0.8)' : undefined,
								letterSpacing: rem(2),
								fontFamily: ['retro', 'military'].includes(themeType) ? 'monospace' : undefined,
								...(glitching ? transitionStyles : {}),
							}}
						>
							{getTitle()}
						</Text>
					)}
				</Transition>

				{/* Status display */}
				<Box
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: rem(15),
						marginTop: rem(20),
						marginBottom: rem(10),
					}}
				>
					{WarningIcon && <WarningIcon size={32} color={themeType === 'retro' ? '#30ff30' : `var(--mantine-color-cyan-5)`} weight='bold' />}
					<Text
						c={themeType === 'retro' ? '#30ff30' : 'cyan.2'}
						fz='lg'
						fw={700}
						style={{
							fontFamily: themeType === 'retro' || themeType === 'military' ? 'monospace' : undefined,
							letterSpacing: rem(1),
						}}
					>
						STABILIZATION PROTOCOL: {getDangerLevel()}
					</Text>
					{WarningIcon && <WarningIcon size={32} color={themeType === 'retro' ? '#30ff30' : `var(--mantine-color-cyan-5)`} weight='bold' />}
				</Box>

				{/* Progress bar */}
				{customProgressBar || <ProgressBar percentage={percentage} themeType={themeType} height={themeType === 'classic' ? 20 : undefined} />}

				{/* Time display */}
				<Box
					mt={rem(30)}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: `${rem(10)} ${rem(15)}`,
						background: 'rgba(0,0,0,0.6)',
						border: themeType === 'retro' ? '2px solid #25a025' : '1px solid rgba(0,150,200,0.4)',
						borderRadius: rem(4),
					}}
				>
					<Box>
						<Text c='gray.5' fz='sm' fs='italic'>
							Time Remaining:
						</Text>
						<Text
							fz={28}
							fw={700}
							c={themeType === 'retro' ? '#30ff30' : 'cyan.3'}
							style={{
								fontFamily: ['retro', 'military'].includes(themeType) ? 'monospace' : undefined,
								textShadow: '0 0 5px rgba(0, 200, 255, 0.4)',
							}}
						>
							{formatTime(time)}
						</Text>
					</Box>

					<Box style={{ textAlign: 'center' }}>
						{WarningIcon && (
							<Transition mounted={true} transition={glitching ? { in: { transform: 'translateX(-2px)' }, out: { transform: 'translateX(2px)' }, transitionProperty: 'transform' } : undefined} duration={200}>
								{(glitchStyles) => <WarningIcon size={48} color={isCritical ? 'var(--mantine-color-red-7)' : isWarning ? 'var(--mantine-color-orange-7)' : 'var(--mantine-color-yellow-7)'} weight='fill' style={glitching ? glitchStyles : {}} />}
							</Transition>
						)}
						<Text fz='sm' c={isCritical ? 'red.7' : isWarning ? 'orange.7' : 'yellow.7'} fw={700} style={{ fontFamily: 'monospace' }}>
							{percentage.toFixed(1)}%
						</Text>
					</Box>

					<Box style={{ textAlign: 'right' }}>
						<Text c='gray.5' fz='sm' fs='italic'>
							System Status:
						</Text>
						<Text
							fz='lg'
							fw={700}
							c={isCritical ? 'red.7' : isWarning ? 'orange.7' : 'yellow.7'}
							style={{
								fontFamily: 'monospace',
								letterSpacing: rem(1),
								textShadow: '0 0 5px rgba(255, 100, 50, 0.4)',
							}}
						>
							{percentage <= 15 ? 'IMMINENT COLLAPSE' : percentage <= 30 ? 'FAILING RAPIDLY' : percentage <= 50 ? 'UNSTABLE' : 'DEGRADING'}
						</Text>
					</Box>
				</Box>

				{/* Diagnostic box */}
				<StatusBox title={diagnosticTitle} content={customDiagnostics || defaultDiagnostics} themeType={themeType} percentage={percentage} icon={StatusIcon} blinking={blinking} critical={isCritical} />

				{/* Additional content */}
				{additionalContent}

				{/* Emergency warning for critical state */}
				{percentage <= 20 && (
					<Transition mounted={blinking} transition={{ in: { opacity: 1 }, out: { opacity: 0.3 }, transitionProperty: 'opacity' }} duration={1000}>
						{(transitionStyles) => (
							<Text
								ta='center'
								c='red.4'
								fw={700}
								mt='md'
								fz='lg'
								style={{
									fontFamily: 'monospace',
									letterSpacing: rem(1),
									textShadow: '0 0 8px rgba(255, 50, 50, 0.6)',
									...transitionStyles,
								}}
							>
								EMERGENCY PROTOCOLS ACTIVATED
							</Text>
						)}
					</Transition>
				)}
			</Box>
		</Box>
	);
}
