const urlBilletes = "./billete";

const aviableBills = [20, 10, 5, 2, 1];

const caja = aviableBills.map(bill => ({
  valor: bill,
  cantidad: 10,
}))

function imgBill(value) {
  return `<img src="${urlBilletes}/${value}.jpg" />`;
}
function promptInt(text, valueDefault) {
  return parseInt(prompt(text, valueDefault));
}

function printResult(text) {
  document.getElementById("result").innerHTML = text;
}

function getBalance() {
  let total = 0;
  for (const tot of caja) {
    total += tot.valor * tot.cantidad;
  }
  return total;
}

document.getElementById("extraer").addEventListener("click", function () {
  const dibujado = [];
  const total = getBalance();
  let t = document.getElementById("dinero");
  dinero = parseInt(t.value);
  if (total < dinero) {
    return printResult("Soy un cajero pobre y no tengo dinero :( <hr />");
  }

  for (let row of caja) {
    if (dinero <= 0) {
      break;
    }

    const div = Math.floor(dinero / row.valor);
    const papeles = div > row.cantidad ? row.cantidad : div;

    row.cantidad = row.cantidad - papeles;
    for (let i = 0; i < papeles; i++) {
      dibujado.push(row.valor);
    }
    dinero -= row.valor * papeles;
  }

  if (dinero != 0) {
    return printResult(
      "No tengo los billetes para esa suma, intenta otro valor <hr />"
    );
  }

  let messaje = "Se ha retirado: <br />";
  for (const e of dibujado) {
    messaje += imgBill(e);
  }
  messaje += "<hr />";

  printResult(messaje);
});

document.getElementById("ver_saldo").addEventListener("click", function () {
  printResult(`Su saldo actual es: ${getBalance()}<hr />`);
});

document.getElementById("deposito").addEventListener("click", function () {
  const monto = promptInt(
    "Indica el valor a depositar: Billetes 20, 10, 5, 2 y 1",
    "20"
  );

  if (!aviableBills.includes(monto)) {
    return printResult(
      "Por favor ingrese valores correctos o su tarjeta quedara retenida<hr />"
    );
  }

  let cantidad = prompt("Indica la cantidad", 1);
  while (isNaN(cantidad) || cantidad <= 0) {
    cantidad = prompt(
      `${cantidad} No es un valor correcto, Porfavor ingresar otro monto`
    );
  }
  cantidad = parseInt(cantidad);
  const i = aviableBills.findIndex((bill) => bill === monto);
  caja[i].cantidad += cantidad;
  printResult(`Se ha depositado ${cantidad} Billetes de: $${monto}<hr />`);
});
