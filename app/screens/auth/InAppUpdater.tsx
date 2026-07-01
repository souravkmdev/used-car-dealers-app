import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  BackHandler,
  ActivityIndicator,
  NativeModules,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNFS, {
  DownloadBeginCallbackResult,
  DownloadProgressCallbackResult,
} from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSizeConfig } from '../../utils/SizeConfig';
import { Text } from '../../globalComponents/CustomText';
import { colors, fonts } from '../../utils/Theme';
const { SharedLocalStore } = NativeModules;

export default function InAppUpdater() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const SizeConfig = useSizeConfig();
  const styles = getStyles(SizeConfig);

  const downloadAndInstallAPK = async () => {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/app-update.apk`;

      setIsDownloading(true);

      const options = {
        fromUrl:
          'https://www.kalyanimotor.kalyanicrm.com/paymentcollection.apk',
        toFile: downloadDest,
        begin: (res: DownloadBeginCallbackResult) => {
          console.log(`Going to download ${res.contentLength} bytes!`);
        },
        progress: (res: DownloadProgressCallbackResult) => {
          setProgress(res.bytesWritten / res.contentLength);
        },
      };

      const ret = await RNFS.downloadFile(options).promise;
      setIsDownloading(false);

      const pathsToDelete = [
        `${RNFS.DocumentDirectoryPath}/current_bundle`,
        `${RNFS.DocumentDirectoryPath}/temp_bundle`,
        `${RNFS.DocumentDirectoryPath}/backup_bundle`,
        `${RNFS.DocumentDirectoryPath}/unzipped`,
      ];

      for (const path of pathsToDelete) {
        const exists = await RNFS.exists(path);
        if (exists) {
          await RNFS.unlink(path);
        }
      }

      await SharedLocalStore.set('active_ota_bundle_hash', '');

      await SharedLocalStore.set('backup_ota_bundle_hash', '');

      await Promise.all([
        AsyncStorage.removeItem('ota_bundle_version'),
        AsyncStorage.removeItem('pendingUpdate'),
        AsyncStorage.removeItem('update_count'),
      ]);

      try {
        if (Platform.OS === 'android') {
          await FileViewer.open(downloadDest, { showOpenWithDialog: false });
        } else {
          // ShowError('Unsupported Updates are only supported on Android.');
        }
        BackHandler.exitApp();
      } catch (err) {
        console.error('Error opening APK', err);
        // ShowError('Install Error Failed to open installer.');
      }
    } catch (error: any) {
      console.error('Download failed', error);
      // ShowError(`Download Failed  ${error.message}`);
      setIsDownloading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/updater.jpg')}
          style={styles.lottieView}
        />
        <Text style={styles.updateTextTitle}>New Update Available</Text>
        <Text style={styles.updateText}>
          We've implemented some exciting new features to make your app
          experience even better!
        </Text>

        {isDownloading ? (
          <View style={{ marginTop: SizeConfig.width * 1 }}>
            {/* <ActivityIndicator size="large" /> */}
            <Text style={[{ marginTop: 10 }, styles.updateText]}>
              {Math.round(progress * 100)}% downloaded
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={downloadAndInstallAPK}
          >
            <Text style={styles.updateBtnText}>Update Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const getStyles = (SizeConfig: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: SizeConfig.width * 5,
      backgroundColor: colors.white,
    },
    content: {
      alignItems: 'center',
      paddingHorizontal: SizeConfig.width * 5,
    },
    lottieView: {
      width: SizeConfig.width * 100,
      height: SizeConfig.width * 80,
      alignSelf: 'center',
      marginBottom: SizeConfig.width * 5,
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
  });
