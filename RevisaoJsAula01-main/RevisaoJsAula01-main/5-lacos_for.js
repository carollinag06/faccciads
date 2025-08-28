/*
===========================================================
Arquivo: lacos_for.js
Assunto: Estrutura de repetição for
===========================================================
console.log(1)
console.log(2)
console.log(3)
console.log(4)
console.log(5)
console.log(6)
console.log(7)
console.log(8)
console.log(9)
console.log(10)
for (let i = 1; i <= 10; i = i + 2) {
  console.log(i);
}
O `for` é usado quando sabemos o número de repetições.

Sintaxe:
for (inicialização; condição; incremento) {
  // código
}

-----------------------------------------------------------
1️⃣ Exemplo simples
-----------------------------------------------------------
for (let i = 1; i <= 5; i++) {
  console.log("Número:", i);
}

-----------------------------------------------------------
2️⃣ Decremento
-----------------------------------------------------------
for (let i = 5; i > 0; i = i - 1) {
  console.log(i);
}

-----------------------------------------------------------
3️⃣ Loop sobre arrays
-----------------------------------------------------------
let frutas = ["maçã", "banana", "uva"];
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

-----------------------------------------------------------
🔟 Boas práticas
-----------------------------------------------------------
✅ Prefira `for...of` quando for apenas percorrer arrays.  
✅ Evite loops infinitos.  
✅ Use nomes descritivos para índices.  

*/
