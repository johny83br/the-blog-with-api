# 📘 The Blog

Esse projeto é um **blog moderno com integração de API**
([https://github.com/johny83br/the-blog-api](https://github.com/johny83br/the-blog-api)),
construído em **Next.js** com TypeScript.

Ele serve como uma plataforma onde você pode ler posts, consumir dados de uma
API e ter uma experiência de blog interativo e escalável.

Um exemplo do projeto você pode acessar por esse endereço:
[https://johny83br.github.io/blog-ssg-nextjs/](https://johny83br.github.io/blog-ssg-nextjs/).

## 🚀 Sobre o Projeto

O **The Blog** é uma aplicação web que demonstra como criar um blog completo
usando:

- **Next.js** como framework React para renderização híbrida (SSG/SSR/ISR)
- **TypeScript** para tipagem forte e mais segurança no código
- **Consumo de API** para obter dados de posts e conteúdo
- Estrutura organizada para separar lógica de interface e de dados

## 🧠 Funcionalidades

- 📄 Exibição de posts de blog
- 🔍 Consumo de dados via API
- 🚀 Renderização rápida com Next.js
- 🛠️ Pronto para desenvolvimento com **npm**
- 💡 Tipagem com **TypeScript**

## 🧩 Tecnologias Utilizadas

| Tecnologia         | Finalidade                                                     |
| ------------------ | -------------------------------------------------------------- |
| **Next.js**        | Estrutura React para páginas e rotas                           |
| **React**          | Biblioteca de interface                                        |
| **TypeScript**     | Tipagem estática                                               |
| **API REST**       | Fonte de dados para posts                                      |
| **HTML & CSS**     | Marcação e estilo da interface                                 |
| **nginx**          | Servidor web                                                   |
| **pm2**            | Gerenciador de processos de Produção Node.js com Load Balancer |
| **Github Actions** | Para CI/CD automatizando o desenvolvimento, teste, e entrega   |

## ⚙️ Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/johny83br/the-blog-with-api.git
cd the-blog-with-api
npm install
```

## ▶️ Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
npm run dev
```

## 📦 Produção

Para executar o projeto em modo de produção:

```bash
npm run build
npm run start
```

---

## 📁 Estrutura Básica

O projeto possui a seguinte organização:

```
.
├── public/               # Arquivos públicos (imagens, favicons etc.)
├── src/                  # Código fonte principal
│   ├── pages/            # Páginas do Next.js
│   └── components/       # Componentes React reutilizáveis
├── .env.example          # Variáveis de ambiente de exemplo
├── package.json          # Dependências e scripts
└── README.md             # Este arquivo
```

## 💡 Contribuição

Contribuições são sempre bem-vindas! Se quiser adicionar mais recursos como
testes adicionais, abra uma _issue_ no repositório 😊

## 📄 Licença

Esse projeto está aberto para uso e modificação (especifique a licença se quiser
adicionar, por exemplo, MIT).
