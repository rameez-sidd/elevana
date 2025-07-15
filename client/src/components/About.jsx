import React from 'react'
import aboutImage from '../assets/images/about-us-img2.png'
import { useSelector } from 'react-redux'

const About = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className={`${user && user?.role === 'admin' ? 'bg-light-green' : 'bg-background-green'} min-h-screen flex items-center`} id='about'>
      <div className='mx-auto max-w-7xl w-full'>
        <div className='flex gap-18 '>
          <div className=' '>
            <img src={aboutImage} alt="" width={1350} />
          </div>
          <div className='flex flex-col gap-10 items-center justify-center'>
            <div className='flex flex-col gap-1.5'>
              <h3 className='text-center text-4xl font-[700]'>Inside <span className='text-grass-green'>Elevana</span></h3>
              <p className='text-center text-lg text-gray-600'>The purpose and people behind the platform</p>
            </div>
            <p className='text-justify leading-6.5'><span className='text-xl font-[600]'>At Elevana</span>, we believe education is the key to personal and collective growth. Our mission is to provide a space where learning is accessible, empowering, and rewarding for both students and educators.
              <br/>
              <br/>
              We offer a modern platform that combines quality content, intuitive design, and seamless interaction. Whether you're exploring new skills or sharing knowledge, Elevana makes the experience simple and engaging.
              <br/>
              <br/>

              Our platform empowers learners to take charge of their education while giving educators the tools to teach, connect, and grow. With a focus on flexibility, ease of use, and meaningful impact, Elevana is built for the future of online learning.
              <br/>
              <br/>

              Driven by a passion for education and a commitment to excellence, we continuously evolve to enhance our features and make learning better for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About