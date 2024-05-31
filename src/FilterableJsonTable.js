class FilterableJsonTable extends JsonTable {
    constructor(data, cabecalhos, tfoot = true, tfoot_ignore) {
        super(data, cabecalhos, tfoot, tfoot_ignore);
        this.filter_current_id = 0;
        
        this.options = {};
        this.range_options = {};
    }

    setFilterOption(key, value) {
        this.options[key] = value;
    }

    setFilterRange(key, min, max) {
        this.range_options[key] = {'min': min, 'max': max};
    }

    removeFilterOption(key) {
        delete this.options[key];
        delete this.range_options[key];
    }

    resetFilterOptions() {
        this.options = {};
    }

    setFilteredTable() {
        const columns = Object.keys(this.options);
        const range_columns = Object.keys(this.range_options);
        const compare = columns.length + range_columns.length;
        const values = [];
        
        this.setDefaultData();
        this.data.forEach(item => {
            let count_true = 0;
            columns.forEach(key => {
                let valor = Helpers.getNestedPropety(item, key);
                if (this.options[key] == valor || this.options[key] == 0) {
                    count_true++;
                }
            })
            range_columns.forEach(key => {
                const min = this.range_options[key].min;
                const max = this.range_options[key].max;
                
                let valor = Helpers.getNestedPropety(item, key);
                
                if (Helpers.isNumerable(valor)) {
                    let number = parseFloat(valor);
                    if (number >= min && number <= max) {
                        count_true++;
                    }
                } else if(Helpers.isDateable(valor)) {
                    let date = new Date(valor).getTime();
                    if (date >= min && date <= max) {
                        count_true++;
                    }
                }
            })
            if (compare === count_true) {
                values.push(item);
            }
        })
        this.data = values;
    }

    orderByPath(path, ord = false) {
        const ord_data = this.data;
        
        ord_data.sort((a, b) => {
            let a_value = Helpers.getNestedPropety(a, path); 
            let b_value = Helpers.getNestedPropety(b, path);
            let res;

            if(Helpers.isNumerable(a_value)) {
                return ord ? a_value - b_value : b_value - a_value;
            } else if (Helpers.isDateable(a_value)) {
                if (ord) {
                    res = a_value < b_value ? -1 : a_value > b_value ? 1 : 0;
                    return res;
                } else {
                    res = a_value > b_value ? -1 : a_value < b_value ? 1 : 0;
                    return res;
                }
            } else {
                return ord ? a_value.localeCompare(b_value) : b_value.localeCompare(a_value);
            }
        });
        return ord_data;
    }

    composeSelectFilter(cabecalho, label, value_path) {
        const select = document.createElement('select');
        const options_array = [];
        const option = document.createElement('option');

        option.innerText = 'All '+ label;
        option.value = 0;
        
        select.id = Helpers.stringToSlug(label) + this.filter_current_id;
        select.appendChild(option);

        this.data.forEach(item => {
            let value = Helpers.getNestedPropety(item, cabecalho);
            let alredy = options_array.some(cabecalho => {
                return cabecalho == value;
            });
            if(!alredy) {
                options_array.push(value);
                const option = document.createElement('option');

                option.value = value_path ?
                    Helpers.getNestedPropety(item, value_path) : 
                    Helpers.stringToSlug(value.toLowerCase())
                ;
                option.innerText = value;
                select.appendChild(option);
            }
        })
        return select;
    }
}