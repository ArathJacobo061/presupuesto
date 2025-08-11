aracion de arreglas
const ingresos = [
  new Ingreso('Salario', 20000),
  new Ingreso('Venta auto', 50000),
];

const egresos = [
  new Egreso('Renta', 4000),
  new Egreso('Ropa', 800),
];

// aqui van funciones de los formatos
const formatoMoneda = (valor) => {
  return valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('es-MX', {
    style: 'percent',
    minimumFractionDigits: 2,
  });
};

//funcion para guardar datos
const guardarDatos = () => {
  localStorage.setItem('ingresos', JSON.stringify(ingresos));
  localStorage.setItem('egresos', JSON.stringify(egresos));
};

// aqui van los calculos
const totalIngresos = () => {
  let total = 0;
  for (const ingreso of ingresos) total += ingreso.valor;
  return total;
};

const totalEgresos = () => {
  let total = 0;
  for (const egreso of egresos) total += egreso.valor;
  return total;
};

//aqui va el cabecero
const cargarCabecero = () => {
  const ti = totalIngresos();
  const te = totalEgresos();
  const presupuesto = ti - te;
  const porcentajeEgreso = ti > 0 ? te / ti : 0;

  document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
  document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById('ingresos').innerHTML = formatoMoneda(ti);
  document.getElementById('egresos').innerHTML = formatoMoneda(-te);
};

//funcion para cargar los datos guardados desde local storage
const cargarDatosGuardados = () => {
  const ingresosGuardados = JSON.parse(localStorage.getItem('ingresos')) || [];
  const egresosGuardados = JSON.parse(localStorage.getItem('egresos')) || [];

  ingresos.length = 0;
  egresos.length = 0;

  ingresosGuardados.forEach(i => ingresos.push(new Ingreso(i._descripcion, i._valor)));
  egresosGuardados.forEach(e => egresos.push(new Egreso(e._descripcion, e._valor)));
};
//aqui cargamos la app
const cargarApp = () => {
  cargarDatosGuardados();
  cargarCabecero();
  cargarIngresos();
   cargarEgresos();
};

//aqui creamos los ingreos dinamicos
const crearIngresoHTML = (ingreso) => {
  return `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
};

/**const eliminarIngreso = (id) => {
  console.log("Ingreso eliminado con id:", id);
};
*/
const cargarIngresos = () => {
  let ingresosHTML = '';
  for (const ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

window.eliminarIngreso = (id) => {
  const indice = ingresos.findIndex(i => i.id === id);
  if (indice >= 0) {
    ingresos.splice(indice, 1);
    guardarDatos(); 
    cargarCabecero();
    cargarIngresos();
    
  }
};
 
//aqui van a ir lo egresos dimanicos
const crearEgresoHTML = (egreso) => {
  return `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(-egreso.valor)}</div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
};

const cargarEgresos = () => {
  let egresosHTML = '';
  for (const egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

window.eliminarEgreso = (id) => {
  const indice = egresos.findIndex(e => e.id === id);
  if (indice >= 0) {
    egresos.splice(indice, 1);
    guardarDatos(); 
    cargarCabecero();
    cargarEgresos();
  }
};
//***** 
window.agregarDato = () => {
  const forma = document.getElementById('forma');
  const tipo = forma['tipo'].value;   
  const descripcion = forma['descripcion'].value.trim();
  const valor = parseFloat(forma['valor'].value);

  // Validaciones básicas
  if (descripcion === '' || isNaN(valor)) return;

  if (tipo === 'ingreso') {
    ingresos.push(new Ingreso(descripcion, Math.abs(valor)));
    cargarIngresos();
  } else {
    egresos.push(new Egreso(descripcion, Math.abs(valor)));
    cargarEgresos();
  }

  guardarDatos(); 
  cargarCabecero();

  // Limpiar inputs
  forma['descripcion'].value = '';
  forma['valor'].value = '';
  forma['descripcion'].focus();
};