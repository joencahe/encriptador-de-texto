
//Definición de reglas de encripción en una matriz donde las posiciones de los dos arreglos corresponden a la letra y el valor de sustitución. Se pueden agregar tantas reglas como se quiera.
let reglas = [["a","e","i","o","u"],["ai","enter","imes","ober","ufat"]]

//Función para validar si el texto ingresado tiene mayúsculas o caracteres especiales. Se utilizó ChatGPT como ayuda para su construcción.
function validarTextoUnicode(texto) {
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto.codePointAt(i);
        // Verifica si el caracter corresponde a letras minúsculas (a-z), números (0-9) o espacio (U+0020)
        if (
            !(caracter >= 0x0061 && caracter <= 0x007A) && // a-z
            !(caracter >= 0x0030 && caracter <= 0x0039) && // 0-9
            !(caracter === 0x0020) // espacio
            ){
            mostrarTextoError('El texto contiene letras mayúsculas o caracteres especiales. Revisa las instrucciones y vuelve a intentarlo.');
            alert("Error!");
            return false; // Si algún carácter no es válido, retorna false
        }
    }
    return true; // Si todos los caracteres son válidos, retorna true
}

//Función para cambiar los textos de los elementos en el HTML. Tomada de los cursos :)
function asignarTextoElemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Función para mostrar el resultado del procesamiento del texto ingresado.
function mostrarTexto(texto){
    document.getElementById('imagenExplorador').style.display = "none";
    asignarTextoElemento('#tituloResultado','Este es tu resultado:');
    asignarTextoElemento('#textoResultado',texto);
    return;
}

//Función para mostrar los mensajes de error cuando no se cumplen con los requisitos del texto o cuando el texto ingresado para desencriptar no fue encriptado en la herramienta (no cumple con las reglas de des-encripción).
function mostrarTextoError(mensaje){
    document.getElementById('imagenExplorador').style.display = "none";
    document.getElementById('textoResultado').style.display = "none";
    document.getElementById('tituloResultado').style.color = "red";
    asignarTextoElemento('#tituloResultado',mensaje);
}

//Función para copiar el texto resultante al portapapeles.
function copiarTexto(){
    let texto = document.querySelector('#textoResultado').textContent;
    console.log(texto);

    navigator.clipboard.writeText(texto)
    .then(() => {
        alert("Contenido copiado al portapapeles!");
        console.log('Contenido copiado al portapapeles');
        /* Resuelto - texto copiado al portapapeles con éxito */
    },() => {
        alert("Error al copiar el contenido!");
        console.error('Error al copiar');
        /* Rechazado - fallo al copiar el texto al portapapeles */
    });
}

//Función para encriptar el texto ingresado.
function encriptarTexto() {
    let texto = document.getElementById('textoPorProcesar').value;
    let textoEncriptar = texto.split('');

    if (!validarTextoUnicode(texto)){
        return;
    }

    for (let i in textoEncriptar){
        for (let i2 in reglas[0]){
            if (reglas[0][i2] == textoEncriptar[i]){
                textoEncriptar[i] = reglas[1][i2]; 
            }
        }
    }
    mostrarTexto(textoEncriptar.join(''));
    return;
}

//Función para des-encriptar el texto ingresado. Se incluyó una validación adicional para detectar si el texto no cumple con las reglas de encripción.
function desencriptarTexto() {
    let texto = document.getElementById('textoPorProcesar').value;
    let textoDesencriptar = texto.split('');
    let letrasEliminadas = [];

    if (!validarTextoUnicode(texto)){
        return;
    }

    for (let i in textoDesencriptar){
        for (let i2 in reglas[0]){
            if (reglas[0][i2] == textoDesencriptar[i]){
                letrasEliminadas=textoDesencriptar.splice(i,reglas[1][i2].length,reglas[0][i2]);
                if (reglas[1].indexOf(letrasEliminadas.join('')) < 0){
                    alert("error");
                    mostrarTextoError('No fue posible desencriptar el texto... parece que no fue encriptado usando esta herramienta.');
                    return;
                }
            }
        }
    }
    mostrarTexto(textoDesencriptar.join(''));
    return;
}

//Función que reinicia la interfaz HTML.
function reiniciar(){
    document.getElementById('imagenExplorador').style.display = "";
    document.getElementById('tituloResultado').style.color = "";
    asignarTextoElemento ('#tituloResultado','No hay texto para encriptar');
    document.getElementById('textoResultado').style.display = "";
    asignarTextoElemento ('#textoResultado','Por favor, ingresa el texto que deseas procesar.');
    document.getElementById('textoPorProcesar').value="";
}

//Desarrollado por: Jorge Enrique Cañón Hernández para el challenge "Encriptador de Texto" del programa ONE de Oracle+Alura || joencahe@gmail.com