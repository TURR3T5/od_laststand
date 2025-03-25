import { useEffect, useState } from 'react';
import { Box, Text, rem } from '@mantine/core';
import TimeDisplay from '../common/TimeDisplay';
import ProgressBar from '../common/ProgressBar';
import StatusBox from '../common/StatusBox';
import { IconProps } from '@phosphor-icons/react';
import { ReactNode } from 'react';

export interface TimerBaseProps {
	timeRemaining: number;
	maxTime: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	containerStyles?: React.CSSProperties;
	timeIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	statusIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	title?: string;
	timeLabel?: string;
	progressLabel?: string;
	statusTitle?: string;
	additionalContent?: ReactNode;
	backgroundEffect?: ReactNode;
}

export default function TimerBase({ timeRemaining, maxTime, themeType, containerStyles, timeIcon, statusIcon, title, timeLabel = 'TIME REMAINING', progressLabel = 'SYSTEM INTEGRITY', statusTitle = 'SYSTEM STATUS', additionalContent, backgroundEffect }: TimerBaseProps) {
	const [time, setTime] = useState(timeRemaining);
	const [pulsing, setPulsing] = useState(false);
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
		const pulseInterval = setInterval(
			() => {
				setPulsing((prev) => !prev);
			},
			isCritical ? 500 : 1000
		);

		return () => clearInterval(pulseInterval);
	}, [isCritical]);

	// Get status message based on percentage
	const getStatusMessage = () => {
		if (percentage <= 15) {
			return 'CRITICAL SYSTEM FAILURE IMMINENT';
		} else if (percentage <= 30) {
			return 'WARNING: SYSTEM STABILITY COMPROMISED';
		} else if (percentage <= 50) {
			return 'CAUTION: PERFORMANCE DEGRADATION DETECTED';
		} else {
			return 'SYSTEM OPERATING WITHIN NORMAL PARAMETERS';
		}
	};

	// Get title based on theme or use provided title
	const getTitle = () => {
		if (title) return title;

		switch (themeType) {
			case 'classic':
				return 'LAST STAND';
			case 'neon':
				return 'COUNTDOWN';
			case 'retro':
				return 'SYSTEM COUNTDOWN';
			case 'holo':
				return 'SYSTEM TIMER';
			case 'military':
				return 'TACTICAL COUNTDOWN';
			case 'minimal':
				return 'COUNTDOWN';
			default:
				return 'TIMER';
		}
	};

	return (
		<Box style={containerStyles}>
			{/* Background effects */}
			{backgroundEffect}

			{/* Content */}
			<Box style={{ position: 'relative', zIndex: 1 }}>
				{/* Title */}
				{themeType !== 'military' && (
					<Text
						ta='center'
						fz={themeType === 'minimal' ? 'lg' : themeType === 'retro' ? 40 : 36}
						fw={themeType === 'minimal' ? 500 : 900}
						c={themeType === 'classic' ? 'red.0' : themeType === 'neon' ? (isCritical ? '#ff1744' : isWarning ? '#ff9100' : '#00e676') : themeType === 'retro' ? '#30ff30' : themeType === 'minimal' ? 'gray.3' : 'cyan.4'}
						style={{
							textShadow: themeType === 'classic' ? '0 0 10px rgba(255, 0, 0, 0.8)' : themeType === 'neon' ? `0 0 10px ${isCritical ? '#ff1744' : isWarning ? '#ff9100' : '#00e676'}` : themeType === 'retro' ? '0 0 5px rgba(0, 255, 0, 0.8)' : undefined,
							letterSpacing: themeType === 'classic' ? rem(3) : themeType === 'retro' ? rem(2) : undefined,
							fontFamily: themeType === 'retro' ? 'monospace' : undefined,
							opacity: isCritical && themeType === 'classic' && pulsing ? 0.5 : 1,
							transition: 'opacity 0.5s ease',
							marginBottom: ['classic', 'retro'].includes(themeType) ? rem(20) : undefined,
						}}
					>
						{getTitle()}
					</Text>
				)}

				{/* Time display */}
				<TimeDisplay time={time} themeType={themeType} percentage={percentage} pulsing={pulsing} label={timeLabel} icon={timeIcon} />

				{/* Progress bar */}
				<ProgressBar percentage={percentage} themeType={themeType} label={progressLabel} height={themeType === 'classic' ? 20 : undefined} />

				{/* Status box */}
				<StatusBox title={statusTitle} content={getStatusMessage()} themeType={themeType} percentage={percentage} icon={statusIcon} blinking={pulsing} critical={isCritical} />

				{/* Additional content */}
				{additionalContent}
			</Box>
		</Box>
	);
}
