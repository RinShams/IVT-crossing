class FinalScreenComponent extends Component {
    constructor(options) {
        super(options);
    }


_addEventListeners() {
    document.getElementById("restart").addEventListener("click", () => location.reload());
}

}