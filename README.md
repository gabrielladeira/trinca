# Os Churrascos da Trinca

Para facilitar a organização dos churrascos da Trinca, essa aplicação visa gerenciar esses churrascos onde deve ser possível:

* Incluir um novo churrasco com data, descrição e observações adicionais;
* Adicionar e remover participantes (colocando o seu valor de contribuição);
* Colocar um valor sugerido por usuário de contribuição (valor com e sem bebida inclusa);
* Visualizar os detalhes do churrasco, total de participantes e valor arrecadado.
* Para ajudá-lo, elaboramos um protótipo que você pode utilizar (ou não) para projetar sua solução:http://tinyurl.com/zn8ncg3.

Framework:
    - Backend: .Net Core 2.2
    - Frontend: React.js (Node.js v11.13)

Banco de dados:
    - MongoDB (https://www.mongodb.com/)

Dependêcias:
    - Yarn (https://yarnpkg.com/lang/pt-br/docs/install)
    - Docker (https://www.docker.com/)
    - docker-compose (https://docs.docker.com/compose/install/)

Estrutura principal do projeto
    - backend # diretório da aplicação backend (API) 
    - frontend # diretório aplicação frontend (React) 
    

# Rodando a aplicação:

    No MacOs e Linux - testado apenas no MacOS 😅
    É possivel iniciar a aplicação simulando um ambiente de produção executando os seguintes passos:

        - Navegue até o diretório raiz da aplicação

        - Dee permissão de execução para o script build.sh
            sudo chmod +x build.sh
        
        - Execute o sript build.sh
            ./build.sh

            Esse passo leva um alguns minutos. 
            Aqui são geradas as imagens com as versões de produção para a aplicação backend e frontend, 
            feito download da imagem do MongoDB e disponibilizado as asplicações.

            É possível acessar as aplicações pelas seguintes urls:
                Banco de Dados: mongodb://localhost:27017
                API: http://localhost:5000
                Web App: http://localhost:5013

# Rodando aplicação para debug

    - Abra um novo terminal

    - Navegue até o diretório raiz da aplicação backend
        cd /backend

    - Para facilitar, existe um arquivo docker compose dentro deste diretório para subir um instância MongoDB. Para isso execute o seguinte comando
        docker-compose up
      Uma container docker com MongoDb será inicializado podendo ser acessado por mongodb://localhost:27017

      Caso não possua o docker-compose é possível subir uma instacia do MongoDB com os seguintes comandos Docker:
        docker pull mongo
        docker run -p 27018:27017 mongo

      *(Se não possui docker instalado será necessário instalá-lo ou então instalar o MongoDB)

    -  Abra um novo terminal e ainda no diretório /backend, execute a aplicação backend utilizando o seguinte comando:
        dotnet run --project Application/TrincaBarbecueApi.Application.csproj
       Será inicializada a API. Pode ser testada acessando http://localhost:5000/barbecues
    
    - Abra um novo terminal e navegue para o diretório da aplicação frontend
    
    - Instale as depencias da aplicação
        yarn install 
    
    - execute a aplicação
        yarn start
    Em seguinda, uma janela de seu navegador padrão abrirá com o endenreço da aplicação
    
