import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>test</Text>
      </View>
      <Text style={styles.text}>Hello world with
        <Text style={styles.thanhtung}> Thanh Tung</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  thanhtung: {
    color: "green"
  },

  text: {
    fontSize: 30,
    color: "red"
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
