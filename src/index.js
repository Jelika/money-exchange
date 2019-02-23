module.exports = function makeExchange(currency) {
    if (checkMoney(currency)) {
        return checkMoney(currency);
    }

    const wallet = [
        (new Coin('H', 50)),
        (new Coin('Q', 25)),
        (new Coin('D', 10)),
        (new Coin('N', 5)),
        (new Coin('P', 1))
    ];

    return wallet.map(coin => {
        const oldPrice = coin.price;
        coin.exchange(currency)
        currency = currency % oldPrice;
        return coin
    })
    .reduce((acc, coin) => coin.price ? (acc[coin.name] = coin.price, acc) : acc, {});
}

function checkMoney(money) {
    if (money <= 0) {
        return {};
    }
    if (money >= 10000) {
        return { error: "You are rich, my friend! We don't have so much coins for exchange" }
    }
}

class Coin {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    exchange(amount) {
        this.price = Math.floor(amount / this.price);
    }
}
