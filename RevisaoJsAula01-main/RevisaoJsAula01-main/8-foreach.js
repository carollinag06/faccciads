/*
===========================================================
Arquivo: foreach.js
Assunto: Método forEach em JavaScript
===========================================================
*/

// -------------------------------
// 1️⃣ O que é o forEach?
// -------------------------------
// O método `forEach` é usado em arrays para percorrer 
// todos os elementos, executando uma função callback 
// para cada item. Ele não retorna um novo array, 
// apenas executa a ação para cada elemento.

// Sintaxe:
let numeros1 = [10, 20, 30];

numeros1.forEach(function(n) {
  console.log("Número:", n);
});


let array = [1, 2, 3];
array.forEach(function(elemento, indice, array) {
  console.log("Elemento:", elemento, "Índice:", indice);
});

let numeros2 = [10, 20, 30];

numeros2.forEach(function(valor, posicao, arr) {
  console.log("Valor:", valor);     // 10, depois 20, depois 30
  console.log("Posição:", posicao); // 0, depois 1, depois 2
  console.log("Array:", arr);       // sempre [10, 20, 30]
});
// -------------------------------
// 2️⃣ Função Callback
// -------------------------------
// O callback recebe 3 parâmetros (todos opcionais):
// - elemento: valor atual do array
// - índice: posição do elemento
// - array: o array original

let frutas = ["Maçã", "Banana", "Laranja"];
frutas.forEach((fruta, i, arr) => {
  console.log(`${i}: ${fruta} | Array completo: ${arr}`);
});

// -------------------------------
// 3️⃣ Diferença para map()
// -------------------------------
// - forEach: não retorna nada (undefined), apenas executa
// - map: retorna um NOVO array com os resultados

let numeros = [1, 2, 3];
let resultadoForEach = numeros.forEach(n => n * 2);
console.log(resultadoForEach); // undefined

let resultadoMap = numeros.map(n => n * 2);
console.log(resultadoMap); // [2, 4, 6]

// -------------------------------
// 4️⃣ Saindo de um forEach
// -------------------------------
// ❌ Não é possível usar break ou continue dentro de um forEach.
// ✅ Caso precise parar, use um `for` normal ou `some/every`.

numeros.forEach(n => {
  if (n === 2) {
    console.log("Achei o número 2!");
    // return aqui só pula para o próximo, não interrompe o loop
  }
});

// -------------------------------
// 5️⃣ Boas práticas
// -------------------------------
// ✅ Use forEach quando quiser apenas percorrer os elementos
// ✅ Use map, filter ou reduce quando precisar transformar dados
