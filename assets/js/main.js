const pokemonlist = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limet = 8
let offset = 0

function loadPokemonItens(offset, limet) {
    pokeApi.getPokemons(offset, limet).then((pokemons = []) => {       
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                <img src="${pokemon.photo}" 
                alt=${pokemon.name}>

                </div>
            </li>
        `).join('')
        pokemonlist.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limet)

loadMoreButton.addEventListener('click', () => {
    offset += limet
    const qntRecordNexPage = offset + limet

    if(qntRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItens(offset, limet)
    }
})