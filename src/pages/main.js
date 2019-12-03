import React, {Component} from 'react';
import api from '../services/api';

import {View,Text, ActivityIndicator, Alert, TextInput,TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';

export default class Main extends Component{
   static navigationOptions = {
       title: 'Clima'
   };

   constructor(props){
        super(props)      
        this.state = {
            isLoading:true,
            text:'',
        }
    }

    componentDidMount(){
        this.clima();
    }

    //pegar dados da api
    clima = async  () => {
    const cidade = await api.get('http://api.openweathermap.org/data/2.5/weather?q=caruaru&units=metric&APPID=22ca4e3d9945ba3df87972e273c8dde6')
    const cidade2 = await api.get('http://api.openweathermap.org/data/2.5/weather?q=recife&units=metric&APPID=22ca4e3d9945ba3df87972e273c8dde6')
    const cidade3 = await api.get('http://api.openweathermap.org/data/2.5/weather?q=fortaleza&units=metric&APPID=22ca4e3d9945ba3df87972e273c8dde6')
    const cidade4 = await api.get('http://api.openweathermap.org/data/2.5/weather?q=joao pessoa&units=metric&APPID=22ca4e3d9945ba3df87972e273c8dde6')
    const cidade5 = await api.get('http://api.openweathermap.org/data/2.5/weather?q=sao paulo&units=metric&APPID=22ca4e3d9945ba3df87972e273c8dde6')
        
    const clima = cidade.data;
    this.setState({clima});
    
    const clima2 = cidade2.data;
    this.setState({clima2});    

    const clima3 = cidade3.data;
    this.setState({clima3});
    
    const clima4 = cidade4.data;
    this.setState({clima4});

    const clima5 = cidade5.data;
    this.setState({clima5});
    
        //array para as cidades
        const  posts = [
            {
                name:this.state.clima.name,
                temp:this.state.clima.main.temp,
                icon:this.state.clima.weather[0].icon,
                descriçao:this.state.clima.weather[0].description
            },
            {
                name:this.state.clima2.name,
                temp:this.state.clima2.main.temp,
                icon:this.state.clima2.weather[0].icon,
                descriçao:this.state.clima2.weather[0].description
                            
            },
            {
                name:this.state.clima3.name,
                temp:this.state.clima3.main.temp,
                icon:this.state.clima3.weather[0].icon,
                descriçao:this.state.clima3.weather[0].description
            },
            {
                name:this.state.clima4.name,
                temp:this.state.clima4.main.temp,
                icon:this.state.clima4.weather[0].icon,
                descriçao:this.state.clima4.weather[0].description
            },
            {
                name:this.state.clima5.name,
                temp:this.state.clima5.main.temp,    
                icon:this.state.clima5.weather[0].icon,
                descriçao:this.state.clima5.weather[0].description        
            },
        ];
             
        this.setState({posts});
        this.setState({isLoading:false});
}  

    onChangeText(text){
        this.setState({text});
    }
    buttonPressed(){
        if(this.state.text){
            Alert.alert('Infelizmente não conseguir fazer funcionar o adicionar cidades...') 
        } else {
            Alert.alert('Digite um nome de cidade')
        }
    }

    //exibir dados
    renderItem = ({item}) => (
        <View style={styles.informaçoes}>
        <Text style={styles.nomeCidade}>{item.name}</Text>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Image style={{width:80, height:80}} source={{uri:"https://openweathermap.org/img/w/" +item.icon+ ".png"}} />
        <Text style={styles.temp}>{Math.round( item.temp * 10) / 10 }&#8451;</Text>
        </View>
        <Text style={styles.descriçao}>{item.descriçao}</Text>
        </View>
    );

    //exibir dados
    render(){
        
        if(this.state.isLoading){
            return(
                <View style={{flex:1, paddingTop:20}}>
                <ActivityIndicator/>
                </View>
            )
        }

        return(
            
            <View style={styles.container}>
                <View style={styles.inputView}>
                <TextInput 
                style={styles.input}
                placeholder='Inserir Cidade...'
                value={this.state.text}
                onChangeText={this.onChangeText.bind(this)}
                />
                <TouchableOpacity style={styles.button}
                underlayColor='rgba(56, 172, 236, 1)'>
                    <Text style={styles.buttonText}                 	
                    onPress={this.buttonPressed.bind(this)}
                    >Inserir </Text>
                </TouchableOpacity>
                </View>

                <FlatList
                contentContainerStyle={styles.lista}
               data={this.state.posts}
               keyExtractor={item => item.name}
               renderItem={this.renderItem}
              />
            </View>
        );
    }
}

    //styles
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        },

        lista:{
            padding:20,
        },

        informaçoes:{
            backgroundColor: 'rgba(56, 172, 236, 1)',
            borderWidth: 0,
            borderColor: '#fff',
            borderRadius: 20,
            padding:20,
            marginBottom:20,
        },
    
        nomeCidade:{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#fff',
            marginBottom:7
        },

        temp:{
            fontSize: 25,
            textTransform:'capitalize',
            color: '#fff'
        },

        descriçao:{
            fontSize: 18,
            textTransform:'capitalize',
            color: '#fff'
        },

        inputView:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        },

        input:{
            backgroundColor:'white',
            borderColor:'rgba(56, 172, 236, 1)',
            borderWidth:2,
            padding:8,
            margin:10,
            borderRadius:8,
            flex:1
        },

        buttonText:{
            fontSize:18,
            color:'#fff',
            alignSelf:'center'
        },

        button:{
            width:100,
            height:36,
            flexDirection:'row',
            backgroundColor:'rgba(9, 90, 236, 1)',
            borderColor:'rgba(9, 90, 236, 1)',
            borderWidth:1,
            borderRadius:8,
            marginBottom:10,
            marginTop:15,
            margin:10,
            alignSelf:'stretch',
            justifyContent:'center'
        }
});