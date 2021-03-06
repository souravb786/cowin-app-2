import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Slots from "./screens/Slots";


const stack = createNativeStackNavigator()
export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/Fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/Fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/Fonts/Poppins-Regular.ttf')
  })
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getState = async() => {
      const response = await fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      if(response.status===200)
      {
        console.log(response.status)
        const tempStates = (await response.json()).states
        setStates(tempStates.map(({state_id, state_name})=>{
          return {name:state_name, id:state_id}
        }));
      }
      else { 
        setError(true)
      }
    }
    getState()
    setLoading(false)
    
  }, [])
  // console.log(states)
  if(error)
  {
    return(
      <Error />
    )
  }
  return (
      loading||(!fontsLoaded)? <View><Text>Loading</Text></View>: 
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen options={{headerShown:false}} name="Home">
              {props=> <Home states={states} {...props} />}
            </stack.Screen>
            <stack.Screen name="Slots" component={Slots}/>
          </stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
