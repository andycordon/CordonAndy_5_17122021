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

//Appel de la fonction
		showAllProducts();
  });