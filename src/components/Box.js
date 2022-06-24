import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Audio from '../utils/audio';
import { makeDistortionCurve } from '../utils/makeDistortionCurve';

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
	//STATE AND FUNCTIONS FOR WHAT YOU SEE
	
	//cursor location in Box
	const [x, setX] = useState('');
	const [y, setY] = useState('');
	//dots (tail displayed)
	const [dots, setDots] = useState([]);
	//used to tell if user is pressing down on mouse when that's the case the tail dots get generated
	const [engaged, setEngaged] = useState(false);

	const boxRef = useRef();

	useEffect(() => {
		const newDots = dots;
		newDots.push({ x: x, y: y });
		if (newDots.length > 40) newDots.shift();
		setDots(newDots);
	}, [x, y]);

	//When engaged and cursor location changes this func translates xy offsets from top left to frequencies within a range
	//probably should extract this to util so range can easily be changed
	useEffect(() => {
		let percentage = y / 500; //500 is current height of box
		let flippedFreq = percentage * 4158.5 + 27.5;
		//find midpoint of frequencies, subtract diffence
		let midFreq = 2106.75; // 4158.5/2 + 27.5
		let freqDiff = flippedFreq - midFreq;
		let resultFreq = midFreq - freqDiff;
		SetFreq(resultFreq);
	}, [x, y]);

	//Sets XY mouse position in state related to where mouse is from top left of page, vs where the outside of the box is.
	const boxClick = (e) => {
		if (engaged) {
			const x = e.clientX - boxRef.current.getBoundingClientRect().left;
			const y = e.clientY - boxRef.current.getBoundingClientRect().top;
			setX(x);
			setY(y);
		} else return;
	};

	//STATE AND FUNCTIONS FOR WHAT YOU HEAR

	const [freq, SetFreq] = useState('');

	const [masterGainValue, setMasterGainValue] = useState(0.5);
	const [oscillatorNode, setOscillatorNode] = useState();
	const [waveShaperNode, setWaveShaperNode] = useState();
	// const [convolverNode, setConvolverNode] = useState();

	const initialize = () => {
		// Connect the masterGainNode to the audio context to allow it to output sound.
		Audio.masterGainNode.connect(Audio.context.destination);
		// Set masterGain Value to 0
		Audio.masterGainNode.gain.setValueAtTime(0.5, Audio.context.currentTime);

		const mainOscillatorNode = Audio.context.createOscillator();
		const distortion = Audio.context.createWaveShaper();
		// const reverb = Audio.context.createConvolver()

		mainOscillatorNode.connect(distortion);
		// reverb.connect(distortion);
		distortion.connect(Audio.masterGainNode);

		setOscillatorNode(mainOscillatorNode);
		setWaveShaperNode(distortion);
		// setConvolverNode(reverb);
	};
	// initialize Audio connect to destination, main gain connect to destinationo/output, create oscillator and put in state on first render
	//remember oscillators are cheap, and once stoped they cannot be restart.
	useEffect(initialize, []);

	const changeMasterVolume = (e) => {
		setMasterGainValue(e.target.value / 100);
	};

	//needed some some user interaction starts the sound. oscillator cannot be started on load.
	const onMouseEnter = () => {
		oscillatorNode.start();
	};

	const onMouseDown = () => {
		//for visuals
		setEngaged(true);
		//for audio
		Audio.masterGainNode.gain.setValueAtTime(
			masterGainValue,
			Audio.context.currentTime
		);
	};

	const onMouseUp = () => {
		//for visuals
		setEngaged(false);
		//for audio
		Audio.masterGainNode.gain.setValueAtTime(0, Audio.context.currentTime);
	};

	const onMouseMove = (e) => {
		//sets xy vals into state.
		boxClick(e);
		//change pitch freq
		oscillatorNode.frequency.value = freq;
		//change distortion val
		waveShaperNode.curve = makeDistortionCurve(x);
		//change reverb
		// console.log('convolver node', convolverNode);
	};

	return (
		<BoxWrapper>
			<StyledBox
				ref={boxRef}
				onMouseDown={() => onMouseDown()}
				onMouseUp={() => onMouseUp()}
				onMouseMove={(e) => onMouseMove(e)}
				onMouseEnter={onMouseEnter}
				// onTouchMove={(e) => boxClick(e)}
				// onTouchStart={(e) => boxClick(e)}
				// onPointerMove={(e) => boxClick(e)}
				// onPointerDown={(e) => boxClick(e)}
				// onPointerStart={(e) => boxClick(e)}
			>
				{dots.map((dot, index) => (
					<Dot x={dot.x} y={dot.y} key={index} />
				))}
			</StyledBox>
			<LogBar x={x} y={y} />
			<NoteFreqBar freq={freq} wave={x} />
			<p>Master Volume: </p>
			<input
				type="range"
				min="0"
				max="100"
				value={masterGainValue * 100}
				onChange={changeMasterVolume}
				className="pad-volume"
			/>
		</BoxWrapper>
	);
};

export default Box;
