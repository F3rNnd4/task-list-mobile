import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');

  // Carregar tarefas salvas ao iniciar o app
  useEffect(() => {
    const carregarTarefas = async () => {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setTarefas(tarefasSalvas.split(',')); // Carregar como lista
      }
    };
    carregarTarefas();
  }, []);

  // Salvar tarefas no AsyncStorage
  const salvarTarefas = async (tarefasAtualizadas) => {
    await AsyncStorage.setItem('tarefas', tarefasAtualizadas.join(',')); // Salvar como string separada por vírgulas
  };

  // Adicionar nova tarefa
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const tarefasAtualizadas = [...tarefas, novaTarefa];
    setTarefas(tarefasAtualizadas);
    salvarTarefas(tarefasAtualizadas);
    setNovaTarefa('');
  };

  // Excluir tarefa
  const excluirTarefa = (index) => {
    const tarefasAtualizadas = tarefas.filter((_, i) => i !== index);
    setTarefas(tarefasAtualizadas);
    salvarTarefas(tarefasAtualizadas);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>✨ Minhas Tarefas ✨</Text>
        <Text style={styles.subtitulo}>Organize seu dia com estilo</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="✍️ Digite uma nova tarefa..."
          placeholderTextColor="#a0a0a0"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
          <Text style={styles.botaoAdicionarTexto}>+ Adicionar</Text>
        </TouchableOpacity>
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
              <View style={styles.iconeTarefa}>
                <Text style={styles.iconeTexto}>📝</Text>
              </View>
              <Text style={styles.tarefaTexto}>{item}</Text>
            </View>
            <TouchableOpacity onPress={() => excluirTarefa(index)} style={styles.botaoExcluir}>
              <Text style={styles.botaoExcluirTexto}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        // Componente para quando a lista estiver vazia
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTexto}>🎯</Text>
            <Text style={styles.emptyMensagem}>Nenhuma tarefa ainda!</Text>
            <Text style={styles.emptySubmensagem}>Adicione sua primeira tarefa acima</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#191414',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '300',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  botaoAdicionar: {
    backgroundColor: '#4f46e5',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  botaoAdicionarTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tarefaContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  tarefaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconeTarefa: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 8,
    marginRight: 15,
  },
  iconeTexto: {
    fontSize: 18,
  },
  tarefaTexto: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    flex: 1,
  },
  botaoExcluir: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
  },
  botaoExcluirTexto: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTexto: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyMensagem: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubmensagem: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});