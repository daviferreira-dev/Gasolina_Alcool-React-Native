import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FuelInput from './components/Inputs';
import ResultModal from './components/Resultado';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gasoline: '',
      alcohol: '',
      modalVisible: false,
      result: ''
    };
  }

  componentDidMount() {
    this.loadStoredValues();
  }

  async loadStoredValues() {
    try {
      const gasoline = await AsyncStorage.getItem('gasoline');
      const alcohol = await AsyncStorage.getItem('alcohol');
      if (gasoline) this.setState({ gasoline });
      if (alcohol) this.setState({ alcohol });
    } catch (error) {
      console.error('ERRO AO CARREGAR:', error);
    }
  }

  async calculate() {
    const { gasoline, alcohol } = this.state;
    const gas = parseFloat(gasoline.replace(',', '.'));
    const alc = parseFloat(alcohol.replace(',', '.'));

    if (isNaN(gas) || isNaN(alc) || gas <= 0 || alc <= 0) {
      Alert.alert('ERRO!', 'INFORME NÚMEROS VÁLIDOS.');
      return;
    }

    await AsyncStorage.setItem('gasoline', gasoline);
    await AsyncStorage.setItem('alcohol', alcohol);

    const ratio = alc / gas;
    const recommendation = ratio < 0.7 ? 'ÁLCOOL WINS' : 'GASOLINA WINS';

    this.setState({
      result: `⚡ ${recommendation} ⚡\nÍNDICE: ${ratio.toFixed(3)}`,
      modalVisible: true
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CALCULADORA DE COMBUSTÍVEL</Text>

        <FuelInput
          gasoline={this.state.gasoline}
          alcohol={this.state.alcohol}
          onGasolineChange={(value) => this.setState({ gasoline: value })}
          onAlcoholChange={(value) => this.setState({ alcohol: value })}
        />

        <View style={styles.buttonContainer}>
          <Button title="🔥 CALCULAR BRUTALMENTE 🔥" onPress={() => this.calculate()} color="#000" />
        </View>

        <ResultModal
          visible={this.state.modalVisible}
          result={this.state.result}
          onClose={() => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a8a8a',
    padding: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 45,
    fontWeight: '900',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#00FFFF',
    padding: 10,
    borderWidth: 5,
    borderColor: '#FFFF00',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    borderWidth: 4,
    borderColor: '#FF00FF',
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 20,
  },
});
