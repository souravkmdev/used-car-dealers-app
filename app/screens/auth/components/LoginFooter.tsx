import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils/Theme';
import { useSizeConfig } from '../../../utils/SizeConfig';

const LoginFooter: React.FC = () => {
    const size = useSizeConfig();
    const styles = getStyles(size)
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>By continuing, you agree to our </Text>
            <View style={styles.footerLinks}>
                <TouchableOpacity>
                    <Text style={styles.footerLink}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.footerText}> & </Text>
                <TouchableOpacity>
                    <Text style={styles.footerLink}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default LoginFooter;

const getStyles = (size: any) => StyleSheet.create({
    footer: {
        alignItems: 'center',
        marginTop: size.width * 4.8,
    },
    footerText: {
        fontSize: size.width * 3,
        fontFamily: fonts.regular,
        color: '#94A3B8',
    },
    footerLinks: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: size.width * 0.4,
    },
    footerLink: {
        fontSize: size.width * 3,
        fontFamily: fonts.semiBold,
        color: colors.primary,
    },
});
