import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import Logout from '@/assets/images/profile/logout.svg'
import Language from '@/assets/images/profile/language.svg'
import User from '@/assets/images/profile/user.svg'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';
import * as SecureStore from 'expo-secure-store'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'TabProfile'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {

  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout())
    await SecureStore.deleteItemAsync('pin')
    navigation.navigate('Auth')
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Settings</Text>
        <TouchableOpacity style={styles.buttonWrapper}>
          <View style={styles.icons}>
            <User />
            <Text style={styles.submitButtonText}>{user?.name} {user?.secondName}</Text>
          </View>
          <AntDesign name='right' size={24} color='#C1C4CB' />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.label}>Basic</Text>
        <TouchableOpacity style={styles.buttonWrapper}>
          <View style={styles.icons}>
            <Language />
            <Text style={styles.submitButtonText}>Language</Text>
          </View>
          <AntDesign name='right' size={24} color='#C1C4CB' />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.label}>Other</Text>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogout}>
          <View style={styles.icons}>
            <Logout />
            <Text style={styles.submitButtonText}>Log out</Text>
          </View>
          <AntDesign name='right' size={24} color='#C1C4CB' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 16
  },
  text: {
    fontSize: 20,
  },
  header: {
    fontSize: 22,
    lineHeight: 32,
    fontWeight: 'semibold'
  },
  label: {
    color: '#606773',
    fontSize: 15
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    padding: 16,
    borderRadius: 16,
    borderColor: '#CED5E0',
    borderWidth: 1,
    marginBottom: 32
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: 'medium',
    lineHeight: 24,
    color: '#06070A'
  },
  icons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  }

});

export default ProfileScreen