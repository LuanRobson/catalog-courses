# 📚 Catalog Courses - Sistema de Gerenciamento de Cursos

Aplicação web Angular desenvolvida como desafio técnico para simular a visualização e gerenciamento de um catálogo de cursos. O sistema implementa todos os requisitos funcionais e técnicos solicitados, oferecendo uma interface responsiva e intuitiva para gerenciamento completo de cursos online.

## ✨ Funcionalidades Principais

### 🎯 Gestão de Cursos
- **CRUD Completo**: Criar, visualizar, editar e excluir cursos
- **Campos Obrigatórios**: Nome, categoria, descrição e carga horária
- **Validação de Formulários**: Validação em tempo real dos campos obrigatórios
- **Categorização**: Sistema de categorias predefinidas (Frontend, Backend, Data Science, etc.)

### 🔍 Sistema de Filtros
- **Filtro por Categoria**: Seleção específica por área de conhecimento
- **Filtros em Tempo Real**: Atualização instantânea dos resultados
- **Limpeza de Filtros**: Reset rápido para visualizar todos os cursos

### 📊 Dashboard com Estatísticas
- **Métricas em Tempo Real**: Total de cursos, categorias e horas acumuladas
- **Cálculo Dinâmico**: Soma automática das cargas horárias dos cursos filtrados
- **Visualização Intuitiva**: Cards informativos com ícones e gradientes

### 🎨 Interface Responsiva
- **Design Responsivo**: Adaptação perfeita para mobile e desktop
- **Modo Grid/Lista**: Duas visualizações diferentes dos cursos
- **Animações Suaves**: Transições e efeitos visuais elegantes

### 🔧 Funcionalidades Técnicas
- **Páginas Separadas**: Listagem, detalhes e formulário de cadastro/edição
- **Navegação Intuitiva**: Roteamento com lazy loading
- **Estado Vazio**: Interface amigável quando não há cursos
- **Menu Contextual**: Ações rápidas via menu de três pontos

## 🛠️ Stack Tecnológica

### Frontend
- **Angular 20.1.4**: Framework principal com standalone components
- **Angular Material**: Biblioteca de UI para componentes modernos
- **RxJS**: Observables, Subjects e BehaviorSubjects para gerenciamento de estado
- **SCSS**: Pré-processador CSS com variáveis e mixins
- **TypeScript**: Tipagem estática para maior confiabilidade

### Arquitetura
- **Componentes Reutilizáveis**: Input/Output, EventEmitter e ViewChild
- **Reactive Forms**: Formulários reativos com validação
- **Roteamento**: Lazy loading para otimização de performance
- **Guards**: AuthGuard para proteção de rotas
- **Interceptors**: Interceptação de requisições HTTP
- **Services**: Separação de responsabilidades

### Estilização
- **CSS Grid & Flexbox**: Layouts responsivos para mobile e desktop
- **SCSS**: Pré-processador CSS com variáveis e mixins
- **Animações CSS**: Transições suaves e efeitos visuais
- **Material Design**: Seguindo as diretrizes do Material Design

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Angular CLI 20+
- JSON Server (para mock da API)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/catalog-courses.git
cd catalog-courses
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o mock da API**
```bash
# Instale o JSON Server globalmente (se necessário)
npm install -g json-server

# Inicie o servidor mock na porta 3000
json-server --watch db.json --port 3000
```

4. **Inicie o servidor de desenvolviment junto com o Mock API**
```bash
npm run dev
# ou
ng serve
```

5. **Acesse a aplicação**
```
http://localhost:4200
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev         # Inicia o servidor de desenvolvimento
npm run build      # Compila para produção
npm run test       # Executa os testes unitários
npm run lint       # Executa o linter

# Mock API
npm run mock:api   # Inicia o JSON Server
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── course-list/          # Listagem de cursos
│   │   ├── course-detail/        # Página de detalhes
│   │   └── course-form/          # Formulário de cadastro/edição
│   ├── services/
│   │   └── course.service.ts     # Serviço de comunicação com API
│   ├── models/
│   │   └── course.model.ts       # Interface do curso
│   ├── guards/
│   │   └── auth.guard.ts         # Guard de autenticação
│   ├── interceptors/
│   │   └── api.interceptor.ts    # Interceptor HTTP
│   └── layout/
│       └── layout.component.ts   # Layout principal
├── assets/
│   └── images/                   # Imagens estáticas
├── db.json                       # Mock da API (JSON Server)
└── styles/
    └── styles.scss              # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Primária**: `#667eea` (Azul)
- **Secundária**: `#764ba2` (Roxo)
- **Gradientes**: Combinações de azul para roxo
- **Neutras**: Tons de cinza para texto e bordas

### Tipografia
- **Fonte Principal**: Roboto (Google Fonts)
- **Hierarquia**: Títulos, subtítulos, corpo e legendas
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- **Cards**: Bordas arredondadas com sombras suaves
- **Botões**: Gradientes e estados hover
- **Formulários**: Material Design com validação
- **Ícones**: Material Icons com tamanhos consistentes

## 🔧 Configuração de Desenvolvimento

### Mock da API
O projeto utiliza JSON Server para simular uma API REST. O arquivo `db.json` contém os dados mockados dos cursos.

### Estrutura de Dados
```json
{
  "courses": [
    {
      "id": 1,
      "name": "Angular para Iniciantes",
      "category": "Frontend",
      "description": "Aprenda os fundamentos do Angular...",
      "workload": 40,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

### Configuração do Angular
```json
{
  "projects": {
    "catalog-cursos": {
      "architect": {
        "build": {
          "options": {
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

## 🧪 Testes

### Testes Unitários
```bash
npm run test
```

### Cobertura de Código
```bash
npm run test:coverage
```

### Deploy
O projeto pode ser deployado em qualquer plataforma que suporte aplicações Angular:
- **Vercel**: Deploy automático via GitHub
- **Netlify**: Deploy com preview automático
- **Firebase Hosting**: Deploy escalável

## 📋 Requisitos Implementados

### ✅ Requisitos Funcionais
- [x] Listagem de cursos com todos os campos obrigatórios
- [x] Filtro por categoria
- [x] Página de detalhes de um curso
- [x] Formulário para cadastro/edição de curso
- [x] Validação dos campos obrigatórios
- [x] Interface responsiva (mobile e desktop)

### ✅ Requisitos Técnicos
- [x] Angular 14 ou superior (Angular 20.1.4)
- [x] Componentes reutilizáveis
- [x] Uso adequado de Input/Output, EventEmitter e ViewChild
- [x] RxJS (Observables, Subjects, BehaviorSubjects)
- [x] Roteamento com lazy loading
- [x] Separação de responsabilidades com services
- [x] Guard e interceptor implementados
- [x] Biblioteca de UI (Angular Material)
- [x] Responsividade com Flexbox/Grid
- [x] Pré-processador CSS (SCSS)
- [x] Integração com mock de API (JSON Server)
- [x] Documentação clara no README
- [x] Boas práticas de Clean Code e componentização
- [x] Versionamento com Git (GitHub)

**Desenvolvido usando Angular e Material Design** 