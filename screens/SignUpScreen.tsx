import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Bg from '../assets/images/log-page/bg.svg'
import GradientBg from '../assets/images/log-page/gradient-bg.svg'
import User from '../assets/images/sing-up-page/user.svg'
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/RootStackParamList';
import { setUser } from '@/redux/slices/authSlice';
import { fetchPosts } from '@/redux/slices/postsSlice';
import { AppDispatch } from '@/redux/store';

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>
}


const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    const { name, email } = data
    dispatch(setUser({name: name, email: email}))
    navigation.navigate('PinEntry')
    dispatch(fetchPosts())
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bgWrapper}>
        <Bg style={styles.backGroundImage} />
        {/* <GradientBg style={styles.gradient} /> */} 
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
                <Text style={styles.sign}>Sign up</Text>
                <Text style={styles.account}>Personal Account</Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Name"
                    />
                  </>
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.name && <Text style={styles.error}>Name is required.</Text>}

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      autoCapitalize="none"
                    />
                  </>
                )}
                name="email"
                rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                defaultValue=""
              />
              {errors.email && <Text style={styles.error}>Valid email is required.</Text>}

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
                rules={{
                  required: true,
                  minLength: 8,
                  maxLength: 64,
                  pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
                }}
                defaultValue=""
              />
              {errors.password && <Text style={styles.error}>Password requirements: 8-64 characters, uppercase, lowercase, digit, special character.</Text>}

            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitButtonText}>Continue</Text>
        </TouchableOpacity>
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
    fontSize: 16
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#FA8A34',
    paddingVertical: 12,
    borderRadius: 16,
    marginHorizontal: 16,
    bottom: 0,
    marginBottom: 16
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24
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
    opacity: 0.5
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16
  },
  sign: {
    color: '#06070A',
    fontWeight: '500',
    lineHeight: 25
  },
  account: {
    color: '#606773'
  },
  line: {
    backgroundColor: '#EBEFF5',
    width: '100%',
    height: 2,
    marginBottom: 3
  },
  inputWrapper: {
    padding: 16,
    marginBottom: 48
  },
  label: {
    marginLeft: 16,
    marginBottom: 8,
    color: '#606773',
    fontSize: 16,
    lineHeight: 24
  },
  arrow: {
    zIndex: 20,
    top: -42,
    position: 'absolute',
    left: 8
  }
});

export default RegisterScreen;
