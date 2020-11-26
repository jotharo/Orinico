
// Création de la zone d'affichage des données récupérées

const app = document.getElementById('cartDisplay');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// 1 - AFFICHAGE DU CONTENU DU PANIER

//Paramétrage de la fonction de récupération des données des produits sélectionnés enregistrés dans le localStorage

function getCartTeddies() {
    let cartTeddies = JSON.parse(localStorage.getItem('cartTeddies'));
    return cartTeddies;
}

let cartTeddies = getCartTeddies()

countCartItems()

//Etape IF -Si le panier est vide > On affiche " Votre panier est vide "
if (cartTeddies == undefined || cartTeddies.length === 0) {
    var div = document.createElement('div');
    div.textContent = " Votre panier est vide !";

    container.appendChild(div);  

    
//Etape ELSE -Si le panier contient au moins un produit > On récupère les produits > Affichage des détails
} else {

    //BOUTON DELETE ALL > POUR SUPPRIMER TOUT LE PANIER

    // Création du bouton supprimer la totalité du panier d'un click
    const btnDeleteAll = document.createElement('button');
    btnDeleteAll.id = "deleteCart"
    btnDeleteAll.textContent = "Supprimer";


    // Création de la fonction pour supprimer la totalité du panier d'un click

    function deleteCart(event) {
        event.preventDefault();
        localStorage.clear()
        alert('Votre panier est vide !')
        location.reload();
    }// Fin de la fonction deleteCart

    btnDeleteAll.addEventListener("click", deleteCart)

    // Création HTML du bouton deleteAll
    app.appendChild(btnDeleteAll);

    //AFFICHAGE DU CONTENU DU PANIER

    Object.values(cartTeddies).map( (cartTeddy) => {
            // Affichage d'une ligne avec détails par produit différents (même nom + même couleur = une ligne produit)

            const totalTeddy = cartTeddy.teddyPrice * cartTeddy.teddyQuantity;

            let ligneProduit = document.createElement('div');
            ligneProduit.setAttribute('class', 'card');
        
            var img = document.createElement('img');
            img.alt = "Photo du nounours" + cartTeddy.teddyName;
            img.src = cartTeddy.teddyImage;
        
            var h1 = document.createElement('h1');
            h1.textContent = cartTeddy.teddyName +" "+ cartTeddy.teddyColor;
        
            var p = document.createElement('p');
            p.textContent = `${totalTeddy}`+' '+'$';

            //BOUTON DELETE > Supprimer un/1 objet

            // Création du bouton Supprimer rattaché à sa ligne produit
            const btnDelete = document.createElement('button');
            btnDelete.id = "deleteCart"
            btnDelete.textContent = "Supprimer";

            // Création de la fonction de suppression d'item > Active à l'écoute du click du bouton btnDelete
            function deleteItem(event) {
                event.preventDefault()
                if (cartTeddy.teddyQuantity >= 1) {
                    cartTeddy.teddyQuantity--
                    if (cartTeddy.teddyQuantity === 0) {
                        const index = cartTeddies.indexOf(cartTeddy)
                        cartTeddies.splice(index, 1)
                    }
                } 

                //Enregistrement du nouveau localStorage
                localStorage.setItem('cartTeddies', JSON.stringify(cartTeddies))
                JSON.parse(localStorage.getItem('cartTeddies'))

                alert('Cet article a bien été supprimé !')
                window.location.href = "panier.html"
            }// Fin de la fonction deleteItem

            btnDelete.addEventListener('click', deleteItem)

            
            // Affichage html du contenu du panier créé précedemment

            container.appendChild(ligneProduit);  
            ligneProduit.appendChild(img);                   
            ligneProduit.appendChild(h1);         
            ligneProduit.appendChild(p);
            ligneProduit.appendChild(btnDelete);
            
    })// Fin de l'affichage du contenu du panier
} // Fin de la boucle else et de la partie 1 Affichage du panier

// 2 - FORMULAIRE DE COMMANDE


     