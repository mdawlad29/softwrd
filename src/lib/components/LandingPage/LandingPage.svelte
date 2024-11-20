<script>
  import UserTable from "./userInfo/UserTable.svelte";
</script>

<div class="container mx-auto grid grid-cols-6 gap-[40px]">
  <!-- Left Section -->
  <div class="col-span-4">
    <UserTable />
  </div>

  <!-- Right Section -->
  <div class="border border-[blue] p-2 col-span-2"></div>
</div>
