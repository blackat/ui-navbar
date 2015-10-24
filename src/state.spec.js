angular.module('navbar.test', ['ui.router'], function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/home');

    // Now set up the states
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('state1', {
            url: '/state1',
            templateUrl: 'state1.html'
        })
        .state('state2', {
            url: '/state2/:id'
        });
});

// Define a test suire
describe('navigation bar test suite', function () {

    var scope, state;

    // Load module you want to test
    beforeEach(module('navbar.test'));
    beforeEach(inject(function ($rootScope, $state, $templateCache) {
        $templateCache.put('home.html', '<div ui-view></div>');
        $templateCache.put('state1.html', '');
        scope = $rootScope.$new();
        state = $state;
    }));

    // Spec definition, one or more expectations (assertions) to test the state of the code
    it('default state should be home', function () {
        // get bindings to update
        scope.$apply();
        expect(state.current.name).toEqual('home');
    });

    it('should trasition to state1', function () {
        state.go('state1');
        scope.$apply();
        expect(state.current.name).toEqual('state1');
    });

    it('should trasition to state2 with params', function () {
        state.go('state2', {id: '1'});
        scope.$apply();
        expect(state.current.name).toEqual('state2');
        expect(state.params.id).toEqual('1');
    });
});