import { Box, Text, Group, rem } from '@mantine/core';
import { IconProps } from '@phosphor-icons/react';
import { ReactNode } from 'react';
import { getStatusColor } from '../../utils/colorUtils';

interface StatusBoxProps {
	title: string;
	content: string | ReactNode;
	themeType: 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
	percentage: number;
	icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	secondaryIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
	blinking?: boolean;
	critical?: boolean;
}

export default function StatusBox({ title, content, themeType, percentage, icon: Icon, secondaryIcon: SecondaryIcon, blinking = false, critical = false }: StatusBoxProps) {
	const baseColor = getStatusColor(percentage, themeType);
	const baseColorName = baseColor.split('.')[0];

	const getBackgroundByTheme = () => {
		switch (themeType) {
			case 'classic':
				return {
					backgroundColor: 'rgba(30, 0, 0, 0.3)',
					border: `1px solid var(--mantine-color-${baseColorName}-7)`,
					borderRadius: rem(4),
				};
			case 'neon':
				return {
					backgroundColor: 'rgba(0, 10, 30, 0.3)',
					border: `1px solid ${percentage <= 30 ? 'rgba(255, 0, 240, 0.3)' : 'rgba(0, 200, 255, 0.3)'}`,
					borderRadius: rem(4),
					boxShadow: `0 0 10px ${percentage <= 30 ? 'rgba(255, 0, 240, 0.2)' : 'rgba(0, 200, 255, 0.2)'}`,
				};
			case 'retro':
				return {
					backgroundColor: percentage <= 15 ? '#500000' : '#052505',
					border: `2px solid ${percentage <= 15 ? '#cc0000' : '#25a025'}`,
					boxShadow: 'inset 0 0 10px rgba(0,100,0,0.5)',
				};
			case 'holo':
				return {
					backgroundColor: `rgba(${percentage <= 30 ? '40, 10, 10' : '10, 20, 40'}, 0.4)`,
					borderRadius: rem(6),
					border: `1px solid ${percentage <= 30 ? 'rgba(255, 100, 100, 0.3)' : 'rgba(100, 200, 255, 0.3)'}`,
					backdropFilter: 'blur(4px)',
				};
			case 'military':
				return {
					backgroundColor: '#0e0e0e',
					border: `2px solid ${percentage <= 15 ? '#600' : '#404040'}`,
					borderRadius: rem(4),
				};
			case 'minimal':
				return {
					padding: rem(15),
					backgroundColor: percentage <= 15 ? 'rgba(20,0,0,0.2)' : 'rgba(20,20,20,0.5)',
					borderRadius: rem(4),
					border: `1px solid ${percentage <= 15 ? 'rgba(255,0,0,0.1)' : 'rgba(255,255,255,0.05)'}`,
				};
			default:
				return {};
		}
	};

	return (
		<Box
			mt={rem(20)}
			style={{
				padding: rem(15),
				...getBackgroundByTheme(),
			}}
		>
			<Group justify='space-between' mb={rem(10)}>
				<Group gap={rem(8)}>
					{Icon && (
						<Icon
							size={20}
							weight={themeType === 'retro' || themeType === 'holo' ? 'fill' : 'bold'}
							color={`var(--mantine-color-${baseColor})`}
							style={{
								opacity: blinking && critical ? 0.7 : 1,
								transition: 'opacity 0.2s ease',
								...(themeType === 'neon' || themeType === 'retro' || themeType === 'holo' ? { filter: `drop-shadow(0 0 3px var(--mantine-color-${baseColor}))` } : {}),
							}}
						/>
					)}
					<Text
						fz={themeType === 'military' ? 'sm' : 'xs'}
						fw={500}
						c={themeType === 'retro' ? '#30ff30' : baseColor}
						style={{
							fontFamily: themeType === 'retro' || themeType === 'military' ? 'monospace' : undefined,
							...(themeType === 'retro' || themeType === 'holo' ? { textShadow: `0 0 5px var(--mantine-color-${baseColor})` } : {}),
						}}
					>
						{title}
					</Text>
				</Group>

				{SecondaryIcon && (
					<SecondaryIcon
						size={20}
						color={`var(--mantine-color-${baseColor})`}
						weight={themeType === 'retro' || themeType === 'neon' ? 'fill' : 'bold'}
						style={{
							opacity: blinking && critical ? 0.7 : 1,
							transition: 'opacity 0.2s ease',
						}}
					/>
				)}
			</Group>

			{typeof content === 'string' ? (
				<Text
					fz={themeType === 'military' ? 'sm' : 'xs'}
					c={themeType === 'retro' ? (critical ? '#ff3030' : '#30ff30') : themeType === 'holo' ? baseColor : 'gray.5'}
					style={{
						fontFamily: themeType === 'retro' || themeType === 'military' ? 'monospace' : undefined,
						fontWeight: themeType === 'minimal' ? 300 : undefined,
					}}
				>
					{content}
				</Text>
			) : (
				content
			)}
		</Box>
	);
}
