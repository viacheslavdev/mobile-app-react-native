import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Bg from '../assets/images/log-page/bg.svg';
import User from '../assets/images/sing-up-page/user.svg';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { setToken, setUser } from '@/redux/slices/authSlice';
import { fetchPosts } from '@/redux/slices/postsSlice';
import { AppDispatch } from '@/redux/store';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignIn'>
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, formState: { errors } } = useForm();



  const handleLogin = async (data: any) => {
    try {

      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: data.username,
        password: data.password,
      });


      if (response.status === 200) {
        
        const { token } = response.data;
        dispatch(setToken(token));
        dispatch(setUser({ name: response.data.username, email: response.data.email, secondName: response.data.lastName }));
        
        dispatch(fetchPosts())

        navigation.navigate('PinEntry')
      } else {
        Alert.alert('Login Failed', 'Please try again later.');
      }
    } catch (error: any) {
        if (error.response) {
            console.error('Login Error:', error.response.data);
            Alert.alert('Login Error', error.response.data.message || 'Please try again later.');
          } else {
            console.error('Login Error:', error.message);
            Alert.alert('Login Error', 'Please try again later.');
          }
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgWrapper}>
        <Bg style={styles.backGroundImage} />
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formWrapper}>
            <AntDesign name="left" size={24} color="#06070A" style={styles.arrow} onPress={() => navigation.navigate('Auth')} />
            <View style={styles.headerWrapper}>
              <User />
              <View>
                <Text style={styles.sign}>Login</Text>
                <Text style={styles.account}>Personal Account</Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Username"
                      autoCapitalize="none"
                    />
                  </>
                )}
                name="username"
                defaultValue=""
              />
              {errors.username && <Text style={styles.error}>Valid username is required.</Text>}

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Password"
                      secureTextEntry
                    />
                  </>
                )}
                name="password"
                defaultValue=""
              />
              {errors.password && <Text style={styles.error}>Password is required.</Text>}

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(handleLogin)}>
                <Text style={styles.submitButtonText}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpButtonText}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formWrapper: {
    height: '100%',
    top: 68,
    backgroundColor: '#FFFFFF',
    borderRadius: 27,
  },
  input: {
    width: '100%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 21,
    paddingHorizontal: 16,
    marginBottom: 10,
    color: 'black',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FA8A34',
    paddingVertical: 12,
    borderRadius: 16,
    bottom: 0,
    width: '100%',
  },
  signUpButton: {
    paddingVertical: 12,
    width: '100%',
  },
  signUpButtonText: {
    color: '#FA8A34',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  backGroundImage: {
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  bgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
  },
  sign: {
    color: '#06070A',
    fontWeight: '500',
    lineHeight: 25,
  },
  account: {
    color: '#606773',
  },
  line: {
    backgroundColor: '#EBEFF5',
    width: '100%',
    height: 2,
    marginBottom: 3,
  },
  inputWrapper: {
    padding: 16,
    marginBottom: 48,
  },
  label: {
    marginLeft: 16,
    marginBottom: 8,
    color: '#606773',
    fontSize: 16,
    lineHeight: 24,
  },
  arrow: {
    zIndex: 20,
    top: -42,
    position: 'absolute',
    left: 8,
  },
});

export default LoginScreen;
