# nodejs
a repository created to document learning in node.js
 curso Node.js do Zero a Maestria - Matheus Battisti
---------------------------------------------------------------------------------



------------EXPRESS----------------------------------------
as rotas são um caminho para as funcionalidades da aplicação
- www.rotas.com/produtos

npm uninstall -> remove pacotes

npm update -> atualiza os pacotes
npm update <nome-do-pacote> -> atualiza pacote especifico
npx npm-check-updates -u -> checa de algum pacote precisa de atualização
- npm install -> para atualizar

--save-dev -> para salvar módulos como devDependencies
- npm install --save-dev nodemon


Event loop
- nodejs executa o programa uma linha por vez, em sequencia. Isso nos ajuda a evitar concorrência. Precisamos lidar com bloqueios de fluxo.

módulos internos - módulos que desenvolvemos
corre modules - que vem com o node
módulos externos - instalados via npm

npm (node package manger) - gerenciador de pacotes do node.
node_modules - onde as bibliotecas ficam. Elas devem poder ser descartadas
