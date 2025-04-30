import './App.css';
import React from 'react';

const testData = [
  {
    method: 'abs(x)',
    inputValid: 'x = liczba rzeczywista',
    inputInvalid: 'string, null',
    outputValid: 'liczby dodatnie lub zero',
    outputInvalid: 'string, null',
    boundaries: '{-∞, ∞}',
  },
  {
    method: 'sqrt(x)',
    inputValid: 'x >= 0',
    inputInvalid: 'x < 0, string, null',
    outputValid: 'liczby rzeczywiste',
    outputInvalid: 'string, null',
    boundaries: '{-1, 0}',
  },
  {
    method: 'log(x)',
    inputValid: 'x >= 0',
    inputInvalid: 'x < 0, null, string',
    outputValid: 'liczby rzeczywiste',
    outputInvalid: 'string, null',
    boundaries: '{-1, 0}',
  },
  {
    method: 'factorial(x)',
    inputValid: 'x >= 0',
    inputInvalid: 'x < 0',
    outputValid: 'liczby rzeczywiste',
    outputInvalid: 'string, null',
    boundaries: '{-1, 0}',
  },
  {
    method: 'pow(x, y)',
    inputValid: 'liczby rzeczywiste',
    inputInvalid: 'null, string',
    outputValid: 'liczby rzeczywiste',
    outputInvalid: 'string, null',
    boundaries: '{-∞, ∞}',
  },

  {
    method: 'mod(a, b)',
    inputValid: 'liczby rzeczywiste',
    inputInvalid: 'null, string',
    outputValid: 'liczby rzeczywiste',
    outputInvalid: 'string, null',
    boundaries: '{-∞, ∞}',
  },
  {
    method: 'and(x, y)',
    inputValid: 'liczby rzeczywiste, boolean',
    inputInvalid: 'string, null',
    outputValid: 'boolean',
    outputInvalid: 'liczby, string, null',
    boundaries: '{-∞, ∞}',
  },
  {
    method: 'not(arr)',
    inputValid: 'liczby rzeczywiste, boolean',
    inputInvalid: 'string, nulll',
    outputValid: 'boolean',
    outputInvalid: 'liczby, string, null',
    boundaries: '{-∞, ∞};',
  },
  {
    method: 'or(x, y)',
    inputValid: 'liczby rzeczywiste, boolean',
    inputInvalid: 'string, null',
    outputValid: 'boolean',
    outputInvalid: 'liczby, string, null',
    boundaries: '{-∞, ∞}',
  },
  {
    method: 'xor(x, y)',
    inputValid: 'liczby rzeczywiste, boolean',
    inputInvalid: 'string, null',
    outputValid: 'boolean',
    outputInvalid: 'liczby, string, null',
    boundaries: '{-∞, ∞}',
  },
];

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>PROJEKTOWANIE I IMPLEMENTACJA TESTÓW</h1>
      {testData.map((item, index) => (
        <table
          key={index}
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            marginBottom: '2rem',
            borderCollapse: 'collapse',
            width: '100%',
          }}
        >
          <thead style={{ backgroundColor: '#007fa3', color: 'white' }}>
            <tr>
              <th style={{ width: '50%' }}>Metoda</th>
              <th>{item.method}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Klasy równoważności wejściowe poprawne</strong>
              </td>
              <td>{item.inputValid}</td>
            </tr>
            <tr>
              <td>
                <strong>Klasy równoważności wejściowe niepoprawne</strong>
              </td>
              <td>{item.inputInvalid}</td>
            </tr>
            <tr>
              <td>
                <strong>Klasy równoważności wyjściowe poprawne</strong>
              </td>
              <td>{item.outputValid}</td>
            </tr>
            <tr>
              <td>
                <strong>Klasy równoważności wyjściowe niepoprawne</strong>
              </td>
              <td>{item.outputInvalid}</td>
            </tr>
            <tr>
              <td>
                <strong>Wartości brzegowe (metoda dwóch wartości granicznych)</strong>
              </td>
              <td>{item.boundaries}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default App;
