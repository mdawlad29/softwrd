<script>
  import { onMount } from "svelte";
  import Map from "ol/Map.js";
  import View from "ol/View.js";
  import TileLayer from "ol/layer/Tile.js";
  import OSM from "ol/source/OSM.js";
  import VectorLayer from "ol/layer/Vector.js";
  import VectorSource from "ol/source/Vector.js";
  import Feature from "ol/Feature.js";
  import Point from "ol/geom/Point.js";
  import Style from "ol/style/Style.js";
  import CircleStyle from "ol/style/Circle.js";
  import Fill from "ol/style/Fill.js";

  /**
   * @type {any[]}
   */
  export let markers = [];
  /**
   * @type {HTMLDivElement}
   */
  let mapContainer;

  onMount(() => {
    const map = new Map({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    if (markers.length) {
      const vectorSource = new VectorSource();

      markers.forEach(([lon, lat]) => {
        const feature = new Feature({
          geometry: new Point([lon, lat]),
        });
        vectorSource.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "green" }),
          }),
        }),
      });

      map.addLayer(vectorLayer);
    }

    // @ts-ignore
    return () => map.setTarget(null);
  });
</script>

<div bind:this={mapContainer}></div>

<style>
  div {
    width: 100%;
    height: 355px;
    margin-bottom: 26px;
  }
</style>
