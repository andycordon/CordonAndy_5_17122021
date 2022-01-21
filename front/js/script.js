//Etape 3 : Insérer les produits dans la page d’accueil

//Appel de l'API
const fetchKanap = async () => {
  let fetchData = await fetch('http://localhost:3000/api/products');
  let productKanap = await fetchData.json();
  return productKanap;
};

// Affichage des elements présent dans l'API
const kanapView = async () => {
  let element = await fetchKanap();
  let items = document.getElementById('items');
  for (let i = 0; i < element.length; i++) {
    items.innerHTML += 
    ` <a href="product.html?id=${element[i]._id}"> 
        <article> 
          <img src='${element[i].imageUrl}' alt='${element[i].altTxt}' /> 
          <h3 class='productName'>${element[i].name}</h3> 
          <p class='productDescription'>${element[i].description}</p> 
        </article> 
      </a>`;
  }
};

kanapView();