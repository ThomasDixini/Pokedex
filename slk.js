const select = document.getElementById('pokemons-select')
const buttonSubmit = document.querySelector('button')

function Pokemon(id, title, ability, imgUrl, level) {
    return 
    {
        this.id = id, 
        this.title = title, 
        this.ability = ability,
        this.imgUrl = imgUrl,
        this.level = level
    }
}

function resetCard(){
    const article = document.querySelector('article');
    if(article){
        article.parentNode.removeChild(article);
    }
}

function createPokemonCard({
    id,
    imgUrl,
    title,
    ability,
    level
}) {
    resetCard();

    const card = document.createElement('article');
    card.classList.add('card')
    
    card.innerHTML = `
    <img src='${imgUrl}' alt="">
    <strong> ${title.toUpperCase()} </strong>
    <div>
        <span>
            <label for="nivel">Nivel: </label>
            <span> <button >-</button> ${level} <button onclick="increaseLevel(${level})">+</button> </span>
        </span>
        <span>
            <label for="habilidade">Habilidade: </label>
            <span> <b> ${ability} </b> </span>
        </span>
    </div>
    `
    const main = document.querySelector('main');
    main.appendChild(card)
}

const searchPokemonOnAPI = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await response.json()
    
    const pokemon = new Pokemon()
    const abilityName = data.abilities[0].ability.name
    console.log(pokemon)
    pokemon.id = id
    pokemon.name = data.name
    pokemon.ability = abilityName;
    pokemon.imgUrl = data.sprites.other['official-artwork'].front_default
    pokemon.level = 0
    
    createPokemonCard({
        id: pokemon.id,
        title: pokemon.name,
        ability: pokemon.ability,
        imgUrl: pokemon.imgUrl,
        level: pokemon.level
    })

}

buttonSubmit.addEventListener('click', () => {
    let id = select.options[select.selectedIndex].value
    searchPokemonOnAPI(id)
})










