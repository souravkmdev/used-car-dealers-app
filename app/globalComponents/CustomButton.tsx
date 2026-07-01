import React, { ReactNode, useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from './CustomText';
import { useSizeConfig } from '../utils/SizeConfig';
import { colors, fonts } from '../utils/Theme';

interface CustomButtonProps {
  PressableStyle?: StyleProp<ViewStyle>;
  TextStyle?: StyleProp<TextStyle>;
  TextValue: string;
  OnPress?: () => void;
  LHSIcon?: ReactNode;
  RHSIcon?: ReactNode;
  LHSIconOnPress?: () => void;
  RHSIconOnPress?: () => void;
  GradientColors?: string[];
  mainstyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export default function CustomButton({
  PressableStyle,
  TextStyle,
  TextValue,
  OnPress,
  LHSIcon,
  RHSIcon,
  LHSIconOnPress,
  RHSIconOnPress,
  mainstyle,
  isLoading = false,
  GradientColors = ['#ADA9F6', '#A383FF', '#807AF4'],
}: CustomButtonProps) {
  const SizeConfig = useSizeConfig();

  const styles = useMemo(() => getStyles(SizeConfig), [SizeConfig]);

  return (
    <LinearGradient
      colors={GradientColors}
      style={[styles.gradient, mainstyle]}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 0.5 }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={OnPress}
        disabled={isLoading}
        style={[styles.buttonContainer, PressableStyle]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <>
            {LHSIcon && (
              <Pressable onPress={LHSIconOnPress} hitSlop={10}>
                {LHSIcon}
              </Pressable>
            )}

            <Text style={[styles.buttonText, TextStyle]}>{TextValue}</Text>

            {RHSIcon && (
              <Pressable onPress={RHSIconOnPress} hitSlop={10}>
                {RHSIcon}
              </Pressable>
            )}
          </>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const getStyles = (SizeConfig: any) =>
  StyleSheet.create({
    gradient: {
      borderRadius: SizeConfig.width * 3,
    },

    buttonContainer: {
      paddingHorizontal: SizeConfig.width * 3,
      paddingVertical: SizeConfig.width * 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SizeConfig.width * 3,
    },

    buttonText: {
      color: colors.white,
      fontSize: SizeConfig.fontSize * 3.8,
      fontFamily: fonts.medium,
      marginHorizontal: SizeConfig.width,
      includeFontPadding: false,
    },
  });
