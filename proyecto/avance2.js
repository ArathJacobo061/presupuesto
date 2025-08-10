// datos de prueba
let ingresos = {
  Quincena: 9000,
  Venta: 400
};

let egresos = {
  Renta: 900,
  Ropa: 400
};

// crear la funcion moneda
const formatoMoneda = valor => {
  return valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });
};
//aqui va la funcion porcentaje
const formatoPorcentaje = valor => {
  return valor.toLocaleString('es-MX', {
    style: 'percent',
    minimumFractionDigits: 2
  });
};

//funciones para los ingresos
const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso in ingresos) {
    totalIngreso += ingresos[ingreso];
  }
  return totalIngreso;
};
//funcion para los egresos
const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso in egresos) {
    totalEgreso += egresos[egreso];
  }
  return totalEgreso;
};

//funcion para cargar cabecera
const cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();

  console.log(formatoMoneda(presupuesto));
  console.log(formatoPorcentaje(porcentajeEgreso));
  console.log(formatoMoneda(totalIngresos()));
  console.log(formatoMoneda(totalEgresos()));
};

// aqui ejecutamos el cabecero
cargarCabecero();

