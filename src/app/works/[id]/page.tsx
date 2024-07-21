"use client"; 

import { useParams } from 'next/navigation'
import React from 'react'

const WorkPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Work {id}</h1>
    </div>
  )
}

export default WorkPage
