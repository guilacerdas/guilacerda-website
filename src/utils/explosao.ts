export type Insumo = {
  codigo: number;
  descricao: string;
  quantidade: number;
  unidade: string;
};

export type Produto = {
  codigo: number;
  nome: string;
  rendimento_kg: number;
  insumos: Insumo[];
};

export type DB = {
  produtos: Produto[];
};

export function explodirProduto(
  db: DB,
  identificador: string | number, // pode ser código ou nome
  pesoMedidoKg: number
) {
  const produto = db.produtos.find((p) => {
    if (typeof identificador === "number") {
      return p.codigo === identificador;
    }
    const id = identificador.toString().toLowerCase();
    return (
      p.codigo.toString() === id ||
      p.nome.toLowerCase().includes(id)
    );
  });

  if (!produto) {
    throw new Error("Produto não encontrado no banco de explosão.");
  }

  const fator = pesoMedidoKg / produto.rendimento_kg;

  const insumosExplodidos = produto.insumos.map((insumo) => ({
    ...insumo,
    quantidade_real: insumo.quantidade * fator,
  }));

  return {
    produto: {
      codigo: produto.codigo,
      nome: produto.nome,
      rendimento_kg: produto.rendimento_kg,
      peso_medido_kg: pesoMedidoKg,
      fator,
    },
    insumos: insumosExplodidos,
  };
}