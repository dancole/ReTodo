define([
  'jquery',
  'underscore',
  'backbone',
  'models/notes/NoteModel',
  'collections/notes/NoteCollection',
  'views/notes/NotesListView',
  'text!templates/notes/statsTemplate.html',
  'text!templates/notes/notesTemplate.html'
], function($, _, Backbone, NoteModel, NoteCollection, NotesListView, statsTemplate, notesTemplate){
  'use strict';

  var NotesView = Backbone.View.extend({

    el: $("#page"),

    template: _.template(notesTemplate),

    events: {
      "keypress #new-note":  "createOnEnter",
      "click #clear-completed": "clearCompleted"
    },

    initialize: function() {

      var onDataHandler = function(collection) {
          this.render();
      }

      this.$el.append(this.template());

      this.collection = new NoteCollection();
      this.collection.fetch({ success : onDataHandler, dataType: "jsonp"});


      this.input = this.$("#new-note");
      this.allCheckbox = 0;

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      // listenTo has other events, `all` fires for everything. 
      this.listenTo(this.collection, 'destroy', this.render);
      this.listenTo(this.collection, 'sync', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      this.collection.fetch();
    },

    render: function() {
      var done = this.collection.done().length;
      var remaining = this.collection.remaining().length;

      if (this.collection.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(_.template(statsTemplate, {done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    addOne: function(note) {
      var view = new NotesListView({model: note});
      $("#notes-list").append(view.render().el);
    },

    addAll: function() {
      this.collection.each(this.addOne);
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      this.collection.create({title: this.input.val()});
      this.input.val('');
    },

    clearCompleted: function() {
      _.invoke(this.collection.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.collection.each(function (note) { note.save({'done': done}); });
    }

  });

  return NotesView;
});
