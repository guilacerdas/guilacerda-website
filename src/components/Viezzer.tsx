import React, { useState, useMemo } from "react";
import db from "../data/explosao.json";
import { explodirProduto, DB } from "../utils/explosao";

const banco = db as DB;

export default function ExplosaoPage() {
  const [codigoSelecionado, setCodigoSelecionado] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState<any | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const produtosOrdenados = useMemo(
    () =>
      [...banco.produtos].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setResultado(null);

    const pesoNum = Number(peso.replace(",", "."));
    if (!pesoNum || pesoNum <= 0) {
      setErro("Informe um peso válido em kg.");
      return;
    }

    const codigoNum = Number(codigoSelecionado);
    if (!codigoNum) {
      setErro("Selecione um produto.");
      return;
    }

    try {
      const res = explodirProduto(banco, codigoNum, pesoNum);
      setResultado(res);
    } catch (err: any) {
      setErro(err.message || "Erro ao calcular explosão.");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-4 py-10 bg-slate-950 text-slate-50">
      <div className="w-full max-w-5xl">
        {/* Cabeçalho */}
        <header className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Explosão de Materiais
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-400">
              Ferramenta interna para Ju &amp; Larissa registrarem insumos
              proporcionais ao peso pesado no inventário.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-slate-400 sm:text-right">
            <p className="font-medium text-slate-300">
              Padaria &amp; Confeitaria Viezzer
            </p>
            <p>Somente uso interno</p>
          </div>
        </header>

        {/* Card principal */}
        <div className="p-5 border shadow-xl bg-slate-900/70 border-slate-800 rounded-2xl shadow-slate-900/40 sm:p-6 lg:p-8">
          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-[2fr,1fr,auto] md:items-end"
          >
            {/* Select produto */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Produto (código ou nome)
              </label>
              <select
                value={codigoSelecionado}
                onChange={(e) => setCodigoSelecionado(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Selecione o produto…</option>
                {produtosOrdenados.map((p) => (
                  <option key={p.codigo} value={p.codigo}>
                    {p.codigo} — {p.nome}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500">
                A lista usa as fichas técnicas limpas (sem chantilly, decoração
                nem embalagens).
              </p>
            </div>

            {/* Peso */}
            <div className="md:col-span-1">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Peso medido (kg)
              </label>
              <input
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ex.: 2,450"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="mt-1.5 text-[11px] text-slate-500">
                Use o peso real da balança, no momento do inventário.
              </p>
            </div>

            {/* Botão */}
            <div className="flex md:col-span-1 md:justify-end">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
              >
                Calcular explosão
              </button>
            </div>
          </form>

          {/* Erro */}
          {erro && (
            <div className="mt-4 rounded-xl border border-red-500/50 bg-red-950/40 px-3.5 py-2.5 text-sm text-red-100">
              {erro}
            </div>
          )}

          {/* Resultado */}
          {resultado && (
            <div className="mt-6 space-y-4">
              {/* Resumo do produto */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="px-4 py-3 border rounded-xl bg-slate-900/80 border-slate-800">
                  <p className="text-xs text-slate-400">Produto</p>
                  <p className="text-sm font-medium text-slate-50">
                    {resultado.produto.nome}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Código {resultado.produto.codigo}
                  </p>
                </div>
                <div className="px-4 py-3 border rounded-xl bg-slate-900/80 border-slate-800">
                  <p className="text-xs text-slate-400">Rendimento da ficha</p>
                  <p className="text-sm font-semibold text-slate-50">
                    {resultado.produto.rendimento_kg} kg
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Peso padrão usado no cálculo da proporção.
                  </p>
                </div>
                <div className="px-4 py-3 border rounded-xl bg-slate-900/80 border-slate-800">
                  <p className="text-xs text-slate-400">
                    Peso e fator aplicado
                  </p>
                  <p className="text-sm text-slate-50">
                    Peso:{" "}
                    <span className="font-semibold">
                      {resultado.produto.peso_medido_kg} kg
                    </span>
                  </p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">
                    Fator: {resultado.produto.fator.toFixed(3)}
                  </p>
                </div>
              </div>

              {/* Tabela de insumos */}
              <div className="overflow-hidden border rounded-2xl border-slate-800 bg-slate-900/80">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-50">
                    Insumos para lançar no estoque
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Quantidades totais já ajustadas pelo peso informado.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead className="bg-slate-900/90">
                      <tr>
                        <th className="px-3 py-2 font-medium text-left border-b text-slate-400 border-slate-800">
                          Código
                        </th>
                        <th className="px-3 py-2 font-medium text-left border-b text-slate-400 border-slate-800">
                          Descrição
                        </th>
                        <th className="px-3 py-2 font-medium text-right border-b text-slate-400 border-slate-800">
                          Qtd explodida
                        </th>
                        <th className="px-3 py-2 font-medium text-left border-b text-slate-400 border-slate-800">
                          Unid.
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultado.insumos.map((ins: any, idx: number) => (
                        <tr
                          key={ins.codigo + "-" + idx}
                          className={
                            idx % 2 === 0
                              ? "bg-slate-900/60"
                              : "bg-slate-900/30"
                          }
                        >
                          <td className="px-3 py-2 border-b border-slate-800">
                            {ins.codigo}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-800">
                            {ins.descricao}
                          </td>
                          <td className="px-3 py-2 font-semibold text-right border-b border-slate-800">
                            {ins.quantidade_real.toFixed(3)}
                          </td>
                          <td className="px-3 py-2 border-b border-slate-800">
                            {ins.unidade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Dica: você pode selecionar outro produto ou alterar o peso e
                recalcular sempre que precisar, sem recarregar a página.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
