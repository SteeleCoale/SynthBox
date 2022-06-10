import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import LogBar from './LogBar'
import Dot from './Dot'

const BoxWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const StyledBox = styled('div')`
  height: 300px;
  width: 300px;
  background-color: aqua;
  position: relative;
`

const Box = (props) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [dots, setDots] = useState([]);
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    const newDots = dots;
    newDots.push({x: x, y: y})
    if (newDots.length > 20) newDots.shift()
    setDots(newDots)
  }, [x, y])

  const boxClick = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    // console.log('x, ', x, "y, ", y)
    setX(x)
    setY(y)
  }

  return (
    <BoxWrapper>
    <StyledBox
      onMouseMove={(e) => boxClick(e)}
      onMouseDown={(e) => boxClick(e)}
      onTouchMove={(e) => boxClick(e)}
      onTouchStart={(e) => boxClick(e)}
    >
      {dots.map((dot) => <Dot x={dot.x} y={dot.y}/>)}
    </StyledBox>
    <LogBar x={x} y={y}/>
    </BoxWrapper>
  )
}

export default Box;