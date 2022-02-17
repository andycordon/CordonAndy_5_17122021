//Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

//Récuperation des données du local storage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
let saveContactLocalStorage = JSON.parse(localStorage.getItem('contact'));


//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

//Trouver le produit sélectionné avec son id
  let findProduct = (id) => {
    return data.find((product) => product._id === id);
  };

//Si le panier est vide
  if(productInLocalStorage === null){
    document.querySelector('#cart__items').innerHTML =`
    <div class = 'cart__none'>
        <p id ='alert' style='text-align: center; font-weight: bold; font-size:25px; color: #2C3E50'>
        Aucun article dans votre panier...</p>
    </div>`;

//Sinon, panier non vide, afficher ceux présents du localstorage
  } else {
  let showCart = () => {
    if (document.URL.includes('cart.html')) {
      for (let i in productInLocalStorage) {

//Création du tableau et ajout des produits
        let products = [];
        let productsId = [productInLocalStorage[i]._id];
        products.push(productsId);
        let id = productInLocalStorage[i]._id;
        let data = findProduct(id);
        let priceTotalArticles = data.price * productInLocalStorage[i].quantity;
        let cartItems = document.querySelector('#cart__items');
        cartItems.innerHTML += `
          <article class="cart__item" data-id="${productInLocalStorage[i]._id}" data-color="${productInLocalStorage[i].colors}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}" />
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${productInLocalStorage[i].colors}</p>
                <p class="priceProduct">${priceTotalArticles} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté :</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}"/>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
            </article>`			
        };
      };
    };

//Afficher le total d'article du panier et son total
    let total = () => {
      let totalProducts = 0;
      let totalAmount = 0;
      let totalQuantity = document.querySelector('#totalQuantity');
      let totalPrice = document.querySelector('#totalPrice');

      if (document.URL.includes('cart.html')) {
        for (let j in productInLocalStorage) {
          let id = productInLocalStorage[j]._id;
          let myProductsTotal = findProduct(id);
          let quantityInLocalStorage = parseInt(productInLocalStorage[j].quantity);
          totalProducts += quantityInLocalStorage;
          let priceInLocalStorage = parseInt(myProductsTotal.price);
          totalAmount += (priceInLocalStorage * quantityInLocalStorage);
        };
        totalQuantity.innerHTML = totalProducts
        totalPrice.innerHTML = totalAmount
      };
    };
    total();

    
//Étape 9 : Gérer la modification et la suppression de produits dans la page Panier

//Supprimer un produit
    let deleteProduct = () => {

//Met dans un tableau les boutons supprimer de la page panier
      let deleteItem = [...document.querySelectorAll('.deleteItem')]
      let cartItem = [...document.querySelectorAll('.cart__item')]
      
//Lors du click sur un bouton supprimer
      deleteItem.forEach((element, i) => {
        element.addEventListener('click', () => {
          let indexCartPage = productInLocalStorage.findIndex((p) => p.colors === cartItem[i].dataset.color && p._id === cartItem[i].dataset.id);

//Si le produit est supprimer, il disparait de la page panier et du local storage
          if (indexCartPage !== -1) {
            productInLocalStorage.splice(indexCartPage, 1)
            localStorage.setItem('product', JSON.stringify(productInLocalStorage))
            cartItem[i].remove();

//Si le tableau crée précédement est vide, il est supprimer et la page est raffraichie
            if (productInLocalStorage == '') {
              localStorage.removeItem('product')
              products = '';
              location.reload();
            };
          };
          total();          
        });
      });
    };

//Augmenter ou diminuer la quantité d'un produit
    let modifyQuantityProduct = () => {

//Met dans un tableau les quantités de produits à modifier
      let itemQuantity = [...document.getElementsByClassName('itemQuantity'),];
      itemQuantity.forEach((item, i) => {
        
//Lors du click sur un bouton modifier
        item.addEventListener('change', () => {

//Si la quantité choisis 'manuellement' exede 100, le mettre au maximum à 100
          if (itemQuantity[i].value > 100) {
            itemQuantity[i].value = 100;
        
//Sinon met à jour la modification de la quantité
          } else {
            productInLocalStorage[i].quantity = itemQuantity[i].value
            localStorage.setItem('product',JSON.stringify(productInLocalStorage))
          }

//Permet d'afficher le montant total d'un type de produit lorsque sa quantité est modifié 
          let idProductTotal = () => {
            let priceProduct = document.getElementsByClassName('priceProduct');
            let myProduct = findProduct(productInLocalStorage[i]._id);
            let price = myProduct.price * productInLocalStorage[i].quantity;
            priceProduct[i].innerHTML = `${price} €`;
          }
          idProductTotal();
          total();
        });
      });
    };
    showCart();
    deleteProduct();
    modifyQuantityProduct();
  };


//Étape 10 : Passer la commande


	})




showCommand()