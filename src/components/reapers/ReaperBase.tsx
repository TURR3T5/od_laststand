import { useState, useEffect, ReactNode } from 'react';
import { Box, Text, rem } from '@mantine/core';
import { IconProps } from '@phosphor-icons/react';
import StatusBox from '../common/StatusBox';
import ProgressBar from '../common/ProgressBar';

export interface ReaperBaseProps {
	percentRemaining: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	containerStyles?: React.CSSProperties;
	personIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	reaperIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	statusIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	title?: string;
	progressLabel?: string;
	statusTitle?: string;
	additionalContent?: ReactNode;
	backgroundEffect?: ReactNode;
	customProgressBar?: ReactNode;
}

export default function ReaperBase({ percentRemaining, themeType, containerStyles, personIcon: _PersonIcon, reaperIcon: _ReaperIcon, statusIcon: StatusIcon, title, progressLabel = 'DISTANCE TRACKER', statusTitle = 'STATUS REPORT', additionalContent, backgroundEffect, customProgressBar }: ReaperBaseProps) {
	const [blinking, setBlinking] = useState(false);
	const isDangerous = percentRemaining <= 25;
	const isCritical = percentRemaining <= 10;

	useEffect(() => {
		if (!isCritical) return;

		const blinkInterval = setInterval(() => {
			setBlinking((prev) => !prev);
		}, 500);

		return () => clearInterval(blinkInterval);
	}, [isCritical]);

	// Get status message based on percentage
	const getStatusMessage = () => {
		if (percentRemaining <= 10) {
			return 'Threat has breached outer perimeter. Final defensive measures engaged.';
		} else if (percentRemaining <= 25) {
			return 'Threat approaching at accelerated pace. Defensive options limited.';
		} else {
			return 'Threat detected at safe distance. Continuous monitoring in effect.';
		}
	};

	// Get title based on theme or use provided title
	const getTitle = () => {
		if (title) return title;

		switch (themeType) {
			case 'classic':
				return 'THE REAPER APPROACHES';
			case 'neon':
				return 'ENTITY PROXIMITY ALERT';
			case 'retro':
				return 'HOSTILE DETECTED';
			case 'holo':
				return 'PROXIMITY WARNING';
			case 'military':
				return 'THREAT ASSESSMENT';
			case 'minimal':
				return 'PROXIMITY ALERT';
			default:
				return 'DANGER APPROACHING';
		}
	};

	return (
		<Box style={containerStyles}>
			{/* Background effects */}
			{backgroundEffect}

			{/* Content */}
			<Box style={{ position: 'relative', zIndex: 1 }}>
				{/* Title */}
				<Text
					ta='center'
					fz={themeType === 'minimal' ? 'lg' : themeType === 'retro' ? 40 : 36}
					fw={themeType === 'minimal' ? 500 : 900}
					c={themeType === 'classic' ? (isCritical ? 'red.4' : 'gray.3') : themeType === 'neon' ? (isCritical ? '#ff1744' : isDangerous ? '#ff9100' : '#00e676') : themeType === 'retro' ? '#30ff30' : themeType === 'minimal' ? 'gray.3' : isCritical ? 'red.4' : 'cyan.4'}
					style={{
						textShadow: themeType === 'classic' ? (isCritical ? '0 0 10px rgba(255, 0, 0, 0.6)' : '0 0 10px rgba(0, 0, 0, 0.8)') : themeType === 'neon' ? `0 0 10px ${isCritical ? '#ff1744' : isDangerous ? '#ff9100' : '#00e676'}` : themeType === 'retro' ? '0 0 5px rgba(0, 255, 0, 0.8)' : undefined,
						letterSpacing: themeType === 'classic' ? rem(3) : themeType === 'retro' ? rem(2) : undefined,
						fontFamily: themeType === 'retro' ? 'monospace' : undefined,
					}}
				>
					{getTitle()}
				</Text>

				{/* Subtitle or description */}
				<Text
					ta='center'
					mt='md'
					c={themeType === 'retro' ? '#30ff30' : 'gray.5'}
					fz='sm'
					style={{
						letterSpacing: themeType === 'classic' ? rem(2) : undefined,
						fontFamily: themeType === 'retro' ? 'monospace' : undefined,
					}}
				>
					{isCritical ? 'IMMINENT DEMISE' : isDangerous ? 'DANGER IMMINENT' : 'THREAT DETECTED'}
				</Text>

				{/* Custom Progress Bar or default implementation */}
				{customProgressBar ? (
					customProgressBar
				) : (
					<Box mt={rem(30)} mb={rem(30)}>
						<ProgressBar percentage={percentRemaining} themeType={themeType} label={progressLabel} height={themeType === 'classic' ? 30 : undefined} reverse={true} />
					</Box>
				)}

				{/* Status Box */}
				<StatusBox title={statusTitle} content={getStatusMessage()} themeType={themeType} percentage={percentRemaining} icon={StatusIcon} blinking={blinking} critical={isCritical} />

				{/* Additional content */}
				{additionalContent}
			</Box>
		</Box>
	);
}
