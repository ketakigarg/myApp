var App = App || {};

//Model

App.Student = Backbone.Model.extend({
    defaults:{
        name:'',
        standard:'',
        sex:'',
        address:''
    }
});

//Collection

App.Students = Backbone.Collection.extend({});


// instantiate a Collection
students = new App.Students();

// Backbne View for one student
App.StudentView = Backbone.View.extend({
    tagName: 'tr',
    model: new App.Student(),
    initialize: function(){
        this.template = _.template($('.student-list-template').html());
        
    },
    events: {
        'click .edit-btn': 'edit',
        'click .update-btn': 'update',
        'click .cancel-btn': 'cancel',
        'click .delete-btn': 'delete'
    },
    edit: function() {
        $('.edit-btn').hide();
        $('.delete-btn').hide();
        this.$('.update-btn').show();
        this.$('.cancel-btn').show();

        var name = this.$('.name').html();
        var standard = this.$('.standard').html();
        var sex = this.$('.sex').html();
        var address = this.$('.address').html();

        this.$('.name').html('<input type="text" class="name-update" value="' + name + '">');
        this.$('.standard').html('<input type="text" class="standard-update" value="' + standard + '">');
        this.$('.sex').html('<input type="text" class="sex-update" value="' + sex + '">');
        this.$('.address').html('<input type="text" class="address-update" value="' + address + '">');
    },
    update: function() {
        this.model.set('name', $('.name-update').val());
        this.model.set('standard', $('.standard-update').val());
        this.model.set('sex', $('.sex-update').val());
        this.model.set('address', $('.address-update').val());
    },
    cancel: function() {
        studentsView.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function() {   
        this.$el.html(this.template(this.model.toJSON()));
        
        return this;
    }

});

//Backbone view for all students
App.StudentsView = Backbone.View.extend({
    model: students,
    el: $('.student-list'),
    initialize: function() {
        var that = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function() {
            setTimeout(function() {
                that.render();
            }, 25);
        },this);
        this.model.on('remove', this.render, this);
    },
    render: function() {
        var that = this;
        
        that.$el.html('');
        _.each(this.model.toArray(), function(student) {
            that.$el.append((new App.StudentView({model: student})).render().$el);
        });
        return this;
    }
});

//instantiate view
studentsView = new App.StudentsView();

$(document).ready(function(){


    $('.add-btn').on('click', function() {
        
        var student = new App.Student({
            name: $('.name-input').val(),
            standard: $('.standard-input').val(),
            sex: $('.sex-input').val(),
            address: $('.address-input').val()
        });
        $('.name-input').val('');
        $('.standard-input').val('');
        $('.sex-input').val('');
        $('.address-input').val('');
        students.add(student);
    })    
})
