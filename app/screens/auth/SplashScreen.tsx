import { Image, ImageBackground, View } from 'react-native';
import { useSizeConfig } from '../../utils/SizeConfig';
import { Text } from '../../globalComponents/CustomText';
import { colors, fonts } from '../../utils/Theme';

const SplashScreen = () => {
  const size = useSizeConfig();
  return (
    <ImageBackground
      source={require('../../assets/images/auth/splash_img.png')}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor : 'red'
        }}
      >
        <Image
          source={require('../../assets/images/auth/logo.png')}
          style={{
            width: size.width * 20,
            height: size.width * 20,
          }}
        />
        <Text
          style={{
            fontSize: size.width * 5,
            color: colors.text_Primary,
            fontFamily: fonts.bold,
          }}
        >
          Dealer App
        </Text>
        <Text
          style={{
            fontSize: size.width * 3.5,
            color: colors.text_Primary,
            fontFamily: fonts.medium,
          }}
        >
          Bid Smart. Win More.
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
