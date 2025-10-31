#### Usar window para contexto de pagina ao inves de carregar novo arquivo.
    EX:

     ```js
     const code = `
     <script src="meuScript.js"><\/script>
     <h1>Novo contexto</h1>
     `;
     const win = window.open();
     win.document.write(code);
     win.document.close();
     ```
#### Originais:
		1- Visualização das 25 Orquídeas - Igual ao Lab02
		2- Sistema de navegação para agrupar características de uma ou mais determinada característica:
			Ex:. (tipo de Luminosidade, todas da mesma espécie, etc.)
		3- Pagina about - Igual ao Lab02
#### Novas:
		1- Agrupar por todas características;
		3- Criar,Editar,Apagar orquidea