import React from 'react';
import Product from '../product/product';

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
    const url = 'http://localhost:3000/index.json';
    return window
      .fetch(url, {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
      .then(r => r.text())
      .then(response => JSON.parse(response));
  }

  return (
    <div className="row" data-testid="Products">
      {products?.groups?.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Products;
