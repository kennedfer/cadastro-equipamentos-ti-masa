export const exclusiveAttributes = {
  computador: [
    {
      key: "processador",
      label: "Processador",
      type: "text",
      placeholder: "Ex.: Intel Core i7"
    },
    {
      key: "memoria",
      label: "Memória RAM",
      type: "text",
      placeholder: "Ex.: 16GB"
    }
  ],
  impressora: [
    { key: "cor", label: "Cor", type: "text", placeholder: "Ex.: Preto" },
    {
      key: "tipoImpressao",
      label: "Tipo de Impressão",
      type: "select",
      options: ["Laser", "Jato de Tinta"]
    }
  ]
};

export const prismaErrorMessages = {
  P2002:
    "Um dos atributos únicos já foi salvo. Certifique-se de que o valor 'tag' ou 'patrimonio' está correto.",
  P2003:
    "Não foi possível concluir a operação porque o item relacionado não existe.",
  P2025:
    "O registro solicitado não foi encontrado. Verifique os dados fornecidos.",
  P2016:
    "Houve um problema ao interpretar a consulta. Certifique-se de que os dados estão corretos.",
  P2018: "Uma relação obrigatória está faltando. Verifique os dados enviados.",
  P2011:
    "Um valor obrigatório não foi fornecido. Certifique-se de preencher todos os campos necessários.",
  P3015:
    "O banco de dados está fora de sincronia. Entre em contato com o suporte técnico.",
  P3006:
    "Falha ao executar a migração. Revise o modelo ou consulte o administrador do banco.",
  P1001:
    "Não foi possível se conectar ao banco de dados. Verifique sua conexão e tente novamente.",
  P1009:
    "O banco de dados especificado não existe. Entre em contato com o suporte técnico.",
  P1010:
    "Falha na autenticação. Verifique suas credenciais de acesso ao banco de dados.",
  P1017:
    "A conexão com o servidor foi encerrada inesperadamente. Tente novamente mais tarde."
};
