import React, {useState} from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { api } from "../services/api";
import { styles } from './styles'

export function SendMessageForm() {
    const [message, setMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)

    async function handleMessageSubmit(){
        const messageFormated = message.trim()
        await api.post('/messages', { message: messageFormated})

        setMessage('')
        Keyboard.dismiss()
        setSendingMessage(false)
        Alert.alert('Mensagem enviada com sucesso')

        if(messageFormated.length > 0) {
            setSendingMessage(true)
            
            await api.post('/messages', { message: messageFormated})

            setMessage('')
            Keyboard.dismiss()
            setSendingMessage(false)
            Alert.alert('Mensagem enviada com sucesso')


        }else{
            Alert.alert('Escreva sua mensagem')
        }
    }
    return(
        <View style={styles.container}>
            <TextInput 
                keyboardAppearance='dark'
                placeholder='Lança a braba'
                placeholderTextColor= {COLORS.GRAY_PRIMARY}
                multiline
                maxLength={160}
                onChangeText={setMessage}
                value={message}
                editable={!sendingMessage}
                style={styles.input}
            />

            <Button
            title='ENVIAR MENSAGEM'
            backgroundColor={COLORS.PINK}
            color={COLORS.WHITE}
            isLoading={sendingMessage}
            onPress = { handleMessageSubmit}
            />

        </View>
    )
}