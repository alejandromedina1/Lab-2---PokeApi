let canvas;
let listOfPokemons = [];
let listOfPokemonsSprites = [];
let sprite = undefined;
let currentPokemon = undefined
function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}
getListOfPokemons()

function draw() {
    background(0);
    showListOfPokemons();
    showPokemonData();
    newCursor();
}

function mousePressed() {
   choosePokemon();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

async function getListOfPokemons() {
    const API = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';
    const query = await fetch(API);
    const data = await query.json();
    const { results } = data;
    console.log(results);
    results.forEach(async result => {
        getPokemon(result);
    });
    console.log(listOfPokemons);
    console.log(listOfPokemonsSprites);
}

async function getPokemon(result) {
    const API = result.url;
    const query = await fetch(API);
    const pokemonData = await query.json();
    console.log(pokemonData);
    listOfPokemons.push(pokemonData);

    const { sprites } = pokemonData;
    const spriteURL = sprites.other["official-artwork"].front_default;
    sprite = loadImage(spriteURL);
    listOfPokemonsSprites.push(sprite);
}

function showListOfPokemons() {
    for (let i = 0; i < listOfPokemons.length; i++) {
        const pokemon = listOfPokemons[i];
        const sprite = listOfPokemonsSprites[i]
        const { name } = pokemon
        textAlign(LEFT, CENTER);
        textSize(16)
        const pokemonY = 100 + 100 * i 
        text(name.toUpperCase(), 200, pokemonY);    
        imageMode(CENTER);    
        image(sprite, 100, pokemonY, 100, 100);
    }
}
function choosePokemon() {
    for (let i = 0; i < listOfPokemons.length; i++) {
        const pokemon = listOfPokemons[i];
        const pokemonY = 100 + 100 * i; 
        if (dist(mouseX, mouseY, 100, pokemonY) < 50) {
            currentPokemon = pokemon;
            console.log(currentPokemon);
        }
    }
}

function showPokemonData() {
        if (currentPokemon !== undefined) {
            const {id, name, height, weight} = currentPokemon;
            text('ID: ' + id, 700, 550,)
            text('Name: ' + name.toUpperCase(), 700, 600,)
            text('Height: ' + height, 700, 650,)
            text('Weight: ' + weight, 700, 700,)
            const type = currentPokemon.types[0].type.name
            text('Type: ' + type.toUpperCase(), 700, 750,)
            const sprite = listOfPokemonsSprites[listOfPokemons.indexOf(currentPokemon)];
            image(sprite, 900, 300)
            console.log(sprite)
        }
}

function showPokemon() {
        const { name } = pokemonData
        textAlign(CENTER, CENTER);
        textSize(24)
        text(name.toUpperCase(), 400, 200);    
        imageMode(CENTER);    
        image(sprite, 400, 500, 100, 100);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}