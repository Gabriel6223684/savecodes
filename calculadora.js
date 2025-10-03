 const tela = document.getElementById("tela");
    let expr = "";         // expressão interna (usada no eval): usa / * - +
    let displayExpr = "";  // expressão para mostrar: usa ÷ × − +
    let lastWasOperator = false;
    let justCalculated = false;

    function updateTela() {
      tela.innerText = displayExpr || "0";
    }

    function inserirNumero(n) {
      if (justCalculated) {
        // começa novo cálculo após resultado
        expr = "";
        displayExpr = "";
        justCalculated = false;
      }
      expr += n;
      displayExpr += n;
      lastWasOperator = false;
      updateTela();
    }

    function inserirPonto(p) {
      if (justCalculated) {
        expr = "0.";
        displayExpr = "0.";
        justCalculated = false;
      } else {
        // evita dois pontos seguidos
        if (!/[\d)]$/.test(displayExpr)) return;
        expr += ".";
        displayExpr += ".";
      }
      lastWasOperator = false;
      updateTela();
    }

    function apagarUltimo() {
      if (expr.length > 0) {
        expr = expr.slice(0, -1);
        displayExpr = displayExpr.slice(0, -1);
        if (expr === "") {
          expr = "";
          displayExpr = "";
        }
        updateTela();
      }
    }

    function operar(jsOp, displaySymbol) {
      if (expr === "" && displayExpr === "") return; // nada para operar
      if (lastWasOperator) {
        // substitui o operador anterior
        expr = expr.slice(0, -1) + jsOp;
        displayExpr = displayExpr.slice(0, -1) + displaySymbol;
      } else {
        expr += jsOp;
        displayExpr += displaySymbol;
      }
      lastWasOperator = true;
      justCalculated = false;
      updateTela();
    }

    // funções específicas pedidas:
    function dividir()    { operar('/', '÷'); }
    function multiplicar(){ operar('*', '×'); }
    function subtrair()   { operar('-', '−'); }
    function adicionar()  { operar('+', '+'); }

    function calcular() {
      if (!expr) return;
      if (lastWasOperator) {
        // remove operador final antes de calcular
        expr = expr.slice(0, -1);
        displayExpr = displayExpr.slice(0, -1);
      }
      try {
        let resultado = eval(expr); // aqui usamos apenas / * - +
        if (!isFinite(resultado)) {
          displayExpr = "Erro";
          expr = "";
        } else {
          // normaliza o resultado para string (remove zeros desnecessários)
          resultado = +resultado;
          displayExpr = String(resultado);
          expr = String(resultado);
        }
      } catch (e) {
        displayExpr = "Erro";
        expr = "";
      }
      updateTela();
      justCalculated = true;
      lastWasOperator = false;
    }

    function limpar() {
      expr = "";
      displayExpr = "";
      lastWasOperator = false;
      justCalculated = false;
      updateTela();
    }