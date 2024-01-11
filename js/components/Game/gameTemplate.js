Template.prototype.gameTemplate = () =>`   
        
    <div id="rulesScreen"></div>
    <button id="rulesButton">???</button>

    <div id="movesValue">☘️ ходы: 0 </div>
    <div id="timerValue">🌿 время: 0.00 </div>

    <div class="screenHover" id="gameScreen">

        <div data-position="leftSide" data-age="child" data-type="1" id="als">ales</div>
        <div data-position="leftSide" data-age="child" data-type="2" id="ar">arina</div>
        <div data-position="leftSide" data-age="child" data-type="3" id="liz">liza</div>

        <div data-position="leftSide" data-age="adult" data-type="1" id="tr">trusov</div>
        <div data-position="leftSide" data-age="adult" data-type="2" id="nov">novikova</div>
        <div data-position="leftSide" data-age="adult" data-type="3" id="gol">golovizin</div>
        
        <div class="boat"></div> 

        <button id="go">в плавание</button>   
    </div> 
    <audio class="audio" src="./music/Jingle%20Bell%20Rock.mp3" controls loop></audio>
`;

