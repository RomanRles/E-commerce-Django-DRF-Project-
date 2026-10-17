// THIS IS GOING TO BE THE MAIN PAGE
import { getProducts } from "../api/products";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";


function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const products = await getProducts();
            setProducts(products);
        }

        loadProducts();
    }, []);
        console.log(products);

    return (
        <>
            <NavBar />
            <h1>Welcome To E-buy!</h1>

            <div className="container">
                {products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            
            <Footer />
        
        </>
        
    )
}

export default Home;
