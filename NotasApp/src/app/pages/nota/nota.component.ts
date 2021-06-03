import { NotasService } from './../../services/notas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  notaList = [];
  constructor(private notasService: NotasService) { }

  ngOnInit(): void {
    this.notasService.listNotas().subscribe( result => {
      this.notaList = result as any[];
  });
  }
}
