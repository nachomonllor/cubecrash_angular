import { celda } from './celda';
import { Stack } from 'stack-typescript';

export class tablero {

     filas : number;
     columnas: number;
     cantColores : number;

     matriz :  celda[][];
      

    private grupoSeleccionado : Array<celda>;


    constructor(_filas, _columnas, _cantColores) {
        this.filas =_filas;
        this.columnas = _columnas;
        this.cantColores = _cantColores;
        this.grupoSeleccionado = new Array<celda>();

        this.matriz = [];
        
        for(let i = 0; i < this.filas; i++) {
            this.matriz[i] = [];
            for(let j =0; j<this.columnas; j++) {
                this.matriz[i][j] = new celda(i,j, this.randomInt(1, this.cantColores));
            }
        }
    
      }


      getSeleccionadas() {
        if (this.grupoSeleccionado.length < 3)
        {
            this.grupoSeleccionado = new Array<celda>();
        }
        return this.grupoSeleccionado;
      }
        

        /*
    
        //MI VERSION ITERATIVA DEL ALGORITMO DE RELLENO POR INUNDACION
        //NO ES LA MAS EFICIENTE, PERO HICE MI PROPIA VERSION PARA ENTENDERLA BIEN
        //public void FloodFillIterativo(int x, int y, int indiceColor)
        rellenar(x:number, y:number, indiceColor: number)
        {
            Stack<Celda> pila = new Stack<Celda>();

            pila.Push(_matriz[y, x]);

            while (pila.Count > 0)
            {
                Celda c = pila.Pop();

                _grupoSeleccionado.Add(c);

                if (c.Fila > 0)
                    AgregarEnPila(c.Fila - 1, c.Columna, pila, indiceColor);

                if (c.Fila < _filas - 1)
                    AgregarEnPila(c.Fila + 1, c.Columna, pila, indiceColor);

                if (c.Columna > 0)
                    AgregarEnPila(c.Fila, c.Columna - 1, pila, indiceColor);

                if (c.Columna < _columnas - 1)
                    AgregarEnPila(c.Fila, c.Columna + 1, pila, indiceColor);
            }

        }
     
        */

        rellenar(x:number, y:number, indiceColor:number)  {
            let stack = new Stack<celda>();
            stack.push(this.matriz[y][x]);

            while(stack.length > 0) {
                var c = stack.pop();
                
                this.grupoSeleccionado.push(c);
                if(c.fila > 0) {
                      this.agregarEnPila(c.fila - 1, c.columna, stack, indiceColor);  
                }
                if(c.fila < this.filas - 1) {
                    this.agregarEnPila(c.fila + 1, c.columna, stack, indiceColor);
                }
                if(c.columna > 0) {
                    this.agregarEnPila(c.fila, c.columna - 1, stack, indiceColor );
                }
                if(c.columna < this.columnas - 1) {
                    this.agregarEnPila(c.fila, c.columna + 1, stack, indiceColor);
                }

            }

        }

        prueba() {
            console.log("probando commits");
        }

        /*
        public bool Contiene(Celda buscada, List<Celda> lista)
        {
            foreach (Celda c in lista)
            {
                if (buscada.Equals(c))
                    return true;
            }
            return false;
        }
        */
       contiene(buscada: celda, lista: Array<celda>) {
           for(let i =0; i<lista.length; i++) {
               if(buscada.fila == lista[i].fila && buscada.columna == lista[i].columna) {
                   return true;
               }
           }
           return false;
       }

       /*
        public void AgregarEnPila(int fila, int columna, Stack<Celda> pila, int indiceColor)
        {
            if (_matriz[fila, columna] == null) return;
            if (_matriz[fila, columna].IndiceColor != indiceColor) return;

            //  if (!_grupoSeleccionado.Contains(_matriz[fila, columna]))
            //     pila.Push(_matriz[fila, columna]);
            if (Contiene(_matriz[fila, columna], _grupoSeleccionado) == false)
                pila.Push(_matriz[fila, columna]);
        }
        */

        agregarEnPila(fila: number, columna: number, pila: Stack<celda>, indiceColor: number ) {
            if(this.matriz[fila][columna] == null) return;
            if(this.matriz[fila][columna].indiceColor != indiceColor) return;

            if(this.contiene(this.matriz[fila][columna], this.grupoSeleccionado) == false) {
                pila.push(this.matriz[fila][columna]);
            }
        }

        randomInt(min, max){
           return Math.floor(Math.random() * (max - min + 1)) + min;
        }


}