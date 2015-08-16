var helper = require('../models/product/helper.js');
var colors = require('../models/product/colors.json');
var set = function(valuesRaw) { return helper.normalizeArray(colors, valuesRaw) };


describe('color', function() {
    describe('pink', function() {
        it('Zartrosa', function() {
            expect(set(['Zartrosa'])).toEqual(['pink']);
        });
        it('zart-rosa', function() {
            expect(set(['zart-rosa'])).toEqual(['pink']);
        });
    });
    describe('empty array', function() {
        it('something', function() {
            expect(set(['something'])).toEqual([]);
        });
    });
});