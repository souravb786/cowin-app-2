import React, {useState, useEffect, useRef} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=512&date=13-01-2022"
const date = new Date()
const url2 = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${512}&date=${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getFullYear()}`
const spacing = 20

const {width, height} = Dimensions.get('window')
const ITEM_SIZE = height*0.2 + spacing/1.5
const Slots = ({route, navigation}) => {
    const {districtId} = route.params
    const scrollY = useRef(new Animated.Value(0)).current;
    const [slots, setSlots] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getSlots = async()=> {
            const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date.getUTCDate()}-${date.getUTCMonth()+1}-${date.getFullYear()}`)
            console.log(`response status in slots ${response.status}`)
            if(response.status===200)
            {   
                const data = (await response.json()).sessions
                setSlots(data.map((item, index)=>{
                    return {
                        id:item.center_id,
                        name: item.name,
                        address: item.address,
                        pincode: item.pincode,
                        dose1: item.available_capacity_dose1,
                        dose2: item.available_capacity_dose2,
                        fee_type:item.fee_type,
                        fee: item.fee,
                        vaccine: item.vaccine,
                        all_age: item.allow_all_age,
                        min_age: item.min_age_limit,
                        max_age: (item.allow_all_age? 60: item.max_age_limit),
                    }
                }))
            }
        }    
        getSlots()
        setLoading(false)
        
    }, [])
    return (
        <View style={{backgroundColor:'white', flex:1}}>
            {loading? <Text>Loading</Text>:
            
            <Animated.FlatList 
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset:{y: scrollY}}}],
                    {useNativeDriver: true}
                )}
                data={slots}
                keyExtractor={(item, index)=>index}
                contentContainerStyle={{paddingHorizontal:spacing/2, paddingTop:20}}
                renderItem={({item, index})=>{
                    const inputRange = [
                        -1, 
                        0, 
                        ITEM_SIZE*index, 
                        ITEM_SIZE*(index+2)
                    ]
                    const opacityInputRange = [
                        -1, 0, ITEM_SIZE*index, ITEM_SIZE*(index+1)
                    ]
                    const scale = scrollY.interpolate({inputRange,outputRange: [1, 1, 1, 0]})
                    const opacity = scrollY.interpolate({inputRange:opacityInputRange, outputRange:[1,1,1,0]})
                    return (
                    <Animated.View style={[styles.detail_card, {transform:[{scale}], opacity}]}>
                        <View style={{flexDirection:'row', height:height*0.1}}>
                            {/* center info */}
                            <View style={{flex:0.7}}>
                                <Text style={{fontSize:12, fontFamily:'Poppins-Medium'}}>{item.name}</Text>
                                <Text style={{
                                    fontSize:12, 
                                    fontFamily:'Poppins-Regular', 
                                    opacity:0.8}}
                                    numberOfLines={1}
                                >{item.address}</Text>
                            </View>

                            {/* vaccine info */}
                            <View style={{flex:0.3}}>
                                <Text style={{fontSize:14, fontFamily:'Poppins-Medium', textAlign:'center',marginLeft:spacing/2}}>{item.vaccine}</Text>
                                <Text style={{
                                    fontSize:14, 
                                    color:'white', 
                                    backgroundColor:((item.fee==0)?'#4BB543':"#1974D2"),
                                    borderRadius:5, 
                                    fontFamily:'Poppins-Medium', 
                                    opacity:0.8, textAlign:'center',marginLeft:spacing/2}}>
                                    {(item.fee==0)?item.fee_type:`Rs. ${item.fee}`}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <View style={{flexDirection:'row', alignItems:'center', flex:0.4}}>
                                <Text style={[{color:'#1974D2'}, styles.footerText]}>Age: </Text>
                                <Text style={[styles.footerText, 
                                    {color:'white', 
                                    backgroundColor:'#1974D2', 
                                    paddingHorizontal:spacing/2, 
                                    borderRadius:5}]}
                                >
                                    {(item.all_age)?"All":`${item.min_age} to ${item.max_age}`}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row', flex:0.3}}>
                                <Text style={styles.footerText}>Dose1: </Text>
                                <Text style={[styles.footerText, {color:((item.dose1>=100)?'green':'red')}]}>{item.dose1}</Text>
                            </View>
                            <View style={{flexDirection:'row', flex:0.3, alignItems:'center'}}>
                                <Text style={styles.footerText}>Dose2: </Text>
                                <Text style={[styles.footerText, {color:((item.dose2>=100)?'green':'red')}]}>{item.dose2}</Text>
                            </View>
                        </View>
                    </Animated.View>)
                }}
            />
            }
        </View>
    )
}

export default Slots
const styles = StyleSheet.create({
    detail_card: {
        width: '100%',
        padding:spacing,
        paddingHorizontal: spacing/2,
        backgroundColor:'white',
        marginBottom:spacing,
        borderRadius:20,
        elevation:5
    },
    footerText : {
        fontSize:12, 
        fontFamily:'Poppins-Medium'
    }
})