//Etape 3 : Insérer les produits dans la page d’accueil

//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

//Afficher les produits avec une boucle
  let showAllProducts = () => {
    let products = document.getElementById('items');

    for (let p in data) {
      products.innerHTML += `
        <a href="./product.html?id=${data[p]._id}">
          <article>
            <img src="${data[p].imageUrl}" alt="${data[p].altTxt}">
            <h3 class="productName">${data[p].name}</h3>
            <p class="productDescription">${data[p].description}</p>
          </article>
        </a>`
    };
  };
showAllProducts();
});

//Indique la quantité de produit dans le panier
let numberProductsInCart = () => {
	let cart = document.getElementsByTagName('nav')[0].getElementsByTagName('li')[1];
	let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
	let numberProducts = 0;

	for (let q in productInLocalStorage) {
		let quantityProductsInLocalStorage = parseInt(productInLocalStorage[q].quantity);
		numberProducts += quantityProductsInLocalStorage
	};

	cart.innerHTML = `Panier  <span id='numberProductsInCart' style='color: '#2C3E50;'>( ${numberProducts} )</span>`;
};
numberProductsInCart();