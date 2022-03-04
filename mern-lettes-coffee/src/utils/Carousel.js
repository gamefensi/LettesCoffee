import React from 'react';
import {
  Carousel,
} from 'react-bootstrap';
import img1 from '../images/stock-coffee-bg.jpg';
import img2 from '../images/stockBeans3.jpg';
import img3 from '../images/stockBeans4.jpg';


const items = [
  {
    src: `${img1}`,
    altText: 'Slide 1'
  },
  {
    src: `${img2}`,
    altText: 'Slide 2'
  },
  {
    src: `${img3}`,
    altText: 'Slide 3'
  }
];

function MainCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={items[0].src}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={items[1].src}
          alt="Second slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={items[2].src}
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default MainCarousel;


