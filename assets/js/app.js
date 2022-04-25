// #region imports
import {pokemonRender, templateRenderPokemon} from "./modules/pokemon.js";
import {itemRender, berryRender, templateRenderItem, templateRenderBerry} from "./modules/items.js";
import {regionRender, regionTemplateRender} from "./modules/regions.js";
import {templates} from "./modules/templates.js";
import {saveData, downloadFile} from "./modules/funcs.js";
// #endregion imports
// #region constantes
let a = [];
localStorage.setItem('session',"[]");

const pokemonData = document.getElementById("pokemon-data");
const itemData = document.getElementById("items-data");
const berriesData = document.getElementById("berries-data");
const regionData = document.getElementById("regions-data");
const selectFilter = document.getElementById("select-filter");
const inputFilter = document.getElementById("input-filter");
const textRegion = document.getElementById("text-regions");
const textItems = document.getElementById("text-items");
const textBerries = document.getElementById("text-berries");
const textPokemon = document.getElementById("text-pokemon");
let json = [], i;
// #endregion constantes
// #region functions
const pokemonTemplate = async (id, time) => {
  pokemonData.innerHTML = "";
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
    textPokemon.classList.remove("d-none");
    textItems.classList.add("d-none");
    textBerries.classList.add("d-none");
    textRegion.classList.add("d-none");
  const data = await templateRenderPokemon(id, time);
  console.log(data)
  const tempFunc = doT.template(templates.pokemon);
	const html = tempFunc(data);
	pokemonData.innerHTML += html;
	$(".save-data-pokemon").off()
	  .click( (e) => {
	    e.preventDefault();
      saveData(a, data)
	  })
}

const itemTemplate = async (id, time) => {
  pokemonData.innerHTML = "";
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
    textItems.classList.remove("d-none");
    textPokemon.classList.add("d-none");
    textBerries.classList.add("d-none");
    textRegion.classList.add("d-none");
  const data = await templateRenderItem(id, time);
  const tempFunc = doT.template(templates.items);
	const html = tempFunc(data);
  console.log(data)
  itemData.innerHTML += html;
	$(".save-data-item").off()
	  .click( (e) => {
	    e.preventDefault();
      saveData(a, data)
	  })
}

const berryTemplate = async (id, time) => {
  pokemonData.innerHTML = "";
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
    textBerries.classList.remove("d-none");
    textItems.classList.add("d-none");
    textPokemon.classList.add("d-none");
    textRegion.classList.add("d-none");
  const data = await templateRenderBerry(id, time);
  const tempFunc = doT.template(templates.berries);
	const html = tempFunc(data);
	berriesData.innerHTML += html;
	$(".save-data-berry").off()
	  .click( (e) => {
	    e.preventDefault();
      saveData(a, data)
	  })
}

const regionsTemplate = async (id, time) => {
  pokemonData.innerHTML = "";
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
    textRegion.classList.remove("d-none");
    textItems.classList.add("d-none");
    textPokemon.classList.add("d-none");
    textBerries.classList.add("d-none");
  const data = await regionTemplateRender(id, time);
  const tempFunc = doT.template(templates.regions);
	const html = tempFunc(data);
	regionData.innerHTML += html;
	$(".save-data-region").off()
	  .click( (e) => {
	    e.preventDefault();
      saveData(a, data)
	  })
}

const pokemonNumber = () => {
  return Math.floor(Math.random() * 890) + 1;
}

const itemNumber = () => {
  return Math.floor(Math.random() * 1650) + 1;
}

const berryNumber = () => { 
  return Math.floor(Math.random() * 60) + 1;
}

const regionNumber = () => {
  return Math.floor(Math.random() * 7) + 1;
}

