# NOTAS DE TRABALHO

- **Estado Atual**: Prova de conceito concluída.
- **Entregáveis**:
  - Módulo Node.js isolado para análise de perfis.
  - Análise baseada em fixtures, com lógica de heurísticas e integração com LLM (via API Key).
  - Servidor de API (`Express`) para expor a funcionalidade.
  - Interface web (`React`/`Vite`) para interação, permitindo fornecer a API Key e visualizar os resultados formatados.
- **Próximos passos sugeridos**:
  - Implementar a ingestão de dados reais de perfis do Instagram (via API oficial ou outra ferramenta).
  - Melhorar a robustez da interface do usuário (melhor feedback de erro, estados de vazio, etc.).
  - Empacotar o módulo para integração com o projeto principal Rapidus.
