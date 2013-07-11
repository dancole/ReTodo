define([
  'underscore',
  'backbone',
  'models/notes/NoteModel'
], function(_, Backbone, NoteModel){

  var NoteCollection = Backbone.Collection.extend({

    model: NoteModel,

    url: '/api/notes',

    done: function() {
      return this.filter(function(note){ return note.get('done'); });
    },

    remaining: function() {
      return this.without.apply(this, this.done());
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(note) {
      return note.get('order');
    }

  });

  return NoteCollection;

});
