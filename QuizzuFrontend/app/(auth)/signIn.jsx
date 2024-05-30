import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../config/api';
import { AuthContext } from '../../context/GlobalContext';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignIn = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      const response = await signIn(values);
      setIsLoggedIn(true);
      setUser({token: response.accessToken});
      resetForm();
      router.replace("/home");
    } catch (error) {
      setErrors({ apiError: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-6 my-7">
          <View className="flex-row w-full gap-2 items-center">
            <Image source={images.logo} className="w-[40px] h-[52px]" />
            <Text className="font-psemibold text-4xl">Quizzu</Text>
          </View>
          <Text className="text-2xl font-psemibold mt-7">Login</Text>

          <Formik
            initialValues={{ userEmail: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <>
                <FormField
                  title="Email"
                  value={values.userEmail}
                  handleChange={handleChange('userEmail')}
                  handleBlur={handleBlur('userEmail')}
                  placeholder="Enter your email"
                  otherStyles="mt-7"
                  keyboardType="email-address"
                />
                {touched.userEmail && errors.userEmail && <Text className="text-red-500">{errors.userEmail}</Text>}

                <FormField
                  title="Password"
                  value={values.password}
                  handleChange={handleChange('password')}
                  handleBlur={handleBlur('password')}
                  placeholder="Enter your password"
                  otherStyles="mt-7"
                  secureTextEntry
                />
                {touched.password && errors.password && <Text className="text-red-500">{errors.password}</Text>}

                {errors.apiError && <Text className="text-red-500">{errors.apiError}</Text>}

                {isSubmitting ? (
                  <View className="justify-center items-center mt-2">
                    <ActivityIndicator size="large" color="#5718BF" />
                  </View>
                ) : (
                  <CustomButton
                    name="Login"
                    onPress={handleSubmit}
                    isSubmitting={isSubmitting}
                    containerStyles="mt-7 bg-secondary"
                    textStyles="text-white"
                  />
                )}

                <View className="justify-center flex-row mt-6">
                  <Text className="text-base text-gray-600 font-pmedium">Don't have an account? </Text>
                  <Link href="/signUp" className="text-base font-psemibold text-primary">Sign Up</Link>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
