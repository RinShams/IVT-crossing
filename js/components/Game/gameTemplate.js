Template.prototype.gameTemplate = () =>`   
        
    <div id="rulesScreen"></div>
    <button id="rulesButton">???</button>

    <div id="movesValue">☘️ ходы: 0 </div>
    <div id="timerValue">🌿 время: 0.00 </div>

    <button class="volume" id="gameThemeButton"></button>

    <div class="screenHover" id="gameScreen">

        <div data-position="leftSide" data-age="child" data-type="1" id="als">Алесь</div>
        <div data-position="leftSide" data-age="child" data-type="2" id="ar">Арина</div>
        <div data-position="leftSide" data-age="child" data-type="3" id="liz">Лиза</div>

        <div data-position="leftSide" data-age="adult" data-type="1" id="tr">Трусов А.С.</div>
        <div data-position="leftSide" data-age="adult" data-type="2" id="nov">Новикова Е.В.</div>
        <div data-position="leftSide" data-age="adult" data-type="3" id="gol">Головизин В.В.</div>
        
        <div class="boat"></div> 

        <button id="go">в плавание</button>   
    </div> 
`;

