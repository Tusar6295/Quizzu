import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../constants';

const SearchInput = ({value, onChangeText, onSearch, isLoading,otherStyles }) => {
  return (
      <View className={`bg-secondary-100 w-full  border-2 border-gray-300 rounded-xl h-16 px-4 items-center focus:border-secondary flex-row`}>
        <TextInput
          className="text-base flex-1"
          placeholder="Search for a category"
          placeholderTextColor="#2C0B6A"
          cursorColor="#5718BF"
          value={value}
          onChangeText={onChangeText}
        />
       <TouchableOpacity
        onPress={onSearch}
        disabled={isLoading}
       >
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
