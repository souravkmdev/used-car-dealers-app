import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, fonts } from '../../utils/Theme';
import ApplyNowCard from './components/ApplyNowCard';
import InputField from './components/InputField';
import LoginFooter from './components/LoginFooter';
import LoginHero from './components/LoginHero';
import { useSizeConfig } from '../../utils/SizeConfig';
import { useLoginMutation } from '../../store/services/authApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import { RootStackParamList } from '../../navigation/AppNavigator';

const LoginScreen = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const size = useSizeConfig();
    const styles = getStyles(size);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const handleLogin = async () => {
        if (!userId.trim()) {
            Alert.alert('Validation Error', 'Please enter your User ID.');
            return;
        }
        if (!password) {
            Alert.alert('Validation Error', 'Please enter your Password.');
            return;
        }

        try {
            const response = await login({
                login_id: userId.trim(),
                password: password,
            }).unwrap();

            console.log('login response: ', response)

            const token = response?.access_token


            if (!token) {
                Alert.alert('Sign In Failed', 'Server response is missing the authentication token.');
                return;
            }

            const user = response?.user;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('user', JSON.stringify(user));

            dispatch(setCredentials({ token, user }));

            navigation.replace('Home');
        } catch (error: any) {
            console.error('Sign In error details:', error);

            let errorMessage = 'An unexpected error occurred. Please try again.';

            if (error?.data?.message) {
                errorMessage = error.data.message;
            } else if (error?.data?.error) {
                errorMessage = error.data.error;
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.status === 'FETCH_ERROR') {
                errorMessage = 'Cannot connect to server. Please check your network connection.';
            } else if (error?.status === 401 || error?.status === 403) {
                errorMessage = 'Invalid User ID or Password. Please try again.';
            }

            Alert.alert('Sign In Failed', errorMessage);
        }
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    <LoginHero />

                    <View style={styles.card}>
                        <View style={styles.dragHandle} />

                        <Text style={styles.cardTitle}>Sign In</Text>
                        <Text style={styles.cardSubtitle}>Enter your credentials to continue</Text>

                        <InputField
                            label="User ID"
                            icon="user"
                            placeholder="Enter your user ID"
                            value={userId}
                            onChangeText={setUserId}
                            keyboardType="default"
                            autoCapitalize="none"
                            editable={!isLoading}
                        />
                        <InputField
                            label="Password"
                            icon="lock"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            editable={!isLoading}
                            rightElement={
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                    <Feather
                                        name={showPassword ? 'eye' : 'eye-off'}
                                        size={17}
                                        color="#94A3B8"
                                    />
                                </TouchableOpacity>
                            }
                        />

                        <TouchableOpacity style={styles.forgotWrapper} disabled={isLoading}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.82}
                            style={styles.loginBtn}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <LinearGradient
                                colors={[colors.primary, '#1A2F5E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginGradient}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.loginBtnText}>Sign In</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <ApplyNowCard />

                        <LoginFooter />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;

const getStyles = (size: any) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A1432',
    },
    scrollContent: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: size.width * 5.8,
        borderTopRightRadius: size.width * 5.8,
        marginTop: -size.width * 5.8,
        paddingHorizontal: size.width * 5,
        paddingTop: size.width * 4.1,
        paddingBottom: size.width * 6.6,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: size.width * 2.5,
    },
    dragHandle: {
        width: size.width * 8.2,
        height: size.width * 0.8,
        borderRadius: size.width * 0.5,
        backgroundColor: '#E2E8F0',
        alignSelf: 'center',
        marginBottom: size.width * 5.5,
    },
    cardTitle: {
        fontSize: size.width * 5.3,
        fontFamily: fonts.bold,
        color: '#0F172A',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    cardSubtitle: {
        fontSize: size.width * 2.8,
        fontFamily: fonts.regular,
        color: '#64748B',
        marginBottom: size.width * 5.8,
    },

    forgotWrapper: {
        alignSelf: 'flex-end',
        marginBottom: size.width * 4.6,
        marginTop: 4,
    },
    forgotText: {
        fontSize: size.width * 2.8,
        fontFamily: fonts.semiBold,
        color: colors.primary,
    },

    loginBtn: {
        borderRadius: size.width * 3.4,
        overflow: 'hidden',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: size.width * 3.4,
        elevation: 6,
    },
    loginGradient: {
        height: size.width * 13.5,
        borderRadius: size.width * 3.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: size.width * 3.8,
        fontFamily: fonts.bold,
        letterSpacing: 0.3,
    },
});