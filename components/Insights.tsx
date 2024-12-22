import React from 'react'

const Insights = () => {
  return (
    <div className='flex w-full flex-col items-center justify-between gap-2 rounded-md md:max-w-[360px]'>
      <div className='flex w-full gap-1 md:max-w-[360px]'>
        <div className='flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-950 md:w-[180px]'>
          <div className='space-y-3'>
            <p className='text-3xl font-bold text-gray-500'>26</p>
            <h2 className='max-w-[100px] text-xs font-bold'>
              Clicks en Whatsapp
            </h2>
          </div>
          <img src='/assets/icons/wsp.svg' alt='wsp' className='h-9 w-9' />
        </div>
        <div className='flex w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-950 md:w-[180px]'>
          <div className='space-y-3'>
            <p className='text-3xl font-bold text-gray-500'>12</p>
            <h2 className='max-w-[100px] text-xs font-bold'>
              Veces compartido
            </h2>
          </div>
          <img src='/assets/icons/box.svg' alt='wsp' className='h-8 w-8' />
        </div>
      </div>
    </div>
  )
}

export default Insights
