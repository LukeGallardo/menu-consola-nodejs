require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');
const { inquirerMenu, inquirerPausa, inquirerinputDesc, inquirerborrartarea, confirmarBorrarTarea, inquirertareasCheck } = require('./inquirer/inquirer');

const Tareas = require('./modelos/tareas');


console.clear();

const main = async() => {
    let op = '';
    const tareas = new Tareas();
    do {
        // op = await mostrarMenu();
        // console.log({op});
        //  if(op !== '0') await pausa();
             op = await inquirerMenu(); 
             switch (op) {
                case '1':
                        const desc = await inquirerinputDesc('Ingrese Descripcion:');
                                   tareas.crearTarea(desc);
                    break;
                case '2': tareas.listarTareas(); //await inquirerListartareas(tareas.listadoTareas); //console.log(tareas.listadoTareas);
                    break;
                case '3': tareas.listarTareasCompletadasPendientes(true);
                    break;
                case '4': tareas.listarTareasCompletadasPendientes(false);
                    break;   
                case '5': const ids = await inquirertareasCheck(tareas.listadoTareas);
                                tareas.checktareasCompletadasPendientes(ids);
                            
                    break;   
                case '6': const id = await inquirerborrartarea(tareas.listadoTareas);
                            if(id !=='0') {
                                const confirmar = await confirmarBorrarTarea();  
                                tareas.borrartarea(id, confirmar);  
                            }
                    break;            
                default:
                    break;
             }

              
             await inquirerPausa();
    } while (op !== '0');
    
}

main();