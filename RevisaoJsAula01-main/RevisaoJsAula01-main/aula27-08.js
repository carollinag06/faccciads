/*const frutas = ['maça', 'banana', 'morango']
console.log(frutas.length)

frutas.push('pera')
console.log(frutas)
//console.log(frutas.find('banana'))
frutas.pop()
console.log(frutas)*/

//LAÇOS
for(let i = 0; i <= 20; i+=1){
    console.log(i)
}

for(let i = 10; i >= 0; i--){
    console.log(i)
}


n=0

while(n<=13){
    console.log(n)
    n++
}

x=1
do{
    console.log(x)
    x++
}while(x>5)


let numeros = [12, 25, 38, 41, 59]

numeros.forEach(function(elemento, indice){
    console.log('numeros:', elemento, 'é o:', indice+1,'°')
})

//FUCTIONS
function saudacao(){
    console.log('ola')
}
saudacao()

//declarada
function saudacao1(nome){
    return `ola ${nome}`;
}
var nome=saudacao1('caroll')
console.log(nome)


//nao declarada
const somar = function(a, b){
    return a + b;
}
console.log(somar(5, 10));


//arrow function
const multiplicar = (a, b) => a * b;
console.log(multiplicar(5, 10));

const saudacao2 = (nome) => `ola ${nome}`;
console.log(saudacao2('caroll'));
