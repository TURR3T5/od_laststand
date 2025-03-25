import LastStandMenu from './LastStandMenu';

interface ReaperLastStandProps {
	percentRemaining: number;
}

export default function ReaperLastStand({ percentRemaining }: ReaperLastStandProps) {
	return <LastStandMenu visualizationType='reaper' percentRemaining={percentRemaining} />;
}
