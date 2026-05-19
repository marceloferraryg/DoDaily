# 🧠 DoDaily

Um app moderno para organizar sua rotina diária de forma simples, rápida e inteligente.

O DoDaily foi criado para centralizar tarefas, listas e organização pessoal em uma única experiência mobile-first, com foco em produtividade, clareza visual e usabilidade.

---

# ✨ Objetivo

O projeto nasceu com a ideia de unir:

* 📋 Tarefas
* 🛒 Listas
* 💊 Lembretes
* 📅 Organização diária

em um único aplicativo leve, intuitivo e agradável de usar.

Inspirado em apps como:

* Apple Reminders
* Notes
* Todoist
* TickTick

mas com identidade própria e foco em simplicidade.

---

# 🚀 Status Atual

## ✅ Sistema de tarefas concluído

A primeira grande etapa do projeto já está funcional.

O sistema de tarefas conta com:

### ✔️ Criação e edição de tarefas

* título
* categoria
* prioridade
* data
* horário
* observações

---

### ✔️ Categorias tipadas

Categorias organizadas via `TaskCategoryMap`.

Exemplos:

* Trabalho
* Saúde
* Estudos
* Casa
* Pets
* Viagem
* Manutenção
* Outros

---

### ✔️ Sistema de prioridades

Níveis:

* `!` baixa
* `!!` média
* `!!!` alta

---

### ✔️ Swipe Actions

* deslizar para concluir
* deslizar para remover

com foco em UX mobile.

---

### ✔️ Bottom Sheets

* detalhes da tarefa
* confirmação de exclusão

---

### ✔️ Filtros avançados

Sistema completo de filtros por:

* período
* categoria
* prioridade

---

## 📅 Filtros de período

### Hoje

Mostra tarefas da data atual.

---

### Semana

Mostra tarefas entre amanhã e os próximos 6 dias.

---

### Todas

Mostra todas as tarefas.

---

### Atrasadas

Mostra:

* tarefas de dias anteriores
* tarefas de hoje cujo horário já passou

---

### Sem Data

Mostra tarefas sem data definida.

---

# 🧠 Inteligência de agrupamento

O sistema identifica automaticamente:

* tarefas atrasadas
* tarefas futuras
* tarefas sem data
* tarefas vencidas pelo horário
* organização da Home

---

# 🏠 Home inteligente

A tela inicial possui:

## 📊 Resumo do dia

* concluídas
* pendentes

---

## 🔴 Área de tarefas atrasadas

Destacada visualmente.

---

## 📋 Tarefas de hoje

Incluindo tarefas sem data.

---

## ⏰ Amanhã

Separação automática das próximas tarefas.

---

# 📱 UX Mobile First

O projeto foi pensado prioritariamente para celular.

Inclui:

* safe-area support
* bottom navigation
* gestures
* blur effects
* animações suaves
* componentes arredondados
* experiência semelhante a apps nativos

---

# 🧭 Navegação

## Bottom Tab Bar

Atualmente:

* Hoje
* Tarefas
* Lista
* Perfil

---

# 🛠️ Tecnologias

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## Estado Global

* Zustand
* Zustand Persist

---

## Utilitários

* UUID
* Lucide Icons

---

# 🧱 Arquitetura

O projeto foi estruturado com foco em:

* reutilização
* escalabilidade
* componentização
* tipagem forte
* separação de responsabilidades

---

# 📂 Estrutura Atual

```bash
src/
├── app/
│     ├── list/
│     ├── profile/
│     └── tasks/
├── components/
│     ├── headers/
│     ├── tasks/
│          ├── filters/
│          └── select/
│     └── utils/
├── store/
├── lib/
├── maps/
├── types/
```

---

# 🔥 Destaques Técnicos

## ✔️ Sistema centralizado de Maps

* categorias
* prioridades
* períodos
* menu

---

## ✔️ Tipagem avançada

Uso de:

* `keyof typeof`
* unions automáticas
* inferência forte

---

## ✔️ Organização temporal

Helpers dedicados para:

* datas ISO
* agrupamento
* tarefas vencidas
* ordenação inteligente

---

# 🔜 Próxima Etapa

## 🛒 Sistema de Listas

Inspirado no Notes + Lista de Compras do iPhone.

Planejamento:

* múltiplas listas
* itens internos
* marcar comprado/concluído
* organização visual
* listas rápidas
* persistência
* filtros

---

# 🌎 Roadmap Futuro

* [ ] Notificações
* [ ] Recorrência de tarefas
* [ ] Supabase
* [ ] Login
* [ ] Sincronização em nuvem
* [ ] Compartilhamento de listas
* [ ] PWA completo
* [ ] Tema escuro/claro
* [ ] Widgets
* [ ] Estatísticas
* [ ] Animações avançadas

---

# 📌 Status

🚧 Em desenvolvimento ativo
