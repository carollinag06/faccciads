/*
===========================================================
Exercícios Práticos - Objetos
===========================================================
*/

// 1. Crie um objeto com 3 propriedades diferentes e exiba-o.
let pessoa1={
    nome: 'ana',
    idade: 20,
    sexo: 'f'
}

console.log(pessoa1)

// 2. Acesse e exiba uma propriedade usando notação de ponto e colchetes.
let pessoa2={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}

console.log(pessoa2["sexo"])

// 3. Adicione uma nova propriedade ao objeto depois de criado.
let pessoa3={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}
pessoa3.profissao='medico'

console.log(pessoa3)

// 4. Remova uma propriedade do objeto.
let pessoa4={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}
delete pessoa4.sexo
console.log(pessoa4)

// 5. Adicione um método que retorne uma string usando propriedades do objeto.
let pessoa5={
    nome: 'pedro',
    idade: 87, 
    sexo: 'm',
    apresentacao: function(){
        return `ola, meu nome é ${this.nome} e tenho ${this.idade} anos`
    }
}

console.log(pessoa5.apresentacao())

// 6. Crie um objeto aninhado (objeto dentro de objeto) e exiba um valor interno.
let pessoa6={
    nome: 'pedro',
    idade: 87,
    sexo: 'm',
    endereco:{
        cidade: 'Brasilia',
        bairro: 'samambaia sul'
    }
}

console.log(pessoa6.endereco.cidade)

// 7. Itere sobre as propriedades do objeto e exiba cada par nome/valor.
let pessoa7={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}

console.log(Object.entries(pessoa7))

// 8. Clone um objeto usando spread e altere uma propriedade no clone.
let pessoa8={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}   

let clonePessoa8={...pessoa8}
clonePessoa8.nome='ana'

// 9. Compare dois objetos com mesmo conteúdo e explique o resultado da comparação.
let pessoa9A={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}
let pessoa9B={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}

console.log(pessoa9A === pessoa9B)//vai dar false, pois são objetos que ocupam lugares diferentes na memória

// 10. Congele um objeto com Object.freeze e tente alterar uma propriedade.
let pessoa10={
    nome: 'pedro',
    idade: 87,
    sexo: 'm'
}
Object.freeze(pessoa10)
pessoa10.nome='ana'
console.log(pessoa10)
