require("savage-image");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var Camera = require("savage-camera");
var savage = require("savage-query");

var container = $.one(".map-container");
var poiList = $(".poi").reverse();

var current = null;

container.addEventListener("load", function() {
  var camera = new Camera($.one("svg", container));
  var image = savage(".map-container image");
  var svg = $.one("svg", container);
  svg.setAttribute("alt", "An interactive map of the One Center City project");

  var m = savage.dom;
  var dropshadow = m("filter", { id: "drop" },
    [-1, -1, 1, 1].map((y, i) =>
      m("feDropShadow", {
        dx: y,
        dy: i % 2 ? -1 : 1,
        stdDeviation: .5,
        "flood-color": "#D8D9DA",
        "flood-opacity": 1
      })
    )
  );

  var defs = $.one("defs", svg);
  defs.appendChild(dropshadow);

  var desat = m("filter", { id: "desat" }, [
    m("feColorMatrix", {
      type: "saturate",
      values: "0.5"
    })
  ]);
  defs.appendChild(desat);


  window.requestAnimationFrame(debounce(function() {

    var located = false;
    var poi = poiList[0];
    var id = "third_ave";
    var layer = $.one("#" + id, container);
    if (!layer) return console.log(id);
    if (id == current) return;
    located = layer;
    savage(layer).addClass("highlight");

    if (!located) {
      current = null;
      camera.pan({ x: 1, y: 1, width: 770.1, height: 909.3 }, 400);
      image.removeClass("zoomed");
    } else if (located != current) {
      current = located;
      var layerBounds = located.getBBox();
      var padding = layerBounds.width * layerBounds.height > 20000 ? 10 : 50;
      camera.zoomTo(located, padding);
      image.addClass("zoomed");
    }

  }, 300));

});