import React, {useRef} from 'react'
import { View, Text, Modal, Animated, TouchableOpacity, FlatList, ScrollView } from 'react-native'

// const data = [...Array(30)].map((_, index) => {
//     return {
//         name: `state ${index+1}`,
//         id: index+1,
//     }
// })
const ITEM_SIZE = 60;
const CustomPicker = ({isVisible, setVisible, data, setId, setValue }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{flex:1}}
          >
            
            <View
              style={{
                backgroundColor:'#fffdf7',
                position:'absolute',
                bottom:0,
                height:'55%',
                width:'100%',
                elevation:15,
                borderTopWidth:2,
                borderColor:'#f2f2f2',
                borderTopRightRadius:20,
                borderTopLeftRadius:20
              }}
            >
              <TouchableOpacity
                style={{width:'100%', alignItems:'center', justifyContent:'center', height:'10%',}}
                onPress={()=>setVisible(!isVisible)}
              >
                <View style={{width:'20%', height:'20%', borderRadius:20, backgroundColor:'black'}}/>
              </TouchableOpacity>
              
                <Animated.FlatList
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset:{y: scrollY}}}],
                        {useNativeDriver: true}
                    )}
                    data={data}
                    keyExtractor={item=>item.id}
                    contentContainerStyle={{padding:20, paddingTop:10}}
                    renderItem={({item, index})=>{
                        const inputRange = [-1, 0, ITEM_SIZE*index, ITEM_SIZE*(index+2) ]

                        const scale = scrollY.interpolate({inputRange,outputRange: [1, 1, 1, 0]})
                        return <Animated.View style={{
                            backgroundColor:'#f7f7f7',
                            elevation:2 , 
                            width:'100%', 
                            marginBottom:10, 
                            height:50,
                            borderRadius:15,
                            transform: [{scale}]
                            }}>
                            <TouchableOpacity style={{width:'100%', height:'100%', 
                            justifyContent:'center',
                            alignItems:'center', }}
                            onPress={()=> {
                              setValue(item.name)
                              setId(item.id)
                              setVisible(!isVisible)
                            }}
                            >
                                <Text style={{fontSize:20, fontFamily:'Poppins-Regular'}}>{item.name}</Text>
                            </TouchableOpacity>
                            </Animated.View>
                    }}
                />

                
            </View>
          

          </View>

        </Modal>
    )
}

export default CustomPicker
