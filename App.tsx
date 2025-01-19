import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputTodo from './components/todo/input.todo';
import ListTodo from './components/todo/list.todo';

export default function App() {

  const [todoList, setTodoList] = useState<ITodo[]>([
    { id: 1, title: "Learn React Native" },
    { id: 2, title: "Learn React.js" },
    { id: 3, title: "Watching Netflix" },
    { id: 4, title: "Playing ESport" },
    { id: 5, title: "Subscribe Hỏi Dân IT :v" },
    { id: 6, title: "Watching Youtube" },
    { id: 7, title: "CR 7" },
    { id: 8, title: "Tony Kroos" },
    { id: 9, title: "Nine" },
    { id: 10, title: "M10" },
  ])

  return (
    <View style={styles.container}>

      <InputTodo />
      <ListTodo
        todoList={todoList}
      />

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
    paddingHorizontal: 20,
    marginTop: 50
  },
});
