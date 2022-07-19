const fs = require("fs");

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(object) {
        let items = await this.getAll();
        let id
        if ((typeof items === 'undefined')) {
            id = 1
            Object.defineProperty(object, 'id', {
                value: id, writable: true,
                enumerable: true,
                configurable: false
            })
            items = [];
            items.push(object);
        } else {
            if (items.length !== 0) {
                id = (items[items.length - 1]).id + 1;
            } else {
                id = 1
            }
            Object.defineProperty(object, 'id', {
                value: id,
                writable: true,
                enumerable: true,
                configurable: false
            })
            items.push(object);
        }
        fs.writeFile(`./${this.nombre}`, JSON.stringify(items), "utf-8", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`agregado el objeto con id: ${id}`)
            }
        });
    }

    async getById(id) {
        let items = await this.getAll();
        if (typeof items !== 'undefined') {
            let item = items.find((i) => i.id === id);
            if (typeof item === 'undefined') {
                console.log('no se encontró el item');
            } else {
                console.log(item);
                return item;
            }
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(`./${this.nombre}`, "utf-8")
                .then((data) => {
                    return data
                })
            return JSON.parse(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        let items = await this.getAll();
        if (typeof items !== "undefined") {
            let newItems = items.filter((item) => item.id !== id);
            try {
                await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(newItems), "utf-8")
                console.log(`item con id: ${id} borrado correctamente`)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    deleteAll() {
        let items = fs.readFileSync(`./${this.nombre}`, "utf-8", (err) => {
            if (err) console.log(err);
        })
        items = JSON.parse(items);
        for (let i = items.length; i >= 0; i--) {
            items.pop();
        }
        try {
            fs.writeFileSync(`./${this.nombre}`, JSON.stringify(items), "utf-8");
            console.log('todos los items fueron borrados');
        }
        catch (err) {
            console.log(err);
        }
    }

}

let archivo = new Contenedor("data.json");


// Probar los metodos de a uno


archivo.save({ title: "titulo1", price: 350, thumbnail: "url1" })
// archivo.getById(1)
// archivo.getById(2)
// archivo.save({ title: "titulo2", price: 350, thumbnail: "url2" })
// archivo.getById(2)
// archivo.getById(3)
// archivo.save({ title: "titulo3", price: 350, thumbnail: "url3" })
// archivo.getAll();
// archivo.deleteById(2);
// archivo.getAll();
// archivo.deleteAll()