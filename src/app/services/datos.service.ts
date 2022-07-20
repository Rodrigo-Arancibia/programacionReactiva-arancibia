import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, take, Observable, Subject } from 'rxjs';
import { Pelicula } from '../interfaces/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  public peliculas$: Observable<Pelicula[]>;
  private peliculas: Subject<Pelicula[]>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.peliculas = new Subject();
    this.peliculas$ = this.peliculas.asObservable();
    this.httpClient.get(
      'https://swapi.dev/api/films'
    ).subscribe(respuesta => {
      this.peliculas.next((respuesta as any).results);
    });
  }

  modificarPeliculas(peliculas: Pelicula[]) {
    this.peliculas.next(peliculas);
  }

  getStarWarsMoviesO(): Observable<any> {
    return this.httpClient.get(
      'https://swapi.dev/api/films'
    );
  }

  getStarWarsMoviesP(): Promise<Response> {
    return fetch('https://swapi.dev/api/films');
  }

  ejemploObservable(): Observable<Date> {
    return interval(2000).pipe(take(5), map(_ => new Date()));
  }

}
