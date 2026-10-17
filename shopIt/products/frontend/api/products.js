// Product endpoints helper function
import { authFetch } from './http'

async function getProducts(filters = {}) {
    const url = new URL('http://127.0.0.1:8000/products/');

    Object.entries(filters).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        return data.results;
    } catch (error) {
        throw error;
    }
}

async function getProduct(id) {
    const url = `http://127.0.0.1:8000/products/${id}/`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    
}

async function createComment(productId, comment) {
    const url = `http://127.0.0.1:8000/products/${productId}/comments/`;

    const response = await authFetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            comment: comment,
        }),
    });
    

    const data = await response.json();

    if (!response.ok) {
        console.log("Django error:", data);
        throw new Error(`HTTP error Status: ${response.status}`);
    }

    return data;
}


async function getOrders( filters={} ) {
    const params = new URLSearchParams(filters);

    const queryString = params.toString();

    const url = queryString
        ? `http://localhost:8000/orders/?${queryString}`
        : `http://localhost:8000/orders/`;

    const response = await authFetch(
        url, 
        {
            method: "GET"
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(`HTTP Error Status ${response.status}`);
    }

    
    return await response.json();
}


async function createOrder(orderData) {
    const response = await authFetch(
        "http://127.0.0.1:8000/orders/",
        {
            method: "POST",
            body: JSON.stringify(orderData)
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Django order error: ", errorData);

        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

async function addProductItem(orderId, productId, quantity) {
    const response = await authFetch(
        `http://127.0.0.1:8000/orders/${orderId}/items/`,
        {
            method: "POST",
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        console.log("Django order item error ", errorData);

        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

export { getProducts, getProduct, createComment, createOrder, getOrders, addProductItem };