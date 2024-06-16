import React from 'react';
import './About.css';
import logo from './Report/Client/Logo.jpeg';
import sample from './Pictures/selling picture.jpg'

const About = () => {
  return (
    <div className='about'>
      <header className='header'>
        <img src={logo} alt='logo' height={100} />
        <h1 className='headername'>About Us</h1>
      </header>
      <main>
        <p>Welcome to our online selling platform. We offer a wide range of products for direct selling and bid-selling.</p>
        <p>At our platform, you can buy and sell various products, making it convenient for both sellers and buyers.</p>
        <p>We strive to provide a seamless and secure experience for our users, ensuring trust and reliability.</p>
        <p>Thank you for choosing our platform for your online buying and selling needs.</p>
      </main>
      <marquee><img src={sample} alt='sample' /></marquee>
    </div>
  );
};

export default About;
