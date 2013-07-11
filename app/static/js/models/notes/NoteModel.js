define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var NoteModel = Backbone.Model.extend({

    defaults: function() {
      return {
        title: "empty note...",
        order: this.collection.nextOrder(),
        done: false
      };
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  return NoteModel;

});
