import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface CustomTextProps extends RNTextProps {
  children?: React.ReactNode;
}

export const CustomText: React.FC<CustomTextProps> = props => {
  return (
    <RNText
      {...props}
      allowFontScaling={false}
      style={[props.style]}
    />
  );
};

export { CustomText as Text };
export type { CustomTextProps as TextProps };
