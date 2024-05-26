import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({name,containerStyles,onPress,isLoading,textStyles}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        className={`${containerStyles} w-full h-16 bg-secondary rounded-xl
           justify-center items-center ${isLoading ? 'opacity-50' : ''}
        `} 
        disabled={isLoading}
    >
      <Text className={`${textStyles} text-white font-psemibold text-lg `}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton