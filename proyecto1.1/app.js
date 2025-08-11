/*******************************
 *  Datos + estado inicial
 *******************************/
let ingresos = [];
let egresos  = [];

// Rehidrata desde localStorage (solo descripcion/valor; los ids se regeneran)
(function cargarDeStorage(){
  try {
    const i = JSON.parse(localStorage.getItem('ingresos') || '[]');
    const e = JSON.parse(localStorage.getItem('egresos')  || '[]');
    ingresos = i.map(obj => new Ingreso(obj._descripcion ?? obj.descripcion, Number(obj._valor ?? obj.valor)));
    egresos  = e.map(obj => new Egreso (obj._descripcion ?? obj.descripcion, Number(obj._valor ?? obj.valor)));
  } catch { /* ignorar */ }
})();

/*******************************
 *  Utilidades de formato
 *******************************/
const formatoMoneda = (valor) =>
  valor.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  });

const formatoPorcentaje = (valor) =>
  valor.toLocaleString('es-MX', {
    style: 'percent',
    minimumFractionDigits: 2
  });

/*******************************
 *  Totales
 *******************************/
const totalIngresos = () => ingresos.reduce((acc, ing) => acc + ing.valor, 0);
const totalEgresos  = () => egresos.reduce ((acc, egr) => acc + egr.valor, 0);

/*******************************
 *  Cabecero
 *******************************/
const cargarCabecero = () => {
  const ti = totalIngresos();
  const te = totalEgresos();
  const presupuesto = ti - te;
  const porcentajeEgreso = ti > 0 ? te / ti : 0;

  // Números principales
  document.getElementById('presupuesto').innerHTML = `${formatoMoneda(presupuesto)}`;
  document.getElementById('ingresos').innerHTML    = `${formatoMoneda(ti)}`;
  document.getElementById('egresos').innerHTML     = `${formatoMoneda(-te)}`;
  document.getElementById('porcentaje').innerHTML  = `${formatoPorcentaje(porcentajeEgreso)}`;

  // Pequeño flash cuando cambian
  document.getElementById('presupuesto').classList.add('flash');
  document.getElementById('ingresos').classList.add('flash');
  document.getElementById('egresos').classList.add('flash');
  setTimeout(() => {
    document.getElementById('presupuesto').classList.remove('flash');
    document.getElementById('ingresos').classList.remove('flash');
    document.getElementById('egresos').classList.remove('flash');
  }, 450);
};

/*******************************
 *  Render listas
 *******************************/
const crearIngresoHTML = (ingreso) => `
  <div class="elemento limpiarEstilos" data-id="${ingreso.id}">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})" title="Eliminar ingreso">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  </div>
`;

const crearEgresoHTML = (egreso) => `
  <div class="elemento limpiarEstilos" data-id="${egreso.id}">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_eliminar">
        <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})" title="Eliminar egreso">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>
  </div>
`;

const cargarIngresos = () => {
  let html = '';
  for (const ing of ingresos) html += crearIngresoHTML(ing);
  document.getElementById('lista-ingresos').innerHTML = html;
};

const cargarEgresos = () => {
  let html = '';
  for (const eg of egresos) html += crearEgresoHTML(eg);
  document.getElementById('lista-egresos').innerHTML = html;
};

/*******************************
 *  Agregar / Eliminar
 *******************************/
const agregarDato = () => {
  const forma = document.getElementById('forma');
  const tipo = document.getElementById('tipo').value; // 'ingreso' | 'egreso'
  const descripcion = (document.getElementById('descripcion').value || '').trim();
  const valor = Number(document.getElementById('valor').value);

  if (!descripcion || !isFinite(valor) || valor <= 0) {
    // feedback mínimo
    document.getElementById('descripcion').focus();
    return;
  }

  if (tipo === 'ingreso') {
    ingresos.push(new Ingreso(descripcion, valor));
    guardarEnStorage();
    cargarIngresos();
  } else {
    egresos.push(new Egreso(descripcion, valor));
    guardarEnStorage();
    cargarEgresos();
  }

  cargarCabecero();
  forma.reset(); // limpia inputs
  document.getElementById('tipo').value = 'ingreso'; // vuelve a '+'
};

const eliminarIngreso = (id) => {
  const i = ingresos.findIndex(x => x.id === id);
  if (i >= 0) {
    ingresos.splice(i, 1);
    guardarEnStorage();
    cargarIngresos();
    cargarCabecero();
  }
};

const eliminarEgreso = (id) => {
  const i = egresos.findIndex(x => x.id === id);
  if (i >= 0) {
    egresos.splice(i, 1);
    guardarEnStorage();
    cargarEgresos();
    cargarCabecero();
  }
};

/*******************************
 *  Storage
 *******************************/
function guardarEnStorage(){
  // Guardamos solo datos esenciales (descripcion/valor)
  localStorage.setItem('ingresos', JSON.stringify(ingresos.map(x => ({ descripcion: x.descripcion, valor: x.valor }))));
  localStorage.setItem('egresos',  JSON.stringify(egresos .map(x => ({ descripcion: x.descripcion, valor: x.valor }))));
}

/*******************************
 *  Bootstrap dropdown de tipo (opcional)
 *******************************/
function initTipoDropdown(){
  const dd = document.getElementById('tipoDropdown');
  if (!dd) return;
  // Si lo estás usando, sincroniza con el <select id="tipo">
  const select = document.getElementById('tipo');
  dd.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tipo]');
    if (!btn) return;
    const t = btn.getAttribute('data-tipo'); // 'ingreso' | 'egreso'
    select.value = t;
    const label = document.getElementById('tipoLabel');
    if (label) {
      label.innerHTML = (t === 'ingreso')
        ? '<i class="bi bi-check-circle-fill"></i> Ingreso'
        : '<i class="bi bi-x-circle-fill"></i> Egreso';
    }
  });
}

/*******************************
 *  Arranque
 *******************************/
const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
  initTipoDropdown();
};

// Exponer a window para los onclick del HTML
window.cargarApp = cargarApp;
window.agregarDato = agregarDato;
window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso  = eliminarEgreso;
