import styled from 'styled-components';

import Box from './components/Box'

const StyledApp = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <StyledApp>
      <Box />
    </StyledApp>
  );
}

export default App;
