const api = "https://pokeapi.co/api/v2/";

const pokemons = api + "pokemon";

const moves = api + "move";

const notOk = (res) => {
	if (400 <= parseInt(res.status) && parseInt(res.status) < 500) throw new Error (`No se han encontrado los datos ${res.status}`);
  else if (500 <= parseInt(res.status) && parseInt(res.status) < 600)  throw new Error (`Hay un problema en el servidor ${res.status}`);
};

const typeGet = async (type) => {
  try {
    const res = await fetch(`${type}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const evolutionChain = async (specie) => {
  try {
    const res = await fetch(`${specie}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    let evolution_chain = await evolutionGet(data.evolution_chain.url);
    return evolution_chain;
  } catch (e) {
    console.log(e);
  }
};

const evolutionGet = async (evol) => {
  try {
    const res = await fetch(`${evol}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    return data.chain;
  } catch (e) {
    console.log(e);
  }
};

const pokemonRender = async (id) => {
  try {
    const res = await fetch(`${pokemons}/${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    let typesName = [];
    let typesUrl = [];
    let i;
    for (i of data.types) {
      if (i.type.name === "normal") i.type.name = "Normal";
      else if (i.type.name === "fighting") i.type.name = "Pelea";
      else if (i.type.name === "flying") i.type.name = "Vuelo";
      else if (i.type.name === "poison") i.type.name = "Veneno";
      else if (i.type.name === "ground") i.type.name = "Tierra";
      else if (i.type.name === "rock") i.type.name = "Roca";
      else if (i.type.name === "bug") i.type.name = "Bicho";
      else if (i.type.name === "ghost") i.type.name = "Fantasma";
      else if (i.type.name === "steel") i.type.name = "Acero";
      else if (i.type.name === "fire") i.type.name = "Fuego";
      else if (i.type.name === "water") i.type.name = "Agua";
      else if (i.type.name === "grass") i.type.name = "Planta";
      else if (i.type.name === "electric") i.type.name = "Eléctrico";
      else if (i.type.name === "psychic") i.type.name = "Psiquico";
      else if (i.type.name === "ice") i.type.name = "Hielo";
      else if (i.type.name === "dragon") i.type.name = "Dragon";
      else if (i.type.name === "dark") i.type.name = "Oscuridad";
      else if (i.type.name === "fairy") i.type.name = "Hada";
      typesName.push(i.type.name);
      typesUrl.push(i.type.url);
    }
    let type;
    for (i of data.types) {
      type = await typeGet(i.type.url);
    }
    let weaknessess = [];
    for (i of type.damage_relations.double_damage_from) {
      if (i.name === "normal") i.name = "Normal";
      else if (i.name === "fighting") i.name = "Pelea";
      else if (i.name === "flying") i.name = "Vuelo";
      else if (i.name === "poison") i.name = "Veneno";
      else if (i.name === "ground") i.name = "Tierra";
      else if (i.name === "rock") i.name = "Roca";
      else if (i.name === "bug") i.name = "Bicho";
      else if (i.name === "ghost") i.name = "Fantasma";
      else if (i.name === "steel") i.name = "Acero";
      else if (i.name === "fire") i.name = "Fuego";
      else if (i.name === "water") i.name = "Agua";
      else if (i.name === "grass") i.name = "Planta";
      else if (i.name === "electric") i.name = "Eléctrico";
      else if (i.name === "psychic") i.name = "Psiquico";
      else if (i.name === "ice") i.name = "Hielo";
      else if (i.name === "dragon") i.name = "Dragon";
      else if (i.name === "dark") i.name = "Oscuridad";
      else if (i.name === "fairy") i.name = "Hada";
      weaknessess.push(i.name);
    }
    const evolution = await evolutionChain(data.species.url);
    let firstEvolution = evolution.species.name, evolution2 = evolution.evolves_to, secondEvolution = "este pokemon no tiene una segunda evolución", thirdEvolution = "este pokemon no tiene una tercera evolución";
    if (evolution2.length > 0 && evolution2 !== undefined) {
      for (i of evolution2) {
        secondEvolution = `${i.species.name}`;
        let item;
        if (i.evolves_to.length > 0 && i.evolves_to !== undefined) {
          for (item of i.evolves_to) thirdEvolution = `${item.species.name}`;
        }
        else thirdEvolution = "este pokemon no tiene una tercera evolución";
      }
    }
    else secondEvolution = "este pokemon no tiene una segunda evolución";
    firstEvolution = firstEvolution[0].charAt(0).toUpperCase() + firstEvolution.slice(1);
    
    secondEvolution = secondEvolution[0].charAt(0).toUpperCase() + secondEvolution.slice(1);
    
    thirdEvolution = thirdEvolution[0].charAt(0).toUpperCase() + thirdEvolution.slice(1);
    
    data.name = data.name[0].charAt(0).toUpperCase() + data.name.slice(1);
    const pokemon = {
      name: data.name,
      hp: data.stats[0].base_stat,
      types: typesName,
      weakness: weaknessess,
      photo: data.sprites.front_default,
      evolution1: firstEvolution,
      evolution2: secondEvolution,
      evolution3: thirdEvolution,
      generation: type.generation.name,
      consecutivo: 0
    };
    if (pokemon.evolution3 === "undefined") delete pokemon.evolution3;
    if (pokemon.evolution2 === "undefined") delete pokemon.evolution2;
    if (typeof(pokemon.evolution1) === "undefined") delete pokemon.evolution1;

    return pokemon;
  } catch (e) {
    console.log(e);
  }
};

const templateRenderPokemon = async (id, times) => {
  try{
    let i = 0, pokemons = [], pokemon;
    while (i < times) {
    pokemon= await pokemonRender(id);
    pokemons.push(pokemon);
    i += 1;
    }
    return pokemons;
  } catch (e) {
    console.log(e);
  }

};

export {pokemonRender, templateRenderPokemon};
