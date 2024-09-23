import React from 'react'
import Navbar from '@/components/navbar/Navbar'
import Sidebar from '@/components/sidebar/Sidebar'

function layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <div className='grid lg:grid-cols-5'>
      <div className="hidden lg:block lg:min-h-screen">
        <Sidebar />
      </div>
      <div className='lg:col-span-4'>
        <Navbar />
        <div className='py-16 px-4 sm:py-8 lg:px-16'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
