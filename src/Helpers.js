class Helpers {
    static getNestedPropety(obj, path) {
        const keys = path.split('.');
        return keys.reduce((acc, key) => acc[key], obj);
    }

    static isNumerable(value) {
        return (!isNaN(value) && value !== null) ? true : false;
    }

    static isDateable(value) {;
        return (!isNaN(new Date(value).getTime())) ? true : false;
    }

    static renderByTypeOf(value, money = false, str_max_lenght = false) {
        let format_value;

        if(this.isNumerable(value)) {
            if (money) {
                format_value = this.formatBRL(parseFloat(value));
            } else {
                format_value = parseFloat(value).toFixed(2);
            }
        } else if(this.isDateable(value)) {
            format_value = new Date(value).toLocaleDateString();
             
        } else {
            if (str_max_lenght) {
                format_value = this.resumeString(value.trim(), str_max_lenght, true);
            } else {
                format_value = value;
            }
        }
        return format_value;
    }

    static formatBRL(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    static resumeString(str, max, cont = false) {
        if(str.length > max) {
            if (cont) {
                return str.substring(0, max -3) + "...";
            } else {
                return str.sunstring(0, max);
            }
        }
        return str;
    }

    static sumArray(values) {
        const sum_values = values.reduce((acc, value) => {
            return acc + parseFloat(value);
        }, 0);
        return sum_values;
    }

    static stringToSlug(texto) {
        return texto.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove caracteres diacríticos
            .toLowerCase() // Converte para minúsculas
            .replace(/\s+/g, '-') // Substitui espaços em branco por traços
            .replace(/[^a-z0-9-]/g, '') // Remove caracteres não alfanuméricos ou traços
            .replace(/--+/g, '-') // Substitui múltiplos traços consecutivos por um único traço
            .replace(/^-+|-+$/g, ''); // Remove traços do início e do final
    }
}