import { celda } from './celda';

export class tablero {

     filas : number;
     columnas: number;
     cantColores : number;

     matriz :  celda[][];


    constructor(_filas, _columnas, _cantColores) {
        this.filas =_filas;
        this.columnas = _columnas;
        this.cantColores = _cantColores;
        this.matriz = [];
        
        for(let i = 0; i < this.filas; i++) {
            this.matriz[i] = [];
            for(let j =0; j<this.columnas; j++) {
                this.matriz[i][j] = new celda(i,j, this.randomInt(1, this.cantColores));
            }
        }
    
      }


     randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
     }


}