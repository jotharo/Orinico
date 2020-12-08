// RECUPERATION DES DONNEES RECAPITULATIVES > Order ID + total du prix

// Récupération de l'id de la commande

let orderId = localStorage.getItem('Order')

// Récupération du prix total de la commande

let totalPrice = localStorage.getItem('totalPrice')

// AFFICHAGE DU RECAPITULATIF > Order ID + total du prix

// Création de la zone de récupération des données

const app = document.getElementById('main');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

// Affichage des données

const h2 = document.createElement('h2');
h2.textContent = 'Récapitulatif de votre commande: ';

const orderId = document.createElement('p');
order.textContent = 'Numméro de commande : '+ orderId;

const total = document.createElement('p');
total.textContent = 'Total de votre commande : '+ totalPrice + '$';

// Mise en page des éléments

container.appendChild(h2);
container.appendChild(orderId);
container.appendChild(total);

// FIN DU PARCOURS CLIENT > On efface le localStorage

//localStorage.clear()
