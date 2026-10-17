import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOrders } from "../api/products";
import { useState, useEffect } from "react";
import { OrderCard } from "../components/OrderCard";


function Orders() {
    const [pendingOrder, setPendingOrder] = useState(null);
    const [previousOrders, setPreviousOrders] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            const response = await getOrders();
            console.log(response.results);

            const pending = response.results.find(
                order => order.status === "pending"
            );

            const historyOrders = response.results.filter(
                order => order.status !== "pending"
            );

            setPreviousOrders(historyOrders);
            console.log("Previous Orders: ", historyOrders);

            setPendingOrder(pending || null);
            console.log("Pending Order: ", pending);
        }
        loadOrders();
    }, []);

    return (
        <>
            <NavBar />
            <h1>This is your Orders Page</h1>
            
            <h3>Actual Order</h3>

            {pendingOrder && (
                <div>
                    <OrderCard order={pendingOrder} />
                </div>
            )}
            <Footer />

        </>
    )
}

export default Orders;