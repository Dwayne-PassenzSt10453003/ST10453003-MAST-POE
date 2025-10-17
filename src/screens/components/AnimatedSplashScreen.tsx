import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';


type Props = {
    onAnimationFinish: () => void;
};

export default function AnimatedSplashScreen({ onAnimationFinish }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log("Splash mounted");
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.delay(1500),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onAnimationFinish();
        });
    }, [fadeAnim, onAnimationFinish]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image source={require('../../../assets/Steak_On_Plate.png')} style={styles.logo} resizeMode="contain" />
            </Animated.View>
            <Animated.Text style={[styles.poweredBy, { opacity: fadeAnim }]}>POWERED BY</Animated.Text>
            <Animated.Text style={[styles.corporation, { opacity: fadeAnim }]}>D.P.J CORPORATIONS</Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5B638A',
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 200,
    },
    poweredBy: {
        position: 'absolute',
        bottom: 80,
        color: '#fff',
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
    corporation: {
        position: 'absolute',
        bottom: 60,
        color: '#fff',
        fontSize: 16,
        letterSpacing: 2,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
});