class Ingreso extends Dato {
  static contadorIngresos = 0;

//va a iniciar en 1

  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Ingreso.contadorIngresos;  
  }

  get id() {
    return this._id;
  }
}