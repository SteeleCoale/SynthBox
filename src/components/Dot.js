import React from 'react';
import styled from 'styled-components';

const StyledDot = styled('div')`
	position: absolute;
	top: ${({ y }) => y}px;
	left: ${({ x }) => x}px;
	background-color: red;
	border-radius: 50%;
	height: 5px;
	width: 5px;
`;

const Dot = ({ x, y }) => {
	return <StyledDot x={x} y={y} />;
};

export default Dot;
