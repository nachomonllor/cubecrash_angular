import { Component, ViewChild, ElementRef } from '@angular/core';
import { tablero } from './tablero';
import {OnInit } from '@angular/core';
import { celda } from './celda';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'dibujatablero';


    COLORES =              ['none', 'green','DarkRed',     'blue'];
    COLORESSELECCIONADOS = ['none',  'lime',    'red',  'skyblue'];


    tab : tablero;
    ctx: CanvasRenderingContext2D;
    LADO_CUADRADO = 5;


    @ViewChild('board', { static: true })
    canvas: ElementRef<HTMLCanvasElement>;

   constructor() {

     this.tab = new  tablero(100,100,3);
     
       /*
        for(let i =0; i< this.tab.filas; i++) {
           for(let j =0; j<this.tab.columnas; j++) {
               console.log(this.tab.matriz[i][j].indiceColor + " ");
           }
           console.log("\n");

         } //ESTO RALENTIZA MUCHO EL INICIO
       */

    
    
   }
   
   ngOnInit() {

    this.initBoard();
    this.dibujarTablero();

   }

   resetear() {
     this.tab = new tablero(100,100,3);
    //this.initBoard();
     this.dibujarTablero();
   }



   initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    
    this.ctx.canvas.width =  this.tab.columnas * this.LADO_CUADRADO ;
    this.ctx.canvas.height =  this.tab.filas  * this.LADO_CUADRADO ;

    // Scale so we don't need to give size on every draw.
    this.ctx.scale( this.LADO_CUADRADO , this.LADO_CUADRADO );
  }
  
  
  dibujarCuadrado(x:number, y: number, c: celda, estaSeleccionado: boolean) {
       this.ctx.fillStyle = 'black';
        //this.ctx.fillRect(x , y, this.LADO_CUADRADO, this.LADO_CUADRADO);
        if(c != null) {
           if(estaSeleccionado) {
            this.ctx.fillStyle = this.COLORESSELECCIONADOS[c.indiceColor];
           }
           else{
            this.ctx.fillStyle = this.COLORES[c.indiceColor];
           }
        }
        this.ctx.fillRect(x , y, this.LADO_CUADRADO, this.LADO_CUADRADO);
  }
  
  contiene(grupo : Array<celda>,  c: celda) {
    for(let i =0; i < grupo.length; i++) {
        if(grupo[i].fila == c.fila && grupo[i].columna == c.columna) {
            return true;
        }     
    }
    return false;
 }


  dibujarTablero() {   
    var x = 0;
    var y = 0;

    var selecccionadas = this.tab.getSeleccionadas();

    for(let i =0; i< this.tab.filas; i++) {
       for(let j =0; j < this.tab.columnas; j++) {
          var celdaActual = this.tab.matriz[i][j];
           
          if(this.contiene(selecccionadas, celdaActual)) {
            this.dibujarCuadrado(x, y, this.tab.matriz[i][j], true);
          }
          else{
            this.dibujarCuadrado(x, y, this.tab.matriz[i][j], false);
          }
        
        
         x += this.LADO_CUADRADO;
       }
       
       x = 0;
       y += this.LADO_CUADRADO;
    }

  }
  
 
  




}
