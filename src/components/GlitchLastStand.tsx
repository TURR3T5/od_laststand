import LastStandMenu from './LastStandMenu';

interface GlitchLastStandProps {
	timeRemaining: number;
	maxTime: number;
}

export default function GlitchLastStand({ timeRemaining, maxTime }: GlitchLastStandProps) {
	return <LastStandMenu visualizationType='glitch' timeRemaining={timeRemaining} maxTime={maxTime} />;
}
