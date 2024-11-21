<script>
  // @ts-nocheck

  import Chart from "./Chart/Chart.svelte";
  import MapView from "./MapView/MapView.svelte";
  import UserTable from "./UserInfo/UserTable.svelte";

  export let markerCoordinates = [
    [0, 0],
    [10, 10],
    [-10, -10],
  ];
</script>

<div class="container mx-auto grid grid-cols-6 gap-[40px]">
  <!-- Left Section -->
  <div class="col-span-4 mb-[26px]">
    <UserTable />
  </div>

  <!-- Right Section -->
  <div class="col-span-2">
    <MapView {markerCoordinates} />

    <Chart />
  </div>
</div>
