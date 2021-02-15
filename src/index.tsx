import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import api from './service/api';

interface Categoria {
  id?: string;
  nome?: string;
}

export default function App() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    getCategorias();
    getToken();
  }, []);

  async function getCategorias() {
    await api.get('/categorias').then((response) => {
      setCategorias(response.data);
    });
  }

  async function handleAddCategoria() {
    await api.post('/categorias', { nome: 'Refrigerante' }, { headers: { Authorization: token } });
    setCategorias([...categorias, getCategorias()]);
  }

  async function getToken() {
    const tokenNovo = await api
      .post('/login', {
        email: 'felipesoares_1993@hotmail.com',
        senha: '123',
      })
      .then((res) => {
        return res.headers.authorization;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(tokenNovo);
    setToken(tokenNovo);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={categorias} // passo o array
          keyExtractor={(item, index) => index.toString()} // passo a informação que é unica dentro desse array
          renderItem={(
            { item }, // ou item: categorias
          ) => (
            <Text key={item.id} style={styles.title}>
              {item.nome}
            </Text>
          )}
        />

        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddCategoria}>
          <Text style={styles.buttonText}>Adicionar Categoria</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>

    // <>
    //     <StatusBar barStyle="light-content" backgroundColor={'#7159c1'}/>
    //     <ScrollView style={styles.container}>
    //         {categorias.map(categorias => (
    //             <Text key={categorias.id} style={styles.title}>{categorias.nome}</Text>)
    //         )}
    //     </ScrollView>
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    width: '90%',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
