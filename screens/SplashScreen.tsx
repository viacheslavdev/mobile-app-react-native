// SplashScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import SplashIcon from 'assets/images/splash-icon.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {RootStackParamList} from '../types/RootStackParamList'

type SplashScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};


const SplashScreenComponent: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });


    useEffect(() => {

        const timer = setTimeout(() => {
            SplashScreen.hideAsync().catch((error) => {
                console.warn(error);
            });
            navigation.navigate('Auth')
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <SplashIcon style={styles.image} />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 178,
        height: 178
    }
});

export default SplashScreenComponent;
