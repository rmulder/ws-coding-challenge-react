import React from 'react';
import './App.scss';
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
            style={{margin: 'auto'}}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const Products = () => {
  const [products, setProducts] = React.useState(
    () => window.localStorage.getItem('products') || [],
  )

  React.useEffect(() => {
    fetchProducts().then((response) => {
      let products = [];
      response.groups.forEach((product) => {
        product.slides = [];
        product.isToggled = false;
        let currIndex = 0;

        product.images.forEach((image) => {
          product.slides.push({
            image: image.href,
            text: '',
            id: currIndex++
          });
        });

        products.push(product);
      });

      response.groups = products;
      setProducts(response);
      window.localStorage.setItem('products', response)
    })
  }, [])

  const fetchProducts = () => {
    return window
      .fetch('http://localhost:3000/index.json', {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
      .then(r => r.text())
      .then(response => JSON.parse(response));
  }

  return (
    <div className="row">
      {products?.groups?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

const createMarkup = (html) => { return { __html: html }; };

const Product = ({product}) => {
  const [isToggled, setIsToggled] = React.useState(false);

  // console.log(`product: `, product);
  const toggleCarousel = () => {
    product.isToggled = !product.isToggled;
    setIsToggled(product.isToggled);
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 product">
      <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} onClick={toggleCarousel}
          width={product.hero.width} height={product.hero.height} />
        <h2 className="product-name" dangerouslySetInnerHTML={createMarkup(product.name)}></h2>
        <div className="product-price">$
          {(!product.priceRange?.type || product.priceRange?.type === 'sale') ? <span>{product.priceRange?.selling?.low}</span> : null}
          {product.priceRange?.type !== 'sale' ? <span>{product.priceRange?.regular?.low}</span> : null }
          {(!product.price?.type || product.price?.type === 'sale') ? <span>{product.price?.selling?.low}</span> : null }
          {(product.price?.type !== 'sale' && product.price?.type !== 'special') ? <span>{product.price?.regular.toFixed(2)}</span> : null }
          {(product.price?.type === 'sale' || product.price?.type === 'special') ? <span>{product.price?.selling.toFixed(2)}</span> : null}
        </div>
        <div id={product.id + '_carousel'} className={`carousel ${isToggled ? "" : "hidden"}`}>
          <button type="button" className="close close-button" onClick={toggleCarousel} aria-label="Close">
						<span aria-hidden="true" className="cross-symbol">&times;</span>
					</button>
          {product.slides?.length > 0 && <div>
            <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} width={product.hero.width} height={product.hero.height} />
            <Slides product={product}/>
					</div>}
          {product.slides?.length === 0 && <div>
            <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} width={product.hero.width} height={product.hero.height} />
						<h3>Product details not available.</h3>
					</div>}
				</div>
      </div>
  );
}

const App = () => {
  return (
    <div className="App container">
      <Products />
    </div>
  );
}

export default App;
