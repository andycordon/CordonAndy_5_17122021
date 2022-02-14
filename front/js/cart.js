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
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 0; i < productInLocalStorage.length; i++) {
        fetch(`http://localhost:3000/api/products/${productInLocalStorage[i].id}`)
        .then(response => response.json())
        .then(data => {
        totalQuantity = totalQuantity + Number(productInLocalStorage[i].quantity);
        totalPrice = totalPrice + (Number(productInLocalStorage[i].quantity) * Number(data.price));
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
            </article>`;
document.getElementById('totalQuantity').textContent=totalQuantity;
document.getElementById('totalPrice').textContent=totalPrice;
        });
    
    }
//Étape 9 : Gérer la modification et la suppression de produits dans la page Panier
console.log(document.getElementsByClassName ("deleteItem"));



//Ajouter un produit
//Retirer un produit
//Supprimer un produit


//Étape 10 : Passer la commande

  let nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
  let adressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
  let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  firstName.addEventListener('input', (event) => {
      event.preventDefault();
      if (nameRegex.test(firstName.value) == false || firstName.value == '') {
          document.getElementById('firstNameErrorMsg').innerHTML ='Prénom invalide';
      } else {
          document.getElementById("firstNameErrorMsg").innerHTML = "";
        }
  });

  lastName.addEventListener("input", (event) => {
      event.preventDefault();
      if (nameRegex.test(lastName.value) == false || lastName.value == '') {
          document.getElementById('lastNameErrorMsg').innerHTML = 'Nom invalide';
      } else {
          document.getElementById("lastNameErrorMsg").innerHTML = "";
        }
  });

  address.addEventListener('input', (event) => {
      event.preventDefault();
      if (adressRegex.test(address.value) == false || address.value == '') {
          document.getElementById('addressErrorMsg').innerHTML = 'Adresse invalide';
      } else {
          document.getElementById("addressErrorMsg").innerHTML = "";
        }
  });

  city.addEventListener('input', (event) => {
      event.preventDefault();
      if (nameRegex.test(city.value) == false || city.value == '') {
          document.getElementById('cityErrorMsg').innerHTML = 'Ville invalide';
      } else {
          document.getElementById("cityErrorMsg").innerHTML = "";
        }
  });

  email.addEventListener('input', (event) => {
      event.preventDefault();
      if (emailRegex.test(email.value) == false || email.value == '') {
          document.getElementById('emailErrorMsg').innerHTML = 'E-mail invalide';
      } else {
          document.getElementById("emailErrorMsg").innerHTML = "";
        }
  });

    let order = document.getElementById('order');
    order.addEventListener('click', (o) => {
    o.preventDefault();

  if (
  firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === ""
  ) {
  alert('Veuillez renseigner tous les champs');

  } else if (
      nameRegex.test(firstName.value) == false || nameRegex.test(lastName.value) == false || adressRegex.test(address.value) == false ||nameRegex.test(city.value) == false || emailRegex.test(email.value) == false
      ) {
      alert('Un ou plusieurs champs sont invalides');
      } else {
          let ordered = [];
          productInLocalStorage.forEach((order) => {
          ordered.push(order.id);
      });

      
    }
  });
}