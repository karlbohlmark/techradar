window.TechList = Backbone.Collection.extend({

    model: Tech,

    localStorage: new Store("techs"),

    comparator: function(tech) {
      return tech.get('i');
    }

});