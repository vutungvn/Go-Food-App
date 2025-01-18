import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [name, setName] = useState<string>("");

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onChangeText={value => setName(value)}
          value={name}
          autoCapitalize='none'
          autoCorrect={false}
          // keyboardType='numeric'
          // maxLength={2}
          // multiline
          style={{
            borderColor: "violet",
            borderWidth: 1,
            padding: 10
          }} />
        <Text style={styles.text}>{name}</Text>
      </View>

      <Button title='Add new' />

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
