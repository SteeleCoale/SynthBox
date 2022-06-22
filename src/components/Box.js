import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Audio from '../utils/audio';
import LogBar from './LogBar';
import NoteFreqBar from './NoteFreqBar';
import Dot from './Dot';

const BoxWrapper = styled('div')`
	display: flex;
	flex-direction: column;
`;

const StyledBox = styled('div')`
	height: 500px;
	width: 500px;
	background-color: black;
	position: relative;
`;

const Box = (props) => {
	//relates to what you see
	const [x, setX] = useState('');
	const [y, setY] = useState('');
	const [dots, setDots] = useState([]);
	const [engaged, setEngaged] = useState(false);

	const boxRef = useRef();

	useEffect(() => {
		const newDots = dots;
		newDots.push({ x: x, y: y });
		if (newDots.length > 40) newDots.shift();
		setDots(newDots);
	}, [x, y]);

	useEffect(() => {
		let percentage = y / 500;
		let flippedFreq = percentage * 4158.5 + 27.5;
		//find midpoint of frequencies, subtract diffence
		let midFreq = 2106.75; // 4158.5/2 + 27.5
		let freqDiff = flippedFreq - midFreq;
		let resultFreq = midFreq - freqDiff;
		SetFreq(resultFreq);
	}, [x, y]);

	const boxClick = (e) => {
		if (engaged) {
			const x = e.clientX - boxRef.current.getBoundingClientRect().left;
			const y = e.clientY - boxRef.current.getBoundingClientRect().top;
			setX(x);
			setY(y);
		} else return;
	};
	//I think what to do is:
	// Stop the sound on mouse up
	// Fix the incorrect mouse position
	// tighten the range
	// are the audio nodes actually connected?

	// Relates to what you hear
	const [freq, SetFreq] = useState('');
	const [wave, setWave] = useState('');

	// set state to represent initial value of masterGainNode
	const [masterGainValue, setMasterGainValue] = useState(0);

	const onMouseDown = () => {
		setEngaged(true);
	};

	const onMouseUp = (osc) => {
		setEngaged(false);
	};

	const onMouseMove = (e, osc) => {
		boxClick(e);
	};

	return (
		<BoxWrapper>
			<StyledBox
				ref={boxRef}
				onMouseDown={() => onMouseDown()}
				onMouseUp={() => onMouseUp()}
				onMouseMove={(e) => onMouseMove(e)}
				// onTouchMove={(e) => boxClick(e)}
				// onTouchStart={(e) => boxClick(e)}
				// onPointerMove={(e) => boxClick(e)}
				// onPointerDown={(e) => boxClick(e)}
				// onPointerStart={(e) => boxClick(e)}
			>
				{dots.map((dot, index) => (
					<Dot x={dot.x} y={dot.y} key={index}/>
				))}
			</StyledBox>
			<LogBar x={x} y={y} />
			<NoteFreqBar freq={freq} wave={wave} />
		</BoxWrapper>
	);
};

export default Box;
