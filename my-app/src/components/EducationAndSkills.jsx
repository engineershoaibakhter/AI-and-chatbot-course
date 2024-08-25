import React from 'react';

const EducationAndSkills = () => {
  return (
    <section className='grid sm:grid-cols-2 gap-8 p-8'>
      <div>
        <h3 className='sm:text-2xl text-xl font-bold mb-4'>Education</h3>
        <p>2021 - 2025</p>
        <p>BSE</p>
        <p>Software Engineer</p>
        <p>BSE</p>
        <p>[Honors]</p>
      </div>
      <div>
        <h3 className='sm:text-2xl text-xl font-bold mb-4'>Skills & Expertise</h3>
        <ul className='list-disc list-inside'>
          <li>Soft skills</li>
          <li>Technical skills</li>
          <li>Languages</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
      </div>
    </section>
  );
};

export default EducationAndSkills;
