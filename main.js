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
        const libros = Datos.traerLibros();
        libros.forEach((libro) => UI.agregarLibrosLista(libro));
    }
    static agregarLibrosLista(libro){
        const lista = document.querySelector('#lista-libros');

        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.genero}</td>
        <td>${libro.codigo}</td>
        <td><a href='#' class= "btn btn-danger btn-sm delete">X</a></td>
        `;

        lista.appendChild(fila);
    }
    static eliminarLibro(elemento){
        //uso el delete para conectarlo con la X del td en la lista 
        if(elemento.classList.contains('delete')){
            elemento.parentElement.parentElement.remove();
        }
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
        document.querySelector('#titulo').value = '';
        document.querySelector('#autor').value = '';
        document.querySelector('#genero').value = '';
        document.querySelector('#codigo').value = '';

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
        const libros = Datos.traerLibros();
        libros.forEach((libro, index) => {
            if(libro.codigo===codigo){
                libros.splice(index, 1);
            }
        });
        localStorage.setItem('libros', JSON.stringify(libros));
    }
}
// Carga de la pagina
document.addEventListener('DOMContentLoaded', UI.mostrarLibros());
//CONTROLAR EL EVENTO SUBMIT
document.querySelector('#formulario-libro').addEventListener('submit', (e) =>{
e.preventDefault();

//OBTENGO LSO VALORES DE LOS CAMPOS
const titulo = document.querySelector('#titulo').value;
const autor = document.querySelector('#autor').value;
const genero = document.querySelector('#genero').value;
const codigo = document.querySelector('#codigo').value;

if( titulo ==="" || autor==="" || genero=== "" || codigo=== ""){
    UI.mostrarAlerta("Por favor complete todos los campos", "danger")
}else {
    const libro = new Libro(titulo, autor, genero, codigo);
    Datos.agregarLibro(libro);
    UI.agregarLibrosLista(libro);
    UI.mostrarAlerta('Se agrego el libro correctamente', 'success');
    UI.limpiarCampos();
}

});

document.querySelector('#lista-libros').addEventListener('click', (e)=>{
    UI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    UI.mostrarAlerta('Libro eliminado', 'success');
});