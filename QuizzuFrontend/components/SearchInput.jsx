import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../constants';

const SearchInput = ({ title, value, handleChange, handleBlur, placeholder, keyboardType, otherStyles, secureTextEntry, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <View className={`${otherStyles} w-full  border-2 border-gray-300 rounded-xl h-16 px-4 items-center focus:border-secondary flex-row`}>
        <TextInput
          className="text-base flex-1"
          value={value}
          onChangeText={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor="#2C0B6A"
          keyboardType={keyboardType}
          cursorColor="#5718BF"
          secureTextEntry={secureTextEntry && !showPassword}
        />
       <TouchableOpacity>
            <Image 
                source={icons.search}
                className="w-[20] h-[20] "
                tintColor="#2C0B6A"
            />
       </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
