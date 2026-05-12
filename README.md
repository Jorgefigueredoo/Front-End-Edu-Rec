# EduRecife — Frontend

### Painel interativo de Matrículas Escolares do Município do Recife

Aplicação web moderna para visualização, consulta e monitoramento de dados públicos da rede municipal de ensino do Recife. Consome dados oficiais e em tempo real do Portal de Dados Abertos da Prefeitura, apresentando-os de forma clara, filtrável e acessível tanto para o cidadão quanto para a gestão pública.

**Projeto desenvolvido como Teste Prático para a vaga de Analista de Inovação**
**Secretaria de Planejamento e Gestão · Prefeitura do Recife**

---

## Aplicação no ar

A aplicação está hospedada em ambiente de produção e disponível para acesso imediato. **Não há necessidade de configuração local para avaliação** — basta clicar nos links abaixo.

| Serviço | URL |
|---------|-----|
| **Painel (Frontend)** | https://edu-rec.vercel.app |
| **API + Documentação Swagger** | https://back-end-edu-rec.onrender.com |
| **Repositório do Backend** | https://github.com/Jorgefigueredoo/Back-End-Edu-Rec |

> **Acesso pelo celular:** ao abrir o link no navegador mobile, a opção **"Adicionar à tela inicial"** ou **"Instalar aplicativo"** será oferecida automaticamente. A aplicação funciona como um app nativo graças à tecnologia PWA.

---

## Sobre o projeto

O EduRecife é uma aplicação que **consome, transforma e apresenta** dados reais de matrículas escolares da rede municipal de ensino do Recife — disponibilizados oficialmente pela Secretaria de Educação no Portal de Dados Abertos da Prefeitura.

### Por que escolhi o tema Educação?

A educação básica é um dos pilares mais estratégicos da gestão municipal. Tornar essa informação acessível e visual permite:

- **Identificar disparidades regionais** no atendimento educacional entre as 6 RPAs
- **Apoiar o planejamento** de novas unidades escolares com base em demanda real
- **Facilitar o acesso do cidadão** à informação sobre escolas próximas, modalidades e turnos
- **Monitorar a evolução** das matrículas ao longo dos anos para análise de tendências
- **Embasar políticas públicas** com dados concretos e visualizações claras

### Volume de dados processados

A aplicação trabalha com um volume significativo de dados reais:

- **105.702 registros** de alunos matriculados em 2024
- **432 escolas** da rede municipal
- **6 distritos** (RPAs — Regiões Político-Administrativas do Recife)
- **5 anos** de dados históricos (2020 a 2024)
- **Múltiplas dimensões** — turnos, modalidades, níveis de ensino

---

## Funcionalidades

### Dashboard interativo com KPIs em tempo real

Três indicadores principais exibidos em destaque no topo do painel:

- **Total de Escolas** — quantidade total na rede ou no filtro aplicado
- **Total de Matrículas** — soma das matrículas no ano e filtros selecionados
- **Média por Escola** — média de alunos calculada dinamicamente

Os valores são **recalculados automaticamente** sempre que um filtro é alterado, sem necessidade de nova requisição ao servidor.

### Visualizações gráficas profissionais

- **Gráfico de barras** — Matrículas distribuídas por distrito (RPA), permitindo identificar rapidamente regiões com maior demanda educacional
- **Gráfico de linha** — Evolução histórica de matrículas de 2020 a 2024, evidenciando tendências de crescimento ou queda
- **Tooltips interativos** com valores formatados em português brasileiro

### Sistema de filtros poderoso e instantâneo

- Filtro por **ano letivo** (2020, 2021, 2022, 2023, 2024)
- Filtro por **distrito** (RPA 1 a RPA 6)
- **Busca em tempo real** por nome ou código da escola
- **Resposta instantânea** — após o carregamento inicial, todos os filtros operam localmente sem nova requisição ao backend

### Tabela detalhada com paginação

- **10 escolas por página** para melhor legibilidade
- Navegação completa: anterior, próxima e números de página
- Contagem dinâmica de resultados encontrados conforme filtros
- Reset automático para página 1 ao mudar filtros

### Modal de detalhamento da escola

Ao clicar em qualquer escola da tabela, abre-se um modal completo com:

- **Endereço completo** clicável que abre direto no Google Maps
- **Total de matrículas** em destaque
- **Distribuição por turno** (Manhã, Tarde, Noite, Integral) com barras de progresso
- **Distribuição por modalidade** (Ensino Fundamental, EJA, Correção de Fluxo, Educação Infantil) também visualizada graficamente
- **Código e RPA** da escola para identificação rápida

### Exportação em PDF profissional

