var silhouette = require('../models/product/silhouette.js');

describe('silhouette', function() {
    describe('aLinePrincess', function() {
        it('A-Line', function() {
            expect(silhouette.normalize('A-Line')).toBe('aLinePrincess');
        });
        it('A-Linie', function() {
            expect(silhouette.normalize('A-Linie')).toBe('aLinePrincess');
        });
        it('Princess-Line', function() {
            expect(silhouette.normalize('Princess-Line')).toBe('aLinePrincess');
        });
        it('Prinzessin-Linie', function() {
            expect(silhouette.normalize('Prinzessin-Linie')).toBe('aLinePrincess');
        });
    });
    describe('undefined', function() {
        it('something', function() {
            expect(silhouette.normalize('something')).toBeUndefined();
        });
    });
});