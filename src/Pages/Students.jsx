import React from 'react'
import Studenttable from '../components/Studenttable'

function Students() {
  return (
    <div className="flex justify-center">
    <div className="w-full sm:w-1/2 lg:w-1/2">
      <Studenttable />
    </div>
  </div>
  )
}

export default Students