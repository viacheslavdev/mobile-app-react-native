import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { logout, setPin } from '@/redux/slices/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserIcon from '@/assets/images/pin-screen/user.svg'
import PhoneIcon from '@/assets/images/pin-screen/phone.svg'
import { RootState } from '@/redux/store';
import * as SecureStore from 'expo-secure-store'

type PinEntryScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'PinEntry'>;
};

const PinEntryScreen: React.FC<PinEntryScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const [pin, setPinState] = useState<string>('');
    const [confirmPin, setConfirmPin] = useState<string>('');
    const userState = useSelector((state: RootState) => state.auth.user);
    const [pinExists, setPinExists] = useState<boolean>(false);


    useEffect(() => {
        const pinAvailable = async () => {
            const storedPin = await SecureStore.getItemAsync('pin');
            if (storedPin) {
                setPinExists(true);
            }
        }
        pinAvailable();
    }, []);

    const handleKeyPress = (key: string) => {
        if (!pinExists) {
            if (pin.length < 4) {
                setPinState(pin + key);
            } else if (pin.length === 4 && confirmPin.length < 4) {
                setConfirmPin(confirmPin + key);
            }
        } else {
            if (pin.length < 4) {
                setPinState(pin + key);
            }
        }
    };

    const handleDeletePress = () => {
        if (!pinExists && pin.length === 4) {
            setConfirmPin(confirmPin.slice(0, -1));
        } else {
            setPinState(pin.slice(0, -1));
        }
    };

    const handleSubmit = async () => {
        if (!pinExists) {
            if (pin === confirmPin && pin.length === 4) {
                await SecureStore.setItemAsync('pin', pin);
                dispatch(setPin(pin));
                navigation.navigate('HomeTabs');
            } else {
                alert('PIN codes do not match');
            }
        } else {
            const storedPin = await SecureStore.getItemAsync('pin');
            if (storedPin === pin) {
                navigation.navigate('HomeTabs');
            } else {
                setPinState('')
                alert('Incorrect PIN');
            }
        }
    };

    const handleChangeAccount = async () => {
        dispatch(logout())
        await SecureStore.deleteItemAsync('pin')
        navigation.navigate('Auth')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pinStatus}>
                {pinExists ?
                    <>
                        <UserIcon />
                        <Text style={styles.email}>{userState?.email}</Text>
                        <TouchableOpacity style={styles.accountWrapper} onPress={handleChangeAccount}>
                            <Text style={styles.account}>Change Account</Text>
                        </TouchableOpacity>
                    </> :
                    <>
                        <PhoneIcon />
                        <Text style={styles.header}>{pinExists ? 'Enter your PIN' : `${pin.length === 4 ? 'Repeat' : 'Create'} a Pin code`}</Text>
                    </>
                }
                <Text style={styles.prompt}>Enter 4-digit code:</Text>
                <View style={styles.pinContainer}>
                    {[...Array(4)].map((_, index) => (
                        <View key={index} style={styles.pinCircle}>
                            {index + 1 <= (pinExists ? pin : pin.length < 4 ? pin : confirmPin).length ? (
                                <View style={styles.pinFilledCircle} />
                            ) : (
                                <View style={styles.pinUnfilledCircle} />
                            )}
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.keypadWrapper}>
                <View style={styles.keypad}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((key) => (
                        <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
                            <Text style={styles.keyText}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity style={styles.key} onPress={handleDeletePress}>
                        <Text style={styles.keyText}>⌫</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    pinStatus: {
        alignItems: 'center',
    },
    email: {
        marginVertical: 8,
        fontWeight: 'medium',
        lineHeight: 24,
        fontSize: 15,
        color: '#06070A'
    },
    accountWrapper: {
        marginBottom: 33
    },
    account: {
        fontSize: 15,
        color: '#FA8A34'
    },
    header: {
        fontSize: 15,
        color: '#06070A',
        lineHeight: 24,
        marginTop: 8,
        marginBottom: 38,
        fontWeight: 'medium'
    },
    prompt: {
        fontSize: 15,
        marginBottom: 25,
        color: '#606773'
    },
    pinContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '80%',
        marginBottom: 20,
    },
    pinCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinFilledCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FA8A34',
    },
    pinUnfilledCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#C1C4CB',
    },
    keypadWrapper: {
        alignItems: 'center',
        width: '100%'
    },
    keypad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 32,
        borderColor: '#EBEFF5',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    key: {
        width: '33.3%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    keyText: {
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 40
    },
    buttonWrapper: {
        width: '100%',
        paddingHorizontal: 16
    },
    submitButton: {
        width: '100%',
        marginTop: 15,
        paddingVertical: 12,
        backgroundColor: '#FA8A34',
        borderRadius: 16,
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 15,
        lineHeight: 24,
        fontWeight: 'medium'
    },
    arrow: {
        zIndex: 20,
    },
});

export default PinEntryScreen;
