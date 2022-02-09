//Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

//Récuperation des produit du localstorage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

//Si panier vide, l'indiquer
if(productInLocalStorage === null){
    document.querySelector('#cart__items').innerHTML =`
    <div class = 'cart__none'>
        <p>Votre panier est vide</p>
    </div>`;
}
//Sinon, panier non vide, afficher ceux présents du localstorage
else{
    let items = document.getElementById('cart__items');
    for (let i = 0; i < productInLocalStorage.length; i++) {
        fetch(`http://localhost:3000/api/products/${productInLocalStorage[i].id}`)
        .then(response => response.json())
        .then(data => {
            items.innerHTML +=            
            `
            <article class="cart__item" data-id="${data._id}" data-color="${productInLocalStorage[i].color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${productInLocalStorage[i].color}</p>
                    <p>${data.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>`
        });
    
    }


//Étape 9 : Gérer la modification et la suppression de produits dans la page Panier

// Nombre de produit dans la panier
function totalArticles() {
    let totalItems = 0;
    for (l in productInLocalStorage) {
        const newQuantity = parseInt(productInLocalStorage[l].quantity);
        totalItems += newQuantity;
    }
        const totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.textContent = totalItems;
  }
  totalArticles();
  
  // Montant total du panier
function priceAmount() {
    const calculPrice = [];
    for (m = 0; m < productInLocalStorage.length; m++) {
        console.log(document.getElementById('abc' + productInLocalStorage[m].id + productInLocalStorage[m].color));
        const cartAmount = document.getElementById('abc' + productInLocalStorage[m].id + productInLocalStorage[m].color) * productInLocalStorage[m].quantity;
        calculPrice.push(cartAmount);
        const reduce = (previousValue, currentValue) => previousValue + currentValue;
        total = calculPrice.reduce(reduce);
    }
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = total;
  }
  priceAmount();

/*
//Modification de la quantité du panier
    function changeQuantity () {
        let itemQuantity = document.querySelectorAll('.itemQuantity');
        for (let j = 0; j < itemQuantity.length; j++) {
            itemQuantity[j].addEventListener('change', (event) => {
                event.preventDefault();
                let itemNewQuantity = itemQuantity[j].value;
                const newAddToCart = {
                    id: productInLocalStorage[j].id,
                    image: productInLocalStorage[j].image,
                    alt: productInLocalStorage[j].alt,
                    name: productInLocalStorage[j].name,
                    color: productInLocalStorage[j].color,
                    price: productInLocalStorage[j].price,   
                    quantity: itemNewQuantity,                                  
                };

                productInLocalStorage[j] = newAddToCart;
                localStorage.setItem('product', JSON.stringify(productInLocalStorage));

                alert('Votre panier est à jour.');
            })
        }
    }
*/

}