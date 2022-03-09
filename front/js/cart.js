//Etape 8 : Afficher un tableau récapitulatif des achats dans la page Panier

//Récuperation des données du local storage
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
let cartItems = document.querySelector('#cart__items');
let products = [];

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
    let cartItems = document.querySelector('#cart__items')
    cartItems.textContent = 'Aucun article dans votre panier . . .';
    
//Sinon, panier non vide, afficher ceux présents du localstorage
  } else {
  let showCart = () => {
    if (document.URL.includes('cart.html')) {
      for (let i in productInLocalStorage) {

//Création du tableau et ajout des produits
        let productsId = [productInLocalStorage[i]._id];
        let id = productInLocalStorage[i]._id;
        let data = findProduct(id);
        let priceTotalArticles = data.price * productInLocalStorage[i].quantity;
        products.push(productsId);
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
          let myProductsTotal = findProduct(productInLocalStorage[j]._id);
          let quantityInLocalStorage = parseInt(productInLocalStorage[j].quantity);
          let priceInLocalStorage = parseInt(myProductsTotal.price);
          totalProducts += quantityInLocalStorage
          totalAmount += (priceInLocalStorage * quantityInLocalStorage);
        };
        totalQuantity.textContent = totalProducts
        totalPrice.textContent = totalAmount
      };
    };
    total();

    
//Étape 9 : Gérer la modification et la suppression de produits dans la page Panier

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
          } 
          else {
            productInLocalStorage[i].quantity = itemQuantity[i].value
            localStorage.setItem('product',JSON.stringify(productInLocalStorage))
          }

//Permet d'afficher le montant total d'un type de produit lorsque sa quantité est modifié 
          let idProductTotal = () => {
            let priceProduct = document.getElementsByClassName('priceProduct');
            let myProduct = findProduct(productInLocalStorage[i]._id);
            let price = myProduct.price * productInLocalStorage[i].quantity;
            priceProduct[i].textContent = `${price} €`;
          }
          idProductTotal();
          total();
        });
      });
    };

//Supprimer un produit
    let deleteProduct = () => {

//Met dans un tableau les boutons supprimer de la page panier
      let deleteItem = [...document.querySelectorAll('.deleteItem')];
      let cartItem = [...document.querySelectorAll('.cart__item')];
      
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
    showCart();
    deleteProduct();
    modifyQuantityProduct();
  };


//Étape 10 : Passer la commande

//Création de variable pour le Regex du formulaire
  let textNameRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{1,100}$/;
  let textAdressRegex = /^[a-zA-Z0-9\s,.'-]{5,100}$/;
  let textCityRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,58}$/;
  let textEmailRegex = /^([A-Za-z0-9.-_]{1,100})+@([A-Za-z0-9.-_]{1,100})+.+[a-z]{2,10}$/;

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

//Je renseigne le prénom 
  firstName.addEventListener('input', (event) => {
    event.preventDefault();
    if (textNameRegex.test(firstName.value) == false || firstName.value == '') {
      document.getElementById('firstNameErrorMsg').textContent = 'Prénom invalide !';
      document.getElementById('firstNameErrorMsg').style.color = '#2C3E50';
      document.getElementById('firstName').style.background = '#fb5043';
    }
    else {
      document.getElementById('firstNameErrorMsg').textContent = 'Prénom valide';
      document.getElementById('firstNameErrorMsg').style.color = '#2C3E50';
      document.getElementById('firstName').style.background = '#32CD32';
    };
  });

//Je renseigne le nom
  lastName.addEventListener('input', (event) => {
    event.preventDefault();
    if (textNameRegex.test(lastName.value) == false || lastName.value == '') {
      document.getElementById('lastNameErrorMsg').textContent = 'Nom invalide !';
      document.getElementById('lastNameErrorMsg').style.color = '#2C3E50';
      document.getElementById('lastName').style.background = '#fb5043';
    } 
    else {
      document.getElementById('lastNameErrorMsg').textContent = 'Nom valide';
      document.getElementById('lastNameErrorMsg').style.color = '#2C3E50';
      document.getElementById('lastName').style.background = '#32CD32';
    };
  });

//Je renseigne l'adresse
  address.addEventListener('input', (event) => {
    event.preventDefault();
    if (textAdressRegex.test(address.value) == false || address.value == '') {
      document.getElementById('addressErrorMsg').textContent = 'Adresse invalide !';
      document.getElementById('addressErrorMsg').style.color = '#2C3E50';
      document.getElementById('address').style.background = '#fb5043';
    } 
    else {
      document.getElementById('addressErrorMsg').textContent = 'Adresse valide';
      document.getElementById('addressErrorMsg').style.color = '#2C3E50';
      document.getElementById('address').style.background = '#32CD32';
    };
  });

//Je renseigne la ville
  city.addEventListener('input', (event) => {
    event.preventDefault();
    if (textCityRegex.test(city.value) == false || city.value == '') {
      document.getElementById('cityErrorMsg').textContent = 'Ville invalide !';
      document.getElementById('cityErrorMsg').style.color = '#2C3E50';
      document.getElementById('city').style.background = '#fb5043';
    } 
    else {
      document.getElementById('cityErrorMsg').textContent = 'Ville valide';
      document.getElementById('cityErrorMsg').style.color = '#2C3E50';
      document.getElementById('city').style.background = '#32CD32';
    };
  });

//Je renseigne l'Email
  email.addEventListener('input', (event) => {
    event.preventDefault();
    if (textEmailRegex.test(email.value) == false || email.value == '') {
      document.getElementById('emailErrorMsg').textContent = 'Email invalide !';
      document.getElementById('emailErrorMsg').style.color = '#2C3E50';
      document.getElementById('email').style.background = '#fb5043';
    } 
    else {
      document.getElementById('emailErrorMsg').textContent = 'Email valide';
      document.getElementById('emailErrorMsg').style.color = '#2C3E50';
      document.getElementById('email').style.background = '#32CD32';
    };
  });

//Pour envoyer la commande
  let order = document.getElementById('order');
  order.addEventListener('click', (o) => {
  o.preventDefault();

//Création de l'objet "contact"
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

//Alerte pour prévenir le client de problème dans le formulaire
let alert = document.querySelector('.cart__order__form__submit');

//Faire en sorte que l'alerte disparaisse apres affichage
let endAlert = () => {
  let endAlert = document.querySelector('#alert');
  setTimeout(function () {
      endAlert.remove();
  }, 2000);
};

//Si il manque tous les champs, affichage d'une alerte
  if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
    alert.insertAdjacentHTML(
      'afterend',
      `<div id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
      <br>Veuillez renseigner tous les champs !</div>`
  );
  endAlert();

//Si manque un ou plusieur champs, affichage d'une alerte
  } else if (textNameRegex.test(firstName.value) == false || textNameRegex.test(lastName.value) == false || textAdressRegex.test(address.value) == false ||textCityRegex.test(city.value) == false || textEmailRegex.test(email.value) == false) {
    alert.insertAdjacentHTML(
      'afterend',
      `<div id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
      <br>Un ou plusieurs champs sont invalides !</div>`
  );
  endAlert();

//Sinon, envoyer la commande
      } else {
          let products = [];
          productInLocalStorage.forEach((p) => {
            products.push(p._id);
      });
      
      let pageOrder = { contact, products };


//Étape 11 : Afficher le numéro de commande 1/2
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageOrder),
      })
      .then(response => response.json())
      .then((data) => {
        window.location.href = './confirmation.html?orderId=' + data.orderId;
      })
      .catch(function (error) {
        alert(
          'Le serveur ne répond pas, si ce problème persiste, contacter: support@name.com'
        );
      });
    }; 
  });
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