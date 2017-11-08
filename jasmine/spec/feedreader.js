/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* (Completed) Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have valid URLs', function() {
           for(var feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* (Completed) Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have valid feed names', function() {
           for(var feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* (Completed) Write a new test suite named "The menu" */
    describe('The menu', function() {
        var view = $('body');
        var menu = $('.menu-icon-link');

        /* (Completed) Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('should be hidden on initial page load', function() {
           expect(view.hasClass('menu-hidden')).toBe(true);
         });

         /* (Completed): Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should change visibility when the menu button is clicked', function() {
           menu.click();
           expect(view.hasClass('menu-hidden')).toBe(false);
           menu.click();
           expect(view.hasClass('menu-hidden')).toBe(true);
         });
    });

    /* (Completed): Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* (Completed): Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('should have at least one entry in the feed', function(done) {
           expect($('.feed .entry-link').children().hasClass('entry')).toBe(true);
           done();
         });
    });

    /* (Completed): Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* (Completed): Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var firstFeed, nextFeed;

         beforeEach(function(done) {
           loadFeed(0, function() {
             firstFeed = $('.feed').html();
             done();
           });
         });

         /*To simulate new feed selection, a random feed ID different from the
           first is selected (i.e. 1, 2 or 3).
         */
         it('should change when a new feed is loaded', function(done) {
           var nextFeedId = Math.floor(Math.random() * 3) + 1;
           loadFeed(nextFeedId, function() {
             nextFeed = $('.feed').html();
             expect(firstFeed).not.toEqual(nextFeed);
             done();
           });
         });
    });
}());
