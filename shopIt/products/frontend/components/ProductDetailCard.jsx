// Product detail Card Component
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getOrders, createOrder, addProductItem } from "../api/products";
import { StarRating } from "./StarRating";
import { BoxComments } from "./BoxComments";
import { DescriptionProduct } from "./DescriptionProduct";
import { CategoryProducts } from "./CategoryProducts";

function ProductDetailCard() {
    const [amount, setAmount] = useState(1);

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(() => {
        async function loadProduct() {
            const product = await getProduct(id);
            console.log("API returned:", product);
            setProduct(product);
        }
        loadProduct();

    }, [id]);

    if (!product) {
        return <p>Loading product...</p>;
    }

    const handleAmountChange = (e) => {
        let value = Number(e.target.value);

        // Si borra el número, puedes dejarlo vacío temporalmente o poner 1
        if (e.target.value === '') {
            setAmount('');
            return;
        }

        // No permitir números negativos o menores a 1
        if (value < 1) value = 1;

        // No permitir superar el stock máximo disponible
        if (value > product.stock) value = product.stock;

        setAmount(value);
    };

    async function addToCart(product, amount) {
        try {
            const data = await getOrders({
                status: "pending"
            });

            const pendingOrder = data.results;
            let order = pendingOrder[0];

            if (!order) {
                order = await createOrder({});
            }
            console.log("Using order: ", order);

            const item = await addProductItem(
                order.id,
                product.id,
                amount
            );

            console.log("Product added: ", item);

        } catch (error) {
            console.error("Failed to add product to cart:", error);
            console.error("Error message:", error.message);
        }
    }
    

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex-col justify-content-center align-items-center">
                    <h1>{product.title}</h1>
                    <p className="text-body-secondary">{product.brand}</p>
                    <StarRating rating={product.rating} />
                </div>
                

                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner container-md pt-5 pb-5">
                        <div className="carousel-item active">
                            <img src={product.images[0].image_url} className="border shadow bg-body-tertiary rounded container-sm"></img>
                        </div>
                    </div>
                    
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="container-sm">
                    <p className="price fs-5">${(Number(product.price) * amount).toFixed(2)}</p>
                    <p className="text-decoration-line-through">${(product.price * 1.3).toFixed(2)} </p>
                    {product.stock > 0 && (
                        <>
                            <div className="container-md d-flex flex-column justify-content-center align-items-center gap-2">
                                <p className="align-self-start">Available Stock</p>
                                <button className="btn btn-primary container-fluid" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Amount: {amount} ({product.stock} Availables)
                                </button>

                                <div className="collapse" id="collapseExample">
                                    <div className="d-flex gap-1">
                                        <input type="number" data-bs-toggle="collapse" min="1" max={product.stock} className="btn btn-light" value={amount} onChange={handleAmountChange} />
                                    </div>
                                </div>

                                <button className="btn btn-primary container-fluid" type="submit">
                                    Buy Now
                                </button>
                                <button onClick={() => addToCart(product, amount)} className="btn btn-primary container-fluid" type="button">
                                    Add to Cart
                                </button>
                            </div>


                            <DescriptionProduct description={product.description} />


                            <div className="border shadow bg-body-tertiary rounded container-sm">
                                <BoxComments 
                                    productId={product.id}
                                    comments={product.comments} 
                                /> 
                            </div>

                            <div className="container-sm mt-5 mb-5">
                                <p>Related Products</p>
                                <CategoryProducts category={product.category} />
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
            
        </>
    )
}
export default ProductDetailCard;
