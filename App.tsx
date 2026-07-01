import SplashScreen from './app/screens/auth/SplashScreen';
import { SizeConfigProvider } from './app/utils/SizeConfig';

function App() {
  return (
    <SizeConfigProvider>
      <SplashScreen />
    </SizeConfigProvider>
  );
}
export default App;
