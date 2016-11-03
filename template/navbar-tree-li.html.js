angular.module("template/navbar-tree-li.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/navbar-tree-li.html",
    "<li ng-repeat=\"tree in trees\" class=\"dropdown\" uib-dropdown on-toggle=\"toggled(open)\" ui-sref-active=\"active\">\n" +
    "    <a href=\"#\" class=\"dropdown-toggle\" uib-dropdown-toggle role=\"button\">{{tree.name}}<span class='caret'></span></a>\n" +
    "    <tree tree='tree.subtree'></tree>\n" +
    "</li>");
}]);
