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
    } else if (value === '←') {
      handleBackspace();
    } else if (value === '+/-') {
      toggleSign();
    } else if (value === '%') {
      applyPercentage();
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const calculateResult = () => {
    try {
      const evalResult = eval(input).toString();
      setHistory(input + ' = ' + evalResult);
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

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const toggleSign = () => {
    setInput((prevInput) => {
      if (prevInput[0] === '-') {
        return prevInput.slice(1);
      } else {
        return '-' + prevInput;
      }
    });
  };

  const applyPercentage = () => {
    setInput((prevInput) => (parseFloat(prevInput) / 100).toString());
  };

  const isOperator = (value) => {
    return ['/', '*', '-', '+', '='].includes(value);
  };

  const getButtonStyle = (value) => {
    if (value === 'C') {
      return [styles.button, styles.clearButton];
    } else if (value === '=') {
      return [styles.button, styles.equalsButton];
    } else if (isOperator(value)) {
      return [styles.button, styles.operatorButton];
    } else if (value === '←') {
      return [styles.button, styles.backspaceButton];
    } else if (value === '00') {
      return [styles.button, styles.doubleZeroButton];
    } else if (value === '+/-') {
      return [styles.button, styles.plusMinusButton];
    } else if (value === '%') {
      return [styles.button, styles.percentButton];
    } else {
      return [styles.button, styles.numberButton];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kalkulator D-Rainbow</Text>
      <View style={styles.display}>
        <Text style={styles.historyText}>{history}</Text>
        <Text style={styles.inputText}>{input}</Text>
        {result !== '' && <Text style={styles.resultText}>{result}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '00', '0', '.', '+', '+/-', '%', '='].map((value) => (
          <TouchableOpacity key={value} style={getButtonStyle(value)} onPress={() => handlePress(value)}>
            <Text style={styles.buttonText}>{value}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={getButtonStyle('←')} onPress={() => handlePress('←')}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={getButtonStyle('C')} onPress={() => handlePress('C')}>
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
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  display: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    minHeight: 150,
    justifyContent: 'center',
  },
  historyText: {
    fontSize: 18,
    textAlign: 'right',
    color: 'gray',
  },
  inputText: {
    fontSize: 28,
    textAlign: 'right',
    color: 'black',
  },
  resultText: {
    fontSize: 34,
    textAlign: 'right',
    color: '#ff6347',
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
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
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
  equalsButton: {
    backgroundColor: '#FFA500',
  },
  clearButton: {
    width: '48%',
    backgroundColor: '#ff6347',
  },
  backspaceButton: {
    backgroundColor: '#4CAF50',
  },
  doubleZeroButton: {
    backgroundColor: '#87CEFA',
  },
  plusMinusButton: {
    backgroundColor: '#4169E1',
  },
  percentButton: {
    backgroundColor: '#BA55D3',
  },
});

export default Kalkulator;
