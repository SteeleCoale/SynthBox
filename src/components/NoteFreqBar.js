// import styled from 'styled-components';
import React from 'react';

const NoteFreqBar = ({ freq, wave }) => {
	return (
		<>
			<p>Note Frequency: {freq}</p>
			<p>Wave Shape: {wave}</p>
		</>
	);
};

export default NoteFreqBar;
