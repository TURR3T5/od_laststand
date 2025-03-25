import { Box, rem, Transition, Text } from '@mantine/core';
import { Person, Skull, Target } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import ReaperBase from './ReaperBase';
import ProgressBar from '../common/ProgressBar';

interface ClassicReaperProps {
	percentRemaining: number;
}

const fadeInOut = {
	in: { opacity: 0.8 },
	out: { opacity: 0.3 },
	transitionProperty: 'opacity',
};

const floatTransition = {
	in: { transform: 'translateY(-5px)' },
	out: { transform: 'translateY(0)' },
	transitionProperty: 'transform',
};

export default function ClassicReaper({ percentRemaining }: ClassicReaperProps) {
	const [fadeState, setFadeState] = useState(false);
	const [floatState, setFloatState] = useState(false);

	const isDangerous = percentRemaining <= 25;
	const isCritical = percentRemaining <= 10;

	useEffect(() => {
		const fadeInterval = setInterval(() => {
			setFadeState((prev) => !prev);
		}, 2000);

		const floatInterval = setInterval(() => {
			setFloatState((prev) => !prev);
		}, 1000);

		return () => {
			clearInterval(fadeInterval);
			clearInterval(floatInterval);
		};
	}, []);

	// Custom progress bar with reaper and person icons
	const customProgressBar = (
		<Box mt={rem(50)} mb={rem(60)}>
			<Box style={{ position: 'relative' }}>
				<ProgressBar percentage={percentRemaining} themeType='classic' height={60} reverse={true} showLabels={false} showPercentage={false} />

				<Transition mounted={floatState} transition={floatTransition} duration={1000}>
					{(transitionStyles) => (
						<Box
							style={{
								position: 'absolute',
								top: 0,
								left: `calc(${100 - percentRemaining}% - 35px)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'left 1s ease-in-out',
								...transitionStyles,
							}}
						>
							<Skull
								size={70}
								weight='fill'
								color={isCritical ? '#ff4d4d' : isDangerous ? '#ff8080' : '#d1d1d1'}
								style={{
									filter: `drop-shadow(0 0 8px ${isCritical ? 'rgba(255,0,0,0.8)' : 'rgba(0,0,0,0.8)'})`,
								}}
							/>
						</Box>
					)}
				</Transition>

				<Box
					style={{
						position: 'absolute',
						top: rem(5),
						left: rem(15),
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Person size={50} weight='fill' color='#eaeaea' />
				</Box>
			</Box>
		</Box>
	);

	// Additional content for critical state
	const additionalContent = (
		<>
			<Transition mounted={isCritical || isDangerous ? fadeState : true} transition={fadeInOut} duration={isCritical ? 800 : 1500}>
				{(transitionStyles) => (
					<Text
						ta='center'
						mt={rem(30)}
						c={isCritical ? 'red.3' : isDangerous ? 'red.5' : 'gray.4'}
						fw={700}
						style={{
							textShadow: isCritical ? '0 0 8px rgba(255, 0, 0, 0.6)' : '0 0 5px rgba(0, 0, 0, 0.8)',
							...transitionStyles,
						}}
					>
						{isCritical ? 'PREPARE FOR THE END' : isDangerous ? 'SURVIVAL CHANCES DIMINISHING' : `${percentRemaining}% DISTANCE REMAINING`}
					</Text>
				)}
			</Transition>

			{isCritical && (
				<Box
					mt={rem(20)}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: rem(15),
						padding: rem(10),
						backgroundColor: 'rgba(50, 0, 0, 0.5)',
						borderRadius: rem(4),
						border: '1px solid var(--mantine-color-red-8)',
					}}
				>
					<Skull size={28} weight='fill' color='var(--mantine-color-red-3)' />
					<Text ta='center' c='red.2' fz='sm' fw={700} style={{ letterSpacing: rem(1), fontFamily: 'monospace' }}>
						FATAL THRESHOLD APPROACHING
					</Text>
					<Skull size={28} weight='fill' color='var(--mantine-color-red-3)' />
				</Box>
			)}
		</>
	);

	// Background effect
	const backgroundEffect = (
		<Box
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: `
          radial-gradient(circle at 50% 50%, 
          rgba(${isCritical ? '180, 0, 0' : '30, 30, 50'}, 0.3) 0%, 
          rgba(0, 0, 0, 0.9) 70%)
        `,
				zIndex: 0,
				animationName: 'fadeInOut',
				animationDuration: '4s',
				animationIterationCount: 'infinite',
				animationTimingFunction: 'ease-in-out',
				'@keyframes fadeInOut': {
					'0%': { opacity: 0.3 },
					'50%': { opacity: 0.8 },
					'100%': { opacity: 0.3 },
				},
			}}
		/>
	);

	return (
		<ReaperBase
			percentRemaining={percentRemaining}
			themeType='classic'
			personIcon={Person}
			reaperIcon={Skull}
			statusIcon={Target}
			customProgressBar={customProgressBar}
			additionalContent={additionalContent}
			backgroundEffect={backgroundEffect}
			containerStyles={{
				padding: 'var(--mantine-spacing-xl)',
				borderRadius: 'var(--mantine-radius-md)',
				background: 'linear-gradient(180deg, rgba(30,30,30,1) 0%, rgba(15,15,15,1) 100%)',
				border: `${rem(2)} solid var(--mantine-color-dark-6)`,
				height: '100%',
				position: 'relative',
				overflow: 'hidden',
			}}
		/>
	);
}
