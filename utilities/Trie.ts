/**
 * Represents a node in the Trie.
 */
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * A Trie (Prefix Tree) data structure implementation.
 * It provides efficient insertion, search, and prefix matching for strings.
 */
export class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     * Time Complexity: O(m), where m is the length of the word.
     * @param word - The word to insert.
     */
    insert(word: string): void {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
    }

    /**
     * Searches for a word in the trie.
     * Time Complexity: O(m), where m is the length of the word.
     * @param word - The word to search for.
     * @returns true if the word is in the trie, false otherwise.
     */
    search(word: string): boolean {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char)!;
        }
        return node.isEndOfWord;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     * Time Complexity: O(m), where m is the length of the prefix.
     * @param prefix - The prefix to search for.
     * @returns true if there is a word starting with the prefix, false otherwise.
     */
    startsWith(prefix: string): boolean {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char)!;
        }
        return true;
    }
}
