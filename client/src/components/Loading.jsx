import React from 'react'

const Loading = ({size}) => {
  return (
    <div className={`flex items-center w-full justify-center h-${size} bg-transparent`}>
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#163d3b] rounded-full animate-spin mx-auto"></div>

    </div>

  )
}

export default Loading