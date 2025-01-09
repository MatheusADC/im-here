import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export const CONFIG = '';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if(participants.includes(participantName)) {
      return Alert.alert("Participante Existe", "Já existe um participante na lista com esse nome!");
    }

    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>  setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: "cancel"
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        {participantName}
      </Text>

      <Text style={{
        color: '#6B6B6B',
        fontSize: 16
      }}>
        Sexta, 4 de Novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant 
          name={item} 
          key={item}
          onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presenca.
          </Text>
        )}
      />
    </View>
  )
}