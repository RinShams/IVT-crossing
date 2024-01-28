class FinalScreenComponent extends Component {
    constructor(options) {
        super(options);

        this.finalScreen = document.querySelector('#finalScreen');
        this.interval = setInterval(() => this.observe(), 500);
    }

    observe() {
        if (this.finalScreen.classList.contains('end')) {
            this.showResults();
            clearInterval(this.interval);
        }
    }

    showResults() {
        const triesTop = {};

        let tryNumber = localStorage.getItem('try') - 0;

        for (let i = 0; i <= tryNumber; i++) {
            const tries = localStorage.getItem(`try-${i}`);
            if (tries) {
                const [name, time, moves] = tries.split(' ');
                if (triesTop[moves]) {
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
            value.forEach(result => {
                if (innerIndex < 11) {
                    let span = document.createElement('span');
                    document.querySelector(".scoreBoard").appendChild(span);
                    span.textContent = `${innerIndex}. ${result[1]}: ⭐️ ходы - ${key} ⭐️ время - ${result[0]}`;
                    innerIndex += 1;
                }
            });

        });
        if (document.querySelector('#finalScreen').classList.contains('win')) {
            this.endTheme = document.querySelector("#winTheme");

            const [name, time, moves] = localStorage.getItem(`lastTry`).split(' ');
            let span = document.createElement('span');
            document.querySelector(".lastscore").appendChild(span);
            span.textContent = `💎 Ваш результат, ${name}: ходы - ${moves} 💎 время - ${time}`;

        } else {
            this.endTheme = document.querySelector("#lossTheme");

            let span = document.createElement('span');
            document.querySelector(".lastscore").appendChild(span);
            span.textContent = `🌧 О нет, кто-то из студентов испугался... Проигрыш! 🌧`;
        }

        let flag = localStorage.getItem("volume");
        if (flag == "on") {
            this.endTheme.volume = 1;
        } else {
            this.endTheme.volume = 0;
        }
        this.endTheme.loop = true;
        this.endTheme.currentTime = 0;
        this.endTheme.play();

        document.getElementById("restart").addEventListener("click", () => {
            this.endTheme.pause();
            location.reload();
        });

        document.querySelector("#endThemeButton").addEventListener('click', () => {
            let flag = localStorage.getItem("volume");
            if (!flag) {
                localStorage.setItem("volume", "on");
            }

            if (flag == "on") {
                localStorage.setItem("volume", "off");
                this.endTheme.volume = 0;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔈');
            } else {
                localStorage.setItem("volume", "on");
                this.endTheme.volume = 1;
                document.querySelectorAll(".volume").forEach((el) => el.innerHTML = '🔊');
            }
        });
    }

}