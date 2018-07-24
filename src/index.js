
Vue.component('label-item', {
    mounted() {
        this.$root.$on('welcome', this.accept);
    },
    data: ()=> ({
        content: ''
    }),
    methods: {
      accept: function(payload) {
          this.content = payload.message;
      }
    },
    template: '<p>Label: {{ content }}</p>'
});

Vue.component('field-item', {
    created() {

    },
    data: ()=> ({
        message: ''
    }),

    methods: {
      send: function () {
          this.$root.$emit('welcome', { message: this.message});
      }
    },
    template: '<div>' +
    '<span>Message: </span><input type="text" v-model="message" v-on:input="send">' +
    '<button v-on:click="send" class="btn btn-primary">Add</button>' +
    '</div>'
});

Vue.component('timers-list', {
    template: '<ul class="timers_list">' +
    '   <li class="timers_list__item">timer...</li>' +
    '</ul>' +
    ''
});

Vue.component('timer-add', {
    template: '<div class="timer_add"><button class="btn btn-primary">Add</button></div>'
});


var app = new Vue({
    el: '#app',
    data: {
        title: 'Interaction between components'
    }
});
