var helper = require('../models/product/helper.js');
var hemlines = require('../models/product/hemlines.json');
var set = function(valueRaw) { return helper.normalize(hemlines, valueRaw) };

describe('hemline', function() {
    describe('knee', function() {
        it('Knielang', function() {
            expect(set('Knielang')).toBe('knee');
        });
    });
    describe('undefined', function() {
        it('something', function() {
            expect(set('something')).toBeUndefined();
        });
    });
});