// screens/AuthScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bitcoin from '../assets/images/log-page/bitcoin.svg'
import Comod from '../assets/images/log-page/comod.svg'
import Crypto from '../assets/images/log-page/crypto.svg'
import Estate from '../assets/images/log-page/estate.svg'
import Etfs from '../assets/images/log-page/etfs.svg'
import Lending from '../assets/images/log-page/lending.svg'
import Bg from '../assets/images/log-page/bg.svg'
import { RootStackParamList } from '@/types/RootStackParamList';
import {  useSelector } from 'react-redux'
import { RootState } from '@/redux/store';



type AuthScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Auth'>;
};

const items = [
    { image: Estate, text: 'Crowd real estate' },
    { image: Etfs, text: 'ETFs' },
    { image: Lending, text: 'Crowd lending' },
    { image: Comod, text: 'Commodities' },
    { image: Crypto, text: 'Crypto' },
]


const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
    const userState = useSelector((state: RootState) => state.auth.user)
    const pinState = useSelector((state: RootState) => state.auth.pin)
    
    useEffect(() => {
        if(userState) {
            navigation.navigate('PinEntry')
        }
    }, [])



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.itemsWrapper}>
                <View style={styles.firstColumn}>
                    <Bitcoin />
                    {items.slice(0, 2).map((item, index) => (
                        <View key={index} style={styles.boxSize}>
                            <item.image />
                            <Text>{item.text}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.secondColumn}>
                    {items.slice(2, 5).map((item, index) => (
                        <View key={index} style={styles.boxSize}>
                            <item.image style={styles.icon}/>
                            <Text>{item.text}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.buttonsWrapper}>
                <Pressable onPress={() => navigation.navigate('SignIn')} style={styles.signIn}>
                    <Text style={styles.signInText}>Sing In</Text>
                </Pressable>
                <Pressable  onPress={() => navigation.navigate('SignUp')}  style={styles.signUp}>
                    <Text style={styles.signUpText}>Sing Up</Text>
                </Pressable>
            </View>
            <Bg  style={styles.backGroundImage}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

        top: 0,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#F2F3F5'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    itemsWrapper: {
        gap: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    firstColumn: {
        alignItems: 'center',
        gap: 16,
        flex: 1
    },
    secondColumn: {
        height: '100%',
        alignItems: 'center',
        gap: 16,
        flex: 1,
        justifyContent: 'center'
    },
    boxSize: {
        width: '100%',
        height: 136,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#ffffff',
        borderRadius: 16
    },
    icon: {
        width: 104
    },
    text: {
        color: '606773'
    },
    buttonsWrapper: {
        marginHorizontal: 16
    },
    signUp: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 16,
        backgroundColor: '#FA8A34',
    },
    signUpText: {
        color: '#FFFFFF'
    },
    signIn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
    }, 
    signInText: {
        color: '#FA8A34'
    },
    backGroundImage: {
        position: 'absolute',
        bottom: 0,
        width: '110%',
        height: '100%',
        zIndex: -10,
    }
});

export default AuthScreen;
