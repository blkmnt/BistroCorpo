let tools = [];

// Fonction pour charger les données du CSV
function loadCSV() {
    fetch('assets/csv/tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            tools = rows.map(row => {
                const [﻿title, description, buttonText, link, image, status] = row.split(';');
                return { ﻿title, description, buttonText, link, image, status };
            });
            displayCards(); // Affiche toutes les cartes après le chargement
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

function displayCards() {
    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    tools.forEach(tool => {
        if (tool.title && tool.buttonText && tool.title !== "Encore plus de choses à découvrir !") {
            const cardHTML = `
                <div class="${tool.status}">
                    <div class="card-image-container">
                        <img src="${tool.image}" alt="${tool.title}">
                    </div>
                    <div class="card-content">
                        <h2>${tool.title}</h2>
                        <p>${tool.description}</p>
                    </div>
                    <a href="${tool.link}">
                        <button class="button">${tool.buttonText}</button>
                    </a>
                </div>
            `;
            content.innerHTML += cardHTML;
        }
    });
}

function randomCard() {
    fetch('assets/csv/tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            const tools = rows.map(row => {
                const [title, description, buttonText, link, image, status] = row.split(';');
                return { title, description, buttonText, link, image, status };
            });

            // Récupérer le titre du h2 dans la section de la page
            const pageTitle = document.querySelector('.tool-header h2').textContent.trim();

            // Filtrer les outils actifs et exclure ceux dont le titre correspond au h2 de la page
            const activeTools = tools.filter(tool => 
                tool.status && 
                tool.status.trim() === 'card' && 
                tool.title.trim() !== "Encore plus de choses à découvrir !" && 
                tool.title.trim() !== pageTitle // Exclure le titre correspondant au h2
            );
            
            // Log pour voir les outils actifs dans la console
            console.log('Outils actifs:', activeTools);

            // Choisir 2 outils aléatoires parmi les actifs
            const selectedTools = [];
            while (selectedTools.length < 2 && activeTools.length > 0) {
                const randomIndex = Math.floor(Math.random() * activeTools.length);
                selectedTools.push(activeTools[randomIndex]);
                activeTools.splice(randomIndex, 1); // Éliminer l'outil choisi pour éviter les doublons
            }

            // Ajouter la carte "Encore plus de choses à découvrir !"
            const discoverMore = tools.find(tool => tool.title && tool.title.trim() === "Encore plus de choses à découvrir !");
            if (discoverMore) {
                selectedTools.push(discoverMore);
            }

            displayRandomCards(selectedTools); // Appeler la fonction pour afficher les cartes
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Fonction pour afficher les cartes aléatoires
function displayRandomCards(selectedTools) {
    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    selectedTools.forEach(tool => {
        if (tool.title && tool.buttonText) {
            const cardHTML = `
                <div class="${tool.status}">
                    <div class="card-image-container">
                        <img src="${tool.image}" alt="${tool.title}">
                    </div>
                    <div class="card-content">
                        <h2>${tool.title}</h2>
                        <p>${tool.description}</p>
                    </div>
                    <a href="${tool.link}">
                        <button class="button">${tool.buttonText}</button>
                    </a>
                </div>
            `;
            content.innerHTML += cardHTML;
        }
    });
}

// Appel de la fonction pour charger les données
loadCSV();



