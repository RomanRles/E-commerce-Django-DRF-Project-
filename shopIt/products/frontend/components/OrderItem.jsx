import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";

import { getProduct } from '../api/products';
import { useEffect, useState } from 'react';


function OrderItem( {
    products,
    selectedItems={selectedItems},
    setSelectedItems={setSelectedItems},
    productAmount={productAmount},
    setProductAmount={setProductAmount}
}) {
    const [productInfo, setProductInfo] = useState([]);


        useEffect(() => {
            async function loadProductInfo() {
                const temporaryAmounts = {};
                const enrichedProduct = await Promise.all(
                    products.map(async product => {
                        const productInfo = await getProduct(product.product);
                        temporaryAmounts[product.product] = {
                            product: product.product,
                            quantity: product.quantity
                        };

                        return {
                            ...product,
                            ...productInfo
                        };
                    })
                );
                setProductAmount(temporaryAmounts);

                // console.log("Products and Amount", temporaryAmounts);

                setProductInfo(enrichedProduct);
            }

            loadProductInfo();
        }, [products]);

        if (!productInfo) {
            return <p>Loading...</p>;
        }

        function handleAmountChange(product, quantity) {
            setProductAmount(prevAmount => ({
                ...prevAmount,
                [product]: {
                    ...prevAmount[product],
                    quantity: Number(quantity)
                }
            }));
        }

    return (
        <div>
            {productInfo.map((product) => (
                <Card className='mt-3 mb-3' key={product.id}>
                    <Card.Body>
                        <div className="form-check">
                            <input 
                                className="form-check-input"
                                type="checkbox" 
                                checked={!!selectedItems[product.id]}
                                onChange={(e) =>
                                    setSelectedItems(prev => ({
                                        ...prev,
                                        [product.id]: e.target.checked
                                    }))
                                    
                                }
                                id="checkIndeterminate" 
                            />
                        </div>

                        <div className='d-flex justify-content-around'>
                            <Card.Img className='w-25' src={product.images[0].image_url}></Card.Img>
                            <div>
                                <Card.Title>{product.product_name}</Card.Title>

                                <div>
                                    <input type='number' className='btn btn-light' value={productAmount[product.product].quantity} onChange={(e) => handleAmountChange(product.product, e.target.value)} />
                                    <p className='price'>Unity Price: ${product.product_price}</p>

                                    <div className='d-flex-col'>
                                        <p className='m-0 p-0'>Total</p>
                                        <p className="text-decoration-line-through text-secondary price m-0 p-0">${Number(product.item_subtotal + (product.item_subtotal * 1.15)).toFixed(2)} </p>
                                        <p 
                                            className='price m-0 p-1 rounded d-inline bg-success color-white'
                                        >${Number(product.product_price * productAmount[product.product].quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>           
                        

                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default OrderItem;