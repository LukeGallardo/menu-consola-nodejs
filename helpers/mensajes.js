require('colors');


const mostrarMenu = ()=> {
       return new Promise((resolve)=> {
        console.clear();
        console.log('========================================'.green);
        console.log('            Menu de tareas'.green);
        console.log('========================================\n'.green);

        console.log(` ${'1.'.green}Crear Tarea`);
        console.log(` ${'2.'.green}Listar Tareas`);
        console.log(` ${'3.'.green}Listar Tareas completadas`);
        console.log(` ${'4.'.green}Listar Tareas pendientes`);
        console.log(` ${'5.'.green}Completar Tarea(s)`);
        console.log(` ${'6.'.green}Eliminar Tarea`);
        console.log(` ${'0.'.green}Salir\n`);
       
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion del menu: ',(op)=>{
            readline.close();
            resolve(op)
        });
       });
}

const pausa = ()=> {
    return new Promise((resolve)=> {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione la tecla ${'ENTER'.green} para continuar\n`,(op)=>{
               
                readline.close();
                resolve();
        });
    });
   
};
module.exports = {
    mostrarMenu,
    pausa
}