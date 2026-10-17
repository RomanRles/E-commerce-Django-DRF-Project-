// Create the Products card
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

function ProductCard({ product, compact = false }) {
    return (
        <Link to={`/products/${product.id}`} className='product-card-link'>
            <Card className={`m-3 ${!compact ? "h-100" : ""}`}>
                <Card.Img variant="top" src={product.images[0].image_url} className={compact ? "product-carousel-image" : ""} />
                
                <Card.Body>
                    <Card.Title className={compact ? 'product-carousel-title' : ""}>{product.title}</Card.Title>
                    <Card.Subtitle>{product.brand}</Card.Subtitle>
                    <Card.Text className={compact ? "product-description-compact" : ""}>
                        {product.description}
                    </Card.Text>
                    <Card.Text className='price fs-5'>${product.price}</Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}

export default ProductCard;