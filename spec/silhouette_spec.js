var helper = require('../models/product/helper.js');
var silhouettes = require('../models/product/silhouettes.json');
var set = function(valueRaw) { return helper.normalize(silhouettes, valueRaw) };

describe('silhouette', function() {
    describe('aLinePrincess', function() {
        it('A-Line', function() {
            expect(set('A-Line')).toBe('aLinePrincess');
        });
        it('A-Linie', function() {
            expect(set('A-Linie')).toBe('aLinePrincess');
        });
        it('Princess-Line', function() {
            expect(set('Princess-Line')).toBe('aLinePrincess');
        });
        it('Prinzessin-Linie', function() {
            expect(set('Prinzessin-Linie')).toBe('aLinePrincess');
        });
    });
    describe('undefined', function() {
        it('something', function() {
            expect(set('something')).toBeUndefined();
        });
    });
});