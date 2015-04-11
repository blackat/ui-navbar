angular.module("template/navbar-ul.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navbar-ul.html",
    "<ul class='dropdown-menu'>\n" +
    "    <leaf ng-repeat='leaf in tree' leaf='leaf'></leaf>\n" +
    "</ul>");
}]);
