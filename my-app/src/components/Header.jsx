// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <section className='flex justify-evenly items-center flex-wrap gap-5 p-8'>
      <div className='block'>
        <div className='flex justify-center'>

        <img src="/shoaib.jpeg" alt="Profile" className='rounded-full w-48 h-48' />
        </div>
        <div className='ml-6 mt-5 text-center'>
          <h2 className='font-bold text-3xl'>Shoaib Akhter</h2>
          <p className='text-gray-600'>+92 334 5101 40 | shoaib@gmail.com | Australia</p>
        </div>
      </div>
      <div className='text-left'>
        <h3 className='font-semibold text-xl'>Web Developer</h3>
        <p className='text-gray-600 mt-2 sm:w-[30rem] w-auto'>
          I am a MERN Stack Developer. I work HTML, CSS, JavaScript,
          React, Next JS, Express JS, Node JS, Mongodb and React Native with Firebase
        </p>
      </div>
    </section>
  );
};

export default Header;
