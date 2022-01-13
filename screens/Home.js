import React, {useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  } from 'react-native'
import CustomPicker from '../components/CustomPicker';
import { AntDesign } from '@expo/vector-icons';
const {width, height} = Dimensions.get('window')
const marginLeft = width*0.1;
const Home = ({states, navigation}) => {
    // Modal 
    const [stateModal, setStateModal] = useState(false);
    const [districtModal, setDistrictModal] = useState(false);

    // Values
    const [districts, setDistricts] = useState([])
    const [selectedStateId, setSelectedStateId] = useState(-1);
    const [selectedState, setSelectedState] = useState("Select State");
    const [selectedDistrict, setSelectedDistrict] = useState("Select District");
    const [selectedDistrictId, setSelectedDistrictId] = useState(-1);

    useEffect(()=> {
      setSelectedDistrict("Slect District");
      setSelectedDistrictId(-1);
      const getDistrict = async () => {
        if(selectedStateId > 0)
        {
          const response = await fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`)
          if(response.status===200)
          {
            const data = await response.json()
            setDistricts(data.districts.map((item, index)=>{
              return {
                name: item.district_name,
                id: item.district_id
              }
            }));
          }
        }
      }
      getDistrict();
    }, [selectedStateId])
    
    const NavigateToSlots = () => {
      navigation.navigate("Slots", {districtId:selectedDistrictId});
    }
    
    const handleStateChange = (rowNo) => {
      setSelectedStateId(states[rowNo-1].state_id);
      setSelectedState(states[rowNo-1].state_name);
    }

    return (
      <SafeAreaView style={{height:'100%', backgroundColor:'white'}}>
        <StatusBar style='inverted'/>
        <View style={{width:'100%', marginBottom:10}}>
          <Image source={{uri:"https://scx2.b-cdn.net/gfx/news/hires/2020/12-covid19vacci.jpg"}} 
            style={{width:200, height:200, marginHorizontal:((width-200)/2)}}
            />
          <Text style={{
            fontSize:35, fontFamily:'Poppins-Medium',
            marginLeft:marginLeft,
            letterSpacing:1
            }}>
            Find Slots</Text>
        </View>
        <View style={{alignItems:'center', width:'100%'}}>

          <TouchableOpacity style={styles.inputButton}
            onPress={()=>setStateModal(true)}
            >
            <Text style={styles.inputStyle}
            >{selectedState}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.inputButton}
            onPress={()=>setDistrictModal(true)}
            >
            <Text style={styles.inputStyle}
            >{selectedDistrict}</Text>
          </TouchableOpacity>
        </View>
        
        {/* button */}
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
          
          <View style={{flexDirection:'row', alignItems:'center', height:40, width:'100%', justifyContent:'center'}}>
            <AntDesign name="github" size={24} color="rgba(0,0,0,0.8)" />
            <Text style={{fontSize:16, fontFamily:"Poppins-Regular", marginLeft:5, opacity:0.8}}>by Souravb786</Text>
          </View>
        </View>
        
        <CustomPicker 
          isVisible={stateModal} 
          setVisible={setStateModal} 
          data={states}
          setId={setSelectedStateId}
          setValue={setSelectedState}
          />
        <CustomPicker 
          isVisible={districtModal} 
          setVisible={setDistrictModal} 
          data={districts}
          setId={setSelectedDistrictId}
          setValue={setSelectedDistrict}
          />

        
      </SafeAreaView>
    )
}

export default Home
const styles = StyleSheet.create({
    button :{
      marginTop:10,
    },
    inputStyle : {
      fontSize:18,
      fontFamily:'Poppins-Regular',
      textAlign:'center', 
      color:'gray'
    },
    inputButton: {
      width:'80%',
      height:60,
      borderRadius:50,
      borderWidth:2,
      borderColor:'black',
      marginBottom:20,
      marginTop:10, 
      alignItems:'center', 
      justifyContent:'center'
    },
    container:{
      paddingTop:60,
      display:'flex',
      flex:1,
      alignItems:'center',
      justifyContent:'flex-start'
    },  
  })
  
