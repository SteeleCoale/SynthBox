import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bloomAnimation = keyframes`
0% {
	transform: scale(100%);
	background-color: blue;
}
50% {
	transform: scale(500%);
	background-color: orange;
}
100% {
	transform: scale(100%);
	background-color: blue;
}
`;

const StyledDot = styled('div')`
	position: absolute;
	top: ${({ y }) => y}px;
	left: ${({ x }) => x}px;
	background-color: blue;
	border-radius: 50%;
	height: 5px;
	width: 5px;
	animation-name: ${bloomAnimation};
	animation-duration: 3s;
	animation-iteration-count: infinite;

`;

const Dot = ({ x, y }) => {
	const dotRef = useRef()
	return <StyledDot ref={dotRef} x={x} y={y} />;
};

export default Dot;
