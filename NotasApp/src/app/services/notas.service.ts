import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaModel } from '../models/nota.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private url = 'https://nota-d8acc-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  listNotas(){
    return this.http.post('https://localhost:44394/api/nota/queryAll', null)
  }

  crearNota( nota: NotaModel ) {

    return this.http.post(`${ this.url }/notas.json`, nota)
            .pipe(
              map( (resp: any) => {
                nota.id = resp.name;
                return nota;
              })
            );

  }

  actualizarNota( nota: NotaModel ) {

    const notaTemp = {
      ...nota
    };

    delete notaTemp.id;

    return this.http.put(`${ this.url }/notas/${ nota.id }.json`, notaTemp);
  }

  borrarNota( id: string ) {

    return this.http.delete(`${ this.url }/notas/${ id }.json`);

  }

  getNota( id: string ) {

    return this.http.get(`${ this.url }/notas/${ id }.json`);

  }

  getNotas() {
    return this.http.get(`${ this.url }/notas.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( notasObj: object ) {

    const notas: NotaModel[] = [];

    console.log(notasObj);

    if( notasObj === null ){
      return [];
    }
    Object.keys( notasObj ).forEach( key => {

      const nota: NotaModel = notasObj[key];
      nota.id = key;

      notas.push( nota );
    });
    return notas;
  }
}
