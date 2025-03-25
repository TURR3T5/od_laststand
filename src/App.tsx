import { Container } from '@mantine/core';
import LastStandMenu from './components/LastStandMenu';

export default function App() {
	return (
		<Container size='xl' mt='xl' bg='dark' p='xl' style={{ borderRadius: 20 }}>
			<LastStandMenu showTypeSelector={true} />
		</Container>
	);
}
