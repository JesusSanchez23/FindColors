const btnStart = document.getElementById('btnStart')
const violet = document.getElementById('violet')
const blue = document.getElementById('blue')
const green = document.getElementById('green')
const orange = document.getElementById('orange')
//Niveles para ganar
const ULTIMO_NIVEL = 6;
swal('FindColors!!')

class Juego{
    constructor(){
        this.inicializar();
        this.generarSecuancia();
        setTimeout(() => {
            this.nextLevel();
        },500)
       
    }

    inicializar() {
        this.nextLevel = this.nextLevel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.togglebtnEmpezar();
        this.nivel = 1;
        this.color = {
            violet,
            blue,
            green,
            orange
        }
    }
    togglebtnEmpezar () {
        if (btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide')
        }else {
            btnStart.classList.add('hide')
        }
    }
    generarSecuancia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    nextLevel(){
        this.iluminarSecuencia();
        this.addEvents();
        this.subNivel = 0;

    }

    transformarNumeroAcolor(num){
        switch(num){
            case 0:
            return 'violet'
            case 1:
            return 'blue'
            case 2:
            return 'green'
            case 3:
            return 'orange'
        }
    }

    transformarColorAnumero(color){
        switch(color){
            case'violet':
            return 0
            case 'blue':
            return 1
            case 'green':
            return 2
            case 'orange':
            return 3
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAcolor(this.secuencia[i])
            setTimeout(()=> this.iluminarColor(color),1000 * i)
        }
    }

    iluminarColor(color){
        this.color[color].classList.add('light');
        setTimeout(()=> this.apagarColor(color),500)
    }

    apagarColor(color){
        this.color[color].classList.remove('light')
    }
    addEvents(){
        this.color.violet.addEventListener('click', this.elegirColor)
        this.color.blue.addEventListener('click', this.elegirColor)
        this.color.green.addEventListener('click', this.elegirColor)
        this.color.orange.addEventListener('click', this.elegirColor)

    }
    delateEvents() {
        this.color.violet.removeEventListener('click', this.elegirColor)
        this.color.blue.removeEventListener('click', this.elegirColor)
        this.color.green.removeEventListener('click', this.elegirColor)
        this.color.orange.removeEventListener('click', this.elegirColor) 
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorAnumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subNivel]){
            this.subNivel++;
            if(this.subNivel === this.nivel){
                this.nivel++;
                this.delateEvents();
                if(this.nivel === (ULTIMO_NIVEL+1)){
                    this.winGame();
                }else{
                    setTimeout(this.nextLevel,1500)
                }
            }
        } else{
            this.loseGame();

        }
        
    }

    winGame(){
        swal('FindColors', 'Congratulations', 'success')
        .then(this.inicializar.bind(this))
    }

    loseGame(){
        swal('FindColors', 'Bad Luck', 'error')
        .then(() => {
            this.delateEvents();
            this.inicializar();
        })
    }

}

 function playGame() {
    const play = new Juego();

 }



