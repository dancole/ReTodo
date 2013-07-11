define([
  'jquery',
  'underscore',
  'backbone',
  'collections/notes/NoteCollection',
  'views/notes/NotesView',
], function($, _, Backbone, NoteCollection, NotesView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:defaultAction', function (actions) {

      var notesView = new NotesView();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
