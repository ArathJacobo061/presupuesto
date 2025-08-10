const numero1 = 3;
const numero2 = 5;

function suma(numA = 1, numB = 0) {
    // Usando un if por cada variable
    /*
    if (typeof numA === 'number') {
        if (typeof numB === 'number') {
            let totalsuma = numA + numB;
            return totalsuma;
        } else {
            console.error('NumB no es un número válido');
        }
    } else {
        console.error('NumA no es un número válido');
    }
    */

    // Usando dos validaciones en el mismo if
    if (typeof numA === 'number' && typeof numB === 'number') {
        let totalsuma = numA + numB;
        return totalsuma;
    }
    if(typeof numA !== 'number'){
        return=0
    }
    console.error("ingresa valores validos para realizar la suma")

    return 0;
}

let total = suma(numero1, numero2);

console.log("Total:", total);
