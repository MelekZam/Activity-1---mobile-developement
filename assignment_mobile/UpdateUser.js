import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button
} from 'react-native';
import axios from 'axios'
import { CommonActions } from '@react-navigation/native';


const UpdateUser = ({route, navigation}) => {
    const [user, setUser] = useState(route.params.user)
    
    const updateUser = async () => {
        const result = await axios.patch('http://192.168.1.33:3000/users', user)
        if (result.status) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: 'Home'}
                    ]
                })
            );
        }
    }

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Name</Text>
            <TextInput style={styles.input} value={user.name} onChangeText={(text) => setUser({...user, name: text})} />
            <Text style={styles.title}>Age</Text>
            <TextInput style={styles.input} value={user.age.toString()} onChangeText={(text) => setUser({...user, age: text})} />
            <Text style={styles.title} >Address</Text>
            <TextInput style={styles.input}  value={user.address} onChangeText={(text) => setUser({...user, address: text})}/>
            <Text style={styles.title} >Occupation</Text>
            <TextInput style={styles.input}  value={user.occupation} onChangeText={(text) => setUser({...user, occupation: text})}/>
            <Button
                onPress={updateUser}
                title="Update User"
                color="#841584"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 10
    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15
    },
    title: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        color: 'black',
        marginBottom: 5
      },
  });

export default UpdateUser;