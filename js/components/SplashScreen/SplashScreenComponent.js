class SplashScreenComponent extends Component {
    constructor(options) {
        super(options);
    }

    _addEventListeners() {
        document.getElementById('play').addEventListener('click', () =>
        { 
            const name = document.getElementById('name').value;
            if(name) {
                console.log(name);
                this.hide(this.id);
                this.show('game')
            } else { console.log('nope')}
        })
    }
}