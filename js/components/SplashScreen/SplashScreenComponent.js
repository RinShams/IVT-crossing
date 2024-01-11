class SplashScreenComponent extends Component {
    constructor(options) {
        super(options);
    }

    _addEventListeners() {
        document.getElementById('play').addEventListener('click', () =>
        { //localStorage.clear();
            const name = document.getElementById('name').value;
            if(name) {
                localStorage.setItem(`lastTry`, `${name}`);

                this.hide(this.id);
                this.show('game')
            } else { console.log('nope')}
        })
    }
}