import { OptionType, DataObjectType, DataItemType } from "../tools/types.js";

export abstract class Helpers {
    /**
     * Função para pegar um valor pelo caminho ('path.value') dentro do objeto, funciona para caminhos não aninhados.
     * @param obj um item do array de dados
     * @param path caminho para o valor do item ex: 'categoria.nome'
     * @returns Retorna o valor dentro do objeto.
     */
    static getNestedProperty(obj: object, path: string) {
        const keys = path.split('.');
        return keys.reduce((prev: {[prop: string]: any}, curr: string) => {
            return prev && prev[curr] !== undefined ? prev[curr] : undefined;
        }, obj);
    }

    /**
     * Função que recebe um item do array de dados e horizontaliza as chaves dos objetos.
     * @param obj um item do array de dados.
     * @param is_header o item recebido possui valores do cabeçalho?
     * @returns Retorna um objeto no formato OptionType, com todas as chaves horizontalizadas.
     */
    static getAllPaths(obj: DataItemType, is_header = false, prefix = ''): OptionType {
        let paths: OptionType = {};
        
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const new_key = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(paths, this.getAllPaths(obj[key], is_header, new_key));
                } else {
                    paths[new_key] = is_header ? obj[key] : new_key
                }
            }
        }
        return paths;
    }
}