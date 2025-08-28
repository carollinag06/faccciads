/*
===========================================================
Exercícios Práticos - Estruturas de Decisão (if, else, switch)
===========================================================
*/

// 1. Crie uma variável `idade` e use um `if` para exibir "Maior de idade" se idade >= 18.
let idade = 17

if (idade >= 18) {
  console.log('maior')
}
else {
  console.log('menor')
}

// 2. Crie uma variável `hora` e use `if/else` para exibir "Bom dia" se hora < 12 e "Boa tarde" caso contrário.
hora = 10.29

if (hora < 12) {
  console.log('Bom dia!')
}

else {
  console.log('Boa tarde!')
}

// 3. Crie uma variável `nota` e use `if/else if/else` para exibir:
// "Excelente" se nota >= 9
// "Aprovado" se nota >= 7
// "Recuperação" se nota >= 5 
// "Reprovado" caso contrário
nota = 9.8

if (nota >= 9) {
  console.log('excelente')
}

else if (nota >= 7) {
  console.log('aprovado')
}

else if (nota >= 5) {
  console.log('recuperação')
}

else {
  console.log('reprovado')
}

// 4. Crie uma variável `diaSemana` (1 a 7) e use `switch/case` para exibir o nome do dia correspondente.
let diaSemana = 3; // você pode alterar o valor de 1 a 7

switch (diaSemana) {
  case 1:
    console.log("Domingo");
    break;
  case 2:
    console.log("Segunda-feira");
    break;
  case 3:
    console.log("Terça-feira");
    break;
  case 4:
    console.log("Quarta-feira");
    break;
  case 5:
    console.log("Quinta-feira");
    break;
  case 6:
    console.log("Sexta-feira");
    break;
  case 7:
    console.log("Sábado");
    break;
}

// 5. Modifique o exercício anterior para usar `default` caso o valor da variável não seja de 1 a 7.
let diasSemana = 3; // você pode alterar o valor de 1 a 7

switch (diasSemana) {
  case 1:
    console.log("Domingo");
    break;
  case 2:
    console.log("Segunda-feira");
    break;
  case 3:
    console.log("Terça-feira");
    break;
  case 4:
    console.log("Quarta-feira");
    break;
  case 5:
    console.log("Quinta-feira");
    break;
  case 6:
    console.log("Sexta-feira");
    break;
  case 7:
    console.log("Sábado");
    break;
  default:
    console.log("Dia inválido");
}

// 6. Crie uma variável `cor` e use `switch/case` para agrupar cores primárias (vermelho, azul, verde) e secundárias (amarelo, roxo, laranja).
cor = 'roxo'

switch (cor){
  case 'vermelho':
  case 'azul':
  case 'verde':
    console.log('primarios')
    break;
  case 'amarelo':
  case 'roxo':
  case 'laranja':
    console.log('secundaio')
    break;
}

// 7. Crie um `if` que verifique se um número é positivo, negativo ou zero, e exiba a mensagem correspondente.
n= -97

if (n >=1){
  console.log(positivo)
} 

else if (n <= -1){
  console.log(negativo)
}
else {
  console.log(zero)
}

// 8. Crie um `if/else` que verifica se um usuário pode acessar um sistema com base em idade >= 18.
idade = 17

if (idade >= 18) {
  console.log('acesso permitido')}
else {
  console.log('acesso negado')}

// 9. Crie um `switch` que exiba uma mensagem diferente para cada mês do ano (1 a 12), usando `default` para valor inválido.
let mês = 4;

switch (mês) {
  case 1:
    
    console.log("Janeiro");  
    break;
  case 2:  
    console.log("Fevereiro");
    break;
  case 3:  
    console.log("Março"); 
    break;
  case 4: 
    console.log("Abril");
    break;
  case 5:
    console.log("Maio");
    break;
  case 6:
    console.log("Junho");
    break;
  case 7:
    console.log("Julho");
    break;
  case 8:
    console.log("Agosto");
    break;
  case 9:
    console.log("Setembro");
    break;
  case 10:
    console.log("Outubro");
    break;
  case 11:
    console.log("Novembro");
    break;
  case 12:
    console.log("Dezembro");
    break;
  default:
    console.log("Mês inválido");
  }

