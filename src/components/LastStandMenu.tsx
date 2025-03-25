import { useState } from 'react';
import { Box, Group, Select, SegmentedControl } from '@mantine/core';
import { ThemeColorType, VisualizationType, themeOptions, visualizationOptions } from '../utils/config';

// Timer components
import ClassicTimer from './timers/ClassicTimer';
import RetroTimer from './timers/RetroTimer';
import HoloTimer from './timers/HoloTimer';
import MilitaryTimer from './timers/MilitaryTimer';
import MinimalTimer from './timers/MinimalTimer';

// Reaper components
import ClassicReaper from './reapers/ClassicReaper';
import RetroReaper from './reapers/RetroReaper';
import HoloReaper from './reapers/HoloReaper';
import MilitaryReaper from './reapers/MilitaryReaper';
import MinimalReaper from './reapers/MinimalReaper';

// Glitch components
import ClassicGlitch from './glitches/ClassicGlitch';
import RetroGlitch from './glitches/RetroGlitch';
import HoloGlitch from './glitches/HoloGlitch';
import MilitaryGlitch from './glitches/MilitaryGlitch';
import MinimalGlitch from './glitches/MinimalGlitch';

// Game Over components
import ClassicGameOver from './gameovers/ClassicGameOver';
import RetroGameOver from './gameovers/RetroGameOver';
import HoloGameOver from './gameovers/HoloGameOver';
import MilitaryGameOver from './gameovers/MilitaryGameOver';
import MinimalGameOver from './gameovers/MinimalGameOver';

interface LastStandMenuProps {
	visualizationType?: VisualizationType;
	timeRemaining?: number;
	maxTime?: number;
	percentRemaining?: number;
	showTypeSelector?: boolean;
}

export default function LastStandMenu({ visualizationType: initialVisualizationType = 'timer', timeRemaining = 45, maxTime = 60, percentRemaining = 30, showTypeSelector = false }: LastStandMenuProps) {
	const [themeType, setThemeType] = useState<ThemeColorType>('classic');
	const [visualizationType, setVisualizationType] = useState<VisualizationType>(initialVisualizationType);

	const renderVisualization = () => {
		switch (visualizationType) {
			case 'timer':
				switch (themeType) {
					case 'classic':
						return <ClassicTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'retro':
						return <RetroTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'holo':
						return <HoloTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'military':
						return <MilitaryTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'minimal':
						return <MinimalTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
					default:
						return <ClassicTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
				}

			case 'reaper':
				switch (themeType) {
					case 'classic':
						return <ClassicReaper percentRemaining={percentRemaining} />;
					case 'retro':
						return <RetroReaper percentRemaining={percentRemaining} />;
					case 'holo':
						return <HoloReaper percentRemaining={percentRemaining} />;
					case 'military':
						return <MilitaryReaper percentRemaining={percentRemaining} />;
					case 'minimal':
						return <MinimalReaper percentRemaining={percentRemaining} />;
					default:
						return <ClassicReaper percentRemaining={percentRemaining} />;
				}

			case 'glitch':
				switch (themeType) {
					case 'classic':
						return <ClassicGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'retro':
						return <RetroGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'holo':
						return <HoloGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'military':
						return <MilitaryGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
					case 'minimal':
						return <MinimalGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
					default:
						return <ClassicGlitch timeRemaining={timeRemaining} maxTime={maxTime} />;
				}

			case 'gameover':
				switch (themeType) {
					case 'classic':
						return <ClassicGameOver percentRemaining={percentRemaining} />;
					case 'retro':
						return <RetroGameOver percentRemaining={percentRemaining} />;
					case 'holo':
						return <HoloGameOver percentRemaining={percentRemaining} />;
					case 'military':
						return <MilitaryGameOver percentRemaining={percentRemaining} />;
					case 'minimal':
						return <MinimalGameOver percentRemaining={percentRemaining} />;
					default:
						return <ClassicGameOver percentRemaining={percentRemaining} />;
				}

			default:
				return <ClassicTimer timeRemaining={timeRemaining} maxTime={maxTime} />;
		}
	};

	return (
		<Box>
			<Group mb='md' justify='space-between'>
				<Select label='Theme' value={themeType} onChange={(value) => setThemeType(value as ThemeColorType)} data={themeOptions} style={{ minWidth: 200 }} />

				{showTypeSelector && <SegmentedControl value={visualizationType} onChange={(value) => setVisualizationType(value as VisualizationType)} data={visualizationOptions} />}
			</Group>

			<Box style={{ height: 620, width: '100%' }}>{renderVisualization()}</Box>
		</Box>
	);
}
