import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
	background-color: aqua;
	position: relative;
`;

const Box = (props) => {
	const [x, setX] = useState('');
	const [y, setY] = useState('');
	const [dots, setDots] = useState([]);
	const [engaged, setEngaged] = useState(false);

	const [freq, SetFreq] = useState('')
	const [wave, setWave] = useState('')



	useEffect(() => {
		const newDots = dots;
		newDots.push({ x: x, y: y });
		if (newDots.length > 20) newDots.shift();
		setDots(newDots);
	}, [x, y]);

	useEffect(() => {
		let percentage = y/500
		let flippedFreq = percentage * 4158.5 + 27.5
		//find midpoint of frequencies, subtract diffence
		let midFreq = 2106.75 // 4158.5/2 + 27.5
		let freqDiff = flippedFreq - midFreq
		let resultFreq = midFreq - freqDiff
		SetFreq(resultFreq)
	}, [x,y])

	const boxClick = (e) => {
		if (engaged){
			const x = e.nativeEvent.offsetX;
			const y = e.nativeEvent.offsetY;
			// console.log('x, ', x, "y, ", y)
			setX(x);
			setY(y);
		}
		else return
	};
	//I think what to do is: 
	// Stop the sound on mouse up
	// Fix the incorrect mouse position
	// tighten the range
	// are the audio nodes actually connected?




	const [ audioContext, setAudioContext ] = useState(new (window.AudioContext || window.webkitAudioContext))
	const [ osc, setOsc ] = useState(audioContext.createOscillator())
	const [ waveType, setWaveType ] = useState('sawtooth')


		let mainGainNode = audioContext.createGain()
		mainGainNode.gain.value = 0;
		
		osc.type = waveType
		osc.frequency.value = freq
		osc.start(audioContext.currentTime)
		
		osc.connect(mainGainNode)
		mainGainNode.connect(audioContext.destination)

	const onMouseDown = () => {
		setEngaged(true)
	}

	const onMouseUp = (osc) => {
		setEngaged(false)
		mainGainNode.gain.value = 0;
	}

	const onMouseMove = (e, osc) => {
		boxClick(e)
	}

	return (
		<BoxWrapper>
			<StyledBox
				onMouseDown={() => onMouseDown()}
				onMouseUp={() => onMouseUp()}
				onMouseMove={(e) => onMouseMove(e)}
				// onTouchMove={(e) => boxClick(e)}
				// onTouchStart={(e) => boxClick(e)}
				// onPointerMove={(e) => boxClick(e)}
				// onPointerDown={(e) => boxClick(e)}
				// onPointerStart={(e) => boxClick(e)}
			>
				{dots.map((dot) => (
					<Dot x={dot.x} y={dot.y} />
				))}
			</StyledBox>
			<LogBar x={x} y={y} />
			<NoteFreqBar freq={freq} wave={wave} />
		</BoxWrapper>
	);
};

export default Box;
