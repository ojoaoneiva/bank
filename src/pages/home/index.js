import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Moviments from '../../components/Moviments';
import Actions from '../../components/Actions';

const list = [
  {
    id: 1,
    label: "Boleto conta luz",
    value: "300,90",
    date: "17/09/2023",
    type: 0 //gastos
  },
  {
    id: 1,
    label: "Pix Lucas Almeida",
    value: "800,00",
    date: "17/09/2023",
    type: 1 //entrada
  },
  {
    id: 1,
    label: "Salário",
    value: "5.400,00",
    date: "18/09/2023",
    type: 1 //entrada
  },
]

export default function Home() {
  return (
    <View style={styles.container}>
      <Header name="Joao Neiva"/>

      <Balance saldo="9.250,90" gastos="-527,50"/>

      <Actions/>

      <Text style={styles.title}> Ultimas movimentações</Text>
      <FlatList
      style={styles.list}
      data={list}
      keyExtractor={(item)=>String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={ ({item}) => <Moviments data={item}/>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title:{
    fontSize: 18,
    fontWeight: "bold",
    margin: 14
  },
  list:{
    marginStart: 14,
    marginEnd: 14,
  }
});
