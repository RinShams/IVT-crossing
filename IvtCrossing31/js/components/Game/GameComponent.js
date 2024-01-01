class GameComponent extends Component {
    constructor (options) {        
        super(options); 

        this.personages = document.querySelectorAll('[data-age]');  
        this.boat = document.querySelector('.boat');
        
        this.persInBoat = 0; 
        this.persOnRightSide = 0;

        this.game();     
    }

    game() {
        document.getElementById('go').addEventListener('click', () => this.check());  

        this.personages.forEach(pers => {
                    pers.addEventListener('click', () => this.movePers(pers));            
                });       
    }

    check() {
        if (this.persInBoat > 0) {
            let children = document.querySelectorAll('[data-age="child"]');
            let adults = document.querySelectorAll('[data-age="adult"]');
            let check = true;
            
            children.forEach(child => {
                let isAdult = false;
                let myAdult = false;

                adults.forEach(adult => {  
                    
                    if (child.dataset.position == adult.dataset.position) {                    
                        isAdult = true;
                        if (child.dataset.type == adult.dataset.type) {
                            myAdult = true;
                        }
                    }
                });
                if (isAdult && !myAdult) {
                    check = false;
                }
            })
            if (check) {
                this.boatMove();
            } else {
                this.finishGame('loss');
            } 
         }       
    }

    movePers(pers) {
        if (pers.dataset.position == 'inBoat') {            
            this.moveOnBeach(pers);
        } else if (this.persInBoat == 2) {
            this.jump(pers);
        } else {
            this.moveIntoBoat(pers);
        }    
    }

    moveOnBeach(pers) {                         
        document.querySelector(".game").appendChild(pers);
        this.persInBoat -=1;
        if (this.boat.classList.contains('boatRight')) {            
            pers.dataset.position = 'rightSide';            
            this.persOnRightSide +=1;
            if (this.persOnRightSide == 6) { this.finishGame('win'); }
        } else {
            pers.dataset.position ='leftSide';            
        }
    }

    moveIntoBoat(pers) {  
        if ( (this.boat.classList.contains('boatRight') && (pers.dataset.position == 'rightSide')) || 
            ((!this.boat.classList.contains('boatRight')) && (pers.dataset.position == 'leftSide'))) {
             
            if (this.boat.classList.contains('boatRight')) {
                            this.persOnRightSide -=1;
                        }  
                        this.persInBoat +=1;
                        pers.dataset.position = 'inBoat'  
                        this.boat.appendChild(pers); 
       } 
    }
    
    jump(pers) {
        if (!pers.classList.contains('jump')) {
            pers.classList.add('jump');
        }
        setTimeout(() => {
            pers.classList.remove('jump');
        }, 400);
        console.log(pers.dataset.age);
    }

    boatMove() {
        if (this.boat.classList.contains('boatRight')) {
            this.boat.classList.remove('boatRight');
        } else {
            this.boat.classList.add('boatRight');
        }
    }
    
    finishGame(result) {
        this.hide(this.id);
        if (result == 'win') {
            console.log('you win!!!!!!!');            
            document.querySelector('.finalScreen').classList.add('win');            
        } else if (result == 'loss') {
            console.log('loss');
            document.querySelector('.finalScreen').classList.add('loss');
        }
        this.show('finalScreen');
    }
}

