//CLASES

class Libro{
    constructor(titulo, autor, genero, codigo){
        this.titulo=titulo;
        this.autor=autor;
        this.genero=genero;
        this.codigo=codigo;
    }
}

class UI{
    static mostrarLibros(){

    }
    static agregarLibrosLista(libro){

    }
    static eliminarLibro(){

    }
    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(mensaje));

        const contenedor = document.querySelector('.container');
        const form = document.querySelector('#formulario-libro')
        contenedor.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }



    static limpiarCampos(){

    }
}

class Datos {
    static traerLibros(){
        let libros;
        if (localStorage.getItem('libros')===null){
            libros = [];
        }else {
            libros = JSON.parse(localStorage.getItem('libros'));
        }
        return libros;
    }
    static agregarLibro(libro){
        const libros = Datos.traerLibros();
        libros.push(libro);
        localStorage.setItem('libros', JSON.stringify(libros));
    }
    static removerLibro(codigo){

    }
}

//CONTROLAR EL EVENTO SUBMIT
document.querySelector('#formulario-libro').addEventListener('submit', (e) =>{
e.preventDefault();

//OBTENGO LSO CALORES DE LOS CAMPOS
const titulo = document.querySelector('#titulo').value;
const autor = document.querySelector('#autor').value;
const genero = document.querySelector('#genero').value;
const codigo = document.querySelector('#codigo').value;

if( titulo ==="" || autor==="" || genero=== "" || codigo=== ""){
    UI.mostrarAlerta("Por favor complete todos los campos", "danger")
}else {
    const libro = new Libro(titulo, autor, genero, codigo);
    Datos.agregarLibro(libro);
}

});