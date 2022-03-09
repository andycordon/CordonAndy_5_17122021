//Étape 11 : Afficher le numéro de commande 2/2

//Récupération de 'orderID' depuis l'URL
 function getOrderId() {
    let url = new URL(window.location.href);
    let urlId = url.searchParams.get('orderId');
    return urlId;
}

//Une fois récupérer, je l'affiche
let orderId = document.getElementById('orderId');
orderId.textContent = getOrderId();

//Et je vide le local storage
localStorage.clear();

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