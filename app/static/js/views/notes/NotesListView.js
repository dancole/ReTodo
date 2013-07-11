define([
  'jquery',
  'underscore',
  'backbone',
  'models/notes/NoteModel',
  'collections/notes/NoteCollection',
  'text!templates/notes/itemTemplate.html'
], function($, _, Backbone, NotesModel, NoteCollection, itemTemplate){
  var NotesListView = Backbone.View.extend({

    tagName:  "li",

    events: {
      "dblclick .view"  : "toggleDone",
      "click label"     : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(_.template(itemTemplate, this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.$el.children().children("i").toggleClass('icon-ok', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    toggleDone: function() {
      this.model.toggle();
    },

    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    clear: function() {
      this.model.destroy();
    }

  });
  return NotesListView;
});
