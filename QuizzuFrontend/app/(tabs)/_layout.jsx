import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Redirect, Tabs } from 'expo-router'
import {icons} from '../../constants'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../../context/GlobalContext'
const TabIcon = ({icon,color,name,focused}) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode='contain'
                className="w-6 h-6"
                tintColor={color}
            />
            <Text className={`${focused  ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}
const TabLayout = () => {
  return (
    <>
        <Tabs 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#2C0B6A",
                tabBarInactiveTintColor: "#7C72E5",
                tabBarStyle:{
                    backgroundColor: "#ECE8FF",
                    borderTopWidth: 1,
                    height: 75,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    animation: 'fade',
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />     
                    ),
                }}
            />
            <Tabs.Screen
                name="quiz"
                options={{
                    title: "Quiz",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.search}
                            color={color}
                            name="Quiz"
                            focused={focused}
                        />
                    )
                }}
            />
            {/* <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <TabIcon
                            icon={icons.history}
                            color={color}
                            name="History"
                            focused={focused}
                        />
                    )
                }}
            /> */}
        </Tabs>
        <StatusBar backgroundColor='#7C72E5' style='light'/>
    </>
  )
}

export default TabLayout