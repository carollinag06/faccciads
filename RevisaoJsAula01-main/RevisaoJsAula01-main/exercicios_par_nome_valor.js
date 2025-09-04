/*
===========================================================
Exercícios Práticos - Par Nome/Valor
===========================================================
*/

// 1. Declare uma variável string e exiba seu valor no console.
let nome='carol'
console.log(nome)

// 2. Crie um objeto com pelo menos 3 pares nome/valor e exiba uma das propriedades.
let pessoa={
    nome: 'carol',
    idade: 30,
    sexo: 'f'
}
console.log(pessoa.idade)

// 3. Crie um array com 5 elementos e exiba o terceiro elemento.
let array=['maça', 'banana', 'laranja', 'uva', 'pera']
console.log(array[3])

// 4. Crie um objeto e adicione uma nova propriedade dinamicamente.
let carro={
    marca: 'ford',
    modelo: 'carro',
    ano: 2020
}

carro.ano = 2025
console.log(carro)

// 5. Mostre como acessar um valor de um objeto usando colchetes e uma variável.
let pessoa2={
    nome: 'ana',
    idade: 25,}
    
console.log(pessoa2['nome'])

// 6. Crie uma função que recebe um objeto e exibe as chaves e valores (usando for...in).
let pessoa3={
    nome: 'ana',
    idade: 25,
    sexo: 'f'
}

for(n in pessoa3){
    console.log(pessoa3[n])
}

// 7. Declare um objeto aninhado (objeto dentro de objeto) e exiba um valor profundo.
let animal={
    tipo: 'cachorro',
    raca: 'labrador',
    dono:{
        nome: 'carol',
        idade: 30
    }
}

console.log(animal.dono.nome)

// 8. Crie um array e mostre que o índice é o nome e o valor é o conteúdo.
let frutas=['maça', 'banana', 'laranja', 'uva', 'pera']
for(i in frutas){
    console.log(`índice: ${i}, valor: ${frutas[i]}`)
}

// 9. Crie uma variável com escopo global e outra local dentro de função e mostre seus valores.


// 10. Modifique o valor de uma propriedade de um objeto e exiba antes e depois.
