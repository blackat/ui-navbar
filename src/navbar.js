angular.module('ui.navbar', ['ui.bootstrap', 'template/navbar-ul.html', 'template/navbar-li.html', 'template/navbar-tree-li.html'])

    .directive('trees', function () {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                trees: '='
            },
            templateUrl: 'template/navbar-tree-li.html'
        };
    })

    .directive('tree', function () {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                tree: '='
            },
            templateUrl: 'template/navbar-ul.html'
        };
    })

    .directive('leaf', ['$compile', function ($compile) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                leaf: '='
            },
            templateUrl: 'template/navbar-li.html',
            link: function (scope, element) {
                if (angular.isArray(scope.leaf.subtree)) {
                    element.append('<tree tree=\"leaf.subtree\"></tree>');

                    // find the parent of the element
                    var parent = element.parent();
                    var classFound = false;

                    // check if in the hierarchy of the element exists a dropdown with class navbar-right
                    while (parent.length > 0 && !classFound) {
                        // check if the dropdown has been push to right
                        if (parent.hasClass('navbar-right')) {
                            classFound = true;
                        }
                        parent = parent.parent();
                    }

                    // add a different class according to the position of the dropdown
                    if (classFound) {
                        element.addClass('dropdown-submenu-right');
                    } else {
                        element.addClass('dropdown-submenu');
                    }

                    $compile(element.contents())(scope);
                }
            }
        };
    }]);