// Fonction pour charger les défis depuis le CSV
function loadChallenges() {
    fetch('assets/csv/MissionFun_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n');
            challenges = rows.map(row => row.trim()).filter(row => row !== ''); // Filtrer les lignes vides
            
            // Fonction pour afficher un défi aléatoire
            function displayRandomChallenge() {
                if (challenges.length > 0) {
                    const randomIndex = Math.floor(Math.random() * challenges.length);
                    const selectedChallenge = challenges[randomIndex];
                    document.getElementById('défi').textContent = selectedChallenge; // Mettre à jour le texte du H1
                }
            }

            // Afficher un défi lors du chargement initial
            displayRandomChallenge();

            // Ajouter un événement au clic du bouton pour générer un autre défi aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le rechargement de la page
                displayRandomChallenge(); // Afficher un nouveau défi
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton partager est correct
            const outputText = document.getElementById('défi'); // Assurez-vous que l'ID est correct

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const textToCopy = outputText.textContent;
                const siteName = "Défi by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/MissionFun.html"; // Lien de la page
            
                // Vérifier si le texte à copier est valide
                if (textToCopy) {
                    // Concaténer le texte à copier avec le nom et le lien du site
                    const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(fullTextToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });


            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const textToShare = outputText.textContent;
                if (textToShare) {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Défi by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Défi partagé avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appel de la fonction pour charger les défis
loadChallenges();

// Fonction pour charger et afficher un thème de réunion aléatoire
function loadRandomMeetingTheme() {
    fetch('assets/csv/reunions_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n');

            const themes = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher un thème aléatoire
            function displayRandomTheme() {
                if (themes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * themes.length);
                    const randomTheme = themes[randomIndex];
                    document.getElementById('réunion').textContent = randomTheme; // Mettre à jour le texte du H1
                }
            }

            // Afficher un thème lors du chargement initial
            displayRandomTheme();

            // Ajouter un événement au clic du bouton pour générer un autre thème aléatoire
            document.querySelector('.button.button-pink').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomTheme(); // Afficher un nouveau thème
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton partager est correct
            const outputText = document.getElementById('réunion'); // Assurez-vous que l'ID est correct

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const textToCopy = outputText.textContent;
                const siteName = "ODJ de Réunion by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/RéunionsSurréalistes.html"; // Lien de la page
            
                // Vérifier si le texte à copier est valide
                if (textToCopy) {
                    // Concaténer le texte à copier avec le nom et le lien du site
                    const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(fullTextToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });


            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const textToShare = outputText.textContent;
                if (textToShare) {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'ODJ de Réunion by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Thème de réunion partagé avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomMeetingTheme();



function loadRandomEchappatoire() {
    fetch('assets/csv/echappatoire_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n');
            const echappatoire = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une tâche aléatoire
            function displayRandomEchappatoire() {
                if (echappatoire.length > 0) {
                    const randomIndex = Math.floor(Math.random() * echappatoire.length); // Utiliser echappatoire
                    const randomEchappatoire = echappatoire[randomIndex];
                    document.getElementById('echappatoire').textContent = randomEchappatoire; // Mettre à jour le texte du H1
                }
            }

            // Afficher une tâche lors du chargement initial
            displayRandomEchappatoire();

            // Ajouter un événement au clic du bouton pour générer une nouvelle tâche aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomEchappatoire(); // Afficher une nouvelle tâche
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton de partage est correct
            const outputText = document.getElementById('echappatoire'); // L'élément qui affiche l'echappatoire

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const textToCopy = outputText.textContent;
                const siteName = "Excuse by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/Echappatoire.html"; // Lien de la page
            
                // Vérifier si le texte à copier est valide
                if (textToCopy) {
                    // Concaténer le texte à copier avec le nom et le lien du site
                    const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(fullTextToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });

            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const textToShare = outputText.textContent;
                if (textToShare) {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Excuse by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Échappatoire partagé avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });

        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomEchappatoire();

function loadRandomUrgentTask() {
    fetch('assets/csv/urgence_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n');
            const tasks = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une tâche aléatoire
            function displayRandomTask() {
                if (tasks.length > 0) {
                    const randomIndex = Math.floor(Math.random() * tasks.length);
                    const randomTask = tasks[randomIndex];
                    document.getElementById('urgence').textContent = randomTask; // Mettre à jour le texte du H1
                }
            }

            // Afficher une tâche lors du chargement initial
            displayRandomTask();

            // Ajouter un événement au clic du bouton pour générer une nouvelle tâche aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomTask(); // Afficher une nouvelle tâche
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton de partage est correct
            const outputText = document.getElementById('urgence'); // L'élément qui affiche l'urgence

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const textToCopy = outputText.textContent;
                const siteName = "Tâche Urgente by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/UrgenceEtrange.html"; // Lien de la page
            
                // Vérifier si le texte à copier est valide
                if (textToCopy) {
                    // Concaténer le texte à copier avec le nom et le lien du site
                    const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(fullTextToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });

            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const textToShare = outputText.textContent;
                if (textToShare) {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Tâche Urgente by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Tâche urgente partagée avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });

        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomUrgentTask();

function loadRandomJustification() {
    fetch('assets/csv/justification_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n').slice(1);
            const justifications = rows.map(row => row.trim()).filter(row => row.length > 0); // Traiter les lignes du CSV
            
            // Fonction pour afficher une justification aléatoire
            function displayRandomJustification() {
                if (justifications.length > 0) {
                    const randomIndex = Math.floor(Math.random() * justifications.length);
                    const randomJustification = justifications[randomIndex];
                    document.getElementById('justification').textContent = randomJustification; // Mettre à jour le texte du H1
                }
            }

            // Afficher une justification lors du chargement initial
            displayRandomJustification();

            // Ajouter un événement au clic du bouton pour générer une nouvelle justification aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomJustification(); // Afficher une nouvelle justification
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton de partage est correct
            const outputText = document.getElementById('justification'); // L'élément qui affiche la justification

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const textToCopy = outputText.textContent;
                const siteName = "Justification by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/JustificationCréative.html"; // Lien de la page
            
                // Vérifier si le texte à copier est valide
                if (textToCopy) {
                    // Concaténer le texte à copier avec le nom et le lien du site
                    const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(fullTextToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });

            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const textToShare = outputText.textContent;
                if (textToShare) {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Justification by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Justification partagée avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });

        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Appeler la fonction pour charger et afficher un thème dès le chargement de la page
loadRandomJustification();



function loadRandomDistinction() {
    fetch('assets/csv/distinction_liste.csv') // Charger le fichier CSV
        .then(response => response.text()) 
        .then(data => {
            const rows = data.split('\n');

            const distinctions = rows.map(row => {
                const [title, description] = row.split(';').map(item => item.trim()); // Extraire le titre et la description
                return { title, description }; // Retourner un objet avec le titre et la description
            }).filter(distinction => distinction.title && distinction.description); // Filtrer les lignes vides

            // Fonction pour afficher une distinction aléatoire
            function displayRandomDistinction() {
                if (distinctions.length > 0) {
                    const randomIndex = Math.floor(Math.random() * distinctions.length);
                    const randomDistinction = distinctions[randomIndex];
                    document.getElementById('distinction').textContent = randomDistinction.title; // Mettre à jour le texte du H1
                    document.getElementById('distinction_texte').textContent = randomDistinction.description; // Mettre à jour la description
                }
            }

            // Afficher une distinction lors du chargement initial
            displayRandomDistinction();

            // Ajouter un événement au clic du bouton pour générer une nouvelle distinction aléatoire
            document.querySelector('.button').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                displayRandomDistinction(); // Afficher une nouvelle distinction
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Assurez-vous que l'ID du bouton de partage est correct
            const titleElement = document.getElementById('distinction'); // L'élément qui affiche le titre
            const descriptionElement = document.getElementById('distinction_texte'); // L'élément qui affiche la description

            // Gestion du bouton de copie
            copyButton.addEventListener("click", function () {
                const titleToCopy = titleElement.textContent; // Récupérer le titre
                const descriptionToCopy = descriptionElement.textContent; // Récupérer la description
                const siteName = "Award by Bistro Corpo"; // Nom du site
                const siteLink = "https://www.bistrocorpo.fr/DistinctionsAbsurdes.html"; // Lien de la page
            
                // Vérifier si le titre et la description sont valides
                if (titleToCopy && descriptionToCopy) {
                    // Concaténer le titre, la description, le nom et le lien du site
                    const textToCopy = `${titleToCopy} - ${descriptionToCopy}\n\n${siteName}\n${siteLink}`;
            
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
            
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
            
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                }
            });

            // Gestion du bouton de partage
            shareButton.addEventListener("click", function () {
                const titleToShare = titleElement.textContent;
                const descriptionToShare = descriptionElement.textContent;
                if (titleToShare && descriptionToShare) {
                    const textToShare = `${titleToShare} - ${descriptionToShare}`;
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Award by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href, // Lien de la page actuelle ou d'un autre site
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Distinction partagée avec succès');
                        })
                        .catch(err => {
                            console.error("Erreur lors du partage :", err);
                        });
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });

        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}



// Appeler la fonction pour charger et afficher une distinction dès le chargement de la page
loadRandomDistinction();


function loadAstroPro() {
    document.getElementById('astro-segmented').addEventListener('click', function(event) {
        try {
            // Empêcher le comportement par défaut (si nécessaire)
            event.preventDefault();

            // Récupération des éléments
            const astroContent = document.getElementById('astro-content');
            const compatibilityContent = document.getElementById('compatibility-content');
            const compatibilitySegmented = document.getElementById('compatibility-segmented');

            // Vérification que les éléments existent
            if (!astroContent || !compatibilityContent || !compatibilitySegmented) {
                throw new Error("Un des éléments nécessaires est manquant. Vérifiez que 'astro-content', 'compatibility-content', et 'compatibility-segmented' existent dans le DOM.");
            }

            // Mise à jour des classes
            astroContent.classList.add('active');
            compatibilityContent.classList.remove('active');
            this.classList.add('active');
            compatibilitySegmented.classList.remove('active');

        } catch (error) {
            console.error("Erreur lors de l'activation de la section 'Mon signe astro':", error);
        }
    });

    document.getElementById('compatibility-segmented').addEventListener('click', function(event) {
        try {
            // Empêcher le comportement par défaut (si nécessaire)
            event.preventDefault();

            // Récupération des éléments
            const astroContent = document.getElementById('astro-content');
            const compatibilityContent = document.getElementById('compatibility-content');
            const astroSegmented = document.getElementById('astro-segmented');

            // Vérification que les éléments existent
            if (!astroContent || !compatibilityContent || !astroSegmented) {
                throw new Error("Un des éléments nécessaires est manquant. Vérifiez que 'astro-content', 'compatibility-content', et 'astro-segmented' existent dans le DOM.");
            }

            // Mise à jour des classes
            compatibilityContent.classList.add('active');
            astroContent.classList.remove('active');
            this.classList.add('active');
            astroSegmented.classList.remove('active');

        } catch (error) {
            console.error("Erreur lors de l'activation de la section 'Ma compatibilité':", error);
        }
    });
}

// Appeler la fonction pour initialiser les événements
loadAstroPro();


function loadAndPopulateAstroGrids() { 
    try {
        fetch('assets/csv/SignesAstro_liste.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur lors du chargement du fichier CSV : ${response.statusText}`);
                }
                return response.text();
            })
            .then(csvData => {
                const astroData = csvData.trim().split('\n').map(row => {
                    const [label, imageUrl, description] = row.split(';');
                    return { label, imageUrl, description };
                });

                const astroGrids = document.querySelectorAll('.astro-signs-grid');
                astroGrids.forEach(astroGrid => {
                    astroGrid.innerHTML = '';

                    astroData.forEach(sign => {
                        const astroSign = document.createElement('div');
                        astroSign.classList.add('astro-sign');

                        const astroIcon = document.createElement('div');
                        astroIcon.classList.add('astro-icon');

                        const img = document.createElement('img');
                        img.src = sign.imageUrl;
                        img.alt = `Icône ${sign.label}`;

                        const astroLabel = document.createElement('div');
                        astroLabel.classList.add('astro-label');
                        astroLabel.textContent = sign.label;

                        // Ajouter un attribut de données pour la description
                        astroSign.dataset.description = sign.description;

                        astroIcon.appendChild(img);
                        astroSign.appendChild(astroIcon);
                        astroSign.appendChild(astroLabel);
                        astroGrid.appendChild(astroSign);
                    });
                });

                // Appel des fonctions de sélection après que les éléments ont été ajoutés
                setupAstroSelection(astroData);
                setupCompatibilitySelection();
            })
            .catch(error => {
                console.error("Erreur lors de la récupération et de l'affichage des informations du fichier CSV :", error);
            });
    } catch (error) {
        console.error("Erreur lors de la récupération et de l'affichage des informations du fichier CSV :", error);
    }
}

function setupAstroSelection(astroData) {
    try {
        const astroSigns = document.querySelectorAll('.astro-sign');
        const descriptionField = document.getElementById('astro-description'); // Assurez-vous que cet ID est correct
        const copyButton = document.getElementById('astro-copyButton'); // Assurez-vous que l'ID est correct
        const shareButton = document.getElementById('astro-shareButton'); // Assurez-vous que l'ID est correct

        astroSigns.forEach(sign => {
            sign.addEventListener('click', function() {
                const astroContent = document.querySelector('.astro-content');
                if (!astroContent.classList.contains('active')) {
                    return;
                }

                // Désélectionner tous les éléments précédemment sélectionnés
                astroSigns.forEach(s => s.classList.remove('selected'));
                // Ajouter la classe selected à l'élément cliqué
                this.classList.add('selected');

                // Mettre à jour le champ de description avec la description du signe sélectionné
                descriptionField.textContent = this.dataset.description; // Utiliser l'attribut de données

                // Mettre à jour le bouton de partage
                shareButton.dataset.text = this.dataset.description; // Stocker la description pour le partage
            });
        });

        // Gestion du bouton de copie
        copyButton.addEventListener("click", function() {
            const textToCopy = descriptionField.textContent; // Récupérer le texte à copier
            const siteName = "Astrologie by Bistro Corpo"; // Nom du site
            const siteLink = "https://www.bistrocorpo.fr/AstroPro.html"; // Lien de la page
        
            if (textToCopy) {
                // Concaténer le texte avec le nom du site et le lien
                const finalText = `${textToCopy}\n\n${siteName}\n${siteLink}`;
        
                navigator.clipboard.writeText(finalText)
                    .then(() => {
                        // Animation pour le statut selected
                        copyButton.classList.add("selected");
                        setTimeout(() => {
                            copyButton.classList.remove("selected");
                        }, 1000);
        
                        // Remplacer l'image du bouton par une image de "check"
                        const checkImage = document.createElement("img");
                        checkImage.src = "assets/images/icons/check.png"; 
                        checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                        copyButton.innerHTML = ""; // Supprimer l'image actuelle
                        copyButton.appendChild(checkImage); // Ajouter l'image "check"
        
                        // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                        setTimeout(() => {
                            copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                        }, 1000);
                    })
                    .catch(err => {
                        console.error("Erreur lors de la copie :", err);
                    });
            }
        });

        // Gestion du bouton de partage
        shareButton.addEventListener("click", function() {
            const textToShare = descriptionField.textContent; // Récupérer le texte à partager
            if (textToShare) {
                if (navigator.share) { // Si le navigateur supporte l'API native
                    navigator.share({
                        title: 'Astrologie by Bistro Corpo',
                        text: textToShare,
                        url: window.location.href, // Lien de la page actuelle ou d'un autre site
                    })
                    .then(() => {
                        // Animation pour le statut selected
                        shareButton.classList.add("selected");
                        setTimeout(() => {
                            shareButton.classList.remove("selected");
                        }, 1000);

                        console.log('Texte partagé avec succès');
                    })
                    .catch(err => {
                        console.error("Erreur lors du partage :", err);
                    });
                } else {
                    alert('Le partage n’est pas supporté sur ce navigateur.');
                }
            }
        });

    } catch (error) {
        console.error("Erreur lors de la configuration de la sélection des signes astro:", error);
    }
}


