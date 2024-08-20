import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import ProfessionalExperience from '../components/ProfessionalExperience'
import EducationAndSkills from '../components/EducationAndSkills'

const Resume = () => {
  return (
    <>
    <Navbar />
    <Header />
    <main className='max-w-4xl mx-auto'>
        <ProfessionalExperience />
        <EducationAndSkills />
      </main>
    </>
  )
}

export default Resume