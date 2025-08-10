let texto = "Hola   este es un    texto    que necesita  correcciones.."

const REGEXP_ESPACIOS_EN_BLANCO = RegExp(/[\s\+]{2,}/gm)
const REGEXP_DOBLE_PUNTO = RegExp(/\.\s*\.{1,}/gm)

let texto_corregido = texto.replace(REGEXP_ESPACIOS_EN_BLANCO, ' ')
let texto_con_un_punto = texto_corregido.replace(REGEXP_DOBLE_PUNTO, '.')
