import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { MORPHER_TOKEN } from '@/secret';

export function useMorpherDeclension(id, word) {
  const [conjugatedWord, setConjugatedWord] = useState(JSON.parse(localStorage.getItem(`item-${id}`))?.[word] ?? '');

  useEffect(() => {
    let isMounted = true;

    function fetchConjugatedWord() {
      window
        .fetch(new URL(`http://ws3.morpher.ru/russian/declension?s=${word}&format=json&token=${MORPHER_TOKEN}`))
        .then((response) => response.json())
        .then((data) => {
          if (isMounted) {
            useLocalStorage(`item-${id}`, word, data['Т'] ?? '');
            setConjugatedWord(data['Т'] ?? '');
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
