import React, { useEffect, useState } from 'react';

import { breakPointMethods } from './tMediaQuery';
import initializeBreakpoints, {
  BreakpointDetail,
} from './utill/initializeBreakpoints';
import useMediaQueryDetector from './hooks/useMediaQueryDetector';
import store from './createStore';
import { getDevicetype } from './utill/getDeviceType';
import { Dimensions } from 'react-native';
import type { indexType } from './types';

type Props = {
  breakpoints: { [key: indexType]: number };
  theme?: {
    themeId: string;
    [key: indexType]: any;
  };
  children: JSX.Element;
};

const ScreenWidth = Dimensions.get('window').width;

const ResponsiveProvider = ({ breakpoints, theme, children }: Props) => {
  const [detailBreakPoints, setDetailBreakPoints] =
    useState<null | BreakpointDetail>(null);

  useMediaQueryDetector({
    defaultBreakPoints: breakpoints,
  });

  // useEffect(() => {
  //   console.log("device type chaning");
  //   store.store.setState((state) => ({ ...state, device }));
  // }, [device, width]);

  // useEffect(() => {
  //   store.store.setState((state) => ({
  //     ...state,
  //     theme: { ...state.theme, ...theme }
  //   }));
  // }, [theme]);

  useEffect(() => {
    setDetailBreakPoints(initializeBreakpoints(breakpoints));
    console.log('provider useeffect == ');
    store.store.setState({
      // device,
      device: getDevicetype(ScreenWidth, breakpoints),
      // screenWidth: width,
      width: ScreenWidth,
      defaultBreakPoints: breakpoints,
      breakpoints: {
        ...initializeBreakpoints(breakpoints),
      },
      breakPointMethods: {
        ...breakPointMethods,
      },
      theme: {
        ...theme,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {detailBreakPoints && (
        <ProviderContext.Provider
          value={{
            device,
            // screenWidth: width,
            width,
            defaultBreakPoints: breakpoints,
            theme: {
              ...theme,
              breakpoints: {
                ...detailBreakPoints,
                ...breakPointMethods
              }
            }
          }}
        >
          {children}
        </ProviderContext.Provider>
      )} */}
      {detailBreakPoints && children}
    </>
  );
};

export default ResponsiveProvider;
