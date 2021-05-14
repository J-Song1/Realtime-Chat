import React from 'react'
import { useParams } from 'react-router-dom'

function RoomPage() {
  const { uid } = useParams()

  return (
    <div>
      Room Page {uid}
    </div>
  )
}

export default RoomPage
