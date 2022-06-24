import styled from 'styled-components';

import Box from './components/Box';

const StyledApp = styled('div')`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgb(34, 193, 195);
	background: linear-gradient(
		60deg,
		rgba(34, 193, 195, 1) 0%,
		rgba(155, 45, 253, 1) 100%
	);
`;

function App() {
	return (
		<StyledApp>
			<Box />
		</StyledApp>
	);
}

export default App;
