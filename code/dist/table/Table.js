export var Tabela;
(function (Tabela) {
    class SuperTable {
    }
    class Teste {
        static teste() {
            console.log('oi');
            const teste_div = document.createElement('div');
            teste_div.innerText = "Olá Mundo";
            document.body.appendChild(teste_div);
        }
    }
    Tabela.Teste = Teste;
})(Tabela || (Tabela = {}));
