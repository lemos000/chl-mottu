# chl-mottu

Aplicativo React Native para gestão de motos utilizando Expo.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Explicação das Telas](#explicação-das-telas)
- [Gerenciamento de Dados](#gerenciamento-de-dados)
- [Personalização de Fontes](#personalização-de-fontes)
- [Observações](#observações)

---

## Sobre o Projeto

Este projeto é um aplicativo mobile desenvolvido em React Native usando Expo, com o objetivo de gerenciar uma lista de motos. O usuário pode cadastrar, visualizar, editar e remover motos, além de definir preferências como o nome do usuário.

---

## Funcionalidades

- Cadastro de motos com modelo e placa
- Listagem de motos cadastradas
- Visualização de detalhes de cada moto
- Edição de motos existentes
- Remoção de motos com confirmação
- Preferências do usuário (nome)
- Persistência local dos dados usando AsyncStorage
- Interface amigável e responsiva
- Uso de fontes customizadas (Quicksand)

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado v18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo](https://docs.expo.dev/get-started/installation/) (instale globalmente com `npm install -g expo`)
- Emulador Android/iOS ou dispositivo físico com o app [Expo Go](https://expo.dev/client)

---

## Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/lemos000/chl-mottu.git
   cd chl-mottu
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   # ou
   yarn install
   ```

---

## Rodando o Projeto

1. **Inicie o servidor de desenvolvimento:**

   ```sh
   npm start
   # ou
   yarn start
   # ou
   expo start
   ```

2. **Escolha como rodar:**
   - **Web:** pressione `w` no terminal ou acesse o QR code pelo navegador.
   - **Android:** pressione `a` ou escaneie o QR code com o app Expo Go.
   - **iOS:** pressione `i` ou escaneie o QR code com o app Expo Go.

---

## Estrutura de Pastas

```
chl-mottu/
  App.tsx
  index.ts
  package.json
  tsconfig.json
  types.ts
  assets/
    icon.png
    grafite.png
    ...
  screens/
    HomeScreen.tsx
    ListaMotos.tsx
    DetalheMoto.tsx
    MotoAdd.tsx
    MotoChange.tsx
    Dropdown.tsx
    Preferencias.tsx
```

- **App.tsx**: Arquivo principal, configura as rotas e fontes.
- **screens/**: Contém todas as telas do app.
- **assets/**: Imagens usadas no app.
- **types.ts**: Tipos TypeScript compartilhados.

---

## Explicação das Telas

### HomeScreen

Tela inicial, mostra o nome do usuário (se definido) e botões para navegar para cadastro, lista de motos e preferências.

### ListaMotos

Exibe todas as motos cadastradas. Permite selecionar uma moto para ver detalhes.

### DetalheMoto

Mostra detalhes da moto selecionada. Permite editar ou deletar a moto (com confirmação via modal).

### MotoAdd

Tela para cadastrar uma nova moto. O modelo é selecionado via dropdown e a placa é digitada.

### MotoChange

Permite editar o modelo e a placa de uma moto existente.

### Preferencias

Permite definir o nome do usuário, que será exibido na tela inicial.

### Dropdown

Componente customizado para seleção do modelo da moto.

---

## Gerenciamento de Dados

- Todos os dados (motos e nome do usuário) são salvos localmente usando [`AsyncStorage`](https://react-native-async-storage.github.io/async-storage/).
- Ao abrir o app pela primeira vez, uma lista mock de motos é criada.
- Cada operação de cadastro, edição ou remoção atualiza o armazenamento local.

---

## Personalização de Fontes

- O projeto utiliza as fontes Quicksand (`Quicksand_400Regular` e `Quicksand_700Bold`) via [`@expo-google-fonts/quicksand`](https://github.com/expo/google-fonts).
- As fontes são carregadas no início do app em [`App.tsx`](chl-mottu/App.tsx).

---

## Observações

- O projeto foi desenvolvido para fins de estudo e demonstração.
- O diretório `.expo/` não deve ser versionado (já está no `.gitignore`).
- Para resetar os dados, basta remover o app do dispositivo/emulador ou limpar o armazenamento do Expo Go.

---

## Dúvidas

Abra uma issue ou entre em contato com o responsável pelo repositório.

---