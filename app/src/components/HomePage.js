import React from 'react'
import styled from 'styled-components'
import VideoCall from './VideoCall'

const FullContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--main-color-5);

  display: flex;
  justify-content: center;
  align-items: center;
`

function HomePage() {
  return (
    <div>
      <FullContainer>
        <VideoCall />
      </FullContainer>
    </div>
  )
}

export default HomePage