function setupCompatibilitySelection() {
    try {
        const column1Signs = document.querySelectorAll('.column.column-1 .astro-sign');
        const column3Signs = document.querySelectorAll('.column.column-3 .astro-sign');

        // Réinitialisation de la sélection des signes
        let selectedSign1 = null;
        let selectedSign2 = null;

        // Ajout d'attributs data-sign pour chaque signe dans la sélection
        column1Signs.forEach(sign => {
            sign.setAttribute('data-sign', sign.querySelector('.astro-label').textContent);
        });
        column3Signs.forEach(sign => {
            sign.setAttribute('data-sign', sign.querySelector('.astro-label').textContent);
        });

        // Fonction de gestion de la sélection des signes
        function handleSelection(signs, column) {
            signs.forEach(sign => {
                sign.addEventListener('click', function () {
                    // Si l'élément cliqué est déjà sélectionné, ne rien faire
                    if (this.classList.contains('selected')) {
                        return;
                    }

                    const clickedSign = this.getAttribute('data-sign');

                    // Gestion de la sélection des signes
                    if (column === 'column1') {
                        // Mettre à jour le signe sélectionné
                        selectedSign1 = clickedSign;
                        column1Signs.forEach(s => s.classList.remove('selected')); // Enlever la sélection visuelle des autres signes
                        this.classList.add('selected'); // Ajouter la classe "selected" au signe cliqué
                    } else if (column === 'column3') {
                        // Mettre à jour le signe sélectionné
                        selectedSign2 = clickedSign;
                        column3Signs.forEach(s => s.classList.remove('selected')); // Enlever la sélection visuelle des autres signes
                        this.classList.add('selected'); // Ajouter la classe "selected" au signe cliqué
                    }

                    // Vérifier si deux signes sont sélectionnés et afficher la compatibilité
                    if (selectedSign1 && selectedSign2) {
                        displayCompatibility(selectedSign1, selectedSign2);
                    }
                });
            });
        }

        // Gestion de la sélection des signes pour les deux colonnes
        handleSelection(column1Signs, 'column1');
        handleSelection(column3Signs, 'column3');

    } catch (error) {
        console.error("Erreur lors de la configuration de la sélection des signes de compatibilité:", error);
    }
}

// Fonction pour afficher la compatibilité
function displayCompatibility(sign1, sign2) {
    fetch('assets/csv/CompatibilitéAstro_liste.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement du fichier CSV : ${response.statusText}`);
            }
            return response.text();
        })
        .then(csvData => {
            const compatibilityData = csvData.trim().split('\n').map(row => {
                const [signeAstro1, signeAstro2, compatibilite, description] = row.split(';');
                return { signeAstro1, signeAstro2, compatibilite, description };
            });

            // Trouver la compatibilité pour les signes sélectionnés
            const compatibilityInfo = compatibilityData.find(item => 
                (item.signeAstro1 === sign1 && item.signeAstro2 === sign2) ||
                (item.signeAstro1 === sign2 && item.signeAstro2 === sign1)
            );

            if (compatibilityInfo) {
                // Afficher les résultats
                const intensityElement = document.getElementById("intensity");
                const descriptionElement = document.getElementById("compatibility-description");
                const scoreElement = document.getElementById("score");
                const copyButton = document.getElementById('compatibility-copyButton'); // Assurez-vous que l'ID est correct
                const shareButton = document.getElementById('compatibility-shareButton'); // Assurez-vous que l'ID est correct

                intensityElement.textContent = compatibilityInfo.compatibilite;

                // Générer un score aléatoire basé sur la compatibilité
                let score = 0;
                switch (compatibilityInfo.compatibilite) {
                    case 'Très Forte':
                        score = Math.floor(Math.random() * 21) + 80; // entre 80 et 100
                        break;
                    case 'Forte':
                        score = Math.floor(Math.random() * 21) + 60; // entre 60 et 80
                        break;
                    case 'Moyenne':
                        score = Math.floor(Math.random() * 21) + 40; // entre 40 et 60
                        break;
                    case 'Faible':
                        score = Math.floor(Math.random() * 21) + 20; // entre 20 et 40
                        break;
                    case 'Très Faible':
                        score = Math.floor(Math.random() * 21); // entre 0 et 20
                        break;
                }
                scoreElement.textContent = `${score}%`;
                descriptionElement.textContent = compatibilityInfo.description;

                // Mise à jour du texte pour le partage
                shareButton.dataset.text = `Compatibilité entre ${sign1} et ${sign2}: ${compatibilityInfo.compatibilite} (${score}%) - ${compatibilityInfo.description}`;

                // Gestion du bouton de copie
                copyButton.addEventListener("click", function() {
                    const textToCopy = `Compatibilité entre ${sign1} et ${sign2}: ${compatibilityInfo.compatibilite} (${score}%) - ${compatibilityInfo.description}`;
                    const siteName = "Compatibilité Astrologique by Bistro Corpo"; // Nom du site
                    const siteLink = "https://www.bistrocorpo.fr/AstroPro.html"; // Lien de la page
                
                    // Concaténer le texte avec le nom du site et le lien
                    const finalText = `${textToCopy}\n\n${siteName}\n${siteLink}`;
                
                    navigator.clipboard.writeText(finalText)
                        .then(() => {
                            // Animation pour le statut selected
                            copyButton.classList.add("selected");
                            setTimeout(() => {
                                copyButton.classList.remove("selected");
                            }, 1000);
                
                            // Remplacer l'image du bouton par une image de "check"
                            const checkImage = document.createElement("img");
                            checkImage.src = "assets/images/icons/check.png"; 
                            checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                            copyButton.innerHTML = ""; // Supprimer l'image actuelle
                            copyButton.appendChild(checkImage); // Ajouter l'image "check"
                
                            // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                            setTimeout(() => {
                                copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                            }, 1000);
                        })
                        .catch(err => {
                            console.error("Erreur lors de la copie :", err);
                        });
                });
                // Gestion du bouton de partage
                shareButton.addEventListener("click", function() {
                    const textToShare = shareButton.dataset.text; // Récupérer le texte à partager
                    if (textToShare) {
                        if (navigator.share) { // Si le navigateur supporte l'API native
                            navigator.share({
                                title: `Compatibilité entre ${sign1} et ${sign2} by Bistro Corpo`,
                                text: textToShare,
                                url: window.location.href, // Lien de la page actuelle ou d'un autre site
                            })
                            .then(() => {
                                // Animation pour le statut selected
                                shareButton.classList.add("selected");
                                setTimeout(() => {
                                    shareButton.classList.remove("selected");
                                }, 1000);

                                console.log('Texte partagé avec succès');
                            })
                            .catch(err => {
                                console.error("Erreur lors du partage :", err);
                            });
                        } else {
                            alert('Le partage n’est pas supporté sur ce navigateur.');
                        }
                    }
                });

            } else {
                console.error("Aucune compatibilité trouvée pour les signes :", sign1, sign2);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération et de l'affichage des informations de compatibilité :", error);
        });
}


// Appel de la fonction pour charger et configurer les grilles astro-sign
loadAndPopulateAstroGrids();

function initBullshitTranslator() {
    document.addEventListener("DOMContentLoaded", function () {
        const inputText = document.getElementById("inputText");
        const charCount = document.getElementById("charCount");
        const clearButton = document.getElementById("clearButton");
        const translateButton = document.getElementById("translateButton");
        const outputText = document.getElementById("outputText");
        const copyButton = document.getElementById("copyButton");
        const shareButton = document.getElementById("shareButton"); // Assurez-vous que l'ID du bouton de partage est correct

        // Met à jour le compteur de caractères
        inputText.addEventListener("input", function () {
            charCount.textContent = `${inputText.value.length}/500`;
        });

        // Efface le texte de l'entrée quand on clique sur le bouton "clear"
        clearButton.addEventListener("click", function () {
            inputText.value = "";
            charCount.textContent = "0/500";
            outputText.textContent = "Le deliverable textuel sera visible ici une fois la transformation effectuée.";
            flashButton(clearButton); // Animation pour le statut selected
        });

        // Fonction pour envoyer la requête à votre API
        translateButton.addEventListener("click", async function () {
            const userInput = inputText.value.trim();
        
            // Debug: Vérifiez la valeur de userInput
            console.log("User Input:", userInput);
        
            if (userInput) {
                // Affiche le loader
                const loader = document.getElementById("loader");
                loader.style.display = "block";
                outputText.textContent = ""; // Clear output text while loading
        
                try {
                    // Appel à l'API Gateway (qui appelle Lambda en backend)
                    const response = await fetch("https://x5n9wjpvf1.execute-api.eu-north-1.amazonaws.com/Prod", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userInput: userInput }), // Vérifiez que c'est bien formaté
                    });
        
                    console.log("Response Status:", response.status); // Ajouté pour voir le statut de la réponse
        
                    const data = await response.json();
                    console.log("API Response:", data); // Debug: Vérifiez la réponse de l'API
        
                    if (response.ok) {
                        const bodyData = JSON.parse(data.body);
                        if (bodyData.translatedText) {
                            outputText.textContent = bodyData.translatedText;
                        } else {
                            outputText.textContent = "Erreur : Impossible d'obtenir le texte traduit.";
                        }
                    } else {
                        outputText.textContent = "Erreur : " + (data.error ? data.error : "Impossible de traduire le texte.");
                    }
                } catch (error) {
                    console.error("Erreur lors de l'appel à l'API :", error);
                    outputText.textContent = "Erreur : Une erreur s'est produite.";
                } finally {
                    // Cache le loader après la réponse ou l'erreur
                    loader.style.display = "none";
                }
        
                flashButton(translateButton); // Animation pour le statut selected
            } else {
                outputText.textContent = "Erreur : Veuillez entrer un texte.";
            }
        });

        // Copie le texte du bloc "outputText" quand on clique sur le bouton "copy"
        copyButton.addEventListener("click", function () {
        const textToCopy = outputText.textContent;
        const siteName = "Traduction by Bistro Corpo"; // Nom du site
        const siteLink = "https://www.bistrocorpo.fr/BullshitTrad.html"; // Lien de la page
    
        // Vérifier si le texte à copier est valide
        if (textToCopy) {
            // Concaténer le texte à copier avec le nom et le lien du site
            const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
    
            navigator.clipboard.writeText(fullTextToCopy)
                .then(() => {
                    // Animation pour le statut selected
                    flashButton(copyButton); // Animation pour le statut selected
    
                    // Remplacer l'image du bouton par une image de "check"
                    const checkImage = document.createElement("img");
                    checkImage.src = "assets/images/icons/check.png"; 
                    checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                    copyButton.innerHTML = ""; // Supprimer l'image actuelle
                    copyButton.appendChild(checkImage); // Ajouter l'image "check"
    
                    // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                    setTimeout(() => {
                        copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                    }, 1000);
                })
                .catch(err => {
                    console.error("Erreur lors de la copie :", err);
                });
        }
    });


        // Gestion du bouton de partage
        shareButton.addEventListener("click", function () {
            const textToShare = outputText.textContent;
            if (textToShare) {
                if (navigator.share) { // Si le navigateur supporte l'API native
                    navigator.share({
                        title: 'Traduction by Bistro Corpo',
                        text: textToShare,
                        url: window.location.href, // Lien de la page actuelle ou d'un autre site
                    })
                    .then(() => {
                        // Animation pour le statut selected
                        flashButton(shareButton);
                        console.log('Texte partagé avec succès');
                    })
                    .catch(err => {
                        console.error("Erreur lors du partage :", err);
                    });
                } else {
                    alert('Le partage n’est pas supporté sur ce navigateur.');
                }
            }
        });
        
        // Fonction pour animer le statut "selected" des boutons
        function flashButton(button) {
            button.classList.add("selected");
            setTimeout(() => {
                button.classList.remove("selected");
            }, 1000);
        }
    });
}


