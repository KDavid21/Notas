import { NotasService } from './../../services/notas.service';
import { Component, OnInit } from '@angular/core';
import { NotaModel } from 'src/app/models/nota.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  notas: NotaModel[] = [];
  nota: NotaModel = new NotaModel
  
  constructor(private notasService: NotasService, private route: ActivatedRoute, private router: Router) { }

ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.notasService.getNotas().subscribe(resp => {
      this.notas = resp;
    });
    if ( id !== 'nuevo' ) {

      this.notasService.getNota( id )
        .subscribe( (resp: NotaModel) => {
          this.nota = resp;
          this.nota.id = id;
        });
    }
  }

  borrarNota( nota: NotaModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ nota.id }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.notas.splice(i, 1);
        this.notasService.borrarNota( nota.id ).subscribe();
      }
    })
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      Object.values(form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'success',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.nota.id ) {
      peticion = this.notasService.actualizarNota( this.nota );
    } else {
      peticion = this.notasService.crearNota( this.nota );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.nota.id,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      this.router.navigate(['notas']);
    });
  }
}
