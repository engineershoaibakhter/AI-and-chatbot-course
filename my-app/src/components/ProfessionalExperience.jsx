import React from 'react';

const ProfessionalExperience = () => {
  return (
    <section className='p-8'>
      <h3 className='text-2xl font-bold mb-4'>Professional Experience</h3>
      <div className='mb-6'>
        <h4 className='font-semibold'>Onde Digital</h4>
        <p>Software Engineer</p>
        <p>Date & Duration</p>
        <ul className='list-disc list-inside'>
          <li>[Description of your responsibilities]</li>
          <li>[Achievements]</li>
        </ul>
      </div>
      <div>
        <h4 className='font-semibold'>4dMagic Company</h4>
        <p>Software Engineer</p>
        <p>Date & Duration</p>
        <ul className='list-disc list-inside'>
          <li>[Description of your responsibilities]</li>
          <li>[Achievements]</li>
        </ul>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
