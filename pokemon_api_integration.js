document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    fetchPokemonData(pokemonName);
});

async function fetchPokemonData(pokemonName) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Pokemon not found!');
        }
        const pokemonData = await response.json();
        displayPokemonData(pokemonData);
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        alert('Pokemon not found. Please try again.');
    }
}

function displayPokemonData(data) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}" class="pokemon-img">
        <h3>Abilities:</h3>
        <ul>
            ${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <h3>Types:</h3>
        <ul>
            ${data.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
        <h3>Stats:</h3>
        <ul>
            ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}
