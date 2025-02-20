import Trie from './index'

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
    it('When contains a the word test and search words with the prefix fal, nothing is found', () => {
      const trie = new Trie();
      trie.insert('test')
      expect(trie.getWordsWithPrefix('fal')).toStrictEqual([])
    })
    it('When contains 1000 entries and search words with the prefix A, 48 entries are found', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      expect(trie.getWordsWithPrefix('A').length).toBe(48)
    })
    it('When searching, case is ignored', () => {
      const trie = new Trie();
      trie.insertWords(acronyms)
      expect(trie.getWordsWithPrefix('A').length).toBe(trie.getWordsWithPrefix('a').length)
      expect(trie.getWordsWithPrefix('B').length).toBe(trie.getWordsWithPrefix('b').length)
    })
  })
})