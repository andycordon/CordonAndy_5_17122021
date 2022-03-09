//Étape 4 : Faire le lien entre un produit de la page d’accueil et la page Produit

//Utilisation de searchParams
let idProduct = new URL(window.location.href).searchParams.get('id');

//Appel de l'API avec Fetch
fetch('http://localhost:3000/api/products')
.then((response) => response.json())
.then((data) => {

    
//Étape 5 : Récupérer l’id du produit à afficher

//Trouver le produit sélectionné avec son id
    let findProduct = () => {
        return data.find((product) => product._id === idProduct);
    };

    let myProduct = findProduct();


//Étape 6 : Insérer un produit et ses détails dans la page Produit

//Creation des variables pour affichage le produit sur la page
    let showProductInPage = () => {
        let productName = document.getElementsByTagName('title');
        let productImg = document.createElement("img");
        let title = document.querySelector('#title');
        let price = document.querySelector('#price');
        let description = document.querySelector('#description');
        let colors = document.querySelector('#colors');

//Affichage du produit sur la page
        document.querySelector(".item__img").appendChild(productImg);
        productImg.setAttribute("src", `${myProduct.imageUrl}`);
        productImg.setAttribute("alt", `${myProduct.altTxt}`);
        productName[0].textContent = myProduct.name
        title.textContent = myProduct.name
        price.textContent = myProduct.price
        description.textContent = myProduct.description

//Affichage de la sélection des couleurs
        for (let i in myProduct.colors) {
            colors.insertAdjacentHTML(
                'beforeend',
                `<option value="${myProduct.colors[i]}">${myProduct.colors[i]}</option>`
            );
        };
    };
    showProductInPage();
})
.catch(function (error) {
    alert(
      'Le serveur ne répond pas, si ce problème persiste, contacter: support@name.com'
    );
});


//Étape 7 : Ajouter des produits dans le panier

//Créer le produit
let createProduct = () => {
	let quantity = document.querySelector('#quantity');

//Le mettre dans le local storage
	let productInLocalStorage = JSON.parse(localStorage.getItem('product'));

	let optionProduct = {
		_id: idProduct,
		quantity: quantity.value,
		colors: colors.value,
	};

//Alertes pour prévenir le client
	let alert = document.querySelector('.item__content__addButton');

//Confirmation d'ajout au panier
    let addProductAlert = () => {
        alert.insertAdjacentHTML(
            'afterend',
            `<span id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
            <br>Article(s) bien ajouté(s) au panier !</span>`
        );
        endAlert();
    }

//Prévenir le client qu'il ne peut pas commander plus de 100 fois le même produit
	let maxLimitAlert = () => {
		alert.insertAdjacentHTML(
			'afterend',
            `<span id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
            <br>Pour toutes commandes de plus de 100 articles identiques, merci de directement nous contacter</span>`
            );
		endAlert();
	}

//Création des alertes d'erreurs de sélections
	let errorAlert = () => {

//Alerte pour une couleur non sélectionné
		if (optionProduct.colors == '') {
			alert.insertAdjacentHTML(
				'afterend',
                `<span id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
                <br>Veuillez sélectionner une couleur</span>`
                );
			endAlert();
		};

//Alerte pour quantité non sélectionné
		if (optionProduct.quantity <= 0) {
			alert.insertAdjacentHTML(
				'afterend',
                `<span id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
                <br>Veuillez choisir une quantité entre 1 et 100</span>`
			);
			endAlert();

//Alerte pour une quantité supérieur a 100
		} else if (optionProduct.quantity > 100) {
			alert.insertAdjacentHTML(
				'afterend',
                `<span id ='alert' style='text-align: center; font-weight: bold; color: #2C3E50'>
                <br>Pour toutes commandes de plus de 100 articles identiques, merci de directement nous contacter</span>`
			);
			endAlert();
		};
	};

//Faire en sorte que l'alerte disparaisse apres affichage
    let endAlert = () => {
        let endAlert = document.querySelector('#alert');
        setTimeout(function () {
            endAlert.remove();
        }, 2000);
    };

//Ajout du produit dans le local storage
    let addProductInLocalStorage = () => {
        productInLocalStorage.push(optionProduct);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        addProductAlert();
    }

//Modifie un produit sélectionné dans le local storage
    let modifyProductInLocalStorage = (i) => {
        productInLocalStorage[i].quantity = parseInt(productInLocalStorage[i].quantity);
        optionProduct.quantity = parseInt(optionProduct.quantity);

//Prévient et empeche qu'un produit soit ajouté plus de 100 fois
    let beforeMoreAfterAddProductInLocalStorage = optionProduct.quantity + productInLocalStorage[i].quantity;

    if (beforeMoreAfterAddProductInLocalStorage > 100) {
        maxLimitAlert();

//Ajouter un produit dans le local storage
    } else {
        productInLocalStorage[i].quantity += optionProduct.quantity;
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        addProductAlert();
    };
};

//Si couleurs ou quantités non ou mal choisis, prévenir le client 
	if (optionProduct.colors == '' || optionProduct.quantity <= 0 || optionProduct.quantity > 100) {
		errorAlert();

//Sinon on ajoute un ou plusieurs produits
	} else {

//Si le panier est vide, création d'un tableau pour y ajouter le produit
		if (!productInLocalStorage) {
			productInLocalStorage = [];
			addProductInLocalStorage();

//Permet d'actualisé le panier lors d'un ajout de produit
            setTimeout("location.reload(true);",2000);
		}

//Sinon on cherche dans le panier si un produit est déjà présent
		else {
			let index = productInLocalStorage.findIndex((p) => p.colors === optionProduct.colors && p._id === optionProduct._id);

//Si le produit à déjà été ajouté, sa quantité est modifié
			if (index !== -1) {
				modifyProductInLocalStorage(index);

//Permet d'actualisé le panier lors d'un ajout de produit
                setTimeout("location.reload(true);",2000);
			}

//Sinon ajout du nouveau produit
			else {
				addProductInLocalStorage();
			};
		};
	};
};

//Cliquer pour envoyer dans le panier
let sendToCart = document.querySelector('#addToCart');
sendToCart.addEventListener('click', (e) => {
    e.preventDefault();
	createProduct();
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