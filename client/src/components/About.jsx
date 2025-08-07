import React from 'react'
import aboutImage from '../assets/images/about-us-img2.png'
import { useSelector } from 'react-redux'

const About = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className={`${user && user?.role === 'admin' ? 'bg-light-green' : 'bg-background-green'} pb-14 md:py-23 md:px-4 md:pt-14 xl:px-0 min-h-screen flex items-center`} id='about'>
      <div className='mx-auto max-w-7xl w-full'>
        <div className='flex flex-col md:flex-row gap-8 md:gap-0 xl:gap-18 '>
          <div className='flex items-center p-2 xs:p-5 md:p-0'>
            <img src={aboutImage} alt="" width={1350} className='md:w-[2500px] lg:w-[1350px]' />
          </div>
          <div className='flex flex-col px-2 xs:px-2.5 sm:px-3.5 md:pl-6 md:pr-2 xl:pr-6 2xl:px-0 gap-5 sm:gap-7 md:gap-6 lg:gap-10 items-center justify-center'>
            <div className='flex flex-col gap-0 sm:gap-1.5 md:gap-2'>
              <h3 className='text-center text-[23px] sm:text-2xl md:text-3xl lg:text-4xl font-[700]'>A Look Inside <span className='text-grass-green'>Elevana</span></h3>
              <p className='text-center text-[13px] sm:text-[15px] md:text-[17px] lg:text-lg g text-gray-600'>The purpose and people behind the platform</p>
            </div>
            <p className='hidden md:block lg:hidden text-justify text-sm sm:text-[15px] lg:text-base leading-6 sm:leading-6.5'>
              <span className='text-[17px] sm:text-lg md:text-xl font-[600]'>At Elevana</span>, we believe education should be accessible, empowering, and impactful. Our platform brings together quality content, intuitive design, and seamless interaction to make learning simple and rewarding. Whether you're a student exploring new skills or an educator sharing knowledge, Elevana provides the tools to grow, connect, and succeed. With a focus on flexibility and continuous improvement, we're building the future of online learning.
            </p>
            <p className='md:hidden lg:block text-justify text-sm sm:text-[15px] lg:text-base leading-6 sm:leading-6.5'><span className='text-[17px] sm:text-lg md:text-xl font-[600]'>At Elevana</span>, we believe education is the key to personal and collective growth. Our mission is to provide a space where learning is accessible, empowering, and rewarding for both students and educators.
              <br />
              <br />
              We offer a modern platform that combines quality content, intuitive design, and seamless interaction. Whether you're exploring new skills or sharing knowledge, Elevana makes the experience simple and engaging.
              <br />
              <br />

              Our platform empowers learners to take charge of their education while giving educators the tools to teach, connect, and grow. With a focus on flexibility, ease of use, and meaningful impact, Elevana is built for the future of online learning.
              <br />
              <br />

              Driven by a passion for education and a commitment to excellence, we continuously evolve to enhance our features and make learning better for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About