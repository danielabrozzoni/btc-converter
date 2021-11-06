function update_value(e) {
    // Content of our input form
    let n = document.getElementById("amount1").value;
    // Label of the input form to be updated
    let to_be_updated = "amount2";
    let my_unit_value = document.getElementById("unit1").value;
    let opposite_unit_value = document.getElementById("unit2").value;

    document.getElementById(to_be_updated).value = convert(n, my_unit_value, opposite_unit_value);
}

// Convert n from unit1 to unit2
function convert(n, unit1, unit2) {
    sats_value = convert_to_sats(n, unit1);
    return convert_from_sats(sats_value, unit2);
}

function convert_to_sats(n, amount) {
    return n * sats_conversion[amount];
}

function convert_from_sats(n, amount) {
    return n / sats_conversion[amount];
}

let sats_conversion = {
    "BTC": 1e8,
    "mBTC": 1e5,
    "bits": 1e2,
    "sats": 1,
    "EUR": null,
    "USD": null,
};

let eur_price = async () => {
    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=EUR');
    const res = await response.json(); //extract JSON from the http response
    let eur_btc = res["data"]["amount"];
    // From eur_btc to sats_eur:
    // eur_sats = eur_btc / sats_conversion["BTC"]
    // sats_eur = 1/eur_sats
    // Hence:
    sats_conversion["EUR"] = sats_conversion["BTC"] / eur_btc;
};

let usd_price = async () => {
    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const res = await response.json(); //extract JSON from the http response
    let usd_btc = res["data"]["amount"];
    // From usd_btc to sats_usd:
    // usd_sats = usd_btc / sats_conversion["BTC"]
    // sats_eur = 1/usd_sats
    // Hence:
    sats_conversion["USD"] = sats_conversion["BTC"] / usd_btc;
};

eur_price();
usd_price();