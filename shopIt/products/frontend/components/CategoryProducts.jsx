import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import RelatedProductsCarousel from "./RelatedProductsCarousel";


function CategoryProducts({ category }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const productsReturned = await getProducts({
                category: category.name
            });
            console.log(`productsReturnerd = ${productsReturned}` )
            setProducts(productsReturned);
        }

        loadProducts();
    }, [category.name]);


    return(
        <RelatedProductsCarousel products={products} />
    )        
    
}

export { CategoryProducts };