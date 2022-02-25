import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
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

class MainCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          className="custom-tag "
          tag="div"
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img 
            src={item.src}
            alt={item.altText} 
            className="carousel-img d-block w-100"
          />
            {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {
            `
            .custom-tag {
                max-width: 100%;
                height: 500px;
                background: black
              }
            .carousel-img {
              object-fit: cover;
              height:500px
            }`
          }
        </style>
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="carousel-fade"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
      </div>
    );
  }
}


export default MainCarousel;