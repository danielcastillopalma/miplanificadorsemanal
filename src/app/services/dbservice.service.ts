import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarea } from '../classes/tarea';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database!: SQLiteObject;
  tblTareas: string = "CREATE TABLE IF NOT EXISTS tarea(idTarea INTEGER PRIMARY KEY AUTOINCREMENT, diaTarea INTEGER NOT NULL, ICON TEXT NOT NULL, label TEXT NOT NULL, status INTEGER NOT NULL);";
  listaTareas = new BehaviorSubject<Tarea[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {

    this.platform.ready().then(() => {
      this.crearBD();
    });


  }
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'miplanner.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD creada");
        //llamo a crear la(s) tabla(s)
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })

  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblTareas, []);
      this.presentToast("Tabla creada");
      this.cargarNotas();
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en Crear Tabla: " + error);

    }
  }

  async cargarNotas() {
    console.log("aqui entra en cargar notas 1")
    let items: Tarea[] = [];
    console.log("aqui entra en cargar notas 2")
    await this.database.executeSql('SELECT * FROM tarea')

      .then(res => {

        console.log("aqui antes del if")
        if (res.rows.length > 0) {

          for (let i = 0; i < res.rows.length; i++) {
            console.log("aqui entra en cargar notas for")
            items.push({
              idTarea: res.rows.item(i).idTarea,
              icon: res.rows.item(i).icon,
              diaTarea: res.rows.item(i).diaTarea,
              label: res.rows.item(i).label,
              status: res.rows.item(i).status,
            });
          }
        }
      })
      .catch(err => { console.log(err) });
    this.listaTareas.next(items);
  }

  async addTarea(day: any, icon: any, label: any, status: any) {
    let data = [day, icon, label, status];
    await this.database.executeSql('INSERT INTO tarea(diaTarea, ICON, label, status)VALUES(?,?,?,?)', data);
    this.presentToast("Tarea agregada")
    this.cargarNotas();
  }
  /*** Método que actualiza el título y/o el texto filtrando por el id*/
  async updateNota(id: any, title: any, content: any) {
    let data = [title, content, id];
    await this.database.executeSql('UPDATE tarea SET title=?, content=?WHERE id=?', data);
    this.cargarNotas();
  }
  /*** Método que elimina un registro por id de la tabla noticia*/
  async deleteNota(id: any) {
    await this.database.executeSql('DELETE FROM tarea WHERE id=?', [id]);
    this.cargarNotas();
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
  /*** Método que se ejecuta cada vez que se hace un cambio en la tabla dela BD*/
  fetchTareas(): Observable<Tarea[]> {
    return this.listaTareas.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: 3000
    }); toast.present();
  }

}