const api = "https://pokeapi.co/api/v2/";

const items = api + "item";

const berries = api + "berry";
const notOk = (res) => {
	if (400 <= parseInt(res.status) && parseInt(res.status) < 500) throw new Error (`No se han encontrado los datos ${res.status}`);
  else if (500 <= parseInt(res.status) && parseInt(res.status) < 600)  throw new Error (`Hay un problema en el servidor ${res.status}`);
};
const itemRender = async (id) => {
  try {
    const res = await fetch(`${items}/${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    let effects = [], i;
    for (i of data.effect_entries) effects.push(i.short_effect);
    
    data.name = data.name[0].charAt(0).toUpperCase() + data.name.slice(1);
    data.category.name = data.category.name[0].charAt(0).toUpperCase() + data.category.name.slice(1);
    console.log(data.sprites)
    const item = {
      name: data.name,
      photo: data.sprites.default,
      category: data.category.name,
      effect: effects,
      cost: data.cost,
      id: data.id
     }
    return item;
  } catch (e) {
    console.log(e);
  }
};
const berryRender = async (id) => {
  try {
    const res = await fetch(`${berries}/${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    const item = await itemGet(data.item.url);
    let i, effect = [];
    for (i of item[2]) effect.push(i.short_effect);
    data.name = data.name[0].charAt(0).toUpperCase() + data.name.slice(1);
    item[1] = item[1][0].charAt(0).toUpperCase() + item[1].slice(1);
    effect[0] = effect[0][0].charAt(0).toUpperCase() + effect[0].slice(1);
    data.firmness.name = data.firmness.name[0].charAt(0).toUpperCase() + data.firmness.name.slice(1);
    
    const berry = {
      name: data.name,
      category: item[1],
      effect: effect[0],
      firmness: data.firmness.name,
      photo: item[0],
    }
    return berry
  } catch (e) {
    console.log(e);
  }
}
const itemGet = async (id) => {
  try {
    const res = await fetch(`${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    return [data.sprites.default, data.category.name, data.effect_entries];
  } catch (e) {
    console.log(e);
  }
}
const typeGet = async (id) => {
  try {
    const res = await fetch(`${id}`);
    if (!res.ok) notOk(res);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

const templateRenderItem = async (id, times) => {
  try {
    let i = 0, items = [], item;
    while (i < times) {
    item = await berryRender(id);
    items.push(item);
    i += 1;
    }
    return items;
  } catch (e) {
    console.log(e);
  }
};

const templateRenderBerry = async (id, times) => {
  try{
    let i = 0, berries = [], berry;
    while (i < times) {
    berry= await berryRender(id);
    berries.push(berry);
    i += 1;
    }
    return berries;
  } catch (e) {
    console.log(e);
  }
};

export {itemRender, berryRender, templateRenderItem, templateRenderBerry};
