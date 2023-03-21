import ProductCard from '@/components/ProductCard';
import { data } from '@/data';

function ProductList() {
  return (
    <section className="featured" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="featured__heading">
        Ты сегодня покормил кота?
      </h2>
      <ul className="product-list featured__product-list" role="list">
        {data.map((product) => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ProductList;
