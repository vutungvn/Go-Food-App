import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    todo: {
        fontSize: 30,
        backgroundColor: "pink",
        marginBottom: 20,
        padding: 15
    },
})

interface IProps {
    todoList: ITodo[]
}

const ListTodo = (props: IProps) => {
    const { todoList } = props;
    console.log(todoList);
    return (
        <>
            <Text>{JSON.stringify(todoList)}</Text>
            <FlatList
                style={{
                    marginTop: 20,
                    borderColor: "red", borderWidth: 1
                }}
                data={todoList}
                keyExtractor={item => item.id + ""}
                //object destructuring data.item
                renderItem={({ item }) => {
                    return (
                        <Text
                            // key={item.id}
                            style={styles.todo}
                        >
                            {item.title}
                        </Text>
                    )
                }}
            />
        </>
    )
}

export default ListTodo;