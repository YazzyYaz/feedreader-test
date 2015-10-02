/*

    Author: 'Yaz Khoury'
    Date: 'October 2015'
    Title: 'Jasmine Feed Reader Spec Testing'
    Description: 'This is the spec file that Jasmine will read and contains all of the tests that will be run against feed reader application'

 */



// We place our tests in $() function since they might require DOM elements.
// We want to ensure they don't run until the DOM is ready.

$(function() {

    'use strict';

    // First Test Suite related to RSS Feeds and allFeeds variable

    describe('RSS Feeds', function() {

        // This is our first test. Ensures allFeeds variable is defined and not empty

        it('All Feeds Are Defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Ensures URLs are defined and not empty

        it('url is given', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).not.toBe(null);
            }
        });

        // Ensures Names are defined and not empty

        it('name is given', function(){
            for(var i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).not.toBe(null);
            }
        });
    });


    // Second Test Suite related to Menu

    describe('The menu', function(){

        var body = $('body');
        var menu = 'menu-hidden';
        var menuIcon = $('.menu-icon-link')

        // Test to Ensure Menu is hidden by default

        it('menu is hidden by default', function(){
            expect(body.hasClass(menu)).toBe(true);
        });


        // Test to Ensure Menu changes visibilty upon clicking the icon

         it('menu changes visibility when clicked', function(){

            body.removeClass();
            body.addClass(menu);

            menuIcon.click();
            expect(body.attr('class')).not.toBe(menu);
            menuIcon.click();
            expect(body.attr('class')).toBe(menu);
         })
    });

    // Third Test Suite related to our Entries from the Load Feed

    describe('Initial Entries', function(){

        // Called before for making asynchronous activities

        beforeEach(function(done){
            loadFeed(0, done);
        })

        // Test to ensure a single entry at least in the feed

         it('able to load entries', function(){
            var rows = $('.entry').length;
            expect(rows).toBeGreaterThan(0);
         })
    });


    // Fourth Test Suite for testing a new feed is being loaded

    describe('New Feed Selection', function(){


        var texts;

        // Called before for making asynchronous activities

         beforeEach(function(done){
            $('.feed').empty();
            loadFeed(0, function(){
                texts = $('.feed').find('h2').text();
                loadFeed(1, done);
            });
        })

         // Ensuring new content is loaded when new feed is loaded
         it('feed load changes content', function(done) {
            expect($('.feed').find('h2').text()).not.toBe(texts);
            done()
         })


    });
}());
