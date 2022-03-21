//Etape 3 : Insérer les produits dans la page d’accueil

//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

//Afficher les produits avec une boucle
  for (let i = 0; i < data.length; i++) { 
    let product = document.createElement('article');
    let link = document.createElement('a');
    let picture = document.createElement('img');
    let title = document.createElement('h3');
    let description = document.createElement('p');

    document.querySelector('.items').appendChild(link);
    
    link.href = `front/html/product.html?id=${data[i]._id}`;
    link.appendChild(product);

    product.appendChild(picture);
    picture.src = data[i].imageUrl;
    picture.alt = data[i].altTxt;

    product.appendChild(title);
    title.classList.add('title');
    title.textContent = data[i].name;

    product.appendChild(description);
    description.classList.add('description');
    description.textContent = data[i].description;
  }
})
.catch(function (error) {
  alert(
    'Le serveur ne répond pas, si ce problème persiste, contacter: support@name.com'
  );
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