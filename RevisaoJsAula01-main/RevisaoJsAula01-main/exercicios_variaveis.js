/*
===========================================================
Exercícios Práticos - Variáveis (var, let, const)
===========================================================
*/

// 1. Declare uma variável com `var` e atribua uma string com seu nome. Exiba no console.
var nome = "caroll";
console.log(typeof nome);
console.log("meu nome é", nome);

// 2. Declare uma variável com `let` contendo um número e depois altere esse número para outro valor.
let idade = 19;
console.log("idade:", idade);
idade = 20;
console.log("idade:", idade);

// 3. Declare uma constante `const` com um array vazio. Adicione três elementos a esse array e exiba.
const nomes = [];
nomes.push("Carol", "lele", "lala");
console.log("os nomes sao:", nomes);

// 4. Escreva um bloco `if` que declare uma variável `var` dentro dele. Exiba essa variável fora do bloco.
if (true){
var nome = "lulu";
}

console.log(nome);
    
// 5. Escreva um bloco `if` que declare uma variável `let` dentro dele. Tente exibir essa variável fora do bloco (comente a linha que causa erro).
if (true){
    let nome ="lala";
}
console.log(nome) //erro

// 6. Tente redeclarar uma variável usando `var` no mesmo escopo. Faça o mesmo com `let` e observe o erro.
var data = 10;
var data=12;

let nome = "lolo";
let nome = "lale";//erro

console.log(nome, data);

// 7. Declare uma variável com `const` que contém um objeto com duas propriedades. Altere uma dessas propriedades e exiba o objeto.
const nome={nome:"carol", idade:20};
nome.idade = 22;
console.log(nome);

// 8. Declare uma variável com `let` sem inicializá-la. Depois atribua um valor e exiba.
let nome;
nome="maria";
console.log(nome);

// 9. Demonstre hoisting declarando uma variável com `var` depois de usá-la (exiba antes da declaração).
console.log(nome);

var nome = "mumuu";

// 10. Crie uma função que declare uma variável `var` dentro dela e tente acessar essa variável fora da função (explique o resultado).

function ExibirNome(){
  var nome = "Caroll";
  return nome;
}

console.log("O retorno da funçao e:", ExibirNome());
