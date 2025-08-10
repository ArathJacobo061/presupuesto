function factorial() {
  let variable = prompt("Ingresa un número para calcular su factorial:");

  // a. Validar si se ingresó un número o si quedó undefined
  if (variable === null || variable === "") {
    console.warn("No ingresaste un número.");
    return;
  }

  // b. Verificar que sea un número válido
  if (isNaN(variable)) {
    console.error(`El valor de "${variable}" ingresado NO es un número.`);
    return;
  }

  // Convertir a número
  variable = Number(variable);

  // c. Si es igual a 0, mostrar error
  if (variable === 0) {
    console.error("El número no puede ser 0.");
    return;
  }

  // d. Si es negativo, mostrar error
  if (Math.sign(variable) === -1) {
    console.error("El número no puede ser negativo.");
    return;
  }

  // e. Variable para guardar resultado
  let factorial = 1;

  // f. Ciclo para calcular el factorial
  let i = variable;
  while (i > 1) {
    factorial *= i;
    i--;
  }

  // h. Mostrar resultado
  console.log(`El factorial del número ${variable} es ${factorial}`);
}

// Llamar la función
factorial();
