import { View, Image, StyleSheet, NativeModules, Linking } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSizeConfig } from '../../utils/SizeConfig';
import { Text } from '../../globalComponents/CustomText';
import { colors, fonts } from '../../utils/Theme';
import CustomButton from '../../globalComponents/CustomButton';

export default function InAppUpdater() {
  const insets = useSafeAreaInsets();
  const SizeConfig = useSizeConfig();
  const styles = getStyles(SizeConfig);

  const importentPointsComp = ({ styles, title, description, image }: any) => {
    return (
      <View style={styles.featureRow}>
        <View style={styles.iconContainer}>
          <Image source={image} style={styles.featureIcon} />
        </View>

        <View>
          <Text style={styles.featureTitle}>{title}</Text>

          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + SizeConfig.height * 9 },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.appTitle}>DEALER APP</Text>

            <Text style={styles.updateTitle}>Update Available</Text>
          </View>

          <Text style={styles.description}>
            A new version of the Dealer App is ready with new features and
            improvements to enhance your experience.
          </Text>
        </View>

        <Image
          source={require('../../assets/images/auth/inapp_image.png')}
          style={styles.lottieView}
        />

        <View
          style={{
            alignItems: 'center',
            top: '-15%',
            gap: SizeConfig.height * 5,
          }}
        >
          <Image
            source={require('../../assets/images/auth/inapp_icon.png')}
            style={styles.inappIcon}
          />

          <View style={styles.featureCard}>
            {importentPointsComp({
              styles,
              title: 'Enhanced Securiy',
              description: 'Improved authentication and data protection.',
              image: require('../../assets/images/auth/security.png'),
            })}
            {importentPointsComp({
              styles,
              title: 'Smarter Bidding',
              description:
                'New tools and optimizations for a better auction experience.',
              image: require('../../assets/images/auth/bidding.png'),
            })}
            {importentPointsComp({
              styles,
              title: 'Better Performance',
              description: 'Bug fixes and performance improvements.',
              image: require('../../assets/images/auth/speed.png'),
            })}
          </View>

          <CustomButton
            GradientColors={[colors.primary, colors.primary]}
            TextValue="Update Now"
            OnPress={() => {
              // Linking.openURL(
              //   'https://play.google.com/store/apps/details?id=com.kalyanimotors.superapp',
              // );
            }}
            PressableStyle={styles.button}
            mainstyle={styles.buttonContainer}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our
            </Text>

            <Text style={styles.footerLink}>
              Terms of Service & Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const getStyles = (SizeConfig: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: SizeConfig.width * 5,
      backgroundColor: '#f9fafe',
    },

    content: {
      paddingHorizontal: SizeConfig.width * 2,
    },

    headerContainer: {
      gap: SizeConfig.height * 3,
      bottom: '-3%',
    },

    appTitle: {
      fontFamily: fonts.bold,
      fontSize: SizeConfig.fontSize * 2.7,
      color: colors.primary,
      letterSpacing: 4,
    },

    updateTitle: {
      fontFamily: fonts.bold,
      fontSize: SizeConfig.fontSize * 5,
      color: colors.text_Primary,
    },

    description: {
      fontFamily: fonts.medium,
      fontSize: SizeConfig.fontSize * 3,
      color: '#838792',
    },

    lottieView: {
      width: SizeConfig.width * 100,
      height: SizeConfig.height * 80,
    },

    featureCard: {
      padding: SizeConfig.width * 3,
      backgroundColor: colors.white,
      borderRadius: SizeConfig.width * 4,
      gap: SizeConfig.height * 5,
    },

    featureRow: {
      flexDirection: 'row',
      gap: SizeConfig.width * 5,
    },

    iconContainer: {
      width: SizeConfig.width * 10,
      height: SizeConfig.width * 10,
      borderRadius: SizeConfig.width * 5,
      backgroundColor: '#eaf1f9',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inappIcon: {
      width: SizeConfig.width * 18,
      height: SizeConfig.width * 18,
      resizeMode: 'contain',
    },
    featureIcon: {
      width: SizeConfig.width * 7,
      height: SizeConfig.width * 7,
      resizeMode: 'contain',
    },

    featureTitle: {
      fontFamily: fonts.bold,
      fontSize: SizeConfig.fontSize * 3,
      color: colors.text_Primary,
    },

    featureDescription: {
      fontFamily: fonts.medium,
      fontSize: SizeConfig.fontSize * 2.7,
      color: '#838792',
      width: SizeConfig.width * 60,
    },

    button: {
      width: SizeConfig.width * 80,
      paddingVertical: SizeConfig.width * 3,
    },

    buttonContainer: {
      borderRadius: SizeConfig.width * 2,
    },

    updateTextTitle: {
      fontFamily: fonts.semiBold,
      fontSize: SizeConfig.fontSize * 6,
      textAlign: 'center',
      marginTop: SizeConfig.width * 5,
      color: colors.text_Primary,
      width: SizeConfig.width * 80,
      alignSelf: 'center',
      lineHeight: SizeConfig.width * 6,
    },

    updateText: {
      fontFamily: fonts.medium,
      fontSize: SizeConfig.fontSize * 3.5,
      textAlign: 'center',
      marginTop: SizeConfig.width * 5,
      color: colors.text_Secondary,
      width: SizeConfig.width * 80,
      alignSelf: 'center',
      lineHeight: SizeConfig.width * 5,
    },

    updateBtn: {
      marginTop: SizeConfig.width * 8,
      borderRadius: SizeConfig.width * 3,
      paddingVertical: SizeConfig.width * 3,
      paddingHorizontal: SizeConfig.width * 10,
      backgroundColor: colors.primary,
      alignSelf: 'center',
    },

    updateBtnText: {
      fontSize: SizeConfig.fontSize * 4,
      color: colors.white,
      textAlign: 'center',
    },
    footerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    footerText: {
      fontFamily: fonts.semiBold,
      fontSize: SizeConfig.fontSize * 2.7,
      color: '#838792',
    },

    footerLink: {
      fontFamily: fonts.semiBold,
      fontSize: SizeConfig.fontSize * 2.8,
      color: colors.primary,
    },
  });
