import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({name,containerStyles,onPress,isSubmitting,textStyles}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        className={`w-full h-16 rounded-xl justify-center items-center 
        ${isSubmitting ? 'opacity-50' : ''} ${containerStyles} 
        `} 
        disabled={isSubmitting}
    >
      <Text className={`font-psemibold text-lg ${textStyles} `}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton