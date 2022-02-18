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
    showCart();
    deleteProduct();
    modifyQuantityProduct();
  };


//Étape 10 : Passer la commande

//Lorsque je renseigne les champs du formulaire
		addEventListener('change', () => {
      
//Je renseigne le prénom 
			function informFirstName() {
				let firstName = document.getElementById('firstName').value;
				let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
				let textNameRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,100}$/;

				if (firstName.match(textNameRegex)) {
					firstNameErrorMsg.innerHTML = 'Prénom valide';
					firstNameErrorMsg.style.color = '#32CD32';
				} else {
          firstNameErrorMsg.innerHTML = 'Prénom invalide !';
          firstNameErrorMsg.style.color = '#ff2d49';
        };
        if (firstName == '') {
					firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom';
          firstNameErrorMsg.style.color = '#2C3E50';
				};
			};
			informFirstName();

//Je renseigne le nom
			function informLastName() {
				let lastName = document.getElementById('lastName').value;
				let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
				let textNameRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,100}$/;

				if (lastName.match(textNameRegex)) {
					lastNameErrorMsg.innerHTML = 'Nom valide';
					lastNameErrorMsg.style.color = '#32CD32';
				} else {
          lastNameErrorMsg.innerHTML = 'Nom invalide !';
          lastNameErrorMsg.style.color = '#ff2d49';
        };
        if (lastName == '') {
					lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom';
          lastNameErrorMsg.style.color = '#2C3E50';
				};
			};
      informLastName();


//Je renseigne l'adresse
			function informAdress() {
				let address = document.getElementById('address').value;
				let addressErrorMsg = document.getElementById('addressErrorMsg');
				let pattern = /^[a-zA-Z0-9\s,.'-]{5,100}$/;
        
				if (address.match(pattern)) {
					addressErrorMsg.innerHTML = 'Adresse valide';
					addressErrorMsg.style.color = '#32CD32';
				} else {
					addressErrorMsg.innerHTML ='Adresse invalide !';
          addressErrorMsg.style.color = '#ff2d49';
				};
				if (address == '') {
					addressErrorMsg.innerHTML = 'Veuillez reseigner votre adresse';
          addressErrorMsg.style.color = '#2C3E50';
				};
			};
      informAdress();


//Je renseigne la ville
			function informCity() {
				let city = document.getElementById('city').value;
				let cityErrorMsg = document.getElementById('cityErrorMsg');
				let textCityRegex =/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,58}$/;

				if (city.match(textCityRegex)) {
					cityErrorMsg.innerHTML = 'Ville valide';
					cityErrorMsg.style.color = '#32CD32';
				} else {
					cityErrorMsg.innerHTML = 'Ville invalide !';
					cityErrorMsg.style.color = '#ff2d49';
				};
				if (city == '') {
					cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville';
          cityErrorMsg.style.color = '#2C3E50';
				};
			};
      informCity();


//Je renseigne l'Email
			function informEmail() {
				let email = document.getElementById('email').value
				let emailErrorMsg = document.getElementById('emailErrorMsg')
        let emailRegex = /^([A-Za-z0-9.-_]{1,100})+@([A-Za-z0-9.-_]{1,100})+.+[a-z]{2,10}$/;


				if (email.match(emailRegex)) {
					emailErrorMsg.innerHTML = 'Email valide';
					emailErrorMsg.style.color = '#32CD32';
				} else {
					emailErrorMsg.innerHTML = 'Email invalide !';
					emailErrorMsg.style.color = '#ff2d49';
				};
				if (email == '') {
					emailErrorMsg.innerHTML = 'Veuillez renseigner votre Email';
          emailErrorMsg.style.color = '#2C3E50';
				};
			};
			informEmail();
		});
	});



showCommand();