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




let challenges = [];

// Fonction pour charger les défis depuis le CSV
function loadChallenges() {
    fetch('assets/csv/MissionFun_liste.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            challenges = rows.map(row => row.trim()).filter(row => row !== ''); // Filtrer les lignes vides
            displayRandomChallenge(); // Afficher un défi au chargement
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

// Fonction pour afficher un défi aléatoire
function displayRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const selectedChallenge = challenges[randomIndex];
    document.getElementById('défi').textContent = selectedChallenge;
}

// Événement pour le bouton "Un autre challenge"
document.querySelector('.tool-button a').addEventListener('click', (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    displayRandomChallenge(); // Afficher un nouveau défi
});

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

function setupAstroSelection() {
    try {
        const astroSigns = document.querySelectorAll('.astro-sign');

        astroSigns.forEach(sign => {
            sign.addEventListener('click', function() {
                // Vérifier si astro-content est active
                const astroContent = document.querySelector('.astro-content');
                if (!astroContent.classList.contains('active')) {
                    return; // Ne rien faire si astro-content n'est pas active
                }

                // Désélectionner tous les éléments précédemment sélectionnés
                astroSigns.forEach(s => s.classList.remove('selected'));
                // Ajouter la classe selected à l'élément cliqué
                this.classList.add('selected');
            });
        });
    } catch (error) {
        console.error("Erreur lors de la configuration de la sélection des signes astro:", error);
    }
}

// Appel de la fonction pour configurer la sélection
setupAstroSelection();


function setupCompatibilitySelection() {
    try {
        // Sélectionnez les éléments de chaque colonne
        const column1Signs = document.querySelectorAll('.column.column-1 .astro-sign');
        const column3Signs = document.querySelectorAll('.column.column-3 .astro-sign');

        // Fonction pour gérer la sélection dans une colonne spécifique
        function handleSelection(signs, compatibilityContent) {
            signs.forEach(sign => {
                sign.addEventListener('click', function() {
                    // Vérifiez si compatibility-content a la classe active
                    if (!compatibilityContent.classList.contains('active')) {
                        return; // Ne rien faire si compatibility-content n'est pas active
                    }

                    // Désélectionner tous les éléments précédemment sélectionnés dans cette colonne
                    signs.forEach(s => s.classList.remove('selected'));
                    // Ajouter la classe selected à l'élément cliqué
                    this.classList.add('selected');
                });
            });
        }

        // Configurer la sélection pour chaque colonne, si .compatibility-content est active
        const compatibilityContent = document.querySelector('.compatibility-content');

        handleSelection(column1Signs, compatibilityContent);
        handleSelection(column3Signs, compatibilityContent);
        
    } catch (error) {
        console.error("Erreur lors de la configuration de la sélection des signes de compatibilité:", error);
    }
}

// Appel de la fonction pour configurer la sélection
setupCompatibilitySelection();


function loadAndPopulateAstroGrids() {
    try {
        // Charger le fichier CSV depuis GitHub (URL brute)
        const response = await fetch('https://raw.githubusercontent.com/<your-username>/<your-repo>/main/BistroCorpo/assets/csv/SignesAstro_liste.csv');
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement du fichier CSV : ${response.statusText}`);
        }

        // Extraire le contenu du fichier CSV
        const csvData = await response.text();

        // Parse CSV en un tableau d'objets
        const astroData = csvData.trim().split('\n').map(row => {
            const [label, imageUrl, description] = row.split(';');
            return { label, imageUrl, description };
        });

        // Récupérer toutes les grilles d'astro-sign
        const astroGrids = document.querySelectorAll('.astro-signs-grid');

        // Insérer les données dans chaque grille
        astroGrids.forEach(astroGrid => {
            astroGrid.innerHTML = ''; // Vider le contenu existant

            astroData.forEach(sign => {
                // Créer l'élément HTML pour chaque signe astrologique
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

                // Ajouter l'image dans l'icône
                astroIcon.appendChild(img);

                // Ajouter les éléments dans le signe
                astroSign.appendChild(astroIcon);
                astroSign.appendChild(astroLabel);

                // Ajouter le signe à la grille
                astroGrid.appendChild(astroSign);
            });
        });

    } catch (error) {
        console.error("Erreur lors de la récupération et de l'affichage des informations du fichier CSV :", error);
    }
}

// Appel de la fonction pour charger et configurer les grilles astro-sign
loadAndPopulateAstroGrids();


