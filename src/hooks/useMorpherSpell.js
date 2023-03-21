import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { MORPHER_TOKEN } from '@/secret';

export function useMorpherSpell(id, quantity, unit) {
  const [conjugatedWord, setConjugatedWord] = useState(JSON.parse(localStorage.getItem(`item-${id}`))?.[unit] ?? '');

  useEffect(() => {
    let isMounted = true;

    function fetchConjugatedWord() {
      window
        .fetch(
          new URL(`http://ws3.morpher.ru/russian/spell?n=${quantity}&unit=${unit}&format=json&token=${MORPHER_TOKEN}`)
        )
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) {
            useLocalStorage(`item-${id}`, unit, data.unit?.['И'] ?? '');
            setConjugatedWord(data.unit?.['И'] ?? '');
          }
        })
        .catch((error) => console.error(error));
    }

    if (conjugatedWord === '') fetchConjugatedWord();

    return () => {
      isMounted = false;
    };
  }, []);

  return conjugatedWord;
}
