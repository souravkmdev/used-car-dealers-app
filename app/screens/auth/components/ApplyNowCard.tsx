import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../../utils/Theme';
import { useSizeConfig } from '../../../utils/SizeConfig';

const ApplyNowCard: React.FC = () => {
    const size = useSizeConfig();
    const styles = getStyles(size);
    return (
        <>
            <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
            </View>

            <LinearGradient
                colors={['#EFF6FF', '#DBEAFE']}
                style={styles.applyCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.applyIconCircle}>
                    <MaterialCommunityIcons name="car-key" size={20} color="#FFFFFF" />
                </View>

                <View style={styles.applyTextCol}>
                    <Text style={styles.applyTitle}>New to Kalyani Motors?</Text>
                    <Text style={styles.applySubtitle}>
                        Apply for dealer membership and get verified.
                    </Text>
                </View>

                <TouchableOpacity style={styles.applyBtn} activeOpacity={0.82}>
                    <Text style={styles.applyBtnText}>Apply</Text>
                    <Feather name="arrow-right" size={13} color={colors.primary} />
                </TouchableOpacity>
            </LinearGradient>
        </>
    )
};

export default ApplyNowCard;

const getStyles = (size: any) => StyleSheet.create({
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: size.width * 4.1,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    dividerText: {
        marginHorizontal: size.width * 1.4,
        fontSize: size.width * 1.2,
        fontFamily: fonts.semiBold,
        color: '#94A3B8',
        letterSpacing: 1,
    },
    applyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: size.width * 1.8,
        padding: size.width * 1.6,
        borderWidth: 1,
        borderColor: '#BFDBFE',
        gap: size.width * 1.2,
    },
    applyIconCircle: {
        width: size.width * 10,
        height: size.width * 10,
        borderRadius: size.width * 5,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyTextCol: {
        flex: 1,
    },
    applyTitle: {
        fontSize: size.width * 3.2,
        fontFamily: fonts.bold,
        color: '#0F172A',
        marginBottom: size.width * 1,
    },
    applySubtitle: {
        fontSize: size.width * 2.6,
        fontFamily: fonts.regular,
        color: '#64748B',
        lineHeight: size.width * 2,
    },
    applyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: size.width * 4.1,
        paddingHorizontal: size.width * 2.9,
        paddingVertical: 9,
        gap: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    applyBtnText: {
        fontSize: size.width * 2.5,
        fontFamily: fonts.bold,
        color: colors.primary,
    },
});
