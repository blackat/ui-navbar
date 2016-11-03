'use strict';

describe('ui-navbar', function () {

    var $compile, scope;

    beforeEach(module('ui.navbar'));
    beforeEach(module('template/navbar-ul.html'));
    beforeEach(module('template/navbar-li.html'));
    beforeEach(module('template/navbar-tree-li.html'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        /*
         scope.tree = [{
         name: "States",
         link: "#",
         subtree: [{
         name: "state 1",
         link: "state1"
         }, {
         name: "state 2",
         link: "state2",
         subtree: [{
         name: "state unknown",
         link: "state unknown 2"
         }]
         }]
         }];*/
    }));

    function compileTemplate(template) {
        var el = $compile(angular.element(template))(scope);
        scope.$digest();
        return el;
    }

    function createUiNavbar() {
        return compileTemplate(
            '<li uib-dropdown> \
                <a href="#" uib-dropdown-toggle> Dropdown \
                    <b class="caret"></b> \
                </a> \
                <tree tree="tree"></tree> \
            </li>'
        )
    }

    // Unit tests
    describe('simple structure with only one <a> element', function () {
        var element;

        beforeEach(function () {
            scope.tree = [{
                name: "States",
                link: "#"
            }];
            element = createUiNavbar();
        });

        it('should have one element ul', function () {
            // check there is an element ul with a specific class name
            expect(element.find('ul')).toBeDefined();
            expect(element.find('ul').hasClass('dropdown-menu')).toBeTruthy();
            expect(element.find('ul').children().length).toBe(1);
            expect(element.find('ul').parent().hasClass('dropdown')).toBe(true);
        });

        it('should have one element li as parent of ul element having class dropdown', function () {
            expect(element.find('ul').parent().hasClass('dropdown')).toBe(true);
        });

        it('should have an element a inside ul.li', function () {
            expect(element.find('li')).toBeDefined();
            expect(element.find('li').find('a').attr('ui-sref')).toBe('#');
            expect(element.find('li').find('a').text()).toBe('States');
        });
    });

    // better to separate in another test, step by step
    describe('complex structure with subtree in a subtree', function () {
        var element;

        beforeEach(function () {
            scope.tree = [{
                name: "States",
                link: "#",
                subtree: [{
                    name: "state 1",
                    link: "state1"
                }, {
                    name: "state 2",
                    link: "state2",
                    subtree: [{
                        name: "state unknown",
                        link: "state unknown 2"
                    }]
                }]
            }];
            element = createUiNavbar();
        });

        it('should have the most external <li> element having class dropdown', function () {
            // most external <li> element has class dropdown
            expect(element.hasClass('dropdown')).toBeTruthy();
        });

        it('should have two <ul> elements with class dropdown-menu', function () {

            // find all the li elements, one is the more external one, than three nested in the first one
            expect(element.find('li').length).toBe(4);

            // focus on the first  element li
            expect(element.find('li').eq(0).length).toEqual(1);
            // find all the ul elements
            expect(element.find('li').eq(0).find('ul').length).toEqual(2);

            // inside of li element there are 2 ul having class dropdown-menu
            expect(element.find('li').eq(0).find('ul').length).toEqual(2);
            expect(element.find('li').eq(0).find('ul').eq(0).hasClass('dropdown-menu'));
            expect(element.find('li').eq(0).find('ul').eq(1).hasClass('dropdown-menu'));
        });

        it('should have the first and most external <ul> element that has three nested  <li> elements', function () {
            /**
             * 1. First <li> element
             * <li>
             *      <a ui-sref="state1" ng-if="leaf.name !== 'divider'">state 1</a>
             * </li>
             *
             * 2. Second <li> element at the same level of the first one
             * <li class="dropdown-submenu">
             *      <a ui-sref="state2">state 2</a>
             *      <ul class="dropdown-menu">
             *          <li>
             *              <a ui-sref="state unknown 2">state unknown</a>
             *          </li>
             *      </ul>
             * </li>
             *
             * 3. <li> element nested in the second one
             * <li>
             *      <a ui-sref="state unknown 2">state unknown</a>
             * </li>
             */
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').length).toEqual(3);
        });

        it('should have the first and  most external <ul> element with first element <li> and only one state', function () {
            // if it has only one state it cannot have the class dropdown-submenu
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(0).hasClass('dropdown-submenu')).toBeFalsy();

            // it has just one state link
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(0).find('a').length).toEqual(1);
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(0).find('a').text()).toEqual('state 1');
        });

        it('should have the first and most external <ul> element with second element <li> and only one state and a submenu', function () {
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).hasClass('dropdown-submenu')).toBeTruthy();
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).find('a').eq(0).text()).toEqual('state 2');
        });

        /**
         * <li class="dropdown-submenu">
         *      <a ui-sref="state2" ng-if="leaf.name !== 'divider'" class="ng-binding ng-scope">state 2</a>
         *      <ul class="dropdown-menu ng-isolate-scope" tree="leaf.subtree">
         *          <li>
         *              <a ui-sref="state unknown 2">state unknown</a>
         *          </li>
         *      </ul>
         * </li>
         */
        it('should have the first <ul> element with second element <li> and only one state and a submenu', function () {
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).hasClass('dropdown-submenu')).toBeTruthy();
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).find('ul').length).toEqual(1);
        });

        it('should have the second <ul> element with one first nested element <li> and only one state', function () {
            // get the second nested li
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).find('a').length).toEqual(2);
            // get the second nested li and the first state
            expect(element.find('li').eq(0).find('ul').eq(0).find('li').eq(1).find('a').eq(0).text()).toEqual('state 2');
        });

        /*it('should have the second <ul> element with one first nested element <li> and only one state', function () {

            console.log(element.find('li').eq(0).hasClass('dropdown-submenu'));
        });*/
    });
});