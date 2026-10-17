import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import OrderItem from './OrderItem';

import { useState } from 'react';

function OrderCard({ order }) {
    const [productAmount, setProductAmount] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const hasSelectedItems = Object.values(selectedItems).some(Boolean);

    const totalPrice = order.items.reduce((total, item) => {
        if (!selectedItems[item.product]) {
            return total;
        }

        const quantity =
            productAmount[item.product]?.quantity ?? item.quantity;

        return total + Number(item.product_price) * quantity;
    }, 0);

    console.log("Total:", totalPrice);

    return (
        <>
            <Card className="h-100">
                <Card.Body>
                    <Card.Subtitle>Order Created: {order.created_at} </Card.Subtitle>
                    <OrderItem 
                        products={order.items} 
                        productAmount={productAmount}
                        setProductAmount={setProductAmount}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                    />
                    <Card.Text className='price fs-5'>Total Price: ${totalPrice.toFixed(2)}</Card.Text>
                    <button disabled={!hasSelectedItems} className='btn btn-success'>Buy Selected Products</button>
                </Card.Body>
            </Card>
        </>
    )
}

export { OrderCard };