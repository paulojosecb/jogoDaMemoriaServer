Este projeto faz parte do trabalho final da disciplina de Redes de Computadores do curso de Sistemas e Mídias Digitais da Universidade Federal do Ceará.

Aluno: Paulo José

O projeto trata-se de um servidor Node.js para jogo da memória multiplayer para iOS utilizando TCP Sockets. Em conjunto com este projeto também o repositório https://github.com/paulojosecb/JogoDaMemoria que contem o código para o aplicativo iOS do jogo.

Neste repositório encontra-se o código do servidor Node.js. Tal projeto foi estruturado da seguinte maneira:

- server.js: Arquivo responsável pela criação do servidor Socket TCP e do gerenciamento de conexões de sockets e do envio e recebimento de mensagens.
- GameState: Classe responsável por gerenciar todo o estado do jogo, receber e dar parse nos comandos e direcionar os comandos necessários para o GameStateDelegate
- GameStateDelegate: Classe responsável por instanciar comandos e enviar as mensagens necessárias para todas as conexões Socket