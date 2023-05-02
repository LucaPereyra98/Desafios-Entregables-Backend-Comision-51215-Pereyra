const socket = io()

socket.on("productList", (dataProducts) => {
    function displayProducts(products) {
        const productsContainer = document.getElementById("products-container")
        let productsHtml = "";
        for (let product of products) {
            productsHtml += `
            <div class="product">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>Precio: ${product.price}€</p>
                <p>Stock: ${product.stock}</p>
                <p>Código: ${product.code}</p>
                <p>Categoría: ${product.category}</p>
            </div>
            `;
        }
        productsContainer.innerHTML = productsHtml;
    }
    displayProducts(dataProducts)
})




