
/*
===========================================================
Exercícios Práticos - Operadores em JavaScript
===========================================================
*/

// 1. Declare duas variáveis numéricas e exiba a soma usando o operador `+`.
var n1 = 1;
var n2 = 2;

console.log(n1, '+', n2, '=', n1 + n2)

// 2. Declare duas variáveis numéricas e exiba a subtração usando o operador `-`.
var n1 = 5;
var n2 = 2;

console.log(n1, '-', n2, '=', n1 - n2)

// 3. Declare duas variáveis numéricas e exiba a multiplicação usando o operador `*`.
var n1 = 20;
var n2 = 8;

console.log(n1, '*', n2, '=', n1 * n2)

// 4. Declare duas variáveis numéricas e exiba a divisão usando o operador `/`.
var n1 = 100;
var n2 = 5;

console.log(n1, '/', n2, '=', n1 / n2)

// 5. Declare duas variáveis numéricas e exiba o resto da divisão usando `%`.
var n1 = 20;
var n2 = 3;

console.log(n1, '%', n2, '=', n1 % n2)

// 6. Use o operador de exponenciação `**` para calcular 2 elevado a 5.
var n1 = 2;
var n2 = 5;

console.log(n1, '**', n2, '=', n1 ** n2)

// 7. Crie uma variável e use o operador `+=` para somar um valor a ela.
var n1 = 20;
var n2 = 8;

console.log(n1, '+', n2, '=', n1 += n2)

// 8. Crie uma variável e use o operador `-=` para subtrair um valor dela.
var n1 = 20;
var n2 = 8;

console.log(n1, '-', n2, '=', n1 -= n2)

// 9. Crie uma variável e use o operador `*=` para multiplicar seu valor por outro.
var n1 = 20;
var n2 = 8;

console.log(n1, 'x', n2, '=', n1 *= n2)

// 10. Crie uma variável e use o operador `/=` para dividir seu valor por outro.
var n1 = 20;
var n2 = 2;

console.log(n1, '/', n2, '=', n1 /= n2)

// 11. Declare duas variáveis e use o operador `==` para comparar seus valores.
var n1 = '5';
var n2 = 5;

console.log(n1, '=', n2, '=', n1 == n2)

// 12. Declare duas variáveis e use o operador `===` para comparar valor e tipo.
var n1 = '5';
var n2 = 5;

console.log(n1, '=', n2, '=', n1 === n2)

// 13. Declare duas variáveis e use o operador `!=` para verificar se são diferentes (valores).
var n1 = 0;
var n2 = 5;

console.log(n1, '!=', n2, '=', n1 != n2)

// 14. Declare duas variáveis e use o operador `!==` para verificar se são diferentes (valor e tipo).
var n1 = 0;
var n2 = 5;

console.log(n1, '!=', n2, '=', n1 !== n2)

// 15. Compare se uma variável é maior que outra usando `>`.
var n1 = 9;
var n2 = 5;

console.log(n1, 'é maior que', n2, '=', n1 > n2)

// 16. Compare se uma variável é menor que outra usando `<`.
var n1 = 1;
var n2 = 3;

console.log(n1, 'é menor que', n2, '=', n1 < n2)

// 17. Compare se uma variável é maior ou igual a outra usando `>=`.
var n1 = 17;
var n2 = 15;

console.log(n1, 'é maior ou igual que', n2, '=', n1 >= n2)

// 18. Compare se uma variável é menor ou igual a outra usando `<=`.
var n1 = 10;
var n2 = 12;

console.log(n1, 'é menor ou igual que', n2, '=', n1 <= n2)

// 19. Crie uma expressão com `&&` que só retorne verdadeiro se duas condições forem verdadeiras.
var n1 = 10;
var n2 = 10;

console.log(n1, 'é igual a', n2, '=', (n1 == n2 && typeof n1 == "number"));

// 20. Crie uma expressão com `||` que retorne verdadeiro se pelo menos uma condição for verdadeira.
var n1 = 10;
var n2 = 10;

console.log(n1, 'é igual ou maior que', n2, '=', (n1 == n2 || n1 >= n2));

// 21. Use o operador `!` para inverter o valor booleano de uma variável.
var n1 = 10;
var n2 = 10;

console.log(n1, 'é igual a', n2, '=', (n1 == n2 || n1 >= n2));

// 22. Use o operador ternário `condicao ? valor1 : valor2` para verificar se um número é par ou ímpar.
let animais = 1
let x = (animais >= 1) ? 'tem animais' : 'nao tem animais'
console.log(x)

// 23. Use o operador `typeof` para verificar o tipo de uma variável string.
let nome = 'ana'
console.log(typeof nome)

// 24. Use o operador `typeof` para verificar o tipo de uma variável número.
let idade = 18
console.log(typeof idade)

// 25. Use o operador `typeof` para verificar o tipo de uma variável booleana.
let éVerdade = true
console.log(typeof éVerdade)

// 26. Crie um objeto e use o operador `delete` para remover uma de suas propriedades.
let aluno = { nome: 'ana', matricula: 12334 };
delete aluno.matricula;
console.log(aluno)

// 27. Use o operador `in` para verificar se uma propriedade existe em um objeto.
let frutas = { nome: 'maça', validade: '10 dias' }
console.log('validade' in frutas)

// 28. Use o operador `instanceof` para verificar se um objeto é instância de uma função construtora.
function Nome() {
  this.nome = 'nana';
  this.idade = 12;
}

let pessoa = new Nome();

console.log(pessoa instanceof Nome);


// 29. Crie uma operação com `??` para definir um valor padrão caso a variável seja `null` ou `undefined`.

// 30. Combine operadores aritméticos, lógicos e de comparação em uma expressão complexa e exiba o resultado.
