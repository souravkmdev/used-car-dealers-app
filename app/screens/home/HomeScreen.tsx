import React from 'react';
import {
  SafeAreaView,
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
import { useSizeConfig } from '../../utils/SizeConfig';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { Config } from '../../config';

const HomeScreen = () => {
  const size = useSizeConfig();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  // Get active credentials from Redux state
  const { user } = useAppSelector((state) => state.auth);
  const dealerName = user?.full_name || user?.username || 'Dealer Partner';

  const handleLogout = async () => {
    try {
      // Clear token and user from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      // Dispatch logout action to reset Redux store
      dispatch(logout());

      // Reset navigation stack to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const mockCars = [
    {
      id: '1',
      title: '2022 Maruti Suzuki Swift VXI',
      regNumber: 'KA-03-MP-4321',
      kms: '24,500 km',
      fuel: 'Petrol',
      transmission: 'Manual',
      myBid: '₹5,85,000',
      highestBid: '₹6,12,000',
      status: 'Outbid',
      statusColor: '#EF4444',
      timeLeft: '14m left',
    },
    {
      id: '2',
      title: '2020 Hyundai Creta 1.5 SX',
      regNumber: 'KA-51-ND-8899',
      kms: '41,200 km',
      fuel: 'Diesel',
      transmission: 'Automatic',
      myBid: '₹12,40,000',
      highestBid: '₹12,40,000',
      status: 'Winning',
      statusColor: '#10B981',
      timeLeft: '42m left',
    },
    {
      id: '3',
      title: '2021 Honda City V MT',
      regNumber: 'KA-04-KB-1122',
      kms: '32,100 km',
      fuel: 'Petrol',
      transmission: 'Manual',
      myBid: '₹9,10,000',
      highestBid: '₹9,35,000',
      status: 'Outbid',
      statusColor: '#EF4444',
      timeLeft: '1h 05m left',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1432" />

      {/* Header Linear Gradient */}
      <LinearGradient
        colors={['#0A1432', colors.primary]}
        style={[styles.header, { paddingTop: size.width * 12, paddingBottom: size.width * 6 }]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.dealerNameText}>{dealerName}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{Config.ENV_NAME}</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutIconButton}>
              <Feather name="log-out" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Short Dashboard Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statCount}>12</Text>
            <Text style={styles.statLabel}>Active Bids</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statCount}>05</Text>
            <Text style={styles.statLabel}>Won Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statCount}>₹24.8L</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Body */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: size.width * 10 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Car Auctions</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="chevron-right" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {mockCars.map((car) => (
          <View key={car.id} style={styles.carCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.carTitle}>{car.title}</Text>
                <Text style={styles.carReg}>{car.regNumber}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: car.statusColor + '15' }]}>
                <Text style={[styles.statusText, { color: car.statusColor }]}>{car.status}</Text>
              </View>
            </View>

            <View style={styles.carSpecs}>
              <Text style={styles.specItem}><Feather name="activity" size={12} /> {car.kms}</Text>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specItem}><Feather name="droplet" size={12} /> {car.fuel}</Text>
              <Text style={styles.specDivider}>•</Text>
              <Text style={styles.specItem}><Feather name="sliders" size={12} /> {car.transmission}</Text>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.bidDetails}>
              <View>
                <Text style={styles.bidLabel}>My Bid</Text>
                <Text style={styles.bidValue}>{car.myBid}</Text>
              </View>
              <View>
                <Text style={styles.bidLabel}>Highest Bid</Text>
                <Text style={[styles.bidValue, { color: '#0F172A' }]}>{car.highestBid}</Text>
              </View>
              <View style={styles.timeLeftContainer}>
                <Feather name="clock" size={12} color="#EF4444" style={{ marginRight: 4 }} />
                <Text style={styles.timeLeftText}>{car.timeLeft}</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity activeOpacity={0.8} onPress={handleLogout} style={styles.logoutButton}>
          <LinearGradient
            colors={['#EF4444', '#DC2626']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutGradient}
          >
            <Feather name="log-out" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.logoutBtnText}>Secure Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 13,
    color: '#94A3B8',
    fontFamily: fonts.medium,
  },
  dealerNameText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: fonts.bold,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
    textTransform: 'uppercase',
  },
  logoutIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: '#94A3B8',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: '80%',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#0F172A',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.primary,
    marginRight: 2,
  },
  carCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  carTitle: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: '#0F172A',
  },
  carReg: {
    fontSize: 11,
    fontFamily: fonts.medium,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
  },
  carSpecs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  specItem: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: '#64748B',
  },
  specDivider: {
    marginHorizontal: 8,
    color: '#CBD5E1',
    fontSize: 10,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  bidDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidLabel: {
    fontSize: 10,
    fontFamily: fonts.medium,
    color: '#94A3B8',
    textTransform: 'uppercase',
  },
  bidValue: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginTop: 2,
  },
  timeLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeLeftText: {
    fontSize: 11,
    fontFamily: fonts.semiBold,
    color: '#EF4444',
  },
  logoutButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoutGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: fonts.bold,
  },
});
