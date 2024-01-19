import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/app/classes/tarea';
import { SqliteService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-addtarea',
  templateUrl: './addtarea.component.html',
  styleUrls: ['./addtarea.component.scss'],
})
export class AddtareaComponent implements OnInit {
  tarea: any = [{
    label: "",
    diaTarea: "",
    icon:""
  },]
 

  constructor(private modalCtrl: ModalController, private sqlite: SqliteService
  ) {
   
  }


  ngOnInit() {
   

  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
   
    return this.modalCtrl.dismiss(this.tarea, 'confirm');
  }

 
 
}
