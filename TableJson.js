class TableJson {
    constructor(data, cabecalhos, footer = false, filtros = 'DEFAULT') {
        this.data = data;
        this.cabecalhos = cabecalhos;
        this.footer = footer;
        this.filtros = filtros;
    }

    teste() {
        return Helpers.soma(3,5)
    }
}