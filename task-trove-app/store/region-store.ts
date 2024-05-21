import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { devtools } from 'zustand/middleware';
import type { LocationObjectCoords } from 'expo-location';

type Region = Pick<LocationObjectCoords, 'latitude' | 'longitude' | 'speed'>;

export type RegionState = {
  region: Region | null;
  setRegion: (region: Region | null) => void;
};

const useRegionStore = createWithEqualityFn<RegionState>()(
  devtools(set => ({
    region: null,
    setRegion: region => set({ region }),
  })),
  shallow,
);

export default useRegionStore;
