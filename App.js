import {useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./screens/Loading";
import Home from './screens/Home';
import { useFonts } from 'expo-font';
export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/Fonts/Poppins-SemiBold.ttf') })
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
          return {state_name:state_name, state_id:state_id}
        }));
      }
      else { 
        setError(true)
      }
    }
    getState()
    setLoading(false)
    
  }, [])
  console.log(states)
  if(error)
  {
    return(
      <Error />
    )
  }
  return (
    
      loading||(!fontsLoaded)? <Loading />: 
        <Home states={states}/>
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
