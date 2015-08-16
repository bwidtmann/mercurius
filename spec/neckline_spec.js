var neckline = require('../models/product/neckline.js');

describe('neckline', function() {
    describe('sweetheart', function() {
        it('Herz', function() {
            expect(neckline.normalize('Herz')).toBe('sweetheart');
        });
        it('Herz-Ausschnitt', function() {
            expect(neckline.normalize('Herz-Ausschnitt')).toBe('sweetheart');
        });
        it('Herzausschnitt', function() {
            expect(neckline.normalize('Herzausschnitt')).toBe('sweetheart');
        });
        it('heart-shaped', function() {
            expect(neckline.normalize('heart-shaped')).toBe('sweetheart');
        });
    });
    describe('strapless', function() {
        it('strapless', function() {
            expect(neckline.normalize('strapless')).toBe('strapless');
        });
        it('trägerlos', function() {
            expect(neckline.normalize('trägerlos')).toBe('strapless');
        });
    });
    describe('strap', function() {
        it('strap', function() {
            expect(neckline.normalize('strap')).toBe('strap');
        });
        it('Träger', function() {
            expect(neckline.normalize('Träger')).toBe('strap');
        });
    });
    describe('oneShoulder', function() {
        it('one shoulder', function() {
            expect(neckline.normalize('one shoulder')).toBe('oneShoulder');
        });
        it('1 Halter', function() {
            expect(neckline.normalize('1-Schulter')).toBe('oneShoulder');
        });
    });
    describe('undefined', function() {
        it('something', function() {
            expect(neckline.normalize('something')).toBeUndefined();
        });
    });
});