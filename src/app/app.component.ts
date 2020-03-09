import { Component, ViewChild, ElementRef } from '@angular/core';
import { tablero } from './tablero';
import {OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'dibujatablero';


    COLORES = [
    'none',
    'green',
    'red', 
    'blue',
    'rgba(0, 255, 255)',
    'rgba(0, 0, 255)',
    'rgba(255, 132, 0)',
    'rgba(255, 255, 0)',
    'rgba(0, 255, 0)',
    'rgba(255, 0, 255)',
    'rgba(255, 0, 0)',
  ];

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
  

  
  dibujarTablero() {   
    var x = 0;
    var y = 0;
    for(let i =0; i< this.tab.filas; i++) {
       for(let j =0; j < this.tab.columnas; j++) {
        this.ctx.fillStyle = this.COLORES[this.tab.matriz[i][j].indiceColor];
        this.ctx.fillRect(x , y, this.LADO_CUADRADO, this.LADO_CUADRADO);

         x += this.LADO_CUADRADO;
       }
       x = 0;
       y += this.LADO_CUADRADO;
    }

  }
  
 
  




}
