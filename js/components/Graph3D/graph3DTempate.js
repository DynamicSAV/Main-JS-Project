Template.prototype.graph3DTemplate = () => `
<div class = "graph3DList">
  <canvas id="Canvas3D"></canvas>
  <div class = "settingsPanel">
  <div class = "colorSelection">
    <input type = "color" id = "colorSelector" value = "#ffaa22"></input>
    <label>Выбор цвета фигуры</label>
  </div>
  <div class = "dividingLine"></div>
  <div class = "settingsBtn">
    <button class = "addElem" data-figure = "Cube">Куб</button>
    <button class = "addElem" data-figure = "Sphere">Сфера</button>
    <button class = "addElem" data-figure = "Tor">Тор</button>
    <button class = "addElem" data-figure = "">Конус</button>
    <button class = "addElem" data-figure = "Cylinder" >Цилиндр</button>
  </div>
  <div class = "dividingLine"></div>
    <div class = "objectElementSelector">
      <button class = "viewElementButton" id = "vertexView">Вершины</button>
      <button class = "viewElementButton" id = "edgesView">Грани</button>
      <button class = "viewElementButton" id = "polygonsView">Полигоны</button>
    </div>
  <div class = "dividingLine"></div>
  <div>
    <button id = "deleteAllObjects">Очистить Сцену</button>
  </div>
</div>
</div>
`;