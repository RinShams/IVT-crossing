window.requestAnimFrame = (() => {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

const template = new Template;
new AppComponent({
    id: 'app',
    template: template.appTemplate
});   

//width: 140vh;
//height: 95vh;
/* margin-left: auto;
    margin-right: auto

background-image: url("../img/frame.png");
    background-repeat: no-repeat;    
    background-size: 100% 100%;  


	*/