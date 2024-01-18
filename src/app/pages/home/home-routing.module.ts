import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ComlunesComponent } from 'src/app/components/comlunes/comlunes.component';
import { CommartesComponent } from 'src/app/components/commartes/commartes.component';
import { CommiercolesComponent } from 'src/app/components/commiercoles/commiercoles.component';
import { ComjuevesComponent } from 'src/app/components/comjueves/comjueves.component';
import { ComviernesComponent } from 'src/app/components/comviernes/comviernes.component';
import { ComsabadoComponent } from 'src/app/components/comsabado/comsabado.component';
import { ComdomingoComponent } from 'src/app/components/comdomingo/comdomingo.component';
import { AddtareaComponent } from 'src/app/components/addtarea/addtarea.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
      path: 'lunes',
      component: ComlunesComponent
    }, {
      path: 'addtarea',
      component: AddtareaComponent
    }, {
      path: 'martes',
      component: CommartesComponent
    }, {
      path: 'miercoles',
      component: CommiercolesComponent
    }, {
      path: 'jueves',
      component: ComjuevesComponent
    }, {
      path: 'viernes',
      component: ComviernesComponent
    },
    {
      path: 'sabado',
      component: ComsabadoComponent
    },
    {
      path: 'domingo',
      component: ComdomingoComponent
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
