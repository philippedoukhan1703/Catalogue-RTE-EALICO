document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const thematiqueFilter = document.getElementById('thematique-filter');
    const typeFilter = document.getElementById('type-filter');
    const equipeFilter = document.getElementById('equipe-filter');
    const obligatoireFilter = document.getElementById('obligatoire-filter');
    const equipmentList = document.getElementById('equipment-list');
    const resultsCount = document.getElementById('results-count');

    // Initialisation des filtres
    function initFilters() {
        // Thématiques
        const thematiques = [...new Set(equipmentData.map(item => item["Classification Ealico"]))];
        thematiques.forEach(thematique => {
            const option = document.createElement('option');
            option.value = thematique;
            option.textContent = thematique;
            thematiqueFilter.appendChild(option);
        });

        // Types
        const types = [...new Set(equipmentData.map(item => item["Type Ealico"]))];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
    }

    // Afficher les équipements
    function displayEquipment(data) {
        equipmentList.innerHTML = '';
        if (data.length === 0) {
            equipmentList.innerHTML = '<p>Aucun équipement trouvé.</p>';
            return;
        }

        data.forEach(equipment => {
            const card = document.createElement('div');
            card.className = 'equipment-card';

            // Photo (si disponible)
            let photoHtml = '';
            if (equipment["Lien photo"]) {
                photoHtml = `<img src="${equipment["Lien photo"]}" alt="${equipment["Désignation Modèle"]}" style="max-width: 100%; border-radius: 4px; margin-bottom: 10px;">`;
            }

            // Équipes concernées
            const equipes = equipment["Equipes concernées"].join(', ');

            // Contrôles
            let controlsHtml = '';
            if (equipment.Contrôles && equipment.Contrôles.length > 0) {
                controlsHtml = equipment.Contrôles.map(control => `
                    <div class="control-item">
                        <h4>${control.Désignation}</h4>
                        <p><strong>Périodicité:</strong> ${control.Périodicité}</p>
                        <p><strong>Type:</strong> ${control.Type}</p>
                    </div>
                `).join('');
            } else {
                controlsHtml = '<p>Aucun contrôle associé.</p>';
            }

            // Obligatoire Ealico
            const obligatoire = equipment["Obligatoire Ealico"] === "N" ? "Non" : "Oui";

            card.innerHTML = `
                ${photoHtml}
                <h2>${equipment["Désignation Modèle"]}</h2>
                <div class="code">Code: ${equipment["Code modèle"]}</div>
                <div class="details">
                    <p><strong>Thématique:</strong> ${equipment["Classification Ealico"]}</p>
                    <p><strong>Type:</strong> ${equipment["Type Ealico"]}</p>
                    <p><strong>Équipes concernées:</strong> ${equipes}</p>
                    <p><strong>Nombre d'éléments:</strong> ${equipment["Nb éléments"]}</p>
                    <p><strong>Obligatoire Ealico:</strong> ${obligatoire}</p>
                    <p><strong>Fiche Technique:</strong> ${equipment["Fiche Technique"] || 'Non spécifiée'}</p>
                    <p><strong>Commentaire:</strong> ${equipment.Commentaire || 'Aucun'}</p>
                </div>
                <div class="controls">
                    <h3>Contrôles Associés</h3>
                    ${controlsHtml}
                </div>
            `;
            equipmentList.appendChild(card);
        });

        resultsCount.textContent = `${data.length} équipement(s) trouvé(s)`;
    }

    // Filtrer les équipements
    function filterEquipment() {
        const searchTerm = searchInput.value.toLowerCase();
        const thematique = thematiqueFilter.value;
        const type = typeFilter.value;
        const equipe = equipeFilter.value;
        const obligatoire = obligatoireFilter.value;

        const filteredData = equipmentData.filter(equipment => {
            // Filtre par recherche
            const matchesSearch =
                equipment["Code modèle"].toLowerCase().includes(searchTerm) ||
                equipment["Désignation Modèle"].toLowerCase().includes(searchTerm) ||
                equipment["Classification Ealico"].toLowerCase().includes(searchTerm) ||
                equipment["Type Ealico"].toLowerCase().includes(searchTerm);

            // Filtre par thématique
            const matchesThematique = thematique === '' || equipment["Classification Ealico"] === thematique;

            // Filtre par type
            const matchesType = type === '' || equipment["Type Ealico"] === type;

            // Filtre par équipe
            const matchesEquipe = equipe === '' || equipment["Equipes concernées"].includes(equipe);

            // Filtre par obligatoire
            const matchesObligatoire = obligatoire === '' ||
                (obligatoire === 'Oui' && equipment["Obligatoire Ealico"] !== "N") ||
                (obligatoire === 'Non' && equipment["Obligatoire Ealico"] === "N");

            return matchesSearch && matchesThematique && matchesType && matchesEquipe && matchesObligatoire;
        });

        displayEquipment(filteredData);
    }

    // Événements
    searchBtn.addEventListener('click', filterEquipment);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterEquipment();
        }
    });

    thematiqueFilter.addEventListener('change', filterEquipment);
    typeFilter.addEventListener('change', filterEquipment);
    equipeFilter.addEventListener('change', filterEquipment);
    obligatoireFilter.addEventListener('change', filterEquipment);

    // Initialisation
    initFilters();
    displayEquipment(equipmentData);
});
