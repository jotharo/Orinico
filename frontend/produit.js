// Création de la zone de récupération des données
const app = document.getElementById('productTeddy');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

//Paramétrage de la fonction de récupération des données du produit sélectionné

// Récupération de l'URL > Paramètre 1 pour créer notre fonction fetchTeddy
const apiURL= "http://localhost:3000/api/teddies/"

// Récupération de l'id produit dans l'URL > Paramètre 2 pour créer notre fonction fetchTeddy
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id)

// Création de la constante fetchTeddy pour récupérer les données du Teddy sélectionné grâce à URL + id spécifique au Teddy
const fetchTeddy = fetch (apiURL + id) 


// Lancement de la fonction fetchTeddy
fetchTeddy.then(response => {
    return response.json();
}).then(teddy => {

    // Affichage des éléments de l'article unique Teddy
    var card = document.createElement('div');
    card.setAttribute('class', 'card');

    var img = document.createElement('img');
    img.alt = "Photo du nounours" + teddy.name;
    img.src = teddy.imageUrl;

    var h1 = document.createElement('h1');
    h1.textContent = teddy.name;

    var h2 = document.createElement('h2');
    h2.textContent = teddy.price / 100 + " $";

    var p = document.createElement('p');
    teddy.description = teddy.description.substring(0, 300);
    p.textContent = `${teddy.description}...`;

    // Création du Dropdown > Choix de la couleur du Teddy
    var label = document.createElement('label');
    label.textContent = 'Personnalisez la couleur:';
    label.for = 'Personnalisez la couleur de ' + teddy.name ;

    var select = document.createElement('select');
    select.name = 'choixCouleur';
    select.id = 'choixCouleur';
    label.appendChild(select);
  
            // Dropdown : Récupération des couleurs du Teddy
    const colors = teddy.colors    
                         
            // Dropdown : L'instruction for...of va créer une boucle Array qui parcourt un objet itérable (l'array des couleurs) et va éxecuter des instructions pour la valeur de chaque propriété.
    for (const color of colors) {                                    //  for (variable of iterable) 
        var option = document.createElement('option');               //      instructions
        option.value = color;
        option.textContent = color;
        select.appendChild(option);
        }

    // Bouton d'ajout du Teddy au Panier
    const btnPanier = document.createElement('button');
    btnPanier.id = "addCart"
    btnPanier.textContent = "Ajoutez" + " " + teddy.name + " " + "au panier";

    // Instructions d'ajout du Teddy au Panier 

    function addToCart(event) {
        event.preventDefault()

        // Variable - Stockage du teddy sélectionné + couleur choisit dans le localStorage
        let selectedTeddy = {
            teddyName: teddy.name,
            teddyId: teddy._id,
            teddyColor: select.value,
            teddyQuantity: 1,
            teddyPrice: teddy.price / 100,
        }

        // Variable - On créé un localStorage teddiesInCart ou un array vide si null  >>>>LE PROBLEME EST LA ???
       
        let cartTeddies = JSON.parse(localStorage.getItem('selectedTeddy')) || [];


        // Etape 1 : S'il n'y a rien dans le panier > on créé un localStorage dans lequel on met le selectedTeddy

        if (cartTeddies != null || cartTeddies === undefined) {    // Si le localStorage est vide >>>>>LE PROBLEME EST LA ???
                        
           

            cartTeddies.push(selectedTeddy);                        // On ajoute le produit/teddy à l'array "cartTeddies"

            localStorage.setItem('selectedTeddy', JSON.stringify(selectedTeddy)) || []; // Et on créé le localStorage "teddiesInCart"

            console.log("1ere etape");
        }

            // Etape 2 : S'il y a déjà un ou des produits dans le panier > on verifie si il y en a d'identique au produit/teddy que l'on souhaite ajouter
        //           Si id + couleur identique > on augmente la quantité du produit/teddy par +1

        else {

            for (let i = 0; i < cartTeddies.length; i++) {   
                    // en fonction de la quantité de produits dans le localStorage
                    // S'il y a déjà un item avec un nom ET une couleur identique
    
                    if((cartTeddies[i].teddyName == selectedTeddy.teddyName) && cartTeddies[i].teddyColor == selectedTeddy.teddyColor) { 
                  
                      let cartTeddiesQuantityNumber = Number(cartTeddies[i].teddyQuantity); 
                      // On récupère la quantité du produit en cours d'ajout

                      let cartQuantityNumber = Number(selectedTeddy.teddyQuantity);   
                      // Ainsi que la quantité de produits identiques déjà présents dans le localStorage
                  
                      let sumQuantity = cartTeddiesQuantityNumber + cartQuantityNumber;
                         // On additionne ces deux quantités
                  
                         cartTeddies[i].teddyQuantity = sumQuantity.toString();
                         // Et on remplace la quantité du localStorage par cette nouvelle quantité
                        
                         console.log("2eme etape!");
                    }

        // Etape 3 : il y a déjà des produits/teddies dans le panier, mais aucun n'est identique (id+couleur) à celui que l'on souhaite ajouter.
                    else {
                      cartTeddies.push(selectedTeddy); // On ajoute/push le produit/teddy à l'array cartTeddies}
                      console.log("3eme etape!");
                    }
                

            }
            // On traduit/stringify le contenu de cartTeddies et on l'ajoute au localStorage  "teddiesInCart" 
            localStorage.setItem("selectedTeddy", JSON.stringify(cartTeddies)); 
        }

        var teddyColor =  select.value;
        window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté à votre panier! Souhaitez-vous continuer vos achats? ')
        console.log(cartTeddies)
        console.log("hello!");
    }


    //Ecoute de l'évènement sur le bouton
    btnPanier.addEventListener("click", addToCart)


    // Mise en page des éléments
    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(label);
    card.appendChild(btnPanier);
});


