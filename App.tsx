import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  //data-type
  //string
  const [name, setName] = useState<string>("hoidanit");

  //number
  const [age, setAge] = useState<number>(30);

  //null, undefined, boolean
  const test = false;

  //object, array
  const [person, setPerson] = useState([6, 9]);



  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{JSON.stringify(person)}</Text>
      </View>
      <Text style={styles.text}>Hello world with
        <Text style={styles.hoidanit}> hoidanit</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hoidanit: {
    color: "green"
  },

  text: {
    fontSize: 30,
    color: "red"
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 20
  },
});
