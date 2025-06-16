import React from 'react'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900'>
        {children}
    </div>
  )
}

export default layout