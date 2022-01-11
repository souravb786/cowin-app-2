import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
const Header = () => {
    return (
        <View style={styles.container}>
            <MaterialIcons name="coronavirus" size={24} color="green" style={{marginHorizontal:5}} />
            <Text style={styles.title}>Cowin2.0</Text>
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        
    },
    title: {
        fontSize:24,
        fontWeight:'700',
        color:'orange',
        marginHorizontal:5
    }
})