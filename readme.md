
** EXPLICAÇÃO *** 

Bom, em primeiro lugar, gostaria de agradecer pelo tempo dedicado à análise deste desafio e a análise da minha candidatura neste processo seletivo. Dito isso, acabei me empolgando com a ideia do projeto e adicionei bem mais do que a proposta inicial. Algumas das features que incluí levaram à construção de um backend próprio, e todas essas ideias surgiram da base do desafio de backend e frontend.

Dito isso, vamos começar pelas motivações por trás dessas adições. Considerando que a Creatus oferece serviços de Venture Builder e CTO as a Service, resolvi me basear nessa vertente mais empreendedora e nisso criar uma empresa fictícia chamada SafeCo™, seguindo a temática de níveis de acesso. A ideia da empresa é oferecer um SaaS voltado para segurança e controle de acesso de pessoas, gerando relatórios detalhados que acompanham o trajeto de uma pessoa pelos pontos de controle de uma determinada empresa.

Infelizmente, como o prazo para finalizar o projeto era de apenas uma semana, reduzi o escopo para tentar atender ao menos a um modelo de MVP capaz de realizar as funções de uma guarita inteligente. Para isso, criei várias páginas, que vou explicar a seguir:

1) *Listagem de Usuários*
Essa página já estava desenvolvida no Figma base do desafio proposto, mas foi turbinada com várias novidades. Agora, ela gera um relatório PDF com a relação de todos os usuários da plataforma, incluindo seus e-mails e níveis de acesso. Além disso, foram adicionadas fotos de perfil para todos os usuários, que são usadas na criação dinâmica de crachás. Esses crachás incluem a foto do usuário, nome, e um QR Code com o ID do mesmo. Essa funcionalidade será mais relevante nos próximos itens. As fotos são armazenadas em um S3 da AWS pelo frontend a partir de um link seguro gerado pelo backend.

2) *Listagem de Locais*
Funciona de maneira semelhante à listagem de usuários, permitindo a criação e edição de novos locais. Cada local possui uma descrição e um nível de acesso necessário para entrada.

3) *Validar Acesso*
Esta página permite que o usuário selecione um dos locais listados na página anterior e, a partir disso, utiliza a webcam do computador para ler o QR Code do usuário em tempo real, determinando se ele tem ou não acesso ao local. Além disso, a foto, nome e e-mail do usuário são mostrados na tela para evitar possíveis falhas de segurança relacionadas a furtos de crachás. (A ideia final era usar a função de Face Similarity da biblioteca face-api.js para realizar um reconhecimento facial, comparando o rosto visto pela câmera com o salvo no sistema, mas infelizmente não deu tempo)

Acredito que essas são as principais adições em relação ao desafio base. Mesmo que de forma básica, elas permitem criar alguns casos de uso que nos dão uma boa ideia do funcionamento real do sistema.


** COMO RODAR *** 

FRONTEND
 - npm i
 - npm run dev 

BACKEND
- npm i
- npx prisma generate --schema ./src/prisma/schema.prisma
- npx ts-node src/index.ts

PS: Sei que é altamente recomendável não deixar dados sensíveis como os do arquivo .env expostos no GitHub. No entanto, como estou usando várias chaves para serviços externos como AWS, MongoDB, etc., para garantir que o programa funcione, coloquei o arquivo .env criptografado dentro da pasta src em um um arquivo dotenv.txt. Use o site Invertexto(https://www.invertexto.com/texto-criptografado) com a senha "boloruim" para pegar os dados da .env original. Embora não seja a solução mais segura, é uma alternativa melhor do que deixar as informações em texto claro. Pretendo remover esses dados assim que o processo seletivo for concluído.

Se precisar de mais alguma coisa, basta me chamar no WhatsApp.