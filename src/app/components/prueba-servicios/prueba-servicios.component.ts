import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap, map, Subscription } from 'rxjs';
import { Pelicula } from 'src/app/interfaces/Pelicula';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-prueba-servicios',
  templateUrl: './prueba-servicios.component.html',
  styleUrls: ['./prueba-servicios.component.css']
})
export class PruebaServiciosComponent implements OnInit, OnDestroy {

  public fecha: Date;
  public peliculas: Pelicula[];
  private suscripcion: Subscription;

  constructor(
    private datosService: DatosService
  ) { }

  ngOnInit(): void {
    this.suscripcion = this.datosService.peliculas$
      .pipe(
        tap(peliculas => console.log(peliculas)),
        map(peliculas => {
          return peliculas.filter(pelicula => pelicula.episode_id < 4)
        }),
        tap(peliculas => console.log(peliculas))
      )
      .subscribe(response => {
        this.peliculas = response;
      });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
