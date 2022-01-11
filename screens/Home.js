import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native'
import * as eva from '@eva-design/eva'
import { Layout, Select, SelectItem, ApplicationProvider } from '@ui-kitten/components'
import Header from './Header'
import { Picker } from '@react-native-picker/picker'
const {width, height} = Dimensions.get('window')
console.log(`width: ${width}`)
console.log(`height: ${height}`)
const Home = ({states, navigation}) => {
    const [districts, setDistricts] = useState([])
    const [selectedStateId, setSelectedStateId] = useState(-1);
    const [selectedState, setSelectedState] = useState("Select State");
    const [selectedIndex, setSelectedIndex] = React.useState();
    // console.log(states)
    useEffect(()=> {
      const getDistrict = async () => {
        if(selectedStateId > 0)
        {
          const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`)
          if(response.status===200)
          {
            const data = await response.json()
            setDistricts(data.districts);
          }
        }
      }
      getDistrict();
    }, [selectedStateId])
    const NavigateToSlots = () => {
      navigation.navigate("Slots");
    }
    const handleStateChange = (rowNo) => {
      setSelectedStateId(states[rowNo-1].state_id);
      setSelectedState(states[rowNo-1].state_name);
    }
    return (
      <SafeAreaView style={{height:'100%', backgroundColor:'white'}}>
        <StatusBar style='inverted'/>
        <View style={{width:'100%'}}>
          <Image source={{uri:"https://scx2.b-cdn.net/gfx/news/hires/2020/12-covid19vacci.jpg"}} 
            style={{width:200, height:200, marginHorizontal:((width-200)/2)}}
            />
          <Text style={{
            fontSize:30, fontFamily:'Poppins-Medium',
            marginLeft:20,
            letterSpacing:1
            }}>
            Find Slots</Text>
        </View>
        <View style={
          { position:'absolute', bottom:20, width:'100%', alignItems:'center', justifyContent:'center'}
        }>
          <TouchableOpacity
            onPress={()=>{
              setTimeout(NavigateToSlots, 2000)
              clearTimeout()
            }}
            style={
              {
                width:'80%',
                backgroundColor:'black',
                paddingVertical:10,
                borderRadius:100,
                alignItems:'center'
              }
            }
          >
              <Text style={{
                fontSize:26,
                color:'white',
                fontFamily:'Poppins',
              }}>Fetch Slots</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    button :{
      marginTop:10,
    },
    inputSection:{
      marginTop:20,
    },
    container:{
      paddingTop:60,
      display:'flex',
      flex:1,
      alignItems:'center',
      justifyContent:'flex-start'
    },  
    select:{
      width:250,
      marginTop:10,
      marginBottom:10,
    },
    SelectItem : {
      minWidth:"100%",
      borderBottomColor:"#FF6666",
    },
    selectItemTitle: {
      fontSize:20,
      fontFamily:'Popins'
    }
  })
  
