import { Renderer } from "./CreateTableByJson.js"

async function getLocalData() { return fetch('fake_api.json').then(response => { return response.json(); }).then(data => { return data; }) }
const data_c2 = await getLocalData();

document.body.appendChild(Renderer.Main.createTableFromJson(data_c2));