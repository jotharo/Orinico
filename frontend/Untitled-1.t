// Ajout d'une fonction 'onclick' sur le bouton "Ajouter au panier"
                    panier.addEventListener('click', function(e) {
                        
                    let color = document.querySelector('select').value;

                    let quantity = document.getElementById('quantityInput').value;
                    // Ce if / else permet de s'assurer que l'utilisateur remplisse la case "quantité" avec au moins 1
                    if (quantity < 1) { 
                    // Si l'utilisateur laisse l'input vierge, tape 0 ou -x, une erreur sera renvoyée   
                        swal("Vous n'avez pas oublié quelque chose ?", "Il va vous falloir au moins 1 teddy !", "error");
                    
                    } else {
                    // Par contre si l'utilisateur entre une valeur de 1 ou plus, tout le code suivant sera éxécuté
                        let cart = {
                            "id" : id,
                            "name" : name,
                            "price" : price/100,            // Déclaration de cart, un objet représentant un teddy type
                            "color" : color,
                            "quantity" : quantity,
                            "imageURL" : imageUrl
                        }
                        
                        swal("Produit ajouté au panier", "", "success");

                        // Première utilisation du localStorage - Ici on vérifié si nous avons quelque chose dedans
                        let cartItems = JSON.parse(localStorage.getItem('teddyCart')) || [];

                        // If / Else servant à éxécuter du code en fonction de s'il y a du contenu dans le localStorage
                        if (localStorage.getItem('teddyCart') === null) { /* Si le localStorage est vide */

                            cartItems.push(cart);       // On va ajouter le produit actuel à l'array cartItems

                            localStorage.setItem("teddyCart", JSON.stringify(cart)) || []; // Puis créer notre localStorage 'teddyCart

                        } else {    // Par contre, si le localStorage a déjà du contenu

                            let itemHasChanged = false; // Cette déclaration servira pour contrôler les doublons
                            
                            for(let i = 0; i < cartItems.length; i++) {   
                                // en fonction de la quantité de produits dans le localStorage
                                // S'il y a déjà un item avec un nom ET une couleur identique
                                if((cartItems[i].name == cart.name) && cartItems[i].color == cart.color) { 
                              
                                  let cartItemsQuantityNumber = Number(cartItems[i].quantity); 
                                  // On récupère la quantité du produit en cours d'ajout
                                  let cartQuantityNumber = Number(cart.quantity);   
                                  // Ainsi que la quantité de produits identiques déjà présents dans le localStorage
                              
                                  let sumQuantity = cartItemsQuantityNumber + cartQuantityNumber;
                                     // On additionne ces deux quantités
                              
                                  cartItems[i].quantity = sumQuantity.toString();
                                     // Et on remplace la quantité du localStorage par cette nouvelle quantité
                                  itemHasChanged = true;  
                                }
                            }

                        if(itemHasChanged == false) {  
                            // Il y a déjà des produits dans le panier mais pas identiques à ceux qui sont en ajout
                            cartItems.push(cart);       
                            // Donc on peut simplement push les nouveaux produits pour les ajouter à l'array cartItems
                                }
                            }   
                            
                            localStorage.setItem("teddyCart", JSON.stringify(cartItems));   
                            // Puis stringify le contenu de cartItems pour l'ajouter au localStorage                      
                            } 
                        });
                    }
                }
            })