import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class FuelInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="PREÇO DA GASOLINA"
          placeholderTextColor="#000"
          value={this.props.gasoline}
          onChangeText={this.props.onGasolineChange}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="PREÇO DO ÁLCOOL"
          placeholderTextColor="#000"
          value={this.props.alcohol}
          onChangeText={this.props.onAlcoholChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFF00',
    color: '#000',
    fontSize: 28,
    fontWeight: '900',
    padding: 20,
    borderWidth: 4,
    borderColor: '#ff0000',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
