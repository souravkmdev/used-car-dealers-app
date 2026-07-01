import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { colors, fonts } from '../../../utils/Theme';
import { useSizeConfig } from '../../../utils/SizeConfig';

export interface InputFieldProps {
    label: string;
    icon: string;
    placeholder: string;
    value: string;
    onChangeText: (t: string) => void;
    keyboardType?: any;
    maxLength?: number;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    rightElement?: React.ReactNode;
    editable?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    maxLength,
    secureTextEntry,
    autoCapitalize,
    rightElement,
    editable,
}) => {
    const borderAnim = useRef(new Animated.Value(0)).current;
    const [focused, setFocused] = useState(false);
    const size = useSizeConfig();
    const styles = getStyles(size);

    const handleFocus = () => {
        setFocused(true);
        Animated.timing(borderAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setFocused(false);
        Animated.timing(borderAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const borderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E2E8F0', colors.primary],
    });

    const shadowOpacity = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.15],
    });

    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <Animated.View
                style={[
                    styles.box,
                    {
                        borderColor,
                        shadowOpacity,
                        shadowColor: colors.primary,
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 8,
                        elevation: focused ? 3 : 0,
                    },
                ]}>
                <Feather
                    name={icon as any}
                    size={17}
                    color={focused ? colors.primary : '#94A3B8'}
                    style={styles.icon}
                />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize ?? 'sentences'}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={editable}
                />
                {rightElement}
            </Animated.View>
        </View>
    );
};

export default InputField;

const getStyles = (size: any) => StyleSheet.create({
    wrapper: {
        marginBottom: size.width * 4.1
    },
    label: {
        fontSize: size.width * 2.8,
        fontFamily: fonts.medium,
        color: '#374151',
        marginBottom: size.width * 2.1,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: size.width * 12,
        borderWidth: size.width * 0.4,
        borderRadius: size.width * 3,
        paddingHorizontal: size.width * 4.2,
        backgroundColor: '#F8FAFC',
    },
    icon: {
        marginRight: size.width * 2
    },
    input: {
        flex: 1,
        fontSize: size.width * 3.75,
        fontFamily: fonts.regular,
        color: '#0F172A',
        padding: 0,
    },
});
