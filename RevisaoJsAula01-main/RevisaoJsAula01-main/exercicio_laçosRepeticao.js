/*
===========================================================
Exercícios Práticos - Laços de Repetição (for, while, do...while, forEach)
===========================================================
*/

// ---------- FOR ----------

// 1. Use um `for` para exibir os números de 1 a 10.
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// 2. Use um `for` para exibir apenas os números pares de 0 a 20.
for (let i=0; i <=20; i+=2){
    console.log(i)
}

// 3. Crie um `for` que exiba a tabuada do 5 (de 1 até 10).
for (let i =1; i<=10; i+=1){
    console.log(i, ' x 5 =', 5*i)
}

// 4. Use um `for` para somar todos os números de 1 a 100 e exiba o resultado.
var soma = 0;
for(let i=1; i<=100; i+=1){
    soma += i;
    console.log(i)
}

console.log(soma)

// 5. Crie um `for` que exiba os elementos de um array `["a", "b", "c", "d"]`.
var array = ["a", "b", "c", "d"];

for (let i = 0; i < array.length; i++){
    console.log(array[i])
}

// 6. Use um `for` para exibir os quadrados dos números de 1 a 10.


// 7. Crie um `for` que conte de 10 até 1 (contagem regressiva).
for(let i= 10; i >= 1; i--){
    console.log(i)
}

// 8. Crie um `for` que percorra um array de notas `[7, 8, 5, 10]` e exiba cada nota.
const notas = [7, 8, 5, 10]
for(let i = 0; i <= 3; i++){
    console.log(notas[i])
}

// 9. Crie um `for` que exiba apenas os múltiplos de 3 entre 1 e 30.
for(let i = 0; i <= 30; i+=3){
    console.log(i)
}

// 10. Use um `for` para inverter e exibir os caracteres de uma string "JavaScript".
let a = 'javascript'
for(let i = a.length -1; i >= 0; i--){
    console.log(a[i])
}

// ---------- WHILE ----------

// 11. Crie um `while` que exiba os números de 1 a 10.
x=1
while(x <= 10){
    console.log(x)
    x++
}

// 12. Crie um `while` que exiba os números pares de 0 a 20.
x=0
while(x <= 10){
    console.log(x)
    x+=2
}

// 13. Crie um `while` que conte de 10 até 1 (regressivo).
x=10
while(x >= 0){
    console.log(x)
    x--
}

// 14. Crie um `while` que exiba os múltiplos de 5 de 0 até 50.
x=0
while(x <= 50){
    console.log(x)
    x+=5
}

// 15. Crie um `while` que exiba a soma dos números de 1 a 100.
x=1
soma=0
while(x <= 100){
    soma += x  
    x++
}
console.log(soma)

// 16. Crie um `while` que percorra um array de nomes `["Ana", "Carlos", "João"]` e exiba cada nome.
const nomes = ["Ana", "Carlos", "João"]
x=0
while(x <= 2){
    console.log(nomes[x])
    x++
}

// 17. Crie um `while` que exiba os números de 1 a 50, mas pule os múltiplos de 4.
x=1
while(x <= 50){
    if(x % 4 !== 0){
        console.log(x)
    }
    x++
}

// 18. Crie um `while` que exiba os dígitos de um número, por exemplo 123 → 1, 2, 3.
let num = 123;
let numStr = num.toString();
let index = 0;
while (index < numStr.length) {
  console.log(numStr[index]);
  index++;
}

// 19. Crie um `while` que exiba o fatorial de 5 (5! = 120).
num = 5;
cont = 1;
while(cont <= num){
    console.log(num*(num-1))
    cont++
}
// 20. Crie um `while` que calcule a média dos valores de um array `[10, 20, 30, 40]`.
const valores = [10, 20, 30, 40];
let somaValores = 0;
let i = 0;

while (i <= valores.length){
    somaValores=valores[1]+somaValores
    i++
}

console.log(somaValores)

// ---------- DO...WHILE ----------

// 21. Crie um `do...while` que exiba os números de 1 a 10.
let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 10);

