describe('navbar test suite', function () {

    var element, scope;

    //load all modules, including the html template, needed to support the test
    beforeEach(module('ui.navbar'));
    beforeEach(module('template/navbar-ul.html'));
    beforeEach(module('template/navbar-li.html'));

    beforeEach(inject(function ($rootScope, $compile, $templateCache) {

        scope = $rootScope.$new();
        scope.tree = [{
            name: 'States',
            link: '#'
        }];

        element = $compile('<div><tree tree="tree"></tree></div>')(scope);
        scope.$digest();
    }));

    it('should display the navbar', function () {
        expect(element.text()).toBe('');
    });
});

angular.module('ui.directive', [])
    .directive('writers', function () {

        return {
            restrict: 'E',
            link: function (scope, element) {
                element.text('a simple artist: ' + scope.artist);
            }
        };
    });

describe('directive test suite', function () {

    var scope, element;
    var artist = 'test artist';

    // Load the module
    beforeEach(module('ui.directive'));

    // Inject dependencies and create a new scope
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.artist = artist;

        // Create the element
        element = angular.element('<writers></writers>');
        // Compile it with the given scope
        $compile(element)(scope);
        // Simulate the scope life cycle that is render the element as if were called in the browser
        scope.$digest();
    }));

    it('should display the correct test in the DOM', function(){
        expect(element.text()).toBe('a simple artist: ' + artist);
    });
});