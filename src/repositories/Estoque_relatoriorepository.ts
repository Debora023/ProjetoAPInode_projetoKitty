import db from "../database/database";
import { estoque_relatorio} from "../model/estoque_relatorio";

export class estoque_relatorioRepository {
  salvar(estoque_relatorio: estoque_relatorio): estoque_relatorio {
    const resultado = db
      .prepare("INSERT INTO estoque_relatorio (entrada_de_mercadoria, saida_para_troca, saida_venda, registro_movimentacao ) VALUES (?, ?, ?, ?)")
      .run(estoque_relatorio.entrada_de_mercadoria, estoque_relatorio.saida_para_troca, estoque_relatorio.saida_venda, estoque_relatorio.registro_movimentacao );

    return { id: Number(resultado.lastInsertRowid), entrada_mercadoria: estoque_relatorio.entrada_de_mercadoria, saida_de_troca: estoque_relatorio.saida_de_troca, saida_venda: estoque_relatorio.saida_venda, registro_movimentacao: estoque_relatorio.registro_movimentacao };
  }

  listar(): estoque_relatorio[] {
    return db.prepare("SELECT * FROM estoque_relatorio").all() as estoque_relatorio[];
  }

  buscarPorId(id: number): estoque_relatorio | null {
    return (db.prepare("SELECT * FROM estoque_relatorio WHERE id = ?").get(id) as estoque_relatorio) ?? null;
  }

  buscarPorestoque(email: string): estoque_relatorio | null {
    return (db.prepare("SELECT * FROM estoque_relatorio; ?").get(`%${email}%`) as estoque_relatorio) ?? null;
  }
}
