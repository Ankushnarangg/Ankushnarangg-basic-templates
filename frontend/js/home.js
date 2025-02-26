document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("product-container");
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "bg-white p-4 shadow-md rounded-lg";
                card.innerHTML = `
                    <h3 class="text-xl font-bold">${product.name}</h3>
                    <p class="text-gray-600">${product.description}</p>
                    <p class="font-semibold text-blue-600 mt-2">₹${product.price}</p>
                    <button class="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
