class SplashScreenComponent extends Component {
    constructor(options) {
        super(options);
    }

    _addEventListeners() {

        window.addEventListener('load', () => {
            let flag = localStorage.getItem("volume");
            if (!flag) {
                localStorage.setItem("volume", "on");
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔊');
            }
            if (flag == "on") {
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔊');
            } else {
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔈');
            } 
        });        

        let menuTheme = document.querySelector("#menuTheme");
        menuTheme.loop = true;
        let gameTheme = document.querySelector("#gameTheme");
        gameTheme.loop = true;

        document.querySelector("#name").addEventListener("click", () => { 
            let flag = localStorage.getItem("volume");
            if (!flag) {
                localStorage.setItem("volume", "on");
            }   
            if (flag == "on") {
                menuTheme.volume = 1;
            } else {
                menuTheme.volume = 0;
            }            
            menuTheme.play();
        });

        document.getElementById('play').addEventListener('click', () => { //localStorage.clear();
            const name = document.getElementById('name').value;
            if(name) {
                localStorage.setItem(`lastTry`, `${name}`);
                let flag = localStorage.getItem("volume");
                if (!flag) {
                    localStorage.setItem("volume", "on");
                }                
                
                if (flag == "on") {
                    gameTheme.volume = 1;
                } else {
                    gameTheme.volume = 0;
                }
                menuTheme.pause();
                gameTheme.play();
                this.hide(this.id);
                this.show('game')
                
            } else { console.log('nope')}
        });

        document.querySelector("#menuThemeButton").addEventListener('click', () => {
            let menuTheme = document.querySelector("#menuTheme");

            let flag = localStorage.getItem("volume");
            if (!flag) {
                localStorage.setItem("volume", "on");
            }

            if (flag == "on") {
                localStorage.setItem("volume", "off");
                menuTheme.volume = 0;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔈');
                
            } else {
                localStorage.setItem("volume", "on");
                menuTheme.volume = 1;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔊');
            }
        });
    }
}