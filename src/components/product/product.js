import React from 'react';
import Slides from '../slides/slides';

const createMarkup = (html) => { return { __html: html }; };

const Product = ({ product }) => {
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
        {product.priceRange?.type !== 'sale' ? <span>{product.priceRange?.regular?.low}</span> : null}
        {(!product.price?.type || product.price?.type === 'sale') ? <span>{product.price?.selling?.low}</span> : null}
        {(product.price?.type !== 'sale' && product.price?.type !== 'special') ? <span>{product.price?.regular.toFixed(2)}</span> : null}
        {(product.price?.type === 'sale' || product.price?.type === 'special') ? <span>{product.price?.selling.toFixed(2)}</span> : null}
      </div>
      <div id={product.id + '_carousel'} className={`carousel ${isToggled ? "" : "hidden"}`}>
        <button type="button" className="close close-button" onClick={toggleCarousel} aria-label="Close">
          <span aria-hidden="true" className="cross-symbol">&times;</span>
        </button>
        {product.slides?.length > 0 && <div>
          <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} width={product.hero.width} height={product.hero.height} />
          <Slides product={product} />
        </div>}
        {product.slides?.length === 0 && <div>
          <img src={product.hero.href} alt={product.hero.alt} rel={product.hero.rel} width={product.hero.width} height={product.hero.height} />
          <h3>Product details not available.</h3>
        </div>}
      </div>
    </div>
  );
}

export default Product;
