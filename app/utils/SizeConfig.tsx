import React, { createContext, useContext, ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';

type SizeConfigType = {
  width: number;
  deviceWidth: number;
  height: number;
  deviceHeight: number;
  fontSize: number;
  isTablet: boolean;
};

const SizeConfigContext = createContext<SizeConfigType | null>(null);

export const SizeConfigProvider = ({ children }: { children: ReactNode }) => {
  const { width, height } = useWindowDimensions();

  const isTablet = Math.min(width, height) >= 600;
  const TABLET_SCALE = 0.75;

  const effectiveWidth = isTablet ? width * TABLET_SCALE : width;
  const effectiveHeight = isTablet ? height * TABLET_SCALE : height;

  const shortSide = Math.min(effectiveWidth, effectiveHeight);

  const value: SizeConfigType = {
    width: shortSide / 100,
    deviceWidth: width,
    height: shortSide / 100,
    deviceHeight: height,
    fontSize: shortSide / 100,
    isTablet,
  };

  return (
    <SizeConfigContext.Provider value={value}>
      {children}
    </SizeConfigContext.Provider>
  );
};

// Custom hook to use it
export const useSizeConfig = () => {
  const context = useContext(SizeConfigContext);
  if (!context) {
    throw new Error('useSizeConfig must be used inside SizeConfigProvider');
  }
  return context;
};
