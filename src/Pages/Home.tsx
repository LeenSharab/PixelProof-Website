import React from 'react';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import HowItWorks from '../components/HowItWorks/HowItWorks';

interface HomeProps {
  language: 'en' | 'ar';
}

const Home: React.FC<HomeProps> = ({ language }) => {
  return (
    <>
      <Hero language={language} />
      <Features language={language} />
      <HowItWorks language={language} />
    </>
  );
};

export default Home;
