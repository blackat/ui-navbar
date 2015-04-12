angular.module("template/navbar-li.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navbar-li.html",
    "<li ng-class=\"{divider: leaf.name == 'divider'}\">\n" +
    "    <a ui-sref=\"{{leaf.link}}\" ng-if=\"leaf.name !== 'divider'\">{{leaf.name}}</a>\n" +
    "</li>");
}]);
