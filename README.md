# Flynex

Site institucional da **Flynex**, uma fábrica de software B2B (empresa fictícia criada para um trabalho de escola).

A Flynex desenvolve sistemas de pedidos e estoque sob medida para pequenas e médias empresas que vendem para outras empresas. O modelo comercial é:

1. **Proposta:** escopo e valor do projeto fechados antes de começar.
2. **Fabricação:** pagamento por etapas de entrega.
3. **Suporte:** contrato opcional depois da entrega, a partir de R$ 299/mês.

## Páginas

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Página inicial |
| `precos.html` | Preços e como funciona a contratação |
| `sobre.html` | Sobre a empresa, missão, visão e valores |
| `contato.html` | Formulário de solicitação de proposta |
| `404.html` | Página não encontrada |

## Tecnologias

HTML, CSS e JavaScript puros, sem build. Tem modo claro e escuro, e opções de acessibilidade (alto contraste).

## Como ver o site

Abra o `index.html` no navegador, ou rode um servidor local:

```bash
python3 -m http.server 8000
```

e acesse http://localhost:8000.

## Publicar no GitHub Pages

1. No repositório, vá em **Settings → Pages**.
2. Em **Branch**, escolha `main` e `/ (root)` e salve.
3. O site fica em `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.

## Formulário de contato

O formulário em `contato.html` ainda não envia mensagens. Para ligá-lo ao e-mail ou a um banco de dados, configure o `action` do formulário com um serviço de envio (por exemplo Web3Forms ou Formspree) ou com o back-end do projeto.
