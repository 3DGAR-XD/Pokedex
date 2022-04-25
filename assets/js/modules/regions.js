const api = "https://pokeapi.co/api/v2/";

const regions = api + "region";

const notOk = (res) => {
	if (400 <= parseInt(res.status) && parseInt(res.status) < 500) throw new Error (`No se han encontrado los datos ${res.status}`);
  else if (500 <= parseInt(res.status) && parseInt(res.status) < 600)  throw new Error (`Hay un problema en el servidor ${res.status}`);
};

const regionRender = async (id) => {
  try {
    const res = await fetch(`${regions}/${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    let pokedexes = [], i;
    for (i of data.pokedexes) {
      pokedexes.push(i.name);
    }
    let pokedexurl = [];
    for (i of data.pokedexes) {
      pokedexurl.push(i.url);
    }
    const pokemons = await pokedexGet(pokedexurl[0]);
    let first5 = [];
    for (i of pokemons) {
      first5.push(i)
      if (first5.length === 5) break;
    }
    data.name = data.name[0].charAt(0).toUpperCase() + data.name.slice(1);
    const region = {
      name: data.name,
      pokedexes: pokedexes,
      pokemonsHere: first5,
    }
    return region;
  } catch (e) {
    console.log(e);
  }
}

const pokedexGet = async (id) => {
  try {
    const res = await fetch(`${id}`);
    if (!res.ok) notOk(res); 
    const data = await res.json();
    let names = [], i;
    for (i of data.pokemon_entries){
      names.push(i.pokemon_species.name)
    }
    return names;
  } catch (e) {
    console.log(e);
  }
}

const regionTemplateRender = async (id, times) => {
  try{
        let i = 0, regions = [], region;
    while (i < times) {
    region= await regionRender(id);
    regions.push(region);
    i += 1;
    }
    return regions;
  } catch (e) {
    console.log(e);
  }
};

export {regionRender, regionTemplateRender};
