import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({name,containerStyles,onPress,isSubmitting,textStyles}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        className={`${containerStyles} w-full h-16 bg-secondary rounded-xl
           justify-center items-center ${isSubmitting ? 'opacity-50' : ''}
        `} 
        disabled={isSubmitting}
    >
      <Text className={`${textStyles} text-white font-psemibold text-lg `}>{name}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton