class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
  this.children = new Map<string, TrieNode>();
  this.isEndOfWord = false;
  }
}

export default class Trie {
  root: TrieNode;

  constructor() {
  this.root = new TrieNode();
  }

  insert(word: string): void {
  let current = this.root;
  for (const char of word) {
    if (!current.children.has(char.toLocaleLowerCase())) {
    current.children.set(char.toLocaleLowerCase(), new TrieNode());
    }
    current = current.children.get(char.toLocaleLowerCase())!;
  }
  current.isEndOfWord = true;
  }

  insertWords(words: Array<string>): void {
    words.forEach(word => this.insert(word))
  }

  contains(word: string): boolean {
  let current = this.root;
  for (const char of word) {
    if (!current.children.has(char.toLocaleLowerCase())) {
    return false;
    }
    current = current.children.get(char.toLocaleLowerCase())!;
  }
  return current.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
  let current = this.root;
  for (const char of prefix) {
    if (!current.children.has(char.toLocaleLowerCase())) {
    return false;
    }
    current = current.children.get(char.toLocaleLowerCase())!;
  }
  return true;
  }
  
    getWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    let current = this.root;

    for (const char of prefix) {
      if (!current.children.has(char.toLocaleLowerCase())) {
        return words;
      }
      current = current.children.get(char.toLocaleLowerCase())!;
    }

    const dfs = (node: TrieNode, path: string) => {
      if (node.isEndOfWord) {
        words.push(path);
      }

      for (const [char, childNode] of node.children) {
        dfs(childNode, path + char.toLocaleLowerCase());
      }
    };

    dfs(current, prefix);
    return words;
  }
}
