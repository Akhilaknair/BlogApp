import { asset } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 py-5 sm:flex-row items-center bg-orange-500'>
    
     <div className='flex items-center justify-center '> <Image src={asset.logo} width={50} height={50} alt=""/>Blogger</div>
     <p className='text-sm text-black'>All right reserved. Copyright @blogger</p>
      <div className='flex'>
        <Image src={asset.fb_icon} alt="" width={20}/>
        <Image src={asset.globe} alt="" width={20}/>
        <Image className='ml-1' src={asset.insta_icon} alt="" width={20}/>

      </div>
    </div>
  )
}

export default Footer


