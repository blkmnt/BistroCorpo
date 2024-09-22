let tools = [];

// Fonction pour charger les données du CSV
function loadCSV() {
    fetch('assets/csv/tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Ignore l'en-tête
            tools = rows.map(row => {
                const [title, description, buttonText, url, status] = row.split(';');
                return { title, description, buttonText, url, status };
            });
            displayCards(); // Affiche toutes les cartes après le chargement
        })
        .catch(error => console.error('Erreur lors du chargement du fichier CSV:', error));
}

function displayCards() {
    const startRow = 1; // Définissez la première ligne à prendre en compte
    const endRow = 10;  // Définissez la dernière ligne à prendre en compte

    const content = document.querySelector('.content');
    content.innerHTML = ''; // Vider le contenu existant

    tools.forEach(tool => {
        // Assurez-vous que chaque outil a une propriété 'rowNumber' correspondant à sa ligne dans le CSV
        if (tool.rowNumber >= startRow && tool.rowNumber <= endRow) {
            const cardClass = tool.status === 'Active' ? 'card' : 'card inactive';
            const cardHTML = `
                <div class="${cardClass}">
                    <div class="card-image-container">
                        <img src="${tool.image}" alt="${tool.title}">
                    </div>
                    <div class="card-content">
                        <h2>${tool.title}</h2>
                        <p>${tool.description}</p>
                    </div>
                    <a href="${tool.url}">
                        <button class="button">${tool.buttonText}</button>
                    </a>
                </div>
            `;
            content.innerHTML += cardHTML;
        }
    });
}


// Fonction pour choisir aléatoirement une ligne (outil actif)
function getRandomActiveTool() {
    const activeTools = tools.filter(tool => tool.status === 'active');
    const randomIndex = Math.floor(Math.random() * activeTools.length);
    return activeTools[randomIndex];
}

// Fonction pour choisir une ligne par numéro
function getToolByIndex(index) {
    if (index >= 0 && index < tools.length) {
        return tools[index];
    }
    return null;
}

// Appel de la fonction pour charger les données
loadCSV();

