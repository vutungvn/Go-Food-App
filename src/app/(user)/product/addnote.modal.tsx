import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";

interface AddNoteModalProps {
    visible: boolean;
    note: string;
    onChangeNote: (text: string) => void;
    onClose: () => void;
    onSubmit: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
    visible,
    note,
    onChangeNote,
    onClose,
    onSubmit,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 20,
            }}>
                <View style={{
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    padding: 20,
                }}>
                    <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 10 }}>Add a Note</Text>
                    <TextInput
                        value={note}
                        onChangeText={onChangeNote}
                        placeholder="Write something..."
                        style={{
                            borderColor: '#ccc',
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginBottom: 15,
                            height: 100,
                            textAlignVertical: 'top',
                        }}
                        multiline
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={onClose} style={{ marginRight: 10 }}>
                            <Text style={{ color: 'gray' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSubmit}>
                            <Text style={{ color: APP_COLOR.ORANGE, fontWeight: '600' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddNoteModal;
