var http = require('http');
let url = require('url');
var fs = require('fs');

http.createServer(function (peticion, respuesta) {
    let urlBase = url.parse(peticion.url, true);
    let path = urlBase.pathname;
    let params = urlBase.query;

    if(path == '/dni' && params.num){
            let letra = calcularLetraDNI(params.num);
            respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
            respuesta.write(`Tu DNI completo es ${params.num}${letra}`);
            respuesta.end();
    }
    else if(path == '/dni'){
        fs.readFile('instrucciones.html', function (err, dato) {
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8 ' });
            respuesta.write(dato);
            respuesta.end();
        });
    }else if(path == "/escribir"){
        // Si no existe la carpeta 'Copia' la creamos
        if(!fs.existsSync('./Copia')){
            fs.mkdir('./Copia', function (err){
                if(err){
                    throw err;
                }
            respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
            respuesta.write('Carpeta Creada');
            respuesta.end();
            })
            // Despues de crear la carpeta creamos el fichero 'holaMundo.txt'
            fs.appendFile('./Copia/holaMundo.txt', 'Julián Eggle', function (err) 
                {
                    if (err)
                    {
                        throw err;
                    }
                console.log('Contenido creado!');
                });
        }else{
            respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
            respuesta.write('La carpeta ya existe.');
            respuesta.end();
        }
    }else if(path == "/"){
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
        respuesta.write('Bienvenido/a al servidor');
        respuesta.end();
    }
    else{
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
        respuesta.write('Página no encontrada.');
        respuesta.end();
    }

}).listen(8083, "127.0.0.3");

console.log('Servidor ejecutándose en http://127.0.0.3:8083/');

// Función para calcular letra del DNI:
function calcularLetraDNI(numero){
    let letra;
    let resto = (numero % 23);

    switch (resto) {
        case 0:
            letra = "T";
            break;
        case 1:
            letra = "R";
            break;
        case 2:
            letra = "W";
            break;
        case 3:
            letra = "A";
            break;
        case 4:
            letra = "G";
            break;
        case 5:
            letra = "M";
            break;
        case 6:
            letra = "Y";
            break;
        case 7:
            letra = "F";
            break;
        case 8:
            letra = "P";
            break;
        case 9:
            letra = "D";
            break;
        case 10:
            letra = "X";
            break;
        case 11:
            letra = "B";
            break;
        case 12:
            letra = "N";
            break;
        case 13:
            letra = "J";
            break;
        case 14:
            letra = "Z";
            break;
        case 15:
            letra = "S";
            break;
        case 16:
            letra = "Q";
            break;
        case 17:
            letra = "V";
            break;
        case 18:
            letra = "H";
            break;
        case 19:
            letra = "L";
            break;
        case 20:
            letra = "C";
            break;
        case 21:
            letra = "K";
            break;
        case 22:
            letra = "E";
            break;
    
        default:
            break;
    }

    return letra;
}