// 10. Crie um `if/else if/else` que classifica a velocidade de um veículo:
// <= 40 km/h → "Devagar"
// <= 80 km/h → "Moderado"
// <= 120 km/h → "Rápido"
// > 120 km/h → "Muito rápido"
let velocidade = 130;

if (velocidade <= 40) {
  console.log("Devagar");}
else if (velocidade <= 80) {
  console.log("Moderado");}
else if (velocidade <= 120) {
  console.log("Rápido");} 
else {
  console.log("Muito rápido");}

// 11. Crie uma variável booleana `isAdmin` e use `if/else` para exibir se o usuário tem acesso ou não.
let isAdmin = false;

if (isAdmin) {
  console.log("Acesso permitido");
}
else {
  console.log("Acesso negado");
}

// 12. Crie uma variável `temperatura` e use `switch` para exibir:
// "Frio" se 0, 1, 2
// "Agradável" se 3, 4, 5
// "Quente" se 6, 7, 8
// "Desconhecido" para outros valores
let temperatura = 5;
switch (temperatura) {
  case 0:
  case 1:
  case 2:
    console.log("Frio");
    break;

  case 3:
  case 4:
  case 5:
    console.log("Agradável");
    break;

  case 6:
  case 7:
  case 8:
    console.log("Quente");
    break;

  default:
    console.log("Desconhecido");
    break;
}


// 13. Crie um `if` que verifica se um número é par ou ímpar.
let numero = 9;
if (numero % 2 === 0) {
  console.log("Par");
}
else {
  console.log("Ímpar");
}

// 14. Crie um `switch` para exibir a estação do ano com base em um número de 1 a 4.
let estacao = 3;
switch (estacao) {
  case 1:
    console.log("Primavera");
    break;
  case 2:
    console.log("Verão");
    break;
  case 3:
    console.log("Outono");
    break;
  case 4:
    console.log("Inverno");
    break;
  default:
    console.log("Número inválido");
    break;
}

// 15. Crie um `if/else if/else` para classificar idade de uma pessoa:
// 0-12 → Criança
// 13-19 → Adolescente
// 20-59 → Adulto
// 60+ → Idoso
idade = 70

if (idade <= 12) {
  console.log('Criança')}
else if (idade >= 13 && idade <= 19) {
  console.log('Adolescente')} 
else if (idade >= 20 && idade <= 59) {
  console.log('Adulto')}
else {
  console.log('Idoso')}

// 16. Crie uma variável `saldo` e use `if` para verificar se é positivo, negativo ou zero.
let saldo = 50

if (saldo > 0) {
  console.log('positivo')}
else if (saldo < 0) {
  console.log('negativo')}

// 17. Crie uma variável `letra` e use `switch` para verificar se é vogal ou consoante.
let letra = 'a'

switch (letra) {
  case 'a': 
  case 'e':
  case 'i':
  case 'o':
  case 'u':
    console.log('vogal')
    break;
  default:
    console.log('consoante')
    break;
}

// 18. Crie um `if/else` que verifica se um número está dentro de um intervalo (10 a 20).
n1 = 15

if (n1 >= 10 && n1 <= 20) {
  console.log('dentro do intervalo')}
else {
  console.log('fora do intervalo')}

// 19. Crie um `switch` para exibir mensagens diferentes para valores 1, 2, 3 e default.
let valor = 2

switch (valor) {
  case 1:
    console.log('um')
    break;
  case 2: 
    console.log('dois')
    break;
  case 3:
    console.log('tres')
    break;
  default:
    console.log('outro valor')
    break;
}

