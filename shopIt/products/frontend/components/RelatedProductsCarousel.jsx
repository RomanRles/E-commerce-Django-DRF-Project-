// Create Carousel based on products received 
import Carousel from 'react-bootstrap/Carousel';
import ProductCarouselCard from './ProductCarouselCard';

function groupProducts(products, cardsPerSlide) {
    const groups = [];

    for (let i = 0; i < products.length; i += cardsPerSlide) {
        groups.push(products.slice(i, i + cardsPerSlide));
    }

    return groups;
}

function RelatedProductsCarousel({ products }) {
    const slides = groupProducts(products, 3);
    
    return (
        <Carousel data-bs-theme="dark">
            {slides.map((slide, index) => (
                <Carousel.Item key={index} className='p-2 mt-3 mb-3'>
                    <div className='d-flex gap-3'>
                        {slide.map(product => (
                            <div className='flex-fill' key={product.id} >
                                <ProductCarouselCard product={product} />
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
export default RelatedProductsCarousel;