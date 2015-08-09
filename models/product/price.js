var setPrice = function(priceRaw) {
    return parseFloat(priceRaw.trim().replace(/[^0-9\.-]+/g,''));
};

var price = {
    setPrice: setPrice
};

module.exports = price;