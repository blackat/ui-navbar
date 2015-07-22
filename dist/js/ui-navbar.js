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
angular.module("template/navbar-li.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navbar-li.html",
    "<li ng-class=\"{divider: leaf.name == 'divider'}\">\n" +
    "    <a ui-sref=\"{{leaf.link}}\" ng-if=\"leaf.name !== 'divider'\">{{leaf.name}}</a>\n" +
    "</li>");
}]);

angular.module("template/navbar-ul.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navbar-ul.html",
    "<ul class='dropdown-menu'>\n" +
    "    <leaf ng-repeat='leaf in tree' leaf='leaf'></leaf>\n" +
    "</ul>");
}]);
