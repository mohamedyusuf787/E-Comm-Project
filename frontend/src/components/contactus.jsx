import React from 'react'

const contactus = () => {
  return (
    <section className='contactus bg-prime mx-4 flex flex-col gap-3 items-center justify-center text-white text-center py-4 px-2 rounded-2xl mt-20'>
       
          <h1 className='text-3xl'>Ready to Get Out New Stuff?</h1>
          <div className="input-box bg-white rounded-4xl flex justify-between px-2 py-1">
            <input className='text-gray-600 focus:border-none focus:outline-none' type="text" placeholder='enter email' />
            <button className='bg-prime text-white rounded-4xl px-3 py-1'>Send now</button>
          </div>
          <div className="contactus-right">
             <h6 className='text-2xl'>Stuffs for home and heed</h6>
          <p className='text-gray-300'>we’ll listen to your needs, identify the best approadch, and then create a bespoke smart V chargin solution thats right for you.</p>
          </div>
         
    </section>
  )
}

export default contactus