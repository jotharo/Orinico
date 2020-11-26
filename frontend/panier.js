

// Création de la zone de récupération des données


const app = document.getElementById('cartDisplay');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);



//Paramétrage de la fonction de récupération des données des produits sélectionnés enregistrés dans le localStorage

function getCartTeddies() {
    let cartTeddies = JSON.parse(localStorage.getItem('cartTeddies')) || [];
    return cartTeddies
}

let cartTeddies = getCartTeddies()

//Etape 1 -Si le panier est vide > On affiche " Votre panier est vide "
if (cartTeddies == undefined || cartTeddies.length === 0) {
    var div = document.createElement('div');
    div.textContent = " Votre panier est vide !";
    countCartItems()
//Etape 2 -Si le panier contient au moins un produit > On récupère les produits > Affichage des détails
} else {
        for (let cartTeddy of cartTeddies) {
            // Affichage d'une ligne avec détails par produit différents (même nom + même couleur = une ligne produit)

            const totalTeddy = cartTeddy.teddyPrice * cartTeddy.quantity;

            let ligneProduit = document.createElement('div');
            ligneProduit.setAttribute('class', 'card');
        
            var img = document.createElement('img');
            img.alt = "Photo du nounours" + cartTeddy.name;
            img.src = cartTeddy.imageUrl;
        
            var h1 = document.createElement('h1');
            h1.textContent = cartTeddy.name;
        
            var p = document.createElement('p');
            p.textContent = `${totalTeddy}`+' '+'$';

            // Création du bouton Supprimer rattaché à sa ligne produit
            const btnDelete = document.createElement('button');
            btnDelete.id = "deleteCart"
            btnDelete.textContent = "Supprimer";

            // Création de la fonction de suppression d'item > Active à l'écoute du click du bouton btnDelete
            function deleteItem(event) {
                event.preventDefault()
                const cartTeddy = storedTeddies.filter(teddy => teddy.teddyId == e.target.getAttribute('data-id') && teddy.teddyColor == e.target.getAttribute('data-color'))[0]
                if (cartTeddy.quantity >= 1) {
                    cartTeddy.quantity--
                    if (cartTeddy.quantity === 0) {
                        const index = cartTeddies.indexOf(cartTeddy)
                        cartTeddies.splice(index, 1)
                    }
                } 

                //Enregistrement du nouveau localStorage
                localStorage.setItem('cartTeddies', JSON.stringify(cartTeddies))
                JSON.parse(localStorage.getItem('cartTeddies'))

                alert('Cet article a bien été supprimé !')
                window.location.href = "basket.html"
            }// Fin de la fonction deleteItem

            btnDelete.addEventListener('click', deleteItem)

            // Création du bouton supprimer la totalité du panier d'un click
            const btnDeleteAll = document.createElement('button');
            btnDeleteAll.id = "deleteCart"
            btnDeleteAll.textContent = "Supprimer";
  
            // Création de la fonction pour supprimer la totalité du panier d'un click

            function deleteCart(event) {
                event.preventDefault();
                localStorage.clear()
                alert('Votre panier est vide !')
            }// Fin de la fonction deleteCart

            btnDeleteAll.addEventListener("click", deleteCart)

            container.appendChild(ligneProduit);  
            ligneProduit.appendChild(img);                   
            ligneProduit.appendChild(h1);         
            ligneProduit.appendChild(p);
            ligneProduit.appendChild(btnDelete);
            app.appendChild(btnDeleteAll);
            
        }// Fin de la boucle else/for
     

    }
     