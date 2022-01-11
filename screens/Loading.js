import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
const size = 100
const color = "#9d00ff"

const loading = () => {
    return (
        <View style={{
            width:size,
            height:size,
            borderRadius:size,
            backgroundColor:color,
            alignItems:'center',
            justifyContent:'center'
          }}>
            {[...Array(4).keys()].map((index)=>{
              return <MotiView 
                key={index}
                from={{scale:1, opacity:1}}
                animate={{scale:4, opacity:0}}
                transition={{
                  type:'timing',
                  duration:2000,
                  easing: Easing.out(Easing.ease),
                  delay:index*400,
                  loop:true,
                  repeatReverse:false
                }}
                
                style={[StyleSheet.absoluteFillObject, {
                  width:size, height:size, borderRadius:size, backgroundColor:color
                }]}
              />
            })}
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Loading</Text>
          </View>
    )
}

export default loading
