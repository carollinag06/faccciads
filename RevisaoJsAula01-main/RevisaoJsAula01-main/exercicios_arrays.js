/*
===========================================================
Exercícios Práticos - Arrays
===========================================================
*/

// 1. Crie um array com 5 elementos e exiba o terceiro.
let array = [1, 2, 3, 4, 5];
console.log(array[2]);

// 2. Adicione um elemento ao final do array.
array.push(6);
console.log(array);

// 3. Remova o primeiro elemento do array.
array.shift();
console.log(array);

// 4. Use map para transformar todos os elementos em strings maiúsculas.
let frutas = ['maçã', 'banana', 'laranja'];
let frutasMaiusculas = frutas.map(fruta => fruta.toUpperCase());
console.log(frutasMaiusculas);

// 5. Use filter para criar um novo array apenas com números pares.
let numeros = [1, 2, 3, 4, 5, 6];
let numerosPares = numeros.filter(n => n % 2 === 0);
console.log(numerosPares);

// 6. Use reduce para somar todos os números de um array.
let soma = numeros.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
console.log(soma);

// 7. Use find para encontrar o primeiro elemento maior que 10.
let numeros2 = [5, 8, 12, 19, 3];
let primeiroMaiorQue10 = numeros2.find(n => n > 10);
console.log(primeiroMaiorQue10);

// 8. Ordene um array de números em ordem crescente.
let numeros3 = [10, 5, 8, 1, 7];
numeros3.sort((a, b) => a - b);
console.log(numeros3);

// 9. Inverta a ordem dos elementos de um array.
numeros3.reverse();
console.log(numeros3);

// 10. Faça a troca de valores entre dois índices usando destructuring.
let arr = [1, 2, 3, 4];
[arr[0], arr[2]] = [arr[2], arr[0]];
console.log(arr); 
