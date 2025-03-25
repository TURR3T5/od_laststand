import LastStandMenu from './LastStandMenu';

interface TimerLastStandProps {
	timeRemaining: number;
	maxTime: number;
}

export default function TimerLastStand({ timeRemaining, maxTime }: TimerLastStandProps) {
	return <LastStandMenu visualizationType='timer' timeRemaining={timeRemaining} maxTime={maxTime} />;
}