- Botão **"Exportar PDF"** gera relatório institucional completo
- Inclui cabeçalho com identidade visual da Prefeitura
- Contém KPIs, gráficos e tabela com **todas as escolas filtradas**
- **Paginação automática** — múltiplas páginas geradas conforme necessário
- Footer com data e filtros aplicados no momento da exportação
- Útil para apresentações, relatórios internos e impressão

### Progressive Web App (PWA)

- **Instalável** como aplicativo no celular, tablet e desktop
- Cache inteligente para carregamento mais rápido nas visitas seguintes
- Ícone próprio com o brasão oficial da Prefeitura do Recife
- Manifest e service worker configurados corretamente
- Tema visual integrado ao sistema operacional

### Design totalmente responsivo

- Layout adaptativo para **mobile, tablet e desktop**
- Em telas pequenas, colunas menos prioritárias são ocultadas da tabela
- Cards de KPI empilham verticalmente no mobile
- Gráficos se reorganizam automaticamente
- Logo da Prefeitura mantém proporção em todos os tamanhos de tela
- Tipografia escalável para máxima legibilidade

---

## Arquitetura

A aplicação segue uma arquitetura em **camadas com responsabilidades bem definidas**, alinhada ao item 3 do desafio — *"Organização de código e separação de responsabilidades por camada"*.

```
src/
├── pages/
│   └── Painel.jsx                  Página principal — composição da tela
├── components/
│   ├── CardResumo.jsx              Card de KPI reutilizável
│   ├── GraficoBarras.jsx           Gráfico de matrículas por distrito
│   ├── GraficoLinha.jsx            Gráfico de evolução anual
│   ├── FiltrosBusca.jsx            Barra de filtros interativos
│   ├── TabelaEscolas.jsx           Tabela paginada de escolas
│   ├── DetalheEscola.jsx           Modal de detalhe da escola
│   └── BotaoExportarPDF.jsx        Botão e lógica de exportação PDF
├── services/
│   └── api.js                      Camada de comunicação HTTP com o backend
├── hooks/
│   └── useMatriculas.js            Lógica de negócio centralizada
├── App.jsx                         Componente raiz
└── main.jsx                        Entry point da aplicação
```

### Princípio de separação por camadas

| Camada | Responsabilidade |
|--------|-----------------|
| **pages** | Composição da página — orquestra os componentes e conecta com os hooks |
| **components** | Apresentação pura — recebem props e renderizam, sem lógica de negócio |
| **hooks** | Lógica de negócio, gerenciamento de estado e aplicação de filtros |
| **services** | Comunicação isolada com o backend via HTTP |

Essa separação garante que:

- Uma **mudança de design não afeta a lógica** de negócio
- Uma **mudança de API não afeta os componentes** visuais
- Cada parte do código pode ser **testada isoladamente**
- A **manutenção e evolução** ficam mais simples e seguras

---

## Stack tecnológica

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| React | 18 | Biblioteca para construção da interface |
| Vite | 6 | Build tool moderna com dev server otimizado |
| Recharts | 2 | Biblioteca de gráficos com integração nativa em React |
| Axios | 1 | Cliente HTTP para comunicação com a API |
| jsPDF | 2 | Geração de PDF no client-side |
| html2canvas | 1 | Captura de elementos DOM para o PDF |
| vite-plugin-pwa | 0 | Configuração e geração de Progressive Web App |
| Workbox | 7 | Service worker e estratégias de cache |
| Vercel | — | Plataforma de deploy e hospedagem |

---

## Decisões técnicas e justificativas

Cada decisão foi tomada com base em critérios de **performance, manutenibilidade, experiência do usuário e adequação ao contexto** de uma aplicação pública.

| Decisão | Justificativa |
|---------|--------------|
| **React + Vite ao invés de Next.js** | A aplicação é um SPA puro sem necessidade de SSR ou rotas server-side. Vite oferece dev server significativamente mais rápido e um build otimizado focado em SPAs |
| **Filtros 100% no frontend** | Após o carregamento inicial dos dados, todas as ações de filtro (distrito, busca, ano) operam localmente. Isso garante resposta instantânea, melhor experiência do usuário e menor carga no servidor |
| **Hook centralizado (useMatriculas)** | Toda a lógica de estado, filtros e chamadas à API fica concentrada em um único hook. Os componentes ficam responsáveis apenas pela apresentação, facilitando manutenção e testes futuros |
| **Camada services isolada** | Se a URL ou contrato do backend mudar, apenas essa camada é afetada. Hooks e componentes permanecem inalterados — princípio do baixo acoplamento |
| **Recharts ao invés de Chart.js** | Integração nativa com React via componentes JSX. Sintaxe declarativa mais alinhada ao ecossistema React e melhor manutenibilidade |
| **Exportação PDF com paginação automática** | O PDF inclui todas as escolas filtradas, não apenas o que está visível na tela. Múltiplas páginas são geradas automaticamente conforme necessário, garantindo relatórios completos |
| **PWA com vite-plugin-pwa** | Permite instalação no celular como app nativo, cache inteligente para carregamento mais rápido e funcionamento offline parcial. Diferencial importante para acesso público |
| **Responsividade mobile-first** | Aplicações públicas precisam funcionar em qualquer dispositivo. Em telas pequenas, colunas menos prioritárias são ocultadas para manter a legibilidade |
| **Reset automático de página** | Quando um filtro muda, a tabela volta para a página 1 automaticamente, evitando confusão do usuário ao ver "página 5 de 1" |
| **Variável de ambiente para a API** | A URL do backend vem de `VITE_API_URL`, facilitando troca entre ambientes de desenvolvimento, staging e produção sem alteração de código |
| **Imports relativos diretos** | Estrutura simples sem aliases complexos, facilitando o entendimento do projeto por novos desenvolvedores |
| **CSS puro ao invés de CSS-in-JS** | Performance superior, sem overhead de runtime, mais fácil de manter para um projeto desse porte |

