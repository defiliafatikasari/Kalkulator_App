import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Kalkulator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');

  useEffect(() => {
    console.log('Input atau hasil berubah');
  }, [input, result]);

  const handlePress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input).toString();
      setHistory(input);
      setResult(evalResult);
      setInput('');
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setHistory('');
  };

  const isOperator = (value) => {
    return ['/', '*', '-', '+', '='].includes(value);
  };

  const getButtonStyle = (value) => {
    if (value === 'C') {
      return [styles.button, styles.clearButton];
    } else if (isOperator(value)) {
      return [styles.button, styles.operatorButton];
    } else {
      return [styles.button, styles.numberButton];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator</Text>
      <View style={styles.display}>
        <Text style={styles.historyText}>{history}</Text>
        <Text style={styles.resultText}>{result}</Text>
        <Text style={styles.inputText}>{input}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((value) => (
          <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePress(value)}>
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => handlePress('C')}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  display: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    minHeight: 150,
  },
  historyText: {
    fontSize: 20,
    textAlign: 'right',
    color: 'gray',
  },
  inputText: {
    fontSize: 30,
    textAlign: 'right',
  },
  resultText: {
    fontSize: 40,
    textAlign: 'right',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  numberButton: {
    backgroundColor: '#87CEFA',
  },
  operatorButton: {
    backgroundColor: '#FFD700',
  },
  clearButton: {
    width: '48%',
    backgroundColor: '#ff6347',
  },
});

export default Kalkulator;
