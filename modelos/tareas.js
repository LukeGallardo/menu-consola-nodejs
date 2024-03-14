const fs = require('fs');
const Tarea = require('./tarea');

class Tareas {

    _listado = {};
    
    get listadoTareas () {
        const listado = [];       
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    };


    constructor(){
     this._listado = {};
     this.leerArchivo();   
    }

    leerArchivo() {
        let data = [];
        try {
            if(fs.existsSync('./db/data.json')) {
                data = JSON.parse(fs.readFileSync('./db/data.json','utf-8'));
                data.forEach(tarea => {
                    this._listado[tarea.id] = tarea;   
                });
            }
        } catch (error) {
            throw error;    
        }
    }

    crearTarea(desc='')  {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
        fs.writeFileSync('./db/data.json',JSON.stringify(this.listadoTareas));
    } 
    listarTareas () {
            let listado = '';
          for (let index = 0; index < this.listadoTareas.length; index++) {
            const desc = this.listadoTareas[index].desc;
           /*  let realizado = '';
                if(this.listadoTareas[index].completadoEn !== null) {
                    realizado = 'Completado'.green;
                } else {
                    realizado = 'Pendiente'.red;
                } */
            let realizado = (this.listadoTareas[index].completadoEn) ? 'Completado'.green : 'Pendiente'.red;    
            listado += `\n ${(index + 1).toString().green} - ${desc}: ${realizado}`;
          }

          console.log(listado);
    }
    listarTareasCompletadasPendientes(opcion = true) {
        let idx = 0;
            this.listadoTareas.forEach((tarea, i) => {
               // const indice = `${i + 1}`.green;
                const {desc,completadoEn} = tarea;
                if(opcion) {
                    if(completadoEn !== null) {
                        idx++;
                        console.log(`${idx.toString().green } - ${desc}: ${'completado'.green} :: fecha: ${completadoEn}`);
                    }
                } else {
                    if(completadoEn == null) {
                        idx++;
                        console.log(`${idx.toString().green} - ${desc}: ${ 'Pendiente'.red }`);
                    }
                }
            });
    }

    borrartarea(id='', confirmar) {

      if (confirmar) {
        if(this._listado[id]) {
            delete this._listado[id];
            fs.writeFileSync('./db/data.json',JSON.stringify(this.listadoTareas));
        }
      }

    }

    checktareasCompletadasPendientes(ids= []) {
       ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
       });

       this.listadoTareas.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
       });
       // console.log(this.listadoTareas);
        fs.writeFileSync('./db/data.json',JSON.stringify(this.listadoTareas));
    }
}

module.exports = Tareas;