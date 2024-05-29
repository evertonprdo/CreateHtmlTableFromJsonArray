class JsonTable {
    #default_data;

    constructor(data, cabecalhos, tfoot = true, tfoot_ignore) {
        this.data = data;
        this.cabecalhos = cabecalhos;
        this.tfoot = tfoot;
        this.tfoot_ignore = tfoot_ignore;

        this.#default_data = data;
    }

    renderTable(HtmlTable) {
        const HtmlHeader = HtmlTable.getElementsByTagName('thead')[0];
        const HtmlBody = HtmlTable.getElementsByTagName('tbody')[0];
        
        this.composeHeader(HtmlHeader);
        this.composeBody(HtmlBody);
        
        if (this.tfoot) {
            const HtmlFoot = HtmlTable.getElementsByTagName('tfoot')[0];
            if (this.tfoot_ignore) {
                this.composeFooter(HtmlFoot, this.tfoot_ignore);
            } else{
                this.composeFooter(HtmlFoot)
            }
        }
    }

    composeHeader(HtmlHeader) {
        let row = document.createElement('tr');
        HtmlHeader.innerHTML = ''; 

        Object.keys(this.cabecalhos).forEach(key => {
            let cell = document.createElement('th');
            cell.setAttribute('data-columnref', key);
            cell.innerText = this.cabecalhos[key];
            row.appendChild(cell);
        })

        HtmlHeader.appendChild(row);
    }

    composeBody(HtmlBody) {
        HtmlBody.innerHTML = '';
        this.data.forEach(element => {
            let row = document.createElement('tr');
                Object.keys(this.cabecalhos).forEach(key => {
                    let value = Helpers.getNestedPropety(element, key);
                    let cell = document.createElement('td');
                    
                    value = Helpers.renderByTypeOf(value, true, 40);
                    cell.innerText = value;
                    row.appendChild(cell);
                })
            HtmlBody.appendChild(row);
        });
    }

    composeFooter(HtmlFoot, ignore) {
        HtmlFoot.innerHTML = '';
        const HtmlFootTr = document.createElement('tr');
        let foot_cabecalhos;
        let i = 0;

        if (ignore) {
            foot_cabecalhos = Object.keys(this.cabecalhos).filter((cabecalho => !ignore.includes(cabecalho)));
        } else {
            foot_cabecalhos = this.cabecalhos;
        }

        Object.keys(foot_cabecalhos).forEach(key => {
            const html_td = document.createElement('td');
            if (this.isColumnNumerable(key)) {
                let soma = 0;
                this.data.forEach(item => {
                    let value = Helpers.getNestedPropety(item, key);
                    soma += Helpers.isNumerable(value) ? parseFloat(value) : 0;
                })
                html_td.innerText = Helpers.formatBRL(soma);
                HtmlFootTr.appendChild(html_td);
                i++;
            } else {
                html_td.innerText = i === 0 ? 'Total' : '';
                HtmlFootTr.appendChild(html_td);
                i++;
            }
        })
        HtmlFoot.appendChild(HtmlFootTr);
    }

    setDefaultData() {
        this.data = this.#default_data;
    }

    isColumnNumerable(column) {
        return this.data.some(item => {
            let value = Helpers.getNestedPropety(item, column);
            return Helpers.isNumerable(value);
        })
    }
}