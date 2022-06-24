// DIFFERENT WAYS TO MAKE THE DISTORTION CURVE

// const DEG = Math.PI / 180;

//creates a Float32 array to use in the WaveShaperNode

// export const makeDistortionCurve = (k = 50) => {
//   const n_samples = 44100;
//   const curve = new Float32Array(n_samples);
//   curve.forEach((_, i) => {
//     const x = (i * 2) / n_samples - 1;
//     curve[i] = ((3 + k) * x * 20 * DEG) / (Math.PI + k * Math.abs(x));
//   });
//   return curve;
// }

export const makeDistortionCurve = (amount) => {
	var k = typeof amount === 'number' ? amount : 50,
		n_samples = 44100,
		curve = new Float32Array(n_samples),
		deg = Math.PI / 180,
		i = 0,
		x;
	for (; i < n_samples; ++i) {
		x = (i * 2) / n_samples - 1;
		curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
	}
	return curve;
};
