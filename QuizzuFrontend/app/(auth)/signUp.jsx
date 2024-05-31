import { View, Text, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React from 'react';
import { images } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { signUp } from '../../config/api';


const SignUp = () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    userEmail: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignUp = async (values, { setSubmitting, setErrors,resetForm }) => {
    try {
      const response = await signUp(values);
      resetForm();
      router.replace("/signIn")
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
          <Text className="text-2xl font-psemibold mt-7">Sign Up</Text>

          <Formik
            initialValues={{ firstName: '', userEmail: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <>
                <FormField
                  title="First Name"
                  value={values.firstName}
                  handleChange={handleChange('firstName')}
                  handleBlur={handleBlur('firstName')}
                  placeholder="Enter your first name"
                  otherStyles="mt-7"
                  keyboardType="default"
                />
                {touched.firstName && errors.firstName && <Text className="text-red-500">{errors.firstName}</Text>}

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

                {errors.apiError && <Text className="text-red-500 mt-2">{errors.apiError}</Text>}

                {isSubmitting ? (
                  <View className="justify-center items-center mt-2">
                    <ActivityIndicator size="large" color="#5718BF" />
                  </View>
                ) : (
                  <CustomButton
                    name="Create Account"
                    onPress={handleSubmit}
                    isSubmitting={isSubmitting}
                    containerStyles="mt-7 bg-secondary"
                    textStyles="text-white"
                  />
                )}

                <View className="justify-center flex-row mt-6">
                  <Text className="text-base text-gray-600 font-pmedium">Already have an account? </Text>
                  <Link href="/signIn" className="text-base font-psemibold text-primary">Login</Link>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
