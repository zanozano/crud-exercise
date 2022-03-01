const http = require('http');

const url = require('url');

const fs = require('fs');

//DATE
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

http.createServer(function (req, res) {
	const params = url.parse(req.url, true).query;
	const nombre = params.nombre;
	const contenido = params.contenido;
	const nuevoNombre = params.nuevoNombre;

	//CREAR
	if (req.url.includes('/crear')) {
		try {
			if (month < 10) {
				fs.writeFile(
					`${nombre}.txt`,
					`${day}/0${month}/${year} - ${contenido}`,
					'utf8',
					() => {
						res.write(`Archivo ${nombre}.txt creado con éxito!`, 'utf8');
						console.log('Archivo creado');
						res.end();
					}
				);
			} else {
				fs.writeFile(
					`${nombre}.txt`,
					`${day}/${month}/${year} - ${contenido}`,
					'utf8',
					() => {
						res.write(`Archivo ${nombre}.txt creado con éxito!`, 'utf8');
						console.log('Archivo creado');
						res.end();
					}
				);
			}
		} catch (err) {
			res.write(`Error al crear archivo! ${err}`);
			console.log(`Error al crear archivo! ${err}`);
			res.end();
		}
	}
	//LEER
	if (req.url.includes('/leer')) {
		try {
			fs.readFile(`${nombre}.txt`, (err, data) => {
				res.write(data);
				console.log(`Archivo leido`);
				res.end();
			});
		} catch (err) {
			res.write(`Error al leer archivo! ${err}`);
			console.log(`Error al leer archivo! ${err}`);
			res.end();
		}
	}
	//RENOMBRAR
	if (req.url.includes('/renombrar')) {
		try {
			fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`, () => {
				res.write(
					`El archivo ${nombre}.txt fue renombrado como ${nuevoNombre}.txt`,
					'utf8'
				);
				console.log('Archivo renombrado con exito');
				res.end();
			});
		} catch (err) {
			res.write(`Error al renombrar archivo! ${err}`);
			console.log(`Error al renombrar archivo! ${err}`);
			res.end();
		}
	}
	//ELIMINAR
	if (req.url.includes('/eliminar')) {
		try {
			console.log(`Tu solicitud para eliminar el archivo ${nombre}.txt se esta procesando`);
			res.setTimeout(3000, () => {
				fs.unlink(`${nombre}.txt`, () => {
					console.log(`Archivo ${nombre}.txt eliminado con exito`);
					res.write(`Archivo ${nombre}.txt eliminado con éxito`, 'utf8');
					res.end();
				});
			});
		} catch (err) {
			res.write(`Error al eliminar archivo ! ${err}`);
			console.log(`Archivo eliminado ${err}`);
			res.end();
		}
	}
}).listen(8080, () => console.log('Escuchando el puerto 8080'));
