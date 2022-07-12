class Usuario {
    
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }

    getBookNames(){
        return this.libros.map((libro) => libro.nombre);
    }
}

let usuario = new Usuario('lalo','landa',[{nombre: 'harry potter', autor:'J K Rowling'}],['mateo','luna'])

console.log(usuario.getFullName());
console.log('cantidad de mascotas: ', usuario.countMascotas());
usuario.addMascota('chicho');
console.log('cantidad de mascotas: ', usuario.countMascotas());
console.log(usuario.getBookNames());
usuario.addBook('el señor de los anillos','J R R Tolkien');
console.log(usuario.getBookNames());