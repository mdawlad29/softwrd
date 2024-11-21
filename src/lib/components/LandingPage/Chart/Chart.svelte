<script>
  // @ts-nocheck

  import * as d3 from "d3";

  let width = 450;
  let height = 450;
  let margin = 40;

  let radius = Math.min(width, height) / 2 - margin;

  const data = { a: 9, b: 20, c: 30, d: 8 };

  const color = d3
    .scaleOrdinal()
    .domain(Object.keys(data))
    .range(["#E74694", "#1A56DB", "#16BDCA", "#FDBA8C"]);

  const transformedData = Object.entries(data).map(([key, value]) => ({
    key,
    value,
  }));

  const pie = d3.pie().value((d) => d.value);
  const data_ready = pie(transformedData);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  const outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);
</script>

<div class="border border-gray-200 rounded-lg shadow-sm p-4">
  <h3
    class="text-gray-900 font-bold leading-[24px] text-[16px] capitalize pb-4"
  >
    success rate chart
  </h3>

  <svg
    {width}
    {height}
    viewBox="{-width / 2}, {-height / 2}, {width}, {height}"
    style:max-width="100%"
    style:height="auto"
  >
    <g class="chart-inner">
      {#each data_ready as slice}
        <path d={arc(slice)} fill={color(slice.data.key)} stroke="white" />
      {/each}

      <!-- Central Text -->
      <text
        text-anchor="middle"
        dominant-baseline="central"
        class="fill-gray-900 font-bold"
        font-size="32"
      >
        6
      </text>

      <text
        text-anchor="middle"
        dominant-baseline="central"
        class="fill-gray-600 font-medium"
        font-size="16"
        dy="1.5em"
      >
        Landing Pads
      </text>
    </g>
  </svg>
</div>

<style>
</style>
