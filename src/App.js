import React from 'react';
import './App.scss';
import Carousel from 'react-bootstrap/Carousel';


function Slides(product) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const myInterval = 5000;
  const wrap = false;
  let autoKey = 1;

  function handleSelect(selectedIndex) {
    // console.log(`activeIndex: `, activeIndex);
    // console.log(`selectedIndex: `, selectedIndex);
    setActiveIndex(selectedIndex);
  }

  product = product.product;
  console.log(`product: `, product);
  console.log(`slides: `, product.slides);
  console.log(`activeIndex: `, activeIndex);
  return (
    <Carousel
      activeIndex={activeIndex}
      interval={myInterval}
      wrap={wrap}
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
/*
      <Carousel.Item key={autoKey++}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=First slide&bg=373940"
          alt="First slide"
          width="363"
          height="363"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key={autoKey++}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=Second slide&bg=282c34"
          alt="Third slide"
          width="363"
          height="363"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key={autoKey++}>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=Third slide&bg=20232a"
          alt="Third slide"
          width="363"
          height="363"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption>
      </Carousel.Item>


						<div uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
							<div uib-slide ng-repeat="slide in product.slides track by slide.id" index="slide.id">
								<img ng-src="{{slide.image}}" style="margin:auto;"  width="{{product.hero.width}}" height="{{product.hero.height}}"/>
							</div>
						</div>


    <Carousel
      activeIndex={activeIndex}
      interval={myInterval}
      wrap={wrap}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=Second slide&bg=282c34"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://picsum.photos/800/400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <Carousel activeIndex={activeIndex} interval={myInterval} wrap={wrap}>
      {product.slide?.map((slide) => (
        <Slide product={product} slide={slide} key={slide.id} />
      ))}
    </Carousel>

    <div uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
      {product.slide?.map((slide) => (
        <Slide product={product} slide={slide} key={slide.id} />
      ))}
    </div>
*/

function Products() {
  const [products, setProducts] = React.useState(
    () => window.localStorage.getItem('products') || [],
  )

  React.useEffect(() => {
    fetchProducts().then((response) => {
      console.log(`=================> products: `, response);

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

  // products = fetchProducts();
  // console.log(`=================> products: `, products);
  return (
    <div>
      {products?.groups?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

function createMarkup(html) { return { __html: html }; };

function Product({product}) {
  const [isToggled, setIsToggled] = React.useState(false);

  function toggleCarousel () {
    product.isToggled = !product.isToggled;
    setIsToggled(!product.isToggled);
  }

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 product">
      <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} onClick={toggleCarousel}
          width={product.hero.width} height={product.hero.height} />
        <h2 className="product-name" dangerouslySetInnerHTML={createMarkup(product.name)}></h2>
        <div className="product-price">$
          {product.priceRange?.type === 'sale' && <span>{ product.priceRange?.selling?.low }</span>}
          {product.priceRange?.type !== 'sale' && <span>{ product.priceRange?.regular?.low }</span>}
        </div>
        <div id={product.id + '_carousel'} className={`carousel ${product.isToggled ? "" : "hidden"}`}>
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

function App() {
  return (
    <div className="App container">
      <div className="row">
        <Products />
      </div>
    </div>
  );
}

export default App;
