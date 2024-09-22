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

// Fonction pour afficher 2 cartes aléatoires et une carte spécifique
function displayRandomCards() {
    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    // Filtrer les outils actifs
    const activeTools = tools.filter(tool => tool.status === "card");

    // Choisir 2 outils aléatoires parmi les actifs
    const randomCards = [];
    while (randomCards.length < 2) {
        const randomIndex = Math.floor(Math.random() * activeTools.length);
        const randomTool = activeTools[randomIndex];

        // Vérifier que la carte n'est pas déjà ajoutée
        if (!randomCards.includes(randomTool)) {
            randomCards.push(randomTool);
        }
    }

    // Ajouter la carte spécifique
    const specialCard = tools.find(tool => tool.title === "Encore plus de choses à découvrir !");
    if (specialCard) randomCards.push(specialCard);

    // Afficher les cartes choisies
    randomCards.forEach(tool => {
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
    });
}

// Appel de la fonction pour charger les données
loadCSV();

