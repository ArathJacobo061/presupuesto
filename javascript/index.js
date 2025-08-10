function mostrarContenido() {
    console.log("Hola desde javascript externo")

    // Variables
    let nombre
    // let nombre_grupo = prompt('Nombre del grupo')
    // alert('Tu grupo es ' + nombre_grupo)
    // Constantes
    const GRUPO = "G03"

    console.log('NOMBRE:', nombre, GRUPO)


    // Esta función muestra un mensaje en consola

    /**
     * Devuelve un texto con un mensaje definido
     * @returns string El texto de saludo que elegimos
     */
    function mostrarMensaje() {
        return "Hola desde la función"
    }

    console.log("Fin de la página", mostrarMensaje())

    // Concatenar valores
    const MENSAJE = "Hola a todos"
    // Con signo de +
    let A = MENSAJE + " Buenas noches"
    // Con el método concat
    let B = MENSAJE.concat(" ", "Buenas noches")
    // Con comillas inversas
    let C = `${MENSAJE} Buenas noches`

    console.log([A, B, C]);
}

const GRUPO = {
    nombre: '',
    sesion: ''
}


let $nombre;
let nombreCompleto;
let a = 10;
let b = 3;
let intA = 9;
let intB = 3;
// let intTotal = 5

let intTotal = intA = a;

// console.log(intTotal); // ?

let estudiante = {
    nombre: 'Habib',
    apellido: 'Herrera',
    edad: undefined,
}
estudiante.nombre

// console.log(estudiante.nombre)

function asignarTitulo(){
    let mitexto = document.getElementById('eltexto').value
    // Buscarmos al encabezado h1
    document.getElementById('titulo').innerText = `Hola, ${mitexto}`
}

function borrarCajaDeTexto(){
    // Buscamos al input y lo dejamos en blanco
    document.getElementById('eltexto').value = '' 
}

// Arreglos
let frutas = ["tomate", "cebolla", "aguacate",  ['uvas', 'papas', 'limón'],  'uvas', 'papas', 'limón']
let verduras = ["uvas", "papas", "limón",  'Alfalfa', 'Apio', 'Cilantro']

function soloVerduras(value){
    return value != "uvas" && value != "papas" && value != "limón"
}

let verdurasFiltradas = verduras.filter(soloVerduras)

// Filtramos usando el método soloVerduras
// verduras = verdurasFiltradas
// Quitar el arreglo de frutas
// frutas = frutas.filter((fruta)=>typeof fruta === 'string')

// limpiar elementos vacíos de los arreglos
// frutas.filter(fruta=>fruta)

// filtrar elementos vacios
// frutas.filter(fruta=>fruta||"".endsWith('s'))