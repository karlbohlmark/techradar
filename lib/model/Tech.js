window.Tech = Backbone.Model.extend({
    defaults: function() {
      return {
        x:  100,
        y: 100,
       symbol: 'circle'
      };
    },

    toggle: function() {
      this.save({done: !this.get("done")});
}

});