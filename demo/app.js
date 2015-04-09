'use strict';

var App = angular.module('App', ['ui.bootstrap', 'ui.navbar']);

App.controller('NavigationController', function($scope){

    $scope.tree = [{
        name: "Bob",
        link: "#",
        subtree: [{
            name: "Ann",
            link: "#"
        }]
    }, {
        name: "Jon",
        link: "#",
        subtree: [{
            name: "Mary",
            link: "#"
        }]
    }, {
        name: "divider",
        link: "#"
    }, {
        name: "Another person",
        link: "#"
    }, {
        name: "divider",
        link: "#"
    }, {
        name: "Again another person",
        link: "#"
    }];
});