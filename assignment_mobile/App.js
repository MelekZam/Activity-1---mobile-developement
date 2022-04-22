import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';


const Stack = createNativeStackNavigator();

const Item = ({user, deleteUser, goToUpdate}) => {
  
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}><Text style={styles.title}>Name:</Text> {user.name}</Text>
      <Text style={styles.text}><Text style={styles.title}>Age:</Text> {user.age}</Text>
      <Text style={styles.text}><Text style={styles.title}>Address:</Text> {user.address}</Text>
      <Text style={styles.text}><Text style={styles.title}>Occupation:</Text> {user.occupation}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => goToUpdate(user)}>
          <Icon name="square-edit-outline" size={25} color='#261163'/>
          <Text style={styles.update}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => deleteUser(user.id)}>
          <Icon name="cancel" size={25} color="#ff0038" />
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Home = ({navigation}) => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const result = await axios.get('http://192.168.1.33:3000/users');
    setUsers(JSON.parse(result.request._response).users)
  }

  const deleteUser = async (id) => {
    const result = await axios.delete(`http://192.168.1.33:3000/users?id=${id}`)
    if (result.status) {
      const newUsers = users.filter(item => item.id != id)
      setUsers(newUsers)
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  const goToUpdate = (user) => {
    navigation.navigate('Update', {
      user,
    })
  }


  return (
    <View style={styles.main}>
      <ScrollView>
        {users?.map((item, index) => {
          return <Item key={index} user={item} deleteUser={deleteUser} goToUpdate={goToUpdate} />
        })}
      </ScrollView>
      <View style={{position: 'absolute', bottom: 25, right: 25}}>
        <TouchableOpacity
          style={styles.plus}
          onPress={() => navigation.navigate('Add')}
        >
          <Icon name="account-plus" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={AddUser} />
        <Stack.Screen name="Update" component={UpdateUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 20,
    color: 'black'
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: "transparent",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    elevation: 1.5,
  },
  text: {
    fontSize: 18,
    color: 'black'
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
    height: 50
  },
  btn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  update: {
    fontSize: 20,
    color: '#261163',
    fontWeight: 'bold',
    marginLeft: 10
  },
  delete: {
    fontSize: 20,
    color: '#F77979',
    fontWeight: 'bold',
    marginLeft: 10
  },
  plus: {
    height: 65,
    backgroundColor: '#261163',
    width: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default App;