$(document).ready( async () => {
  const id = pokemonNumber();
  await pokemonTemplate(id, 1);
  $("#download-data").off()
    .click( () => {
      downloadFile(localStorage.getItem("session"),
      "data.json", "text/plain")
    })
  $("#berries-filter").off()
  .click( async (e) => {
    e.preventDefault();
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    pokemonData.innerHTML = "";
    regionData.innerHTML = "";
    textBerries.innerHTML = "Bayas";
    textBerries.classList.remove("d-none");
    textItems.classList.add("d-none");
    textPokemon.classList.add("d-none");
    textRegion.classList.add("d-none");
    const id = berryNumber();
    await berryTemplate(id, 1);
  })
  $("#items-filter").off()
  .click( async (e) => {
    e.preventDefault();
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    pokemonData.innerHTML = "";
    regionData.innerHTML = "";
    textItems.innerHTML = "Items";
    textItems.classList.remove("d-none");
    textPokemon.classList.add("d-none");
    textBerries.classList.add("d-none");
    textRegion.classList.add("d-none");
    const id = itemNumber();
    await itemTemplate(id, 1);
  })
  $("#region-filter").off()
  .click( async (e) => {
    e.preventDefault();
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    pokemonData.innerHTML = "";
    regionData.innerHTML = "";
    textRegion.innerHTML = "Regiones";
    textRegion.classList.remove("d-none");
    textPokemon.classList.add("d-none");
    textItems.classList.add("d-none");
    textBerries.classList.add("d-none");
    const id = regionNumber();
    await regionsTemplate(id, 1);
  })
  $("#pokemon-filter").off()
  .click( async (e) => {
    e.preventDefault();
    berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
    pokemonData.innerHTML = "";
    textPokemon.innerHTML = "Pokemon";
    textPokemon.classList.remove("d-none");
    textItems.classList.add("d-none");
    textBerries.classList.add("d-none");
    textRegion.classList.add("d-none");
    const id = pokemonNumber();
    await pokemonTemplate(id, 1);
  })
  $("#form").off()
  .submit( async (e) => {
    e.preventDefault();
    if (selectFilter.value === "pokemon") {
      if (inputFilter.value > 890) inputFilter.value = 890
      else if (inputFilter.value < 0) inputFilter.value = 0
      berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    regionData.innerHTML = "";
        pokemonData.innerHTML = "";
      textPokemon.innerHTML = "Resultados de búsqueda";
      textPokemon.classList.remove("d-none");
      textItems.classList.add("d-none");
      textBerries.classList.add("d-none");
      await pokemonTemplate(inputFilter.value, 1);
    }
    else if(selectFilter.value === "berries") {
      if (inputFilter.value > 60) inputFilter.value = 60
      else if (inputFilter.value < 0) inputFilter.value = 0
    itemData.innerHTML = "";
    pokemonData.innerHTML = "";
    regionData.innerHTML = "";
      textBerries.innerHTML = "Resultados de búsqueda";
      textBerries.classList.remove("d-none");
      textItems.classList.add("d-none");
      textPokemon.classList.add("d-none");
      textRegion.classList.add("d-none");
      await berryTemplate(inputFilter.value, 1);
    }
    else if (selectFilter.value === "items") {
      if (inputFilter.value > 1650) inputFilter.value = 1650
      else if (inputFilter.value < 0) inputFilter.value = 0
      berriesData.inmerHTML = "";
    pokemonData.innerHTML = "";
    regionData.innerHTML = "";
      textItems.innerHTML = "Resultados de búsqueda";
      textItems.classList.remove("d-none");
      textPokemon.classList.add("d-none");
     textBerries.classList.add("d-none");
      textRegion.classList.add("d-none");
      await itemTemplate(inputFilter.value, 1);
    }
    else if (selectFilter.value === "regions") {
    if (inputFilter.value > 7) inputFilter.value = 7
      else if (inputFilter.value < 0) inputFilter.value = 0
      berriesData.inmerHTML = "";
    itemData.innerHTML = "";
    pokemonData.innerHTML = "";
        regionData.innerHTML = "";
      textRegion.innerHTML = "Resultados de búsqueda";
      textRegion.classList.remove("d-none");
      textPokemon.classList.add("d-none");
      textItems.classList.add("d-none");
      textBerries.classList.add("d-none");
      await regionsTemplate(inputFilter.value, 1);
    }
  })
})
// #endregion events
