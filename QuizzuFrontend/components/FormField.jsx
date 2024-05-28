import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const FormField = ({ title, value, handleChange, handleBlur, placeholder, keyboardType, otherStyles, secureTextEntry, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-600 font-pmedium">{title}</Text>
      <View className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl h-16 px-4 items-center focus:border-secondary flex-row">
        <TextInput
          className="text-base flex-1"
          value={value}
          onChangeText={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          keyboardType={keyboardType}
          cursorColor="#5718BF"
          secureTextEntry={secureTextEntry && !showPassword}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={25}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
