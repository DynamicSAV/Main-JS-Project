Template.prototype.graph3DTemplate = () => `
<div class = "graph3DList">
  <canvas id="Canvas3D"></canvas>
  <div class = "settingsPanel">
  <div class = "colorSelection">
    <input type = "color" id = "colorSelector" value = "#bbbbbb"></input>
    <label>Выбор цвета фигуры</label>
  </div>
  <div class = "dividingLine"></div>
  <div class = "settingsBtn">
    <button class = "addElem" data-figure = "Cube">Куб</button>
    <button class = "addElem" data-figure = "Sphere">Сфера</button>
    <button class = "addElem" data-figure = "Tor">Тор</button>
    <button class = "addElem" data-figure = "Cone">Конус</button>
    <button class = "addElem" data-figure = "HyperbolicParaboloid">Гиперболический Пароболоид</button>
    <button class = "addElem" data-figure = "Hyperboloid1">Hyperboloid1</button>
    <button class = "addElem" data-figure = "Hyperboloid2">Hyperboloid2</button>
    <button class = "addElem" data-figure = "ParabolicCylinder">ParabolicCylinder</button>
    <button class = "addElem" data-figure = "EllipticalCylinder">EllipticalCylinder</button>
    <button class = "addElem" data-figure = "Ellipsoid">Ellipsoid</button>
    <button class = "addElem" data-figure = "HyperbolicCylinder">HyperbolicCylinder</button>
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
    <button id = "lightButton">Освещение</button>
  </div>
</div>
</div>
`;
