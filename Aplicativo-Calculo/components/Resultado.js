import React, { Component } from 'react';
import { Modal, View, Text, StyleSheet, Button } from 'react-native';

export default class ResultModal extends Component {
  render() {
    return (
      <Modal visible={this.props.visible} transparent={false} animationType="none">
        <View style={styles.modalView}>
          <Text style={styles.resultText}>{this.props.result}</Text>
          <Button title="✖ FECHAR BRUTALMENTE ✖" onPress={this.props.onClose} color="#000" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#000',
    padding: 30,
  },
  resultText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
    backgroundColor: '#FF00FF',
    padding: 20,
    borderWidth: 5,
    borderColor: '#000',
  },
});
