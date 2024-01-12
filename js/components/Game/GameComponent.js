class GameComponent extends Component {
    constructor (options) {        
        super(options); 

        this.gameScreen = document.getElementById('gameScreen');
        this.rulesScreen = document.getElementById('rulesScreen');
        
        this.personages = document.querySelectorAll('[data-age]');  
        this.boat = document.querySelector('.boat');        
        
        this.persInBoat = 0; 
        this.persOnRightSide = 0;

        this.moves = 0;

        this.seconds = 0;
        this.minutes = 0;
        this.isRunning = false;
        this.interval;

        this.splash = document.querySelector("#splash");

        this.game();  
    }

    _addEventListeners() {
        
        document.querySelector("#gameThemeButton").addEventListener('click', () => { 
            let gameTheme = document.querySelector("#gameTheme");           

            let flag = localStorage.getItem("volume");

            if (flag == "on") {
                localStorage.setItem("volume", "off");
                gameTheme.volume = 0;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔈');
            } else {
                localStorage.setItem("volume", "on");
                gameTheme.volume = 1;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔊');
            }
        });
    }    

    game() {
        
        document.getElementById('rulesButton').addEventListener('click', () => {
                this.showRules();
            });

        this.rulesScreen.addEventListener('click', () => {           
                this.closeRules();                               
            });

        document.getElementById('go').addEventListener('click', () => this.check());  

        this.personages.forEach(pers => {
                pers.addEventListener('click', () => this.movePers(pers));            
            });        
    }

    showRules() {
        if ((this.rulesScreen.classList.contains("hide")) && (!this.gameScreen.classList.contains('screenHover'))) {            
            this.rulesScreen.classList.remove("hide");
            this.gameScreen.classList.add('screenHover');
            this.pauseTimer();
        }
    }

    closeRules () {
        if ((!this.rulesScreen.classList.contains("hide")) && (this.gameScreen.classList.contains('screenHover'))) {
            this.rulesScreen.classList.add("hide");
            this.gameScreen.classList.remove('screenHover');
            this.startTimer();
        }
    }

    startTimer() {
        if (!this.isRunning) {
          this.isRunning = true;
          this.interval = setInterval(() => this.updateTimer(), 1000); 
        } 
    }

    updateTimer() {
        this.seconds +=1;
        
        if (this.seconds == 60) {
          this.seconds = 0;
          this.minutes +=1;
        }
        if (this.seconds < 10) {
            document.querySelector('#timerValue').textContent = `🌿 время: ${this.minutes}.0${this.seconds} `;
        } else {
            document.querySelector('#timerValue').textContent = `🌿 время: ${this.minutes}.${this.seconds} `;
        }
    }

    pauseTimer() {
        if (this.isRunning) {
          this.isRunning = false;
          clearInterval(this.interval);
        }
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
                this.moves += 1;
                document.querySelector('#movesValue').textContent = `☘️ ходы: ${this.moves} `;
            } else {
                this.finishGame('loss'); 
            } 
         }       
    }

    movePers(pers) {
        if (pers.dataset.position == 'inBoat') {            
            this.moveOnBeach(pers);
        } else if (this.persInBoat < 2) {
            this.moveIntoBoat(pers);
        } else {
            this.jump(pers);
        }    
    }

    moveOnBeach(pers) {                         
        document.querySelector("#game").appendChild(pers);
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
            this.splash.play();
       } else {
        this.jump(pers);
       }
    }
    
    jump(pers) {
        if (!pers.classList.contains('jump')) {
            pers.classList.add('jump');
        }
        setTimeout(() => {
            pers.classList.remove('jump');
        }, 400);
    }

    boatMove() {
        if (this.boat.classList.contains('boatRight')) {
            this.boat.classList.remove('boatRight');
        } else {
            this.boat.classList.add('boatRight');
        }
    }
    
    finishGame(result) {
        this.pauseTimer();                 

        if (result == 'win') { 
            document.querySelector('#finalScreen').classList.add('win');

            if (this.seconds < 10) {
                this.time = `${this.minutes}.0${this.seconds}`;
            } else {
                this.time = `${this.minutes}.${this.seconds}`;
            }
            let name = localStorage.getItem(`lastTry`);
            localStorage.setItem(`lastTry`, `${name} ${this.time} ${this.moves}`);  

            let tryNumber = localStorage.getItem('try')-0;
            if (!tryNumber) {
                localStorage.setItem('try', 1);
            } else {
                tryNumber +=1;
                localStorage.setItem(`try`, `${tryNumber}`);
            }
            localStorage.setItem(`try-${tryNumber}`, `${name} ${this.time} ${this.moves}`);           

        } else if (result == 'loss') {
            document.querySelector('#finalScreen').classList.add('loss');
        }
        let gameTheme = document.querySelector("#gameTheme"); 
        gameTheme.pause();
        document.querySelector('#finalScreen').classList.add('end');
        this.hide(this.id);
        this.show('finalScreen');
    }
}

