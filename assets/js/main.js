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
            });
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

        // Fonction pour envoyer la requête à ChatGPT
        translateButton.addEventListener("click", async function () {
            const userInput = inputText.value.trim();

            if (userInput) {
                // Prompt pour l'API ChatGPT
                const prompt = `Le bullshit corporate se caractérise par Vocabulaire Flou, Buzzwords, Phrases Longues, Abstraction, Évitement de la Responsabilité, Formalité Excessive, Langage de Vente, Utilisation d'Acronymes, Surutilisation de Mots Anglais. Traduit en bullshit corporate des consultants la phrase : "${userInput}". En réponse donne moi uniquement la phrase traduite et rien d'autre.`;

                try {
                    // Appel de l'API OpenAI
                    const response = await fetch("https://api.openai.com/v1/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Remplacez par votre clé API OpenAI
                        },
                        body: JSON.stringify({
                            model: "text-davinci-004",
                            prompt: prompt,
                            max_tokens: 150,
                            temperature: 0.7,
                        }),
                    });

                    const data = await response.json();
                    if (response.ok && data.choices && data.choices.length > 0) {
                        outputText.textContent = data.choices[0].text.trim();
                    } else {
                        outputText.textContent = "Erreur : Impossible de traduire le texte.";
                    }
                } catch (error) {
                    console.error("Erreur lors de l'appel à l'API :", error);
                    outputText.textContent = "Erreur : Une erreur s'est produite.";
                }

                flashButton(translateButton); // Animation pour le statut selected
            }
        });

        // Copie le texte du bloc "outputText" quand on clique sur le bouton "copy"
        copyButton.addEventListener("click", function () {
            const textToCopy = outputText.textContent;
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        alert("Texte copié !");
                        flashButton(copyButton); // Animation pour le statut selected
                    })
                    .catch(err => {
                        console.error("Erreur lors de la copie :", err);
                    });
            }
        });

        // Fonction pour animer le statut "selected" des boutons
        function flashButton(button) {
            button.classList.add("selected");
            setTimeout(() => {
                button.classList.remove("selected");
            }, 250);
        }
    });
}

// Appeler la fonction pour initialiser l'outil de traduction
initBullshitTranslator();
