import React from 'react'

function Container({children}:{children:React.ReactNode}) {
  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-8'>
      {children}
    </div>
  )
}

export default Container
