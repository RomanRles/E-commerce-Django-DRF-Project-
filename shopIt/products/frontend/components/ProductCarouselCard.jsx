import ProductCard from "./ProductCard";

function ProductCarouselCard({ product }) {
    return (
        <ProductCard 
            product={product}
            compact={true}
        />
    );
}
export default ProductCarouselCard;