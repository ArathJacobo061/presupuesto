class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion;
        this._valor = valor;
    }
    // aqui va el getter y setter para descripcion
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(nuevaDescripcion) {
        this._descripcion = nuevaDescripcion;
    }
    //aqui va el getter y setter para valor
    get valor(){
        return this._valor;
    }
    set valor(nuevoValor){
        this._valor = nuevoValor
    }

}