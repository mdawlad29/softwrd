<script>
  // @ts-nocheck

  import ViewDetails from "$lib/components/modal/ViewDetails.svelte";
  import { onMount } from "svelte";
  import { launchesStore, fetchLaunches } from "../../../../store/LaunchStore";

  export let selected = "";
  let isOpen = false;
  let activeButton = 1;
  /**
   * @type {any[]}
   */
  let launches = [];
  let launchData = {};
  let loading = true;
  let error = null;
  let selectedLaunch = null;
  let showModal = false;

  $: console.log(showModal);

  onMount(() => {
    fetchLaunches();
  });

  // Reactive filtered data
  $: filteredData = {
    launches: $launchesStore.launches.filter((item) =>
      // @ts-ignore
      selected ? item.status === selected : true
    ),
    loading: $launchesStore.loading,
    error: $launchesStore.error,
  };

  onMount(async () => {
    const data = await fetchLaunches();
    launchData = data;
  });

  const handleSelect = (/** @type {string} */ value) => {
    selected = value;
    isOpen = false;
    dispatchEvent(new CustomEvent("change", { detail: value }));
  };

  const handleActive = (/** @type {number} */ buttonNumber) => {
    activeButton = buttonNumber;
  };

  const openModal = (launch) => {
    selectedLaunch = launch;
    showModal = true;
  };

  const closeModal = () => {
    showModal = false;
  };
</script>

<div>
  <!-- Grid & List & Filter Section -->
  <div class="flex justify-between items-center flex-wrap mb-[18px]">
    <!-- Icon Section -->
    <div
      class="border border-gray-200 rounded-lg flex items-center overflow-hidden"
    >
      <div
        role="button"
        tabindex="0"
        class={`${activeButton === 1 ? "bg-gray-200" : ""} p-3`}
        on:click={() => handleActive(1)}
        on:keydown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleActive(1);
        }}
        aria-pressed={activeButton === 1}
      >
        <img
          src="/src/assets/icons/list.svg"
          alt="filter-icon"
          class="w-3 h-3 object-contain"
        />
      </div>

      <div
        role="button"
        tabindex="0"
        class={`${activeButton === 2 ? "bg-gray-200" : ""} p-3`}
        on:click={() => handleActive(2)}
        on:keydown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleActive(2);
        }}
        aria-pressed={activeButton === 2}
      >
        <svg
          class={`"w-[12px] h-[12px] ${activeButton === 2 ? "!text-[#1C64F2]" : "!text-gray-800"} dark:text-white"`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Dropdown Button -->
    <div class="relative">
      <button
        on:click={() => (isOpen = !isOpen)}
        class={`text-gray-800 bg-gray-200 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm capitalize px-4 py-2.5 text-center inline-flex items-center gap-2 justify-center`}
        type="button"
      >
        <img
          src="/src/assets/icons/filter.png"
          alt="filer-icon"
          class="w-4 h-4 object-contain"
        />
        {selected || "filter by status"}
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      {#if isOpen}
        <div
          class="absolute right-0 top-[2.7rem] z-10 w-[11.3rem] bg-white divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul class="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <div class="flex items-center">
                <input
                  id="active"
                  type="radio"
                  name="active"
                  checked={selected === "active"}
                  on:change={() => handleSelect("active")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="active"
                  class="ms-2 text-sm font-medium text-gray-800 capitalize"
                  >active</label
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <input
                  id="retired"
                  type="radio"
                  name="retired"
                  checked={selected === "retired"}
                  on:change={() => handleSelect("retired")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="retired"
                  class="ms-2 text-sm font-medium text-gray-800 capitalize"
                  >retired</label
                >
              </div>
            </li>
            <li>
              <div class="flex items-center">
                <input
                  id="under_construction"
                  type="radio"
                  name="under construction"
                  checked={selected === "under construction"}
                  on:change={() => handleSelect("under construction")}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  for="under_construction"
                  class="ms-2 text-sm font-medium text-gray-800 capitalize"
                  >under construction</label
                >
              </div>
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>

  <!-- User Table -->
  <div class="relative overflow-x-auto rounded-lg shadow-sm h-[70vh]">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            full name
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            location name
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            region
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            details
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            success rate
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            wikipedia link
          </th>
          <th
            scope="col"
            class="px-4 py-3 uppercase text-[12px] leading-[18px] font-bold whitespace-nowrap"
          >
            status
          </th>
        </tr>
      </thead>
      <tbody>
        {#each filteredData.launches as launch}
          <tr class="bg-white border border-gray-200">
            <th
              scope="row"
              class="px-[21px] py-4 capitalize font-bold text-sm leading-[21px] text-gray-900 whitespace-nowrap"
              >{launch.landingZone}</th
            >
            <th
              scope="row"
              class="px-[21px] py-4 capitalize font-bold text-sm leading-[21px] text-gray-900 whitespace-nowrap"
              >{launch.location}</th
            >
            <th
              scope="row"
              class="px-[21px] py-4 capitalize font-bold text-sm leading-[21px] text-gray-900 whitespace-nowrap"
              >{launch.state}</th
            >
            <th
              scope="row"
              class="px-[21px] py-4 font-medium text-[12px] leading-[18px] text-gray-900 whitespace-nowrap"
            >
              <button
                on:click={() => openModal(launch)}
                class="bg-gray-200 rounded-lg px-[10px] py-[2px] capitalize"
                >view details</button
              >
            </th>
            <th
              scope="row"
              class="px-[21px] py-4 capitalize font-bold text-sm leading-[21px] text-gray-900 whitespace-nowrap"
            >
              {#if launch.percentage === "N/A"}
                <p class="percentage-text">N/A</p>
              {:else}
                <div class="progress-container">
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      style="width: {launch.percentage}%"
                    ></div>
                  </div>
                </div>
                <p class="percentage-text">{launch.percentage}%</p>
              {/if}
            </th>
            <th
              scope="row"
              class="px-[21px] py-4 capitalize font-bold text-sm leading-[21px] text-gray-900 whitespace-nowrap"
            >
              <svg
                class="w-6 h-6 !text-[#1C64F2]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
            </th>
            <th
              scope="row"
              class="px-[21px] py-4 font-medium text-[12px] leading-[18px] whitespace-nowrap"
            >
              <button
                class={`${
                  launch.status === "retired"
                    ? "bg-[#FDE8E8] text-red-800"
                    : launch.status === "under construction"
                      ? "text-[#1E429F] bg-[#E1EFFE]"
                      : launch.status === "active"
                        ? "text-green-800 bg-[#DEF7EC]"
                        : "text-gray-500 bg-[#E0E0E0]"
                } rounded-lg px-[10px] py-[2px] capitalize`}
              >
                {launch.status}
              </button>
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal for showing launch details -->
{#if showModal && selectedLaunch}
  <ViewDetails {selectedLaunch} on:close={closeModal} />
{/if}
