# big plan

Make an SPA that will use cursor location and webaudio api to make a touchable field that will change pitch on Y movement, and sound quality on X movement. **i guess this has been achieved**

- slider for volume. 
- Toggle/selector for wave type. 
- Toggle/selector for smooth or scalar movement. Toggle/for type of scale. 
- allow user to input scale to use with a 12 half step selector and then divide touchable reason into parts that represent this. Apply this to box so a touch in one area then correalates to a specific division of the area.

## Cursor Interaction
- get in load cursor location to not be __top left of box__
- animation: goal is to have dots bloom and dissappear
- have it work mobile: change mouse events to pointer events, and or add touch events
- give it responsive styling so when seen on a phone its usable.

## Audio
Connect curosor location to webaudio oscillator. connect oscillator to effects. connect effects to output.
- currently other effects only include distortion. And that needs to be more pronounced.
- I'm not sure why adding more effects into my chain isn't currently working (reverb makes everything silent)
- give user ability to choose which effects to include in their chain?