// 22. Crie um `do...while` que exiba os números pares de 0 a 20.
let i = 0; 
do {
    console.log(i)
    i+=2
}while (i <= 20);

// 23. Crie um `do...while` que exiba os múltiplos de 7 até 70.
let i = 0
do{
    console.log(i)
    i+=7
}while (i<= 70);

// 24. Crie um `do...while` que exiba a contagem regressiva de 5 até 1.
let i=5
do{
    console.log(i)
    i--
}while (i>=0);

// 25. Crie um `do...while` que pergunte uma senha até que o usuário acerte ("1234").
let senha;
do {
  senha = prompt("Digite a senha:");
} while (senha !== "1234");
console.log("Senha correta!");

// 26. Crie um `do...while` que exiba a soma dos números de 1 a 50.
let n = 1;
let soma = 0;

do{
    soma+=n
    n++
}while(n<=50)

console.log(soma)

// 27. Crie um `do...while` que percorra os elementos de um array `[2, 4, 6, 8]` e exiba cada um.
let e = [2, 4, 6, 8]
let contador = 0
do{
    console.log(e[contador])
    contador++
}while (contador < e.length)

// 28. Crie um `do...while` que exiba os números ímpares de 1 a 15.
let ns = 1;
do {
  console.log(ns);
  ns += 2;
} while (ns <= 15);

// 29. Crie um `do...while` que mostre os caracteres de uma string "Olá" um por um.
let saudacao = 'ola'
let cont=0
do{
    console.log(saudacao[cont])
    cont++
}while(cont<saudacao.length)

// 30. Crie um `do...while` que simule uma contagem de vidas de um jogo (3 até 0).
let vidas = 3
do{
    console.log(vidas)
    vidas--
}while(vidas>0)
console.log('Game over')

// ---------- FOREACH ----------

// 31. Use `forEach` para exibir todos os elementos do array `[1, 2, 3, 4]`.
let array=[43, 65, 79, 34]

array.forEach(function(n){
    console.log(n)
})

// 32. Use `forEach` para exibir cada nome em `["Ana", "João", "Maria"]`.
let nomess = ['ana', 'ricardo', 'joao']

nomess.forEach(function(n){
    console.log(n)
})

// 33. Use `forEach` para exibir cada elemento e seu índice no array `["a", "b", "c"]`.
let letras = ['a', 'b', 'c']

letras.forEach(function(elemento, indice){
    console.log("A letra:", elemento, 'esta em:', indice+1,'º');
})

// 34. Use `forEach` para exibir o dobro de cada número em `[2, 4, 6, 8]`.
let nums = [2, 4, 6, 8]

nums.forEach(function(n){
    console.log(n*2)
})

// 35. Use `forEach` para somar todos os números de `[1, 2, 3, 4, 5]` e exibir o total.
let total = 0;
numeros = [4, 98, 17, 53]

numeros.forEach(function(n){
    console.log(total+=n)})

// 36. Use `forEach` para exibir apenas os números pares de `[1, 2, 3, 4, 5, 6]`.
let pares = [1, 2, 3, 4, 5, 6]

pares.forEach(function(n){
    if (n%2 == 0){
        console.log(n)}
    })

// 37. Use `forEach` para exibir a quantidade de caracteres de cada palavra em `["carro", "casa", "sol"]`.
let palavras = ["carro", "casa", "sol"]

palavras.forEach(function(n){
    console.log(n.length)
    })

// 38. Use `forEach` para criar uma string com todos os elementos de `[ "JS", "é", "top" ]` separados por espaço.
let palavras2 = [ "JS", "é", "top" ]
let frase = '';

palavras2.forEach(function(n){
    frase += n + ' ';
})

console.log(frase);

// 39. Use `forEach` para calcular o quadrado de cada número em `[1, 2, 3, 4]`.
let numeros3 = [1, 2, 3, 4];

numeros3.forEach(function(n){
    console.log(n*n)
})

// 40. Use `forEach` para exibir a soma acumulada dos números de `[10, 20, 30]`.
let somaAcumulada = 0;
let numeros4 = [10, 20, 30];

numeros4.forEach(function(n){
    somaAcumulada+=n
})

console.log(somaAcumulada)
