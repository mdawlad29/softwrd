import { writable } from "svelte/store";

export const launchesStore = writable({
  launches: [],
  loading: true,
  error: null,
});

export const fetchLaunches = async () => {
  launchesStore.set({
    launches: [],
    loading: true,
    error: null,
  });

  try {
    const response = await fetch("https://api.spacexdata.com/v4/launches");
    if (!response.ok) {
      throw new Error("Failed to fetch launches");
    }

    const rawLaunches = await response.json();

    const launches = rawLaunches.map((launch: any) => ({
      landingZone: launch.name,
      location: launch.launchpad,
      state: "N/A", // or modify according to data
      percentage: launch.success ? 100 : 0,
      status: launch.success ? "active" : "retired",
    }));

    launchesStore.set({
      launches,
      loading: false,
      error: null,
    });
  } catch (err: any) {
    launchesStore.set({
      launches: [],
      loading: false,
      error: err.message,
    });
  }
};
