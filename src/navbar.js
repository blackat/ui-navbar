angular.module('ui.navbar', ['ui.bootstrap', 'template/navbar-ul.html', 'template/navbar-li.html'])

    .directive('tree', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                tree: '='
            },
            templateUrl: 'template/navbar-ul.html'
        };
    })

    .directive('leaf', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                leaf: '='
            },
            templateUrl: 'template/navbar-li.html',
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.leaf.subtree)) {
                    element.append('<tree tree=\"leaf.subtree\"></tree>');
                    element.addClass('dropdown-submenu');
                    $compile(element.contents())(scope);
                }
            }
        };
    });