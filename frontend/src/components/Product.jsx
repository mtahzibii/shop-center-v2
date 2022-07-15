import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
 return (
  <Card className='rounded mb-5 p-3'>
   <Link to={`/product/${product._id}`}>
    <Card.Img variant='top' src={product.image} />
   </Link>

   <Card.Body>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
     <Card.Title as='div' style={{ height: '50px' }}>
      <strong>{product.name}</strong>
     </Card.Title>
    </Link>
    <Card.Text as='div'>
     <div className='my-3'>
      <Rating
       value={product.rating}
       text={`${product.numReviews} reviews`}
       color='orange'
      />
     </div>
    </Card.Text>

    <Card.Text as='h3' style={{ letterSpacing: '1px' }}>
     ${product.price}
    </Card.Text>
   </Card.Body>
  </Card>
 );
};

export default Product;
