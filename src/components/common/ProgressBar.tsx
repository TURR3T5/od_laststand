import { Box, Progress, Text, Group, rem } from '@mantine/core';
import { getStatusColor } from '../../utils/colorUtils';

interface ProgressBarProps {
	percentage: number;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	showLabels?: boolean;
	showPercentage?: boolean;
	height?: number;
	reverse?: boolean;
	label?: string;
}

export default function ProgressBar({
	percentage,
	themeType,
	showLabels = true,
	showPercentage = true,
	height = 16,
	reverse = false, // If true, low percentage is good (e.g., reaper distance)
	label,
}: ProgressBarProps) {
	const displayPercentage = reverse ? 100 - percentage : percentage;
	const actualPercentage = reverse ? 100 - percentage : percentage;
	const baseColor = getStatusColor(actualPercentage, themeType);
	const baseColorName = baseColor.split('.')[0];
	const isCritical = actualPercentage <= 15;
	const isWarning = actualPercentage <= 30;

	const getProgressStyles = () => {
		switch (themeType) {
			case 'classic':
				return {
					size: 'xl',
					radius: 'md',
					striped: actualPercentage <= 30,
					animated: actualPercentage <= 30,
					style: {
						height: height ? rem(height) : undefined,
						overflow: 'hidden',
					},
				};

			case 'neon':
				return {
					size: 'lg',
					radius: 'xs',
					style: {
						height: height ? rem(height) : rem(15),
						backgroundColor: 'rgba(0,0,0,0.3)',
						'.mantine-Progress-bar': {
							backgroundImage: `linear-gradient(90deg, 
                ${isCritical ? 'rgba(255,23,68,0.9)' : isWarning ? 'rgba(255,0,240,0.8)' : 'rgba(0,220,255,0.8)'} 0%, 
                ${isCritical ? 'rgba(255,0,128,0.9)' : isWarning ? 'rgba(200,0,255,0.8)' : 'rgba(0,240,255,0.8)'} 100%)`,
							boxShadow: `0 0 10px ${isWarning ? 'rgba(255,0,240,0.5)' : 'rgba(0,220,255,0.5)'}`,
						},
					},
				};

			case 'retro':
				return {
					size: 'xl',
					radius: 0,
					style: {
						backgroundColor: '#052505',
						border: '1px solid #25a025',
						boxShadow: 'inset 0 0 5px rgba(0,50,0,0.5)',
						height: height ? rem(height) : rem(25),
						'.mantine-Progress-bar': {
							backgroundColor: '#30ff30',
							boxShadow: 'inset 0 0 10px rgba(100,255,100,0.5)',
						},
					},
				};

			case 'holo':
				return {
					size: 'md',
					radius: 'xl',
					style: {
						backgroundColor: 'rgba(0,0,0,0.2)',
						'.mantine-Progress-bar': {
							boxShadow: `0 0 10px ${isCritical ? 'rgba(255,50,50,0.8)' : 'rgba(50,150,255,0.8)'}`,
							background: isCritical ? 'linear-gradient(90deg, rgba(255,50,50,0.8), rgba(255,100,100,0.8))' : 'linear-gradient(90deg, rgba(50,150,255,0.8), rgba(100,200,255,0.8))',
						},
					},
				};

			case 'military':
				return {
					size: 'lg',
					radius: 0,
					striped: isCritical,
					animated: isCritical,
					style: {
						backgroundColor: '#1a1a1a',
						border: '1px solid #404040',
						height: height ? rem(height) : rem(25),
					},
				};

			case 'minimal':
				return {
					size: 'sm',
					radius: 'xs',
					style: {
						backgroundColor: 'rgba(0,0,0,0.2)',
					},
				};

			default:
				return {
					size: 'md',
				};
		}
	};

	const progressStyles = getProgressStyles();

	return (
		<Box mt={rem(15)}>
			{(showPercentage || label) && (
				<Group justify='space-between' mb='xs'>
					{label && (
						<Text
							fz='sm'
							c={themeType === 'retro' ? '#30ff30' : 'gray.6'}
							style={{
								fontFamily: ['retro', 'military'].includes(themeType) ? 'monospace' : undefined,
							}}
						>
							{label}
						</Text>
					)}

					{showPercentage && (
						<Text
							fz='sm'
							fw={700}
							c={isCritical ? `${baseColorName}.7` : 'gray.5'}
							style={{
								fontFamily: ['retro', 'military'].includes(themeType) ? 'monospace' : undefined,
								opacity: isCritical && themeType === 'minimal' ? 0.7 : 1,
								transition: 'opacity 0.3s ease',
							}}
						>
							{displayPercentage.toFixed(1)}%
						</Text>
					)}
				</Group>
			)}

			<Progress value={displayPercentage} color={baseColor} {...progressStyles} />

			{showLabels && themeType === 'minimal' && (
				<Group justify='space-between' mt={rem(8)}>
					<Text fz='xs' c='gray.5'>
						{reverse ? '100%' : '0%'}
					</Text>
					<Text fz='xs' c='gray.5'>
						{reverse ? '0%' : '100%'}
					</Text>
				</Group>
			)}
		</Box>
	);
}