---

## Tratamento de dados no frontend

O backend já entrega os dados normalizados, mas o frontend ainda faz algumas transformações para apresentação:

| Operação | Implementação |
|----------|--------------|
| **Formatação de números** | `toLocaleString('pt-BR')` para separar milhares com ponto |
| **Filtros combinados** | Filtros de distrito, busca e ano podem ser aplicados simultaneamente |
| **Recálculo de KPIs** | Total, média e contagem são recalculados a partir da lista filtrada |
| **Renderização condicional** | Estados de loading, erro e dados vazios são tratados visualmente |
| **Paginação client-side** | Slice da lista filtrada para mostrar apenas 10 escolas por vez |

---

## Fonte dos dados

Todos os dados utilizados são **100% reais e oficialmente públicos**, obtidos diretamente do Portal de Dados Abertos da Prefeitura do Recife.

| Dataset | Fonte | Anos | Volume |
|---------|-------|------|--------|
| Matrículas rede municipal | [Portal de Dados Abertos do Recife](https://dados.recife.pe.gov.br/dataset/alunos-matriculados-2023) | 2020 — 2024 | ~105 mil registros/ano |

> **Importante:** Nenhum dado fictício, sintético ou mockado é utilizado em qualquer parte da aplicação. A aplicação reflete exatamente os números oficiais publicados pela Secretaria de Educação do Recife.

---

## Como rodar localmente

### Pré-requisitos
- Node.js 18 ou superior
- Backend rodando — ver [repositório do backend](https://github.com/Jorgefigueredoo/Back-End-Edu-Rec)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/Jorgefigueredoo/Front-End-Edu-Rec.git
cd Front-End-Edu-Rec

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Rodar em desenvolvimento
npm run dev
# Aplicação disponível em http://localhost:5173

# 5. Rodar em modo produção (com PWA ativo)
npm run build
npm run preview
# Aplicação disponível em http://localhost:4173
```

### Variáveis de ambiente

```env
VITE_API_URL=http://localhost:3001
```

> Para testar diretamente com o backend em produção, utilize: `VITE_API_URL=https://back-end-edu-rec.onrender.com`

---

## Estrutura completa do projeto

```
Front-End-Edu-Rec/
├── public/
│   ├── logo-recife.png             Brasão oficial da Prefeitura
│   └── recife.png                  Ícone do PWA
├── src/
│   ├── pages/
│   │   └── Painel.jsx
│   ├── components/
│   │   ├── BotaoExportarPDF.jsx
│   │   ├── CardResumo.jsx
│   │   ├── DetalheEscola.jsx
│   │   ├── FiltrosBusca.jsx
│   │   ├── GraficoBarras.jsx
│   │   ├── GraficoLinha.jsx
│   │   └── TabelaEscolas.jsx
│   ├── hooks/
│   │   └── useMatriculas.js
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Deploy

A aplicação está hospedada na **Vercel**, com deploy automático configurado a partir do branch principal do repositório.

### Configuração Vercel
- **Framework:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Variável de ambiente:** `VITE_API_URL` apontando para o backend em produção

Cada push para o repositório dispara um novo deploy automaticamente, mantendo a aplicação sempre atualizada.

---

## Links relacionados

- **Repositório do backend:** https://github.com/Jorgefigueredoo/Back-End-Edu-Rec
- **Portal de Dados Abertos do Recife:** https://dados.recife.pe.gov.br
- **Prefeitura do Recife:** https://www2.recife.pe.gov.br
- **Secretaria de Planejamento e Gestão:** https://www2.recife.pe.gov.br/orgao/secretaria-de-planejamento-e-gestao

---

## Autor

**Jorge Figueredo**
Candidato à vaga de Analista de Inovação — Prefeitura do Recife

- GitHub: [@Jorgefigueredoo](https://github.com/Jorgefigueredoo)
