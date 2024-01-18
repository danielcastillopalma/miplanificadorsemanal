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
  tblTareas: string = "CREATE TABLE IF NOT EXISTS tareas(idTarea TEXT PRIMARY KEY, diaTarea INTEGER NOT NULL, ICON TEXT NOT NULL, label TEXT NOT NULL, status INTEGER NOT NULL);";
  listaTareas = new BehaviorSubject<Tarea[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {

    this.crearBD();


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

  cargarNotas() {
    let items: Tarea[] = [];
    this.database.executeSql('SELECT * FROM nota')
      .then(res => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {

            items.push({
              idTarea: res.rows.item(i).id,
              icon: res.rows.item(i).icon,
              diaTarea: res.rows.item(i).dia,
              label: res.rows.item(i).label,
              status:res.rows.item(i).status,
            });
          }
        }
      });
    this.listaTareas.next(items);
  }
  async addTarea(id: any, day: any, icon: any,label:any,status:any) {
    let data = [id, day, icon,label,status];
    await this.database.executeSql('INSERT INTO tareas(idTarea, diaTarea, ICON, label, status)VALUES(?,?,?,?,?)', data);
    this.cargarNotas();
  }
  /*** Método que actualiza el título y/o el texto filtrando por el id*/
  async updateNota(id: any, title: any, content: any) {
    let data = [title, content, id];
    await this.database.executeSql('UPDATE nota SET title=?, content=?WHERE id=?', data);
    this.cargarNotas();
  }
  /*** Método que elimina un registro por id de la tabla noticia*/
  async deleteNota(id: any) {
    await this.database.executeSql('DELETE FROM nota WHERE id=?', [id]);
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