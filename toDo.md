# big plan

Make an SPA that will use cursor location and webaudio api to make a touchable field that will change pitch on Y movement, and sound quality on X movement.

Other features: slider for volume. Toggle/selector for wave type. Toggle/selector for smooth or scalar movement. Toggle/for type of scale. Effervescent tail for where box is currently being touched (maybe like snake game) that will show a trail of some recent number of coordinates visited.

## Cursor location

- mouseevent.offsetX
- mouseevent.offsetY

> make a box.
> figure out how to get mouse location in relation to the box and have that visible on the screen. Flip box transform origin to bottom left. Does that all still work?

> box on top of a box
> can one box sit on top of another and have the underneath box the the one that is divided into 3 octaves work of steps? If on top box background color is transparent, will we see the hovered areas below? And if so, can the top box be the one that is use to show the cursor trail?

## Audio

Connect curosor location to webaudio oscillator. connect oscillator to effects. connect effects to output.
