import { Component, OnInit } from '@angular/core';
import { AddtareaComponent } from '../addtarea/addtarea.component';
import { ModalController } from '@ionic/angular';
import { SqliteService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-comlunes',
  templateUrl: './comlunes.component.html',
  styleUrls: ['./comlunes.component.scss'],
})
export class ComlunesComponent implements OnInit {

  newidTarea: any = "";
  newdiaTarea: any = 0;
  newicon: any = "";
  newlabel: any = "";
  newstatus: any = 0;
  tareas = [
    {
      idTarea: this.newidTarea,
      diaTarea: this.newdiaTarea,
      icon: this.newicon,
      label: this.newlabel,
      status: this.newstatus,
    }
  ]


  ngOnInit() {
    this.sqlite.dbState().subscribe((res: any) => {
      if (res) {
        this.sqlite.fetchTareas().subscribe((item: any) => {
          this.tareas = item;
        })
      }
    });


  }
  constructor(private modalCtrl: ModalController, private sqlite: SqliteService) {

  }



  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddtareaComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {

      this.newdiaTarea = data.diaTarea;
      this.newicon = data.icon;
      this.newlabel = data.label;
      this.newstatus = 0;

      console.log(data);
      this.guardar();
    }
  }
  guardar() {
    this.sqlite.addTarea(this.newdiaTarea, this.newicon, this.newlabel, this.newstatus);

  }

  tareaCompletada(tarea: string) {
    for (let tar in this.tareas) {
      if (this.tareas[tar].idTarea == tarea) {
        var posicion: any = tar;
      }


    }
    console.log(posicion)
    if (this.tareas[posicion].status == false) {
      this.tareas[posicion].status = true
      console.log("El estatus de la tarea ", this.tareas[posicion].label, " ahora es ", this.tareas[posicion].status)
      this.intercambiarElemento(posicion)
    } else if (this.tareas[posicion].status == true) {
      this.tareas[posicion].status = false
      console.log("El estatus de la tarea ", this.tareas[posicion].label, " ahora es ", this.tareas[posicion].status)
    }
  }
  intercambiarElemento(pos: number) {
    let nuevaTarea = { "idTarea": this.tareas[pos].idTarea, "diaTarea": this.tareas[pos].diaTarea, 'icon': this.tareas[pos].icon, "label": this.tareas[pos].label, "status": this.tareas[pos].status };
    this.tareas.splice(pos, 1)
    this.tareas.push(nuevaTarea)
  }
}
