import React from 'react'
import { View, Text, Image } from 'react-native'

const Error = () => {
    return (
        <View>
            <Image source={require('../assets/Images/error_Image.png')}/>
            <Text>Something Weird Happened</Text>
        </View>
    )
}

export default Error
