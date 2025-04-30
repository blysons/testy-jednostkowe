import React, { useEffect, useState } from 'react';
import { abs, sqrt, log, factorial, pow, mod, and, or, xor, not } from 'mathjs';
import { testData } from '../testData';

// mapowanie funkcji z testdata do mathjs ----

const fnMap = {
  'abs(x)': abs,
  'sqrt(x)': sqrt,
  'log(x)': log,
  'factorial(x)': factorial,
  'pow(x, y)': pow,
  'mod(a, b)': mod,
  'and(x, y)': and,
  'or(x, y)': or,
  'xor(x, y)': xor,
  'not(arr)': not,
};

// --------------------------------------- end


// sekcja przykładowych wartości do testów i granic -----

const exampleValues = {
  'liczby rzeczywiste': [1, -1, 0, 3.14],
  boolean: [true, false],
  string: ['a', 'hello'],
  null: [null],
};

const boundariesExamples = {
  '{-∞, ∞}': [-99999, 0, 99999],
  '{-1, 0}': [-1, 0],
};

// -------------------------------------------------- end



function getExamplesFromSpec(spec) {
  const parts = spec.split(',').map((s) => s.trim());
  const values = [];
  for (const part of parts) {
    if (exampleValues[part]) {
      values.push(...exampleValues[part]);
    }
  }
  return values;
}

function getArgs(method, value) {
  if (method.includes('(x, y)') || method.includes('(a, b)')) return [value, value];
  if (method.includes('(arr)')) return [[value]];
  return [value];
}

function Tests() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const allResults = [];

    for (const entry of testData) {
      const { method, inputValid, inputInvalid, boundaries } = entry;
      const fn = fnMap[method];
      if (!fn) {
        allResults.push({ method, status: 'skip', reason: 'Nieznana funkcja' });
        continue;
      }

      const validInputs = getExamplesFromSpec(inputValid);
      const invalidInputs = getExamplesFromSpec(inputInvalid);
      const boundaryInputs = boundariesExamples[boundaries] || [];

      let passed = true;
      const steps = [];

      // Krok 1: valid inputs
      steps.push(`🟢 Krok 1: Testowanie poprawnych danych (${inputValid})`);
      for (const val of validInputs) {
        const args = getArgs(method, val);
        try {
          const result = fn(...args);
          steps.push(`✅ OK: ${method}(${args.join(', ')}) → ${JSON.stringify(result)}`);
        } catch (err) {
          passed = false;
          steps.push(`❌ Błąd: ${method}(${args.join(', ')}) rzuciło wyjątek → ${err.message}`);
        }
      }

      // Krok 2: invalid inputs
      steps.push(`🟡 Krok 2: Testowanie niepoprawnych danych (${inputInvalid})`);
      for (const val of invalidInputs) {
        const args = getArgs(method, val);
        try {
          const result = fn(...args);
          passed = false;
          steps.push(`❌ NIEPOŻĄDANE: ${method}(${args.join(', ')}) → ${JSON.stringify(result)} (powinien rzucić wyjątek)`);
        } catch (_) {
          steps.push(`✅ OK: ${method}(${args.join(', ')}) poprawnie rzucił wyjątek`);
        }
      }

      // Krok 3: testowanie granic
      steps.push(`🔵 Krok 3: Testowanie wartości brzegowych (${boundaries})`);
      for (const val of boundaryInputs) {
        const args = getArgs(method, val);
        try {
          const result = fn(...args);
          steps.push(`✅ OK: ${method}(${args.join(', ')}) → ${JSON.stringify(result)}`);
        } catch (err) {
          passed = false;
          steps.push(`❌ Błąd: ${method}(${args.join(', ')}) rzuciło wyjątek → ${err.message}`);
        }
      }

      allResults.push({
        method,
        status: passed ? 'pass' : 'fail',
        steps,
      });
    }

    setResults(allResults);
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🧪 Przebieg testów jednostkowych (mathjs)</h2>
      {results.map((r, i) => (
        <div key={i} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <h3>{r.method}</h3>
          <p>Status: {r.status === 'pass' ? <span style={{ color: 'green' }}>✅ Zaliczone</span> : <span style={{ color: 'red' }}>❌ Błąd</span>}</p>
          <pre style={{ background: '#2d2d2d', padding: '1rem', borderRadius: '6px', fontSize: '0.9rem', textAlign: 'left' }}>
            {r.steps.map((s, idx) => (
              <div key={idx}>{s}</div>
            ))}
          </pre>
        </div>
      ))}
    </div>
  );
}

export default Tests;
