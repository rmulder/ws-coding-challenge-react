import React from 'react';
import './App.scss';

function Products() {
  const [products, setProducts] = React.useState(
    () => window.localStorage.getItem('products') || [],
  )

  React.useEffect(() => {
    fetchProducts().then((response) => {
      console.log(`=================> products: `, response);
      console.log(`=================> products.groups: `, response.groups);

      let products = [];
      response.groups.forEach((product) => {
        // product.name = dangerouslySetInnerHTML(product.name);
        product.isToggled = false;
        product.slides = [];
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

  /*
  function toggleCarousel(product) {
    product.isToggled = !product.isToggled;
    const $el = document.getElementById(product.id + '_carousel');
    if (product.isToggled) {
      $el.removeClass('hidden');
    } else {
      $el.addClass('hidden');
    }
  }
*/

  function fetchProducts () {
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
  const toggleCarousel = (product) => {
    console.log(`product: `, product);
    product.isToggled = !product.isToggled;
    const $el = document.getElementById(product.id + '_carousel');
    console.log(`$el: `, $el);
    /*if (product.isToggled) {
      $el.removeClass('hidden');
    } else {
      $el.addClass('hidden');
    }*/
  }

  return (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 product">
        <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} onClick={toggleCarousel(product)}
          width={product.hero.width} height={product.hero.height} />
      <h2 className="product-name" dangerouslySetInnerHTML={createMarkup(product.name)}></h2>
        <div className="product-price">$
          {product.priceRange?.type === 'sale' && <span>{ product.priceRange?.selling?.low }</span>}
          {product.priceRange?.type !== 'sale' && <span>{ product.priceRange?.regular?.low }</span>}
        </div>
        <div id={product.id + '_carousel'} className="carousel hidden">
          <button type="button" className="close close-button" onClick={toggleCarousel(product)} aria-label="Close">
            <span aria-hidden="true" className="cross-symbol">&times;</span>
          </button>
          {product.slides?.length > 0 && <div>
            <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} width={product.hero.width} height={product.hero.height} />
              <div uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
                <div uib-slide ng-repeat="slide in product.slides track by slide.id" index="slide.id">
                  <img src="{slide.image}" width="{product.hero.width}" height="{product.hero.height}" alt="{product.hero.alt}"/>
							  </div>
              </div>
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
