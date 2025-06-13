import React from 'react';
import Slider from 'react-slick';
import { Badge, Button, Card } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const deals = [
  {
    title: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1585386959984-a41552262f1e',
    tag: 'Hot Deal',
    price: '$59.99',
    discount: '20% OFF',
    link: 'https://amazon.in',
  },
  {
    title: 'Smartwatch Series 6',
    image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
    tag: 'Best Pick',
    price: '$199.99',
    discount: '15% OFF',
    link: 'https://flipkart.com',
  },
  {
    title: '4K Action Camera',
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be96c65',
    tag: 'Sale',
    price: '$89.99',
    discount: '25% OFF',
    link: 'https://snapdeal.com',
  },
];

const DealsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section style={{ padding: '3rem', backgroundColor: '#f1f5f9' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>🔥 Featured Deals</h2>
      <Slider {...settings}>
        {deals.map((deal, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <Badge.Ribbon text={deal.tag} color="red">
              <Card
                hoverable
                style={{ width: 300, textAlign: 'center' }}
                cover={<img alt={deal.title} src={deal.image} style={{ height: 200, objectFit: 'cover' }} />}
              >
                <h3>{deal.title}</h3>
                <p style={{ color: 'green', fontWeight: 'bold' }}>{deal.discount}</p>
                <p style={{ fontSize: '18px' }}>{deal.price}</p>
                <Button type="primary" href={deal.link} target="_blank" icon="💸">
                  Buy Now
                </Button>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default DealsCarousel;
