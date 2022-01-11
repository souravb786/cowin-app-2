import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import * as eva from '@eva-design/eva'
import { Layout, Select, SelectItem, ApplicationProvider } from '@ui-kitten/components'
import Header from './Header'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const Home = ({states}) => {
    const [districts, setDistricts] = useState([])
    const [selectedStateId, setSelectedStateId] = useState(-1);
    const [selectedState, setSelectedState] = useState("Select State");
    const [selectedIndex, setSelectedIndex] = React.useState();
    console.log(states)
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
    const handleStateChange = (rowNo) => {
      setSelectedStateId(states[rowNo-1].state_id);
      setSelectedState(states[rowNo-1].state_name);
    }
    return (
      <SafeAreaView style={{height:'100%'}}>
        <StatusBar style='inverted'/>
        <Header />
        <View><Text>States</Text></View>
        <View><Text>Districts</Text></View>
        <View style={
          { position:'absolute', bottom:20, width:'100%', alignItems:'center', justifyContent:'center'}
        }>
          <TouchableOpacity>
              <Text style={{
                fontSize:26,
                color:'white',
                fontFamily:'Poppins',
                backgroundColor:'black',
                paddingHorizontal:25,
                paddingVertical:10,
                borderRadius:35,
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
  
