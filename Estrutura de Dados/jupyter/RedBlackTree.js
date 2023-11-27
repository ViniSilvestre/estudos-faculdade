class Node {
    constructor(data, color) {
        this.data = data;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    // Função de inserção
    insert(data) {
        if (this.root === null) {
            this.root = new Node(data);
            this.root.color = 0; //raiz sempre preta
        } else {
            this.root = this.auxInsertRec(this.root, data);
            this.root.color = 0; // A raiz sempre deve ser preta
        }
    }

    //Função auxiliar
    auxInsertRec(root, data) {
        //Valida se o nó atual é nulo, cria um novo nó
        if (root == null) {
            return new Node(data, 1);
        }

        /**
         * Efetuando a comparação e as chamadas recusivas com a função auxInsertRec
         * os sinais  de menor(<) ou maior indica se o novo nó sera inserido a esquerda
         * ou a direita
         * */
        if (data < root.data) {
            root.left = this.auxInsertRec(root.left, data)
        } else if (data > root.data) {
            root.right = this.auxInsertRec(root.right, data)
        } else {
            return root;
        }
        return root; //devolve o NÓ já modificado
    }

    //Rotações

    leftRotate(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        if (newRoot.left !== null) {
            newRoot.left.parent = node;
        }
        newRoot.parent = node.parent;
        if (node.parent === null) {
            this.root = newRoot;
        } else if (node === node.parent.left) {
            node.parent.left = newRoot;
        } else {
            node.parent.right = newRoot;
        }
        newRoot.left = node;
        node.parent = newRoot;
    }

    rightRotate(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        if (newRoot.right !== null) {
            newRoot.right.parent = node;
        }
        newRoot.parent = node.parent;
        if (node.parent === null) {
            this.root = newRoot;
        } else if (node === node.parent.right) {
            node.parent.right = newRoot;
        } else {
            node.parent.left = newRoot;
        }
        newRoot.right = node;
        node.parent = newRoot;
    }
    //Teste para impressão da arvore em ASCII
    printTree(node = this.root, level = 0, prefix = 'Root: ') {
        if (node !== null) {
            console.log('  '.repeat(level) + prefix + node.data + (node.color === 0 ? ' (Preto)' : ' (Vermelho)'));
            this.printTree(node.left, level + 1, 'L: ');
            this.printTree(node.right, level + 1, 'R: ');
        }
    }
}

//Vamo ver se funciona isso aqui
const tree = new RedBlackTree();

tree.insert(10);
tree.insert(35);
tree.insert(15);
tree.insert(24);
tree.insert(7);
tree.insert(10);
tree.insert(5);
tree.insert(18);
tree.insert(22);
tree.insert(7);
tree.insert(100);

//Será que vai sair a árvore em ASCII
tree.printTree();

