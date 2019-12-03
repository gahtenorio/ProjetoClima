import {createStackNavigator} from 'react-navigation';

import Main from './pages/main';

export default createStackNavigator({
  Main  
},
{
    navigationOptions: {
        headerStyle: {
            backgroundColor: 'rgba(56, 172, 236, 1)'
        },
        headerTintColor:'#fff'
    },
});