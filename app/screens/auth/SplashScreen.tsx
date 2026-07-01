import { Image, ImageBackground, View } from 'react-native';
import { useSizeConfig } from '../../utils/SizeConfig';

const SplashScreen = () => {
  const size = useSizeConfig();
  return (
    <ImageBackground
      source={require('../../assets/images/auth/splash_img.png')}
      style={{
        flex: 1,
      }}
    >
      <View>
        <Image
          source={require('../../assets/images/auth/logo.png')}
          style={{
            width: size.width * 20,
            height: size.width * 20,
          }}
        />
        
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;
