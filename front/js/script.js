//Appel de l'API
fetch("http://localhost:3000/api/products")
.then( reponse => {
    return reponse.json();
})

//Afficher les produits
.then((product) => {
    const allProducts = product;
    allProducts.forEach(element => {
        viewProducts.innerHTML += 
         `<a href="./product.html?id=${element._id}">
            <article>
                <img src=${element.imageUrl} alt=${element.altTxt}>
                <h3 class="productName">${element.name}</h3>
                <p class="productDescription">${element.description}</p>
            </article>
          </a>`
     });
});

//Création d'une constante pour l'affichage des produits
const viewProducts = document.querySelector("#items");
