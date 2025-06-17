import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-screen h-screen flex items-center text-white justify-center bg-[#1a1a1a]'>
        {children}
    </div>
  )
}

export default layout