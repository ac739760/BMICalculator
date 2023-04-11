import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

const heightkey = '@BMICalculator:heightkey';
const BMIkey = '@BMICalculator:BMIkey';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);
export default class App extends Component {
  
 state = {
  weight:'',
  height:'',
  BMI:'',
 };
 

constructor(props){
  super(props);
  this.onLoad();
}
componentDidMount(){
  //this.setTimeout(()=>{},2000)
}
onLoad = async()=>{
  try{
    const height = await AsyncStorage.getItem(heightkey);
    const BMI = await AsyncStorage.getItem(BMIkey);
    this.setState({height});
    this.setState({BMI});
  }catch(error){
    Alert.alert('Error', 'There was an error while loading the data');
  }
}
onSave = async () =>{
  const {weight, height} = this.state;
  const BMI = (weight/(height*height)*703).toFixed(1)
  try {
    await AsyncStorage.setItem(heightkey, height);
    await AsyncStorage.setItem(BMIkey, BMI);
    Alert.alert('Saved', 'Successfully saved on device')
    this.setState({BMI});
  } catch (error) {
    Alert.alert('Error', 'There was an error while saving the data');
  }
  
}

onHeightChange=(height) => this.setState({height});
onWeightChange = (weight)=> this.setState({weight});

render(){
  const {weight, height, BMI} = this.state;
 
  return (
    <View>
    
      <Text style = {styles.container}>BMI Calculator</Text>
  <View style = {styles.inputcontainer}>
   <TextInput
   style = {styles.input}
   placeholder = "Weight in Pounds"
   value = {weight}
   onChangeText={this.onWeightChange}/>
   <TextInput
   style = {styles.input}
   placeholder = "Height in Inches"
   value = {height}
   onChangeText={this.onHeightChange}/>
 
  <Pressable onPress={this.onSave} style={styles.button}>
            <Text style = {styles.buttonText}>Compute BMI</Text>
  </Pressable>
  
  


    <Text style = {styles.hidden}>{BMI ? "Body Mass Index is "+BMI:''}</Text>
       
    <Text style = {styles.accessing}>
      Assessing Your BMI{'\n'}
      {'\t'}Underweight: less than 18.5{'\n'}
      {'\t'}Healthy: 18.5 to 24.9{'\n'}
      {'\t'}Overweight: 25.0 to 29.9{'\n'}
      {'\t'}Obese: 30.0 or higher
    </Text>
    <StatusBar style="auto" />
    </View>
    </View>
  );
  }


}

const styles = StyleSheet.create({
  container: {
    color:'white',
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight:'bold',
    fontSize:30,
    padding: 30,
    paddingLeft:100,
    marginBottom:10
  },
  inputcontainer:{
    justifyContent:'center',
    alignItems:'center',
  },
  input:{
    fontSize: 24,
    padding:5,
    backgroundColor:'#ddd',
    height:35,
    width: 400,
    marginBottom:10
  },
  button:{
    backgroundColor:'#34495e',
    padding:20,
    paddingLeft:120,
    width:400

  },
  buttonText:{
    color: '#fff',
    fontSize:24
  },
  hidden:{
    height:100,
    paddingTop: 40,
    fontSize: 28,
  },
  accessing:{
      paddingRight:80,
      fontSize:20,
  },
});
