# 📝 Atividade: Lista de Tarefas com AsyncStorage

## 🎯 Descrição da Atividade

Este projeto foi desenvolvido como uma atividade prática de React Native, onde o desafio era criar um mini aplicativo de lista de tarefas com persistência de dados local.

### 📋 Cenário
Você foi contratado para criar um mini aplicativo de lista de tarefas no React Native. O desafio é permitir que o usuário adicione, visualize e remova tarefas, mas com um detalhe importante: **as tarefas devem continuar salvas mesmo depois de fechar e reabrir o app**. 

👉 Para isso, foi utilizado o **AsyncStorage** como forma de armazenamento local.

## ✅ Requisitos Atendidos

### 1. ✅ Tela inicial mostrando as tarefas já salvas
- **Implementação**: Utilizado `useEffect` para carregar automaticamente as tarefas salvas quando o app é aberto
- **Tecnologia**: AsyncStorage para recuperar dados persistidos

### 2. ✅ Campo de texto para digitar uma nova tarefa
- **Implementação**: Componente `TextInput` controlado com estado `novaTarefa`
- **Funcionalidade**: Campo responsivo com placeholder explicativo

### 3. ✅ Botão "Adicionar" que salve a tarefa no AsyncStorage
- **Implementação**: `TouchableOpacity` que executa função `adicionarTarefa`
- **Validação**: Verifica se o campo não está vazio antes de adicionar
- **Persistência**: Salva automaticamente no AsyncStorage após adicionar

### 4. ✅ Exibir a lista de tarefas na tela (usando FlatList)
- **Implementação**: Componente `FlatList` para renderização eficiente
- **Design**: Cards individuais para cada tarefa com ícones
- **Estado vazio**: Mensagem motivacional quando não há tarefas

### 5. ✅ Permitir excluir uma tarefa da lista (e atualizar o AsyncStorage)
- **Implementação**: Botão de exclusão em cada item da lista
- **Funcionalidade**: Remove tarefa e atualiza automaticamente o AsyncStorage
- **Feedback**: Alert de confirmação após exclusão

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **AsyncStorage** - Armazenamento local persistente
- **React Hooks** (useState, useEffect) - Gerenciamento de estado
- **FlatList** - Renderização otimizada de listas
- **Alert** - Feedback para o usuário

## 🎨 Interface

### Design Moderno
- Header com gradiente azul
- Cards com sombras suaves
- Ícones emoji para melhor UX
- Cores harmoniosas e profissionais

### Responsividade
- Layout adaptável
- Botões com área de toque adequada
- Feedback visual em todas as interações

**✨ Atividade concluída com sucesso!**