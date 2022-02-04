//Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

//Récuperation des produit du localstorage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));


//Si panier vide, l'indiquer
if(productInLocalStorage === null){
    document.querySelector('#cart__items').innerHTML =`
    <div class = 'cart__none'>
        <p> Votre panier est vide </p>
    </div>`;

}
//Sinon, panier non vide, afficher ceux présent du localstorage
else{
    /*document.querySelector('#cart__items').innerHTML =`
    <div class = 'cart__none'>
        <p> Vous avez un panier </p>
    </div>`;*/
    let items = document.getElementById('cart__items');
    for (let i = 0; i < productInLocalStorage.length; i++) {
        //console.log(productInLocalStorage [i]);
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
                    <p>${data.price}</p>
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

}