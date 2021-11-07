// my_index and to_be_updated_index refer to the value that remains static
// and the one that will be updated.
function update_value(e, my_index, to_be_updated_index) {
    // Content of our input form
    let n = document.getElementById("amount" + my_index).value;
    if (n == "") {
        return;
    }
    n = new Big(n);
    // Label of the input form to be updated
    let to_be_updated = "amount" + to_be_updated_index;
    let my_unit_value = document.getElementById("unit" + my_index).value;
    let opposite_unit_value = document.getElementById("unit" + to_be_updated_index).value;

    document.getElementById(to_be_updated).value = convert(n, my_unit_value, opposite_unit_value).toFixed();
}

function update_unit(e) {
    // The left value remains the same when changing units, only the
    // right one is changed.
    update_value(e, 1, 2);
    let other_unit;
    if (e.id == "unit1") {
        other_unit = "unit2";
    } else {
        other_unit = "unit1";
    }
    let options = document.getElementById(other_unit).options;
    for (i in options) {
        // Hiding the selected option in the other unit picker,
        // displaying all the others.
        options[i].hidden = options[i].value == e. value;
    }
}

// Convert n from unit1 to unit2
function convert(n, unit1, unit2) {
    btc_value = convert_to_btc(n, unit1);
    return convert_from_btc(btc_value, unit2);
}

function convert_to_btc(n, amount) {
    return n.div(btc_conversion[amount]);
}

function convert_from_btc(n, amount) {
    return n.times(btc_conversion[amount]);
}

let btc_conversion = {
    "BTC": new Big("1"),
    "mBTC": new Big("1e3"),
    "bits": new Big("1e5"),
    "sats": new Big("1e8"),
    "EUR": null,
    "USD": null,
};

let eur_price = async () => {
    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=EUR');
    const res = await response.json(); //extract JSON from the http response
    let eur_btc = new Big(res["data"]["amount"].toString());
    btc_conversion["EUR"] = eur_btc;
};

let usd_price = async () => {
    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const res = await response.json(); //extract JSON from the http response
    let usd_btc = new Big(res["data"]["amount"].toString());
    btc_conversion["USD"] = usd_btc;
};

eur_price();
usd_price();