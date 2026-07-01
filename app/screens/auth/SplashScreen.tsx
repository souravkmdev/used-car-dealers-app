import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSizeConfig } from '../../utils/SizeConfig';
import { Text } from '../../globalComponents/CustomText';
import { colors, fonts } from '../../utils/Theme';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const insets = useSafeAreaInsets();
  const size = useSizeConfig();
  const styles = style(size);

  return (
    <ImageBackground
      source={require('../../assets/images/auth/splash_img.png')}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/auth/logo.png')}
          style={styles.logo}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Dealer App</Text>

          <Text style={styles.subtitle}>Bid Smart. Win More.</Text>
        </View>
      </View>

      <View
        style={[
          styles.loaderContainer,
          { paddingBottom: insets.bottom + size.height * 10 },
        ]}
      >
        <LottieView
          source={require('../../assets/lottie/auth/loading_circle.json')}
          autoPlay
          loop
          speed={0.5}
          style={styles.lottie}
        />
        <Text style={styles.loadingText}>Loading experience...</Text>
      </View>
    </ImageBackground>
  );
};

const style = (size: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    contentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: size.height * 20,
      gap: size.height * 1.5,
    },
    logo: {
      width: size.width * 18,
      height: size.width * 18,
    },
    textContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: size.width * 5,
      color: colors.text_Primary,
      fontFamily: fonts.bold,
    },
    subtitle: {
      fontSize: size.width * 3.5,
      color: colors.text_Primary,
      fontFamily: fonts.light,
    },
    loaderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontSize: size.width * 3.5,
      color: colors.white,
      fontFamily: fonts.medium,
    },
    lottie: {
      width: size.width * 12,
      height: size.width * 12,
    },
  });

export default SplashScreen;
