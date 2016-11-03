# ui-navbar - Responsive navigation bar with submenu in AngularJS

![Bower](https://img.shields.io/bower/v/ui-navbar.svg)
[![NPM](https://img.shields.io/npm/v/ui-navbar.svg)](https://www.npmjs.com/package/ui-navbar)
[![Build Status](https://travis-ci.org/blackat/ui-navbar.svg?branch=master)](https://travis-ci.org/blackat/ui-navbar)
[![devDependency Status](https://david-dm.org/blackat/ui-navbar/dev-status.svg?branch=master)](https://david-dm.org/blackat/ui-navbar#info=devDependencies)

## Introduction
Build a responsive navigation menu bar with sub-menu in a __recursive__ fashion using `ui-router` to load partials. 

The directive can now be used in 3 different ways: buttons or icons, navbar with separated drop-down menu or single tree structure.

## Plunkr live demo

- version < 0.14.x Live demo at [Plunkr](http://plnkr.co/edit/V7tecYv4wNPP198HRQlJ?p=info)
- version > 2.2.0 Live demo at [Plunkr](https://plnkr.co/edit/svsAXSVyeiJm8StMB07n)

## 1. Installation
Via npm
```
npm install ui-navbar --save
```

or via Bower
```
bower install ui-navbar --save
```

## 2. Configure routing in your module adding required dependencies
```javascript
angular.module('App', ['ui.bootstrap', 'ui.router', 'ui.navbar'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");

        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "home.html"
            })
            .state('metal-gear', {
                url: "/metal-gear",
                templateUrl: "metal-gear.html"
            })
            .state('metal-gear2', {
                url: "/metal-gear2",
                templateUrl: "metal-gear2.html"
            })
            .state('metal-gear-solid', {
                url: "/metal-gear-solid",
                templateUrl: "metal-gear-solid.html"
            });
    });
```

## 3. Configure the controller
```javascript
angular.module('App').controller('NavigationController', function ($scope) {
    
    $scope.konami = [{
        name: "Konami",
        link: "#",
        subtree: [{
            name: "Metal Gear",
            link: "#",
            subtree: [{
                name: "Metal Gear",
                link: "metal-gear"
            }, {
                name: "Metal Gear 2: Solid Snake",
                link: "metal-gear2"
            }, {
                name: "Metal Gear Solid: The Twin Snakes",
                link: "metal-gear-solid"
            }]
        }]
    }];

    $scope.trees = [{
        name: "Konami",
        link: "#",
        subtree: [{
            name: "Metal Gear",
            link: "#",
            subtree: [{
                name: "Metal Gear",
                link: "metal-gear"
            }, {
                name: "Metal Gear 2: Solid Snake",
                link: "#"
            }, {
                name: "Metal Gear Solid: The Twin Snakes",
                link: "#"
            }]
        }, {
            name: "divider",
            link: "#"
        }, {
            name: "Castlevania",
            link: "#",
            subtree: [{
                ...
            }]
        }]
    }]
}
```

## 4. Html parts

### Add `ui-view` to attach the partials.
```html
<!-- Hook here the partials -->
<div ui-view=""></div>
```


### Button
Add a multi-level menu to a drop down button rendering the previously introduced items:
```javascript
<div btn-group="" uib-dropdown="">
    <button uib-dropdown-toggle="" type="button" class="btn btn-primary">
        Dropdown <b class="caret"></b>
    </button>
    <tree tree="konami"></tree>
</div>
```

### Navigation bar with separated multi-level dropdown menu.
Specify an array of states for each menu item in the navigation bar:
```html
<div ng-controller="NavigationController">
    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" ui-sref="home">Konami</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">
            <ul class="nav navbar-nav">
                <li uib-dropdown="">
                    <a href="#" uib-dropdown-toggle="">
                        Dropdown<b class="caret"></b>
                    </a>
                    <tree tree="konami"></tree>
                </li>
                <li uib-dropdown="">
                    <a href="#" uib-dropdown-toggle="">
                        Just a clone
                        <span class="caret"></span>
                    </a>
                    <tree tree="konami"></tree>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li uib-dropdown="">
                    <a href="#" uib-dropdown-toggle="">
                        Dropdown right<b class="caret"></b>
                    </a>
                    <tree tree="konami"></tree>
                </li>
                <li uib-dropdown="">
                    <a href="#" uib-dropdown-toggle="">
                        Just a clone right<span class="caret"></span>
                    </a>
                    <tree tree="konami"></tree>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
</div>
```


### Navigation bar with a single tree structure
Specify an array representing the all tree, with all the states and subtree for of each
state if required.
```html
<div ng-controller="NavigationController">
    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Games</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">
            <ul class="nav navbar-nav">
                <trees trees="allGames"></trees>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </nav>
</div>
```

## Features

- Recursive item menu definition in `json` format.
- Easy way to define a `divider` between items.
- Unlimited level of nesting.
- Responsive.
- Fully compatible with AngularJS.
- Standard Html5 with AngularJS Bootstrap attributes such as `dropdown`.
- Support tag `navbar-right` from Bootstrap with submenu opening on the left.
- __No jquery required__ to manage responsivness and dropdown actions.

## Dependencies

- AngularJS, required 1.5.x, tested with 1.5.8.
- UI Boostrap, required 1.1.1, tested with 2.2.0.
- ui-router, required 0.2.15, tested with 0.3.1.
- Twitter Bootstrap, required 3.3.6, tested with 3.3.7.

## Update
- Introduced the directive `<trees>` to specify the navigation bar in a _all-in-one_ fashion.
- Updated the documentation, demo and plunker.

## Prefix
- Prefixed `angular-ui-bootstrap` components in the `index.html` demo page according to the [migration guide](https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes).

## Demo
From the folder `demo` type

    npm install
    node server.js

then type in a browser `http://localhost:5000` to get the demo page working.
