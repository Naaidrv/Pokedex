const botonesHeader = document.querySelectorAll(".btn-header");
const listaPokemon = document.querySelector("#listaPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon/";


// Definimos los colores asociados a cada tipo de Pokémon
const typeColors = {
    bug: '#A8B820',
    dark: '#705848',
    dragon: '#7038F8',
    electric: '#F8D030',
    fairy: '#EE99AC',
    fighting: '#C03028',
    fire: '#F08030',
    flying: '#A890F0',
    ghost: '#705898',
    grass: '#78C850',
    ground: '#E0C068',
    ice: '#98D8D8',
    normal: '#A8A878',
    poison: '#A040A0',
    psychic: '#F85888',
    rock: '#B8A038',
    steel: '#B8B8D0',
    water: '#6890F0'
};

// Aplicar colores correspondientes a los botones de filtrado
botonesHeader.forEach(button => {
    const tipo = button.id.replace('ver-', '');
    if (typeColors[tipo]) {
        button.style.backgroundColor = typeColors[tipo];
    } else {
        button.style.backgroundColor = '#ccc'; // Color default para "ver-todos"
    }
});

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

const typeIcons = {
    bug: 'bug_report',
    dark: 'dark_mode',
    dragon: 'whatshot',  // No hay un ícono específico para dragón, puedes elegir el que prefieras
    electric: 'bolt',
    fairy: 'star',
    fighting: 'fitness_center',
    fire: 'local_fire_department',
    flying: 'air',
    ghost: 'skull',
    grass: 'eco',
    ground: 'landscape',
    ice: 'ac_unit',
    normal: 'adjust',
    poison: 'science',
    psychic: 'psychology',
    rock: 'terrain',
    steel: 'build',
    water: 'water_drop'
}

function mostrarPokemon(data) {
    let tipos = data.types.map((type) => {
        const tipoClass = `type-${type.type.name}`;
        const icon = typeIcons[type.type.name] || '';  // Obtener el nombre del ícono de Material Icons

        // Crear el HTML para el ícono y el nombre del tipo
        return `<p class="${tipoClass} tipo"><span class="material-icons">${icon}</span> ${type.type.name}</p>`;
    }).join('');

    const colorPrincipal = typeColors[data.types[0].type.name];

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="pokemon-background" style="background-color: ${colorPrincipal};"></div>
    <p class="pokemon-id-back">#${data.id}</p>
    <div class="pokemon-img">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}M</p>
            <p class="stat">${data.weight}KG</p>
        </div>
    </div>`;

    listaPokemon.append(div);
}

// Función para los botones de filtrado
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id.replace('ver-', '');

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if(botonId === "todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}));
const searchBar = document.querySelector("#searchBar");
const noResultsMessage = document.querySelector("#noResults");

searchBar.addEventListener("input", function() {
    const searchTerm = searchBar.value.toLowerCase();
    const pokemonCards = document.querySelectorAll(".pokemon");

    let resultsFound = false;

    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector(".pokemon-nombre").textContent.toLowerCase();
        if (pokemonName.includes(searchTerm)) {
            card.style.display = "block";
            resultsFound = true; // Encontró al menos un resultado
        } else {
            card.style.display = "none";
        }
    });

    // Mostrar el mensaje de "no se han encontrado resultados" solo si no se encontraron resultados
    noResultsMessage.style.display = resultsFound ? "none" : "block";
});

const toggleButton = document.querySelector("#toggleMode");
const body = document.body;

toggleButton.addEventListener("click", function() {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        toggleButton.innerHTML = '<span class="material-icons" style="color:yellow;">light_mode</span>';  // Cambia a ícono de sol
    } else {
        toggleButton.innerHTML = '<span class="material-icons">dark_mode</span>'; // Cambia a ícono de luna
    }
});