// import styled from 'styled-components';
import React from 'react';

const NoteFreqBar = ({ freq, wave }) => {
	return (
		<>
			<p>Note Frequency: {freq}</p>
			<p>Distortion Factor: {wave}</p>
		</>
	);
};

export default NoteFreqBar;
