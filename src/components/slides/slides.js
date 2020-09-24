import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Slides = (product) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const myInterval = 5000;
  const wrap = false;
  const slide = false;

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  }

  product = product.product;
  return (
    <Carousel
      activeIndex={activeIndex}
      interval={myInterval}
      wrap={wrap}
      slide={slide}
      onSelect={handleSelect}
    >
      {product.slides?.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            src={slide.image}
            alt={product.hero.alt}
            width={product.hero.width}
            height={product.hero.height}
            style={{ margin: 'auto' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default Slides;
