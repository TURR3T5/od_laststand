import LastStandMenu from './LastStandMenu';

interface GameOverLastStandProps {
	percentRemaining: number;
}

export default function GameOverLastStand({ percentRemaining }: GameOverLastStandProps) {
	return <LastStandMenu visualizationType='gameover' percentRemaining={percentRemaining} />;
}
