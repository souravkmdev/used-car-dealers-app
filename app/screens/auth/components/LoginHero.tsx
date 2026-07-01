import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../../utils/Theme';
import { useSizeConfig } from '../../../utils/SizeConfig';

const heroBg = require('../../../assets/images/auth/login.png');
const logo = require('../../../assets/images/auth/logo.png');

const LoginHero: React.FC = () => {

    const size = useSizeConfig();
    const styles = getStyles(size);

    return (
        <View style={styles.heroWrapper}>
            <ImageBackground source={heroBg} style={styles.heroBg} resizeMode="cover">
                <LinearGradient
                    colors={['rgba(196, 197, 199, 0.72)', 'rgba(0, 0, 0, 0.88)']}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.heroContent}>
                    {/* <View style={styles.logoBadge}>
                    <Image source={logo} style={styles.logoImage} resizeMode="contain" />
                </View> */}

                    <View style={styles.heroTextBlock}>
                        <Text style={styles.heroEyebrow}>KALYANI MOTORS</Text>
                        <Text style={styles.heroTitle}>Welcome Back</Text>
                        <Text style={styles.heroSubtitle}>
                            Sign in to your dealer account{'\n'}and start bidding smart.
                        </Text>
                    </View>

                    <View style={styles.heroPills}>
                        <View style={styles.pill}>
                            <MaterialCommunityIcons name="shield-check" size={12} color="#93C5FD" />
                            <Text style={styles.pillText}>Verified Dealers</Text>
                        </View>
                        <View style={styles.pill}>
                            <Feather name="zap" size={12} color="#93C5FD" />
                            <Text style={styles.pillText}>Live Auctions</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

export default LoginHero;

const getStyles = (size: any) => StyleSheet.create({
    heroWrapper: {
        width: '100%',
        height: '40%',
    },
    heroBg: {
        flex: 1,
        justifyContent: 'center',
    },
    heroContent: {
        paddingHorizontal: size.width * 5,
        paddingBottom: size.width * 10.3,
    },
    // logoBadge: {
    //     alignSelf: 'flex-start',
    //     backgroundColor: 'rgba(255,255,255,0.12)',
    //     borderRadius: 12,
    //     padding: 8,
    //     marginBottom: 20,
    //     borderWidth: 1,
    //     borderColor: 'rgba(255,255,255,0.18)',
    // },
    // logoImage: {
    //     width: 120,
    //     height: 36,
    // },
    heroTextBlock: {
        marginBottom: size.width * 3.3,
    },
    heroEyebrow: {
        fontSize: size.width * 2.6,
        fontFamily: fonts.semiBold,
        color: '#93C5FD',
        letterSpacing: 2,
        marginBottom: 6,
    },
    heroTitle: {
        fontSize: size.width * 7.8,
        fontFamily: fonts.bold,
        color: '#FFFFFF',
        marginBottom: size.width * 1.9,
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontSize: size.width * 3.3,
        fontFamily: fonts.regular,
        color: 'rgba(255,255,255,0.72)',
        lineHeight: size.width * 4.5,
    },
    heroPills: {
        flexDirection: 'row',
        gap: size.width * 2.6,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: size.width * 4,
        paddingHorizontal: size.width * 3.3,
        paddingVertical: size.width * 1.2,
        gap: size.width * 1.2,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    pillText: {
        fontSize: size.width * 2.9,
        fontFamily: fonts.medium,
        color: '#BAD4F8',
    },
});