// Appeler la fonction pour initialiser l'outil de traduction
initBullshitTranslator();



function loadCompliments() {
    fetch('assets/csv/flatterie_liste.csv') // Charger le fichier CSV
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const compliments = rows.map(row => {
                const [quality, compliment] = row.split(';').map(item => item.trim()); // Extraire la qualité et le compliment
                return { quality, compliment }; // Retourner un objet avec la qualité et le compliment
            }).filter(item => item.quality && item.compliment); // Filtrer les lignes vides
            
            // Gérer le changement de sélection dans le dropdown
            const dropdown = document.getElementById('colleagueDropdown');
            const outputText = document.getElementById('flatterie'); // L'élément qui affiche le compliment

            dropdown.addEventListener('change', function() {
                const selectedQuality = dropdown.value;

                // Réinitialiser l'état selected sur toutes les options
                Array.from(dropdown.options).forEach(option => {
                    option.selected = (option.value === selectedQuality);
                });

                // Afficher un compliment si une qualité est sélectionnée
                if (selectedQuality) {
                    displayRandomCompliment(selectedQuality);
                } else {
                    outputText.textContent = 'Choisissez une qualité...'; // Afficher le texte par défaut
                }
            });

            // Fonction pour afficher un compliment aléatoire
            function displayRandomCompliment(selectedQuality) {
                const filteredCompliments = compliments.filter(item => item.quality === selectedQuality);
                
                if (filteredCompliments.length > 0) {
                    const randomIndex = Math.floor(Math.random() * filteredCompliments.length);
                    const randomCompliment = filteredCompliments[randomIndex].compliment;
                    outputText.textContent = randomCompliment; // Mettre à jour le texte du compliment
                }
            }

            // Ajouter un événement au clic du bouton pour générer un autre compliment
            document.querySelector('.button.button-pink').addEventListener('click', function(event) {
                event.preventDefault(); // Empêcher le comportement par défaut du lien
                const selectedQuality = dropdown.value;

                if (selectedQuality) {
                    displayRandomCompliment(selectedQuality); // Afficher un nouveau compliment
                }
            });

            // Ajout du gestionnaire d'événements pour le bouton de copie
            const copyButton = document.getElementById('copyButton'); // Assurez-vous que l'ID est correct
            const shareButton = document.getElementById('shareButton'); // Bouton partager

            copyButton.addEventListener("click", function () {
            const textToCopy = outputText.textContent;
            const siteName = "Compliment by Bistro Corpo"; // Nom du site
            const siteLink = "https://www.bistrocorpo.fr/FlatterieSurprenante.html"; // Lien de la page
        
            // Vérifier si le texte à copier est valide
            if (textToCopy && textToCopy !== 'Choisissez une qualité...') {
                // Concaténer le texte à copier avec le nom et le lien du site
                const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
        
                navigator.clipboard.writeText(fullTextToCopy)
                    .then(() => {
                        // Animation pour le statut selected
                        copyButton.classList.add("selected");
                        setTimeout(() => {
                            copyButton.classList.remove("selected");
                        }, 1000);
        
                        // Remplacer l'image du bouton par une image de "check"
                        const checkImage = document.createElement("img");
                        checkImage.src = "assets/images/icons/check.png"; 
                        checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                        copyButton.innerHTML = ""; // Supprimer l'image actuelle
                        copyButton.appendChild(checkImage); // Ajouter l'image "check"
        
                        // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                        setTimeout(() => {
                            copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">';
                        }, 1000);
                    })
                    .catch(err => {
                        console.error("Erreur lors de la copie :", err);
                    });
            }
        });


            // Ajout du gestionnaire d'événements pour le bouton de partage
            shareButton.addEventListener('click', function () {
                const textToShare = outputText.textContent;

                if (textToShare && textToShare !== 'Choisissez une qualité...') {
                    if (navigator.share) { // Si le navigateur supporte l'API native
                        navigator.share({
                            title: 'Compliment by Bistro Corpo',
                            text: textToShare,
                            url: window.location.href,
                        })
                        .then(() => {
                            // Animation pour le statut selected
                            shareButton.classList.add("selected");
                            setTimeout(() => {
                                shareButton.classList.remove("selected");
                            }, 1000);

                            console.log('Compliment partagé avec succès');
                        })
                        .catch(err => console.error('Erreur lors du partage:', err));
                    } else {
                        alert('Le partage n’est pas supporté sur ce navigateur.');
                    }
                }
            });

        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}


// Appeler la fonction pour charger et afficher un compliment dès le chargement de la page
loadCompliments();

function setupToggleMailSections() {
    // Sélectionner les toggles et les sections correspondantes
    const locationToggle = document.getElementById("locationToggle");
    const backupToggle = document.getElementById("backupToggle");
    const signatureToggle = document.getElementById("signatureToggle");

    const locationSection = document.getElementById("mail-infoLocation");
    const backupSection = document.getElementById("mail-infoBackUp");
    const signatureSection = document.getElementById("mail-infoSignature");

    // Fonction pour modifier la visibilité en commentant ou décommentant "display: none;"
    function toggleSection(toggle, section) {
        toggle.addEventListener('change', function() {
            if (toggle.checked) {
                // Désactive display: none en le commentant
                if (section.style.display === 'none' || section.style.display === '') {
                    section.style.display = ''; // Reset display
                }
            } else {
                // Réactive display: none
                section.style.display = 'none';
            }
        });
    }

    // Activer les toggles pour chaque section
    toggleSection(locationToggle, locationSection);
    toggleSection(backupToggle, backupSection);
    toggleSection(signatureToggle, signatureSection);
}

function loadMailContent() {
    // Récupérer les éléments du DOM
    const typeDropdown = document.getElementById("typeDropdown");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const locationToggle = document.getElementById("locationToggle");
    const backupToggle = document.getElementById("backupToggle");
    const signatureToggle = document.getElementById("signatureToggle");

    const location = document.getElementById("location");
    const preLocationDropdown = document.getElementById("preLocationDropdown");
    const nameBackUp = document.getElementById("nameBackUp");
    const infoBackUp = document.getElementById("infoBackUp");
    const signature = document.getElementById("signature");
    
    const mailContent = document.getElementById("mailContent");
    const sender = document.getElementById("sender");

    // Fonction pour formater la date au format français
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Fonction pour générer le contenu du mail
    const generateMailContent = () => {
        // Vérifier que les champs obligatoires sont remplis
        if (typeDropdown.value === "default" || !startDate.value || !endDate.value) {
            mailContent.innerHTML = "1. Renseignez <b>Mon Type de Congés</b> et <b>Ma Période d'Absence</b> dans le formulaire<br><br>2. Cliquez sur <b>Rédiger</b>";
            return;
        }
    
        // Lire le CSV et sélectionner les lignes correspondant au type de congé
        fetch("assets/csv/MailAbsence_liste.csv")
            .then(response => response.text())
            .then(data => {
                const lines = data.split("\n").map(line => line.split(";"));
                
                // Filtrer les lignes correspondant au type sélectionné
                const filteredLines = lines.filter(line => line[0] === typeDropdown.value);
                const randomLine = filteredLines[Math.floor(Math.random() * filteredLines.length)][1];
                
                // Remplacement des dates avec format français
                let finalMail = `Bonjour,<br><br>` + // Ajout de "Bonjour," avec un saut de ligne
                    randomLine
                        .replace("[date de début]", formatDate(startDate.value))
                        .replace("[date de fin]", formatDate(endDate.value));
                
                // Si locationToggle est activé, ajouter la destination
                if (locationToggle.checked && location.value) {
                    finalMail = finalMail.replace("[destination]", `${preLocationDropdown.value} ${location.value}`);
                } else {
                    finalMail = finalMail.replace("[destination]", "");
                }
    
                // Si backupToggle est activé, ajouter le backup
                if (backupToggle.checked && nameBackUp.value) {
                    const backupLines = lines.filter(line => line[0] === "backup");
                    const randomBackupLine = backupLines[Math.floor(Math.random() * backupLines.length)][1];
                
                    // Remplacer [backup] par le nom du backup
                    let backupText = randomBackupLine.replace("[backup]", nameBackUp.value);
                    
                    // Vérifier si les coordonnées sont renseignées
                    if (infoBackUp.value) {
                        backupText = backupText.replace(nameBackUp.value, `${nameBackUp.value} (${infoBackUp.value})`);
                    }
                    
                    finalMail += `<br><br>${backupText}`;
                }
    
                // Ajouter une conclusion
                const conclusionLines = lines.filter(line => line[0] === "conclusion");
                const randomConclusionLine = conclusionLines[Math.floor(Math.random() * conclusionLines.length)][1];
                finalMail += `<br><br>${randomConclusionLine}`;
    
                // Si signatureToggle est activé, ajouter la signature
                if (signatureToggle.checked && signature.value) {
                    finalMail += `<br><br>${signature.value}`;
                    sender.textContent = signature.value;
                }
    
                // Mettre à jour le contenu du mail
                mailContent.innerHTML = finalMail;
            });
    };

    // Gérer le clic sur le bouton "Rédiger"
    document.getElementById("mail").addEventListener("click", function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut
        generateMailContent();
    });

    // Gérer le clic sur le bouton "Un autre mail"
    document.getElementById("mailNew").addEventListener("click", function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut
        generateMailContent();
    });

    // Fonctionnalité pour le bouton "clear"
    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function() {
        // Réinitialiser les valeurs des champs
        typeDropdown.value = "default";
        startDate.value = "";
        endDate.value = "";
        location.value = "";
        nameBackUp.value = "";
        infoBackUp.value = "";
        signature.value = "";
        mailContent.innerHTML = "1. Renseignez <b>Mon Type de Congés</b> et <b>Ma Période d'Absence</b> dans le formulaire<br><br>2. Cliquez sur <b>Rédiger</b>";
    
        // Animation pour le bouton clear
        clearButton.classList.add("selected");
        setTimeout(() => {
            clearButton.classList.remove("selected");
        }, 1000);
    });
    
    // Fonctionnalité pour le bouton "copy"
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", function () {
        const textToCopy = mailContent.innerText;
        const siteName = "Message d'absence by Bistro Corpo"; // Nom du site
        const siteLink = "https://www.bistrocorpo.fr/ModèleAbsence.html"; // Lien de la page
    
        // Concaténer le texte à copier avec le nom et le lien du site
        const fullTextToCopy = `${textToCopy}\n\n${siteName}\n${siteLink}`;
    
        navigator.clipboard.writeText(fullTextToCopy)
            .then(() => {
                // Animation pour le bouton de copie
                copyButton.classList.add("selected");
                
                // Remplacer l'image du bouton par une image de "check"
                const checkImage = document.createElement("img");
                checkImage.src = "assets/images/icons/check.png"; 
                checkImage.alt = "Copié !"; // Ajoutez un texte alternatif si nécessaire
                copyButton.innerHTML = ""; // Supprimer l'image actuelle
                copyButton.appendChild(checkImage); // Ajouter l'image "check"
    
                // Réinitialiser le bouton après 1000 ms pour revenir à l'image de copie
                setTimeout(() => {
                    copyButton.innerHTML = '<img src="assets/images/icons/copy.png" alt="Copier">'; // Remettre l'image d'origine
                    copyButton.classList.remove("selected");
                }, 1000);
            })
            .catch(err => console.error("Erreur lors de la copie:", err));
    });

    
    // Fonctionnalité pour le bouton "share"
    const shareButton = document.getElementById("shareButton");
    shareButton.addEventListener("click", function () {
        const textToShare = mailContent.innerText;
        if (navigator.share) {
            navigator.share({
                title: 'Message d\'absence by Bistro Corpo',
                text: textToShare,
                url: window.location.href,
            })
            .then(() => {
                console.log('Message partagé avec succès');
            })
            .catch(err => console.error('Erreur lors du partage:', err));
        } else {
            alert('Le partage n’est pas supporté sur ce navigateur.');
        }
    });

}


