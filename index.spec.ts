import Trie from './index'
import { performance } from 'perf_hooks'

const acronyms: Array<string> = require('./three_letter_acronyms.json')

describe('Trie tests', () => {
  describe('Trie insert items tests', () => {
    it('when given a single entry with one character has one node with that character', () => {
      const trie = new Trie();
      trie.insert('A')
      expect(trie.contains('A')).toBeTruthy()
    })

    it('when given a 1000 entries contains a random word', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      const randomEntry = acronyms.at(Math.floor(Math.random() * 1000)) || ' '
      expect(trie.contains(randomEntry)).toBeTruthy()
    })

  })
  describe('Trie find tests', () => {
    it('When contains a the word test and search for test, test is found', () => {
      const trie = new Trie();
      trie.insert('test')
      expect(trie.contains('test')).toBe(true)
    })
    it('When contains a the word test and search for word false, false is not found', () => {
      const trie = new Trie();
      trie.insert('test')
      expect(trie.contains('false')).toBe(false)
    })
    it('When contains 1000 entries and we search for a known entry, entry is found', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      const randomEntry = acronyms.at(Math.floor(Math.random() * 1000)) || ' '
      expect(trie.contains(randomEntry)).toBe(true)
    })
    it('When contains a the word test and search words with the prefix te, test is found', () => {
      const trie = new Trie();
      trie.insert('test')
      expect(trie.getWordsWithPrefix('te')).toStrictEqual(['test'])
    })
    it('When list contains the word test and you search prefix fal, nothing is found', () => {
      const trie = new Trie();
      trie.insert('test')
      expect(trie.getWordsWithPrefix('fal')).toStrictEqual([])
    })
    it('When contains 1000 entries and search words with the prefix A, 48 entries are found', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      expect(trie.getWordsWithPrefix('A').length).toBe(48)
    })
    it('When two words have the same prefix, returns both words', () => {
      const trie = new Trie();
      trie.insertWords(['beats', 'bears'])
      expect(trie.getWordsWithPrefix('bea')).toEqual(['beats', 'bears'])
    })
    it('When searching, case is ignored', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      expect(trie.getWordsWithPrefix('A').length).toBe(trie.getWordsWithPrefix('a').length)
      expect(trie.getWordsWithPrefix('B').length).toBe(trie.getWordsWithPrefix('b').length)
    })
  })

  describe('Performance tests', () => {
    it('When searching 1000 entries returns answers within 1ms', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      const start = performance.now()
      const result = trie.getWordsWithPrefix('A')
      const end = performance.now()
      console.log(`Start was ${start} and end was ${end}`)
      expect(result).toBeDefined()
      expect(end - start).toBeLessThan(1)
    })
  })
  describe('Performance tests', () => {
    it('When searching 1 million entries returns answers within 200ms', () => {
      const trie = new Trie();
      const bigList = generateRandomStringsList(1000000, 10);
      trie.insertWords(bigList)
      const start = performance.now()
      const result = trie.getWordsWithPrefix('A')
      const end = performance.now()
      console.log(`Start was ${start} and end was ${end}`)
      expect(result).toBeDefined()
      expect(end - start).toBeLessThan(200)
    })
  })
})

const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const generateRandomStringsList = (count: number, length: number): string[] => {
  return Array.from({ length: count }, () => generateRandomString(length));
}

