import React, { ReactNode } from 'react';
import {
    KeyboardType,
    Pressable,
    StyleSheet,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { Text } from './CustomText';
import { useSizeConfig } from '../utils/SizeConfig';
import { colors, fonts } from '../utils/Theme';

export default function CustomInputComp({
    LHSIcon,
    RHSIcon,
    PlaceholderName,
    InputOnTextChange,
    LHSIconOnPress,
    RHSIconOnPress,
    InputOnChange,
    MainCompStyle,
    LableName,
    InputText,
    SecureText,
    onSubmitEditing,
    refReference,
    Error,
    onPress,
    keyboardType,
    autoCapitalize,
    inputStyle,
    maxLength,
    compStyle,
    editable,
    onPressIN,
    placeholderTextColor,
    lableStyle,
}: {
    LHSIcon?: ReactNode;
    RHSIcon?: ReactNode;
    PlaceholderName?: string;
    InputOnTextChange?: (e: string) => void;
    InputOnChange?: () => void;
    LHSIconOnPress?: () => void;
    RHSIconOnPress?: () => void;
    MainCompStyle?: ViewStyle;
    LableName?: string;
    InputText: string | null;
    SecureText?: boolean;
    onSubmitEditing?: () => void;
    refReference?: React.RefObject<TextInput | null>;
    Error?: string;
    onPress?: () => void;
    keyboardType?: KeyboardType;
    autoCapitalize?: any;
    inputStyle?: any;
    maxLength?: number;
    compStyle?: ViewStyle | ViewStyle[];
    editable?: boolean;
    onPressIN?: () => void;
    lableStyle?: TextStyle;
    placeholderTextColor?: string;
}) {
    const route = useRoute();
    const SizeConfig = useSizeConfig();
    const styles = getStyles(SizeConfig);
    const isHomeScreen = route.name === 'Home';

    return (
        <View style={[MainCompStyle]}>
            {LableName?.length && (
                <Text style={[styles.label, lableStyle]}>{LableName}</Text>
            )}

            <View style={[styles.inputWrapper, compStyle]}>
                <Pressable onPress={LHSIconOnPress}>{LHSIcon}</Pressable>
                <TextInput
                    allowFontScaling={false}
                    ref={refReference}
                    onPressIn={onPressIN}
                    style={[isHomeScreen ? styles.homeInput : styles.input, inputStyle]}
                    placeholder={PlaceholderName}
                    placeholderTextColor={
                        placeholderTextColor ? placeholderTextColor : '#8A8A8A'
                    }
                    onChange={InputOnChange}
                    onChangeText={InputOnTextChange}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    value={InputText || ''}
                    secureTextEntry={SecureText}
                    onSubmitEditing={onSubmitEditing}
                    onPress={onPress}
                    keyboardType={keyboardType}
                    editable={editable}
                />
                <Pressable onPress={RHSIconOnPress}>{RHSIcon}</Pressable>
            </View>
            {Error?.length && <Text style={styles.Error}>{Error}</Text>}
        </View>
    );
}

const getStyles = (SizeConfig: any) =>
    StyleSheet.create({
        label: {
            fontSize: SizeConfig.fontSize * 3.7,
            marginBottom: SizeConfig.height * 0.8,
            fontFamily: fonts.medium,
            color: colors.white,
        },
        inputWrapper: {
            borderWidth: SizeConfig.width * 0.2,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SizeConfig.width * 3,
            borderRadius: SizeConfig.width * 3,
            gap: SizeConfig.width * 1,
            justifyContent: 'space-between',
            height: SizeConfig.height * 12,
        },
        input: {
            flex: 1,
            fontSize: SizeConfig.fontSize * 3,
            color: colors.text_Primary,
            fontFamily: fonts.medium,
        },
        homeInput: {
            flex: 1,
            fontSize: SizeConfig.fontSize * 3,
            color: colors.white,
            fontFamily: fonts.medium,
        },
        Error: {
            color: colors.error,
            fontSize: SizeConfig.fontSize * 2.5,
            fontFamily: fonts.medium,
            paddingTop: SizeConfig.height * 0.4,
        },
    });