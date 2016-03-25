'use strict';

var $ = window.$ = window.jQuery = require('jquery');
require('materialize');

var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var TermsCollection = require('./collections/termsCollection');
var TermsListComponent = require('./components/termsListComponent');
var CoursesCollection = require('./collections/coursesCollection');
var CoursesListComponent = require('./components/coursesListComponent');
var HomeLayoutView = require('./views/HomeLayoutView');
var NavbarComponent = require('./components/navbarComponent');
var UserModel = require('./models/userModel');
var UsersCollection = require('./collections/usersCollection');
var UsersListComponent = require('./components/usersListComponent');
var RegistrationsListComponent = require('./components/registrationsListComponent');
var TermModel = require('./models/termModel');

$(function() {
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      '/': 'index',
      'terms': 'terms',
      'users': 'users',
      'courses': 'courses',
      'registration': 'registration'
    },
    
    currentUser: new UserModel($('[data-bootstrap]').detach().data('bootstrap')),
    currentView: undefined,
    
    initialize: function() {
      $(' <div class="navbar-fixed"><nav></nav></div>').insertBefore('#container');
      ReactDOM.render(<NavbarComponent model={this.currentUser} />, $('nav')[0]);
    },
    
    index: function() {
      var terms = new TermsCollection();
      terms.fetch();
      this.currentView = new HomeLayoutView({collection: terms});
      $('#container').html(this.currentView.render().el);
      this.currentView.insertCharts();
    },
    
    terms: function() {
      var terms = new TermsCollection();
      terms.fetch();
      ReactDOM.render(<TermsListComponent collection={terms} />, $('#container')[0]);
    },
    
    users: function() {
      var users = new UsersCollection();
      users.fetch();
      ReactDOM.render(<UsersListComponent collection={users} />, $('#container')[0]);
    },
    
    courses: function() {
      var courses = new CoursesCollection();
      courses.fetch();
      var terms = new TermsCollection();
      terms.fetch({
        success: function() {
          ReactDOM.render(<CoursesListComponent terms={terms} collection={courses} />, $('#container')[0]);
        }
      });
    },
    
    registration: function() {
      var courses = new CoursesCollection();
      courses.fetch({
        success: function() {
          var users = new UsersCollection();
          users.fetch({
            success: function() {
              ReactDOM.render(<RegistrationsListComponent collection={courses} users={users} />, $('#container')[0]);
            }
          })
        }
      });  
    }
  });
  
  new AppRouter();
  Backbone.history.start();
});
