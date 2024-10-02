import React from 'react';
import { Carousel } from 'react-bootstrap';
import './ImageCarousel.css';
import slide1 from '../assets/python.jpg';
import slide2 from '../assets/team.jpg';
import slide3 from '../assets/traning.webp';

const ImageCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel interval={3000} pause={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide1}
            alt="Our Mission"
          />
          <Carousel.Caption>
            <h3>Our Mission</h3>
            <p>We were founded with the goal of providing students with training in the world’s most exciting sectors, preparing them for jobs and industries, and preparing them to face competitive challenges.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2}
            alt="Our Vision"
          />
          <Carousel.Caption>
            <h3>Our Vision</h3>
            <p>To create an evident aura of expertise and education that encompasses each graduate and emanates directly from the quality of the individual instructor’s influence and contact with the student.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            alt="V cube"
          />
          <Carousel.Caption>
            <h3>V cube</h3>
            <p>Best Software Coaching Center in Hyderabad is an institute that caters to the needs of students, businessmen, and freelancers wanting to learn, improve, explore, and soar in their careers. Our corporate office is located in Kukatpally, Hyderabad, India and our training centers are in Kukatpally and Ameerpet, Hyderabad, India.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    
  );
};

export default ImageCarousel;
