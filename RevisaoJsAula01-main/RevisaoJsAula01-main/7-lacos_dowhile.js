/*
===========================================================
Arquivo: lacos_dowhile.js
Assunto: Estrutura de repetição do...while
===========================================================

O `do...while` sempre executa pelo menos uma vez.

-----------------------------------------------------------
1️⃣ Exemplo simples
-----------------------------------------------------------
let i = 1;
do {
  console.log(i);
  i++;
} while (i <= 5);

-----------------------------------------------------------
2️⃣ Diferença para while
-----------------------------------------------------------
let x = 10;
do {
  console.log("Executa uma vez!");
} while (x < 5);

while(x < 5){
console.log("Executa uma vez!");
}
-----------------------------------------------------------
🔟 Boas práticas
-----------------------------------------------------------
✅ Use quando a condição precisa ser verificada **após** executar o bloco.  

*/
