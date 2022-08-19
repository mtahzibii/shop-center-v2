import React from 'react';
import {
 MDBCarousel,
 MDBCarouselInner,
 MDBCarouselItem,
 MDBCarouselElement,
 MDBCarouselCaption,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarouselComponent = () => {
 const { products } = useSelector((state) => state.product);

 return (
  <div>
   <Carousel variant='dark' style={{ marginTop: '20px' }}>
    {products.map((product) => (
     <Carousel.Item key={product._id}>
      <Link
       to={`/product/${product._id}`}
       style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(205 210 205)',
       }}
      >
       <Image
        src={product.image}
        alt={product.name}
        fluid
        style={{
         width: '200px',
         height: '200px',
         borderRadius: '50%',
         marginTop: '80px',
         marginBottom: '50px',
        }}
       />
       <Carousel.Caption
        className='carousel-caption'
        style={{ position: 'absolute', top: '10px', marginBottom: '60px' }}
       >
        <h5>{product.name}</h5>
       </Carousel.Caption>
      </Link>
     </Carousel.Item>
    ))}
   </Carousel>
  </div>
 );
};

export default CarouselComponent;
