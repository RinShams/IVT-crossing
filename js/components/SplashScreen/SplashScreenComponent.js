class SplashScreenComponent extends Component {
    constructor(options) {
        super(options);
    }

    _addEventListeners() {
        document.getElementById('play').addEventListener('click', () =>
        { //localStorage.clear();
            const audio = document.querySelector('.audio')
            const name = document.getElementById('name').value;
            if(name) {
                localStorage.setItem(`lastTry`, `${name}`);
                audio.volume = 0.2
                audio.play();
                this.hide(this.id);
                this.show('game')

            } else { console.log('nope')}
        })
    }
}
