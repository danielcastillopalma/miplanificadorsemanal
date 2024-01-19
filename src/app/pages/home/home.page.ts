import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SqliteService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
  refresh() {
    window.location.reload();
  }
  constructor(private router: Router, private sqlite: SqliteService) {

  }
  segmentChanged($event: any) {

    console.log($event);
    let direccion = $event.detail.value;
    this.router.navigate(['home/' + direccion])
  }
}
