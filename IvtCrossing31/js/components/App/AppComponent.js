class AppComponent extends Component {
    constructor(options) {
        super(options);
        this.splashScreen = new SplashScreenComponent({
            id: 'splashScreen',
            parent: this.id,
            template: template.splashScreenTemplate
        });
        this.game = new GameComponent({
            id: 'game',
            parent: this.id,
            template: template.gameTemplate,
            className: 'hide'
        });
        this.finalScreen = new FinalScreenComponent({
            id: 'finalScreen',
            parent: this.id,
            template: template.finalScreenTemplate,
            className: 'hide'
        })
    }
}