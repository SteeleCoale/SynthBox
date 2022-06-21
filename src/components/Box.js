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

	const [oscillator, setOscillator] = useState(null)

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
	//I think what to do is: create a separate function that is the audio context stuff
	//create mouseDownEvent handler that starts the audio
	//mouseUp handler that stops the audio.

		const audioContext = new (window.AudioContext || window.webkitAudioContext)

		let mainGainNode = audioContext.createGain()
		mainGainNode.gain.value = 0.1;
		
		let osc = audioContext.createOscillator()
		osc.type = 'square'
		// osc.frequency.value = freq
		
		osc.connect(mainGainNode)
		mainGainNode.connect(audioContext.destination)

	const onMouseDown = (osc) => {
		setEngaged(true)
		console.log(osc)
		osc.frequency.value = freq
		audioContext.resume()
		osc.start()
		setTimeout(() => {
			osc.stop()
		}, 1000)
	}

	const onMouseUp = (osc) => {
		setEngaged(false)
	}

	const onMouseMove = (e, osc) => {
		boxClick(e)
		osc.frequency.value = freq
	}

	return (
		<BoxWrapper>
			<StyledBox
				onMouseDown={() => onMouseDown(osc)}
				onMouseUp={() => onMouseUp(osc)}
				onMouseMove={(e) => onMouseMove(e, osc)}
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
