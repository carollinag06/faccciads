/*
===========================================================
Arquivo: operadores.js
Assunto: Todos os operadores em JavaScript
===========================================================
*/

// -------------------------------
// 1️⃣ OPERADORES ARITMÉTICOS
// -------------------------------

let a = 10;
let b = 3;

console.log("Soma:", a + b);          // 13
console.log("Subtração:", a - b);     // 7
console.log("Multiplicação:", a * b); // 30
console.log("Divisão:", a / b);       // 3.333...
console.log("Módulo:", a % b);        // 1 (resto da divisão)
console.log("Exponenciação:", a ** b);// 1000

// -------------------------------
// 2️⃣ OPERADORES DE ATRIBUIÇÃO
// -------------------------------

let x = 5;
x += 2;  //x = x + 2; x = 7
x -= 1;  //x =  x - 1; x = 6
x *= 3;  //x = x * 3; x = 18
x /= 2;  //x = x / 2; x = 9
x %= 4;  //x = x % 4; x = 1
x **= 3; //x = x ** 3; x = 1 (1 elevado a 3)

console.log("Resultado final de x:", x);

// -------------------------------
// 3️⃣ OPERADORES DE COMPARAÇÃO
// -------------------------------

console.log(5 == "5");   // true  → compara só o valor
console.log(5 === "5");  // false → compara valor e tipo
console.log(5 != "5");   // false
console.log(5 !== "5");  // true
console.log(5 > 3);      // true
console.log(5 < 3);      // false
console.log(5 >= 5);     // true
console.log(5 <= 4);     // false

// -------------------------------
// 4️⃣ OPERADORES LÓGICOS
// -------------------------------

/*
Em JavaScript, true/false podem ser influenciados por valores
"truthy" (verdadeiros) ou "falsy" (falsos).

Falsy: 0, "", null, undefined, NaN, false
Truthy: qualquer outro valor
*/

// --- AND (&&) ---
var number = 10
var number1 = 2
var number2 = 3
if(number < 2 && number1 >= 2 && number2 > 2)
{
 console.log("Todos são verdadeiros");

} // false

console.log(number < 2 && number1 >= 2);   // true
console.log(number > 2 && number1 >= 2);  // false
//console.log(false && "Olá"); // false (curto-circuito, para na esquerda)
//console.log("Texto" && 123); // 123 (retorna o último truthy)

let usuario = "Ana";
let senha = "1234";
console.log(usuario && senha ? "Login válido" : "Login inválido");
// "Login válido" (ambos são truthy)

// --- OR (||) ---



var number = 10
var number1 = 1
var number2 = true
console.log(typeof number2)

if(number < 2 || number1 >= 2 || number2 > 2)
{
 console.log("No minimo 1 e verdadeiro"); 

} // false
console.log(true || false);   // true
console.log(false || false);  // false
console.log(false || "Teste");// "Teste" (pega o primeiro truthy)
console.log("" || "Padrão");  // "Padrão" (valor vazio é falsy)

// Muito usado para valores padrão:
let nome = "" || "Convidado";
console.log(nome); // "Convidado"

// --- NOT (!) ---
var n1 = 5;
var n2 = 3;

var soma = n1 + n2;
console.log(soma);     // 8

// Aplicando negação lógica
console.log(!soma);    // false, porque 8 é "truthy"
console.log(!!soma);   // true, forçando a conversão para boolean

//soma = 8 → qualquer número diferente de 0 é considerado truthy.

//!soma → !(truthy) → false.

//!!soma → força a conversão para boolean, resultando em true.

//👉 Se a soma fosse 0, aí sim !0 seria true:
console.log(!5);  // true
console.log(!"Texto");// false (string é truthy, então nega → false)
console.log(!0);      // true (0 é falsy)

// Dupla negação (!!) → converte para boolean
console.log(!!"texto"); // true
console.log(!!0);       // false

/*
✅ Resumo prático:
- && → só dá true se todos forem verdadeiros. 
      Retorna o primeiro falsy encontrado ou o último truthy.
- || → só dá false se todos forem falsos. 
      Retorna o primeiro truthy encontrado.
- !  → inverte o valor lógico.
- !! → garante conversão para booleano.
*/

// -------------------------------
// 5️⃣ OPERADOR TERNÁRIO
// -------------------------------

let idade = 18;
let status = (idade >= 18) ? "Maior de idade" : "Menor de idade";
console.log(status); // "Maior de idade"

// -------------------------------
// 6️⃣ OPERADORES DE INCREMENTO/DECREMENTO
// -------------------------------

let y = 5;
console.log("Pós-incremento:", y++); // 5 (depois incrementa → y=6)
console.log("Agora y =", y);         // 6
console.log("Pré-incremento:", ++y); // 7 (incrementa antes)

console.log("Pós-decremento:", y = y - 1); // 7 (depois decrementa → y=6)
console.log("Agora y =", y);         // 6
console.log("Pré-decremento:", --y); // 5

// -------------------------------
// 7️⃣ OPERADORES DE TIPO
// -------------------------------

console.log(typeof 123);         // "number"
console.log(typeof "abc1234");       // "string"
console.log(typeof true);        // "boolean"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (array também é objeto)
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (bug histórico)
console.log(typeof function(){});// "function"

// instanceof – verifica instância de classe
let data = new Date();
console.log(data instanceof Date); // true
console.log(data instanceof Array);// false

// -------------------------------
// 8️⃣ OPERADORES ESPECIAIS
// -------------------------------

// delete – remove propriedade de objeto
let pessoa = { nome: "Ana", idade: 25 };
delete pessoa.idade;
console.log(pessoa); // { nome: "Ana" }

// in – verifica se existe uma propriedade
console.log("nome" in pessoa);  // true
console.log("idade" in pessoa); // false

// -------------------------------
// 9️⃣ OPERADORES BITWISE (nível de bits)
// -------------------------------

console.log(5 & 3);  // 1  (0101 & 0011 = 0001)
console.log(5 | 3);  // 7  (0101 | 0011 = 0111)
console.log(5 ^ 3);  // 6  (0101 ^ 0011 = 0110)
console.log(~5);     // -6 (inverte os bits)
console.log(5 << 1); // 10 (desloca bits p/ esquerda)
console.log(5 >> 1); // 2  (desloca bits p/ direita)

// -------------------------------
// 🔟 OPERADOR DE AGRUPAMENTO
// -------------------------------

console.log((2 + 3) * 4); // 20 → parênteses têm prioridade

// -------------------------------
// 🔥 RESUMO FINAL
// -------------------------------

/*
📌 Categorias de operadores no JS:

- Aritméticos: + - * / % **
- Atribuição: = += -= *= /= %= **=
- Comparação: == === != !== > < >= <=
- Lógicos: && || ! !!
- Ternário: condicao ? valor1 : valor2
- Incremento/Decremento: ++ --
- Tipo: typeof, instanceof
- Especiais: delete, in
- Bitwise: & | ^ ~ << >>
- Agrupamento: ( )
*/