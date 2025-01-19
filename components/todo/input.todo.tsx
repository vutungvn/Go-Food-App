import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    todoInput: {
        borderColor: "violet",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    }
})

const InputTodo = () => {
    const [name, setName] = useState<string>("");

    return (
        <>
            <View>
                <TextInput
                    onChangeText={value => setName(value)}
                    value={name}
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.todoInput}
                />

                <Button
                    title='Add new'
                    onPress={() => alert("tap me")}
                />
            </View>
        </>
    )
}

export default InputTodo;