/*
===========================================================
Arquivo: lacos_while.js
Assunto: Estrutura de repetição while
===========================================================

O `while` repete enquanto a condição for verdadeira.

-----------------------------------------------------------
1️⃣ Exemplo simples
-----------------------------------------------------------
let i = 1;
while (i <= 5) {
  console.log(i);
  i++  
}

-----------------------------------------------------------
2️⃣ Loop com condição de parada
-----------------------------------------------------------
let senha = "";
while (senha !== "1234") {
  console.log("Digite a senha:");
  
}

-----------------------------------------------------------
3️⃣ Cuidado com loops infinitos
-----------------------------------------------------------
let x = 0;
while (x < 5) {
  console.log(x);
  // x++; // se esquecer isso, vira infinito!
}

-----------------------------------------------------------
🔟 Boas práticas
-----------------------------------------------------------
✅ Sempre garanta uma forma de sair do loop.  
✅ Use while quando não souber o número exato de repetições.  

*/
