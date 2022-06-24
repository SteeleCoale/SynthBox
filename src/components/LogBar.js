import styled from 'styled-components';
import React from 'react';

const StyledP = styled('p')`
	color: white;
	font-size: 20px;
	font-weight: 600;
`

const LogBar = ({ x, y }) => {
	return (
		<>
			<StyledP>X Location: {x}</StyledP>
			<StyledP>Y Location: {y}</StyledP>
		</>
	);
};

export default LogBar;
