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

            // Filtrer les outils actifs
            const activeTools = tools.filter(tool => 
                tool.status && tool.status.trim() === 'active' && tool.title.trim() !== "Encore plus de choses à découvrir !"
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

