import { Models } from "./models/Models.js";
const main = new Models.Main(await (async function getLocalData() {
    return (fetch('fake_api.json')
        .then(response => { return response.json(); })
        .then(data => {
        return data;
    }));
})());
console.log(main);
