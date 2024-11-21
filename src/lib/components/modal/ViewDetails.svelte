<script>
  // @ts-nocheck

  import { createEventDispatcher } from "svelte";

  export let launchData = {};
  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("close");
  };
</script>

<!-- Main modal -->
<div class="modal">
  <div class="modal-content">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-gray-900 font-bold text-[18px] leading-[27px]">
        Details - Landing Zone 1
      </h2>

      <svg
        on:click={closeModal}
        class="w-4 h-4 !text-gray-400"
        aria-hidden="true"
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
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    </div>

    <p class="text-gray-500 text-[16px] leading-[24px] mb-12">
      SpaceX's first east coast landing pad is Landing Zone 1, where the
      historic first Falcon 9 landing occurred in December 2015. LC-13 was
      originally used as a launch pad for early Atlas missiles and rockets from
      Lockheed Martin. LC-1 was later expanded to include Landing Zone 2 for
      side booster RTLS Falcon Heavy missions, and it was first used in February
      2018 for that purpose.
    </p>
  </div>
</div>