// 20. Crie um `if` que verifica se um ano é bissexto (divisível por 4, mas não por 100, exceto se divisível por 400).
ano = 2020
if ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)) {
  console.log('bissexto')}
else {
  console.log('não é bissexto')}

// 21. Crie um `if/else` que verifica se uma string contém pelo menos 5 caracteres.
objeto = 'casa'

if (objeto.length >= 5) {
  console.log('tem 5 ou mais caracteres')}
else {
  console.log('tem menos de 5 caracteres')}

// 22. Crie uma variável `nota1` e `nota2` e use `if/else` para exibir se a média é maior ou igual a 7.
nota1 = 10
nota2 = 8
media = (nota1 + nota2) / 2

if (media >= 7) {
  console.log('A média é maior ou igual a 7')
}
else {
  console.log('A média é menor que 7')
}

// 23. Crie um `switch` que exiba o tipo de triângulo com base em um número de 1 a 3 (1: Equilátero, 2: Isósceles, 3: Escaleno).
let tipoTriangulo = 2;

switch (tipoTriangulo) {
  case 1:
    console.log('Equilátero');
    break;
  case 2:
    console.log('Isósceles');
    break;
  case 3:
    console.log('Escaleno');
    break;
  default:
    console.log('Tipo de triângulo desconhecido');
    break;
}

// 24. Crie um `if/else` que verifica se uma variável `senha` corresponde à senha correta.
let senha = '1234';
if (senha === '1234') {
  console.log('Senha correta');
} else {
  console.log('Senha incorreta');
}

// 25. Crie um `switch` que exiba a quantidade de dias do mês baseado em uma variável `mes` (1 a 12).
let mes = 2;
switch (mes) {
  case 1:
  case 3:
  case 5:
  case 7:
  case 8:
  case 10:
  case 12:
    console.log('31 dias');
    break;
  case 4:
  case 6:
  case 9:
  case 11:
    console.log('30 dias');
    break;
  case 2:
    console.log('28 ou 29 dias');
    break;
  default:
    console.log('Mês inválido');
    break;
}

// 26. Crie um `if/else` que verifica se um número é múltiplo de 3, de 5, ou de ambos.
let numero1 = 15;

if (numero1 % 3 === 0 && numero1 % 5 === 0) {
  console.log('Múltiplo de 3 e 5');
} else if (numero1 % 3 === 0) {
  console.log('Múltiplo de 3');
} else if (numero1 % 5 === 0) {
  console.log('Múltiplo de 5');
} else {
  console.log('Não é múltiplo de 3 nem de 5');
}

// 27. Crie um `switch` que retorna "Sim" para caso 1 e 2, "Não" para caso 3 e 4, e "Talvez" para outros.
let caso = 2;

switch (caso) {
  case 1:
  case 2:
    console.log('Sim');
    break;
  case 3:
  case 4:
    console.log('Não');
    break;
  default:
    console.log('Talvez');
    break;
}

// 28. Crie um `if` que verifica se uma variável `temperatura` está em uma faixa entre 18 e 25 graus.
let temperatura1 = 22;
if (temperatura1 >= 18 && temperatura1 <= 25) {
  console.log('Temperatura agradável');
} else {
  console.log('Temperatura fora da faixa');
}

// 29. Crie um `switch` que agrupe vários casos em uma mesma ação (por exemplo, cores quentes e frias).
cor = 'vermelho';

switch (cor) {
  case 'vermelho':
  case 'laranja':
  case 'amarelo':
    console.log('Cor quente');
    break;
  case 'verde':
  case 'azul':
  case 'violeta':
    console.log('Cor fria');
    break;
  default:
    console.log('Cor desconhecida');
   break;
}

// 30. Crie um `if/else` que combina duas condições (ex: idade >= 18 e isAdmin = true) para permitir ou negar acesso.
let idade1 = 34;
let isAdmin1 = true;

if (idade1 >= 18 && isAdmin1) {
  console.log('Acesso permitido');
} else {
  console.log('Acesso negado');
}
