const inquirer = require('inquirer');
require('colors');

const menu = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [{
        value: '1',
        name: ` ${'1.'.green}Crear Tarea`
    },{
        value: '2',
        name: ` ${'2.'.green}Listar Tareas`
    },{
        value: '3',
        name: ` ${'3.'.green}Listar Tareas completadas`
    },{
        value: '4',
        name: ` ${'4.'.green}Listar Tareas pendientes`
    },{
        value: '5',
        name: ` ${'5.'.green}Completar Tarea(s)`
    },{
        value: '6',
        name: ` ${'6.'.green}Eliminar Tarea`
    },{
        value: '0',
        name: ` ${'0.'.green}Salir`
    }        
]
}];

const pausa = [
   { type: 'input',
    name: 'Enter',
    message: `Presione la tecla ${'ENTER'.green} para continuar`,
    choice: []
    }
];
const inquirerMenu = async()=> {

    console.clear();
    console.log('========================================'.green);
    console.log('            Menu de tareas'.green);
    console.log('========================================\n'.green);

    const {opcion} = await inquirer.prompt(menu);
   
    return opcion;
}

const inquirerPausa = async() => {
    console.log('\n');
    await inquirer.prompt(pausa);
}

const inquirerinputDesc = async(message) => {
    const descripcion = [
        { type: 'input',
         name: 'desc',
         message,
         validate(value) { 
            if(value.length === 0)  { 
                return 'Por favor ingrese un valor';
            }
            return true;
         }
         }
     ];
   const {desc} = await inquirer.prompt(descripcion);
     
   return desc;
};

const inquirerborrartarea = async(listadoTareas)=> {
    let list = listadoTareas.map( (tarea, i) => {
        const idx = i+1;
        return {
            value: `${tarea.id}`,
            name: `${idx.toString().green} - ${tarea.desc} `
        }
    });

    list.unshift( {
        value: '0',
        name: '0'.green +' - Cancelar' 
    });
  /*  listadoTareas.forEach((tarea,i) => {
    const idx = i+1;
    list.push({  
        value: `${tarea.id}`,
        name: `${idx.toString().green} - ${tarea.desc} `
    })
   }); */
    const listado = [
        {
            type: 'list',
            name: 'borrar',
            choices: list
        }
    ];
   const {borrar} = await inquirer.prompt(listado);
  // console.log(id);
    return borrar;
};

const confirmarBorrarTarea = async() => {
    let confirmar = false;
    const question = [
        { type: 'confirm',
         name: 'ok',
         message: '¿Esta Seguro de borrar la tarea?'/* ,
         choices: [
            {
                value: '1',
                name: 'Si. eliminar'
            },
            {
                value: '2',
                name: 'No. Cancelar borrar tarea'
            }
         ]    */
         }        
     ];
        const { ok } = await inquirer.prompt(question);
       // const { enter } = await inquirer.prompt(question);

       /*  if (enter == '1') {
            confirmar = true;
        } */
    return ok;
}

const inquirertareasCheck = async(listadoTareas)=> {
    let list = listadoTareas.map( (tarea, i) => {
        const idx = i+1;
        return {
            value: `${tarea.id}`,
            name: `${idx.toString().green} - ${tarea.desc} `,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const listadocheck = [
        {
            type: 'checkbox',
            name: 'ids',
            choices: list
        }
    ];
   const {ids} = await inquirer.prompt(listadocheck);
  // console.log(ids);
    return ids;
};
module.exports = {
    inquirerMenu,
    inquirerPausa,
    inquirerinputDesc,
    inquirerborrartarea,
    confirmarBorrarTarea,
    inquirertareasCheck
}