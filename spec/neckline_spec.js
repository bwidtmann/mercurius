var helper = require('../models/product/helper.js');
var necklines = require('../models/product/necklines.json');
var set = function(valueRaw) { return helper.normalize(necklines, valueRaw) };


describe('neckline', function() {
    describe('sweetheart', function() {
        it('Herz', function() {
            expect(set('Herz')).toBe('sweetheart');
        });
        it('Herz-Ausschnitt', function() {
            expect(set('Herz-Ausschnitt')).toBe('sweetheart');
        });
        it('Herzausschnitt', function() {
            expect(set('Herzausschnitt')).toBe('sweetheart');
        });
        it('heart-shaped', function() {
            expect(set('heart-shaped')).toBe('sweetheart');
        });
    });
    describe('strapless', function() {
        it('strapless', function() {
            expect(set('strapless')).toBe('strapless');
        });
        it('trägerlos', function() {
            expect(set('trägerlos')).toBe('strapless');
        });
    });
    describe('strap', function() {
        it('strap', function() {
            expect(set('strap')).toBe('strap');
        });
        it('Träger', function() {
            expect(set('Träger')).toBe('strap');
        });
    });
    describe('oneShoulder', function() {
        it('one shoulder', function() {
            expect(set('one shoulder')).toBe('oneShoulder');
        });
        it('1 Halter', function() {
            expect(set('1-Schulter')).toBe('oneShoulder');
        });
    });
    describe('undefined', function() {
        it('something', function() {
            expect(set('something')).toBeUndefined();
        });
    });
});