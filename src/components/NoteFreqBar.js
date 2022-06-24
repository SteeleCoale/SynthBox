import styled from 'styled-components';
import React from 'react';

const StyledP = styled('p')`
	color: white;
	font-size: 20px;
	font-weight: 600;
`;

const NoteFreqBar = ({ freq, wave }) => {
	return (
		<>
			<StyledP>Note Frequency: {freq} hz</StyledP>
			<StyledP>Distortion Factor: {wave}</StyledP>
		</>
	);
};

export default NoteFreqBar;
