class FinalScreenComponent extends Component {
    constructor(options) {
        super(options);

        this.finalScreen = document.querySelector('#finalScreen');
        this.interval = setInterval(() => this.observe(), 500);
    }

    _addEventListeners() {
        document.getElementById("restart").addEventListener("click", () => location.reload());
        
    }

    observe() {
        if (this.finalScreen.classList.contains('end')) {
            this.showResults();
            clearInterval(this.interval);
        }
    }

    showResults() {
        const triesTop = {};

        let tryNumber = localStorage.getItem('try')-0; 

        for(let i = 0; i <= tryNumber; i++) {
            const tries = localStorage.getItem(`try-${i}`);
            if(tries) {
                const [name, time, moves] = tries.split(' ');
                if(triesTop[moves]) {
                    triesTop[moves].push([time, name]);
                } else {
                    triesTop[moves] = [[time, name]];
                }
            }
        }
        Object.values(triesTop).forEach(values => {
            values.sort((x, y) => x[0] - y[0]);
        });

        let innerIndex = 1;

        Object.entries(triesTop).forEach(([key, value]) => {
            if (innerIndex < 11) {
                value.forEach(result => {
                    let span = document.createElement('span');                
                    document.querySelector(".scoreBoard").appendChild(span);
                    span.textContent = `${innerIndex}. ${result[1]}: ⭐️ ходы - ${key} ⭐️ время - ${result[0]}`;
                    innerIndex+=1;
                });
            }
        });

        if (document.querySelector('#finalScreen').classList.contains('win')) {
            const [name, time, moves] = localStorage.getItem(`lastTry`).split(' ');
            let span = document.createElement('span');
                document.querySelector(".lastscore").appendChild(span);
                span.textContent = `💎 Ваш результат, ${name}: ходы - ${moves} 💎 время - ${time}`;
                
        } else {
            let span = document.createElement('span');
                document.querySelector(".lastscore").appendChild(span);
                span.textContent = `🌧 О нет, кто-то из детей расплакался... Проигрыш! 🌧`;
        }
    } 

}