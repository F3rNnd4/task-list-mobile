import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  // Carregar tarefas quando o app abre
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Carregar tarefas salvas
  const carregarTarefas = async () => {
    const tarefasSalvas = await AsyncStorage.getItem('tarefas');
    if (tarefasSalvas) {
      setTarefas(tarefasSalvas.split(','));
    }
  };

  // Adicionar nova tarefa
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === '') {
      Alert.alert('Erro', 'Digite uma tarefa!');
      return;
    }

    const novaLista = [...tarefas, novaTarefa];
    setTarefas(novaLista);
    await AsyncStorage.setItem('tarefas', novaLista.join(','));
    setNovaTarefa('');
    Alert.alert('Sucesso', 'Tarefa adicionada!');
  };

  // Excluir tarefa
  const excluirTarefa = async (index) => {
    const novaLista = tarefas.filter((_, i) => i !== index);
    setTarefas(novaLista);
    await AsyncStorage.setItem('tarefas', novaLista.join(','));
    Alert.alert('Sucesso', 'Tarefa removida!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Hoje</Text>
        <Text style={styles.subtitulo}>28 Ago 2025</Text>
      </View>

      {/* Search/Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Pesquisar"
          placeholderTextColor="#ffffff"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#999"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.tarefaContainer}>
            <View style={styles.tarefaContent}>
              <Text style={styles.tarefaTexto}>{item}</Text>
              <Text style={styles.horario}>9:00 am</Text>
            </View>
            <TouchableOpacity onPress={() => excluirTarefa(index)} style={styles.botaoExcluir}>
              <Text style={styles.botaoExcluirTexto}>×</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMensagem}>Nenhuma tarefa ainda!</Text>
            <Text style={styles.emptySubmensagem}>Adicione sua primeira tarefa acima</Text>
          </View>
        }
      />

      {/* Botão Adicionar */}
      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
        <Text style={styles.botaoAdicionarTexto}>+ Adicionar nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },
  inputSection: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#4285f4',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  listContainer: {
    paddingHorizontal: 25,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 0,
  },
  tarefaContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tarefaContent: {
    flex: 1,
  },
  tarefaTexto: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
  },
  horario: {
    fontSize: 13,
    color: '#999',
  },
  botaoExcluir: {
    backgroundColor: '#ff4757',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoExcluirTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#4285f4',
    marginHorizontal: 25,
    marginVertical: 20,
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#4285f4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoAdicionarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyMensagem: {
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  emptySubmensagem: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});