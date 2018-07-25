
class TimerItem {

    constructor(id, timer) {
        this.id = id;
        this.timer = timer;
    }

}

class Utils {

    /**
     * 
     * @param hms '02:04:33';
     * @returns {number}
     */
    static time2seconds(hms) {

        let itms = hms.split(':'); // split it at the colons
        return ((+itms[0]) * 60 * 60 + (+itms[1]) * 60 + (+itms[2])) * 1000;
    }

}
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
    mounted(){
        this.items = [];
        this.$root.$on('addtimer', this.accept);
    },
    data() {
      return { items:[] }
    },
    methods: {
        accept: function(item) {
            this.items.push(item);
        },

        removeTimer: function (item) {
            const idx = this.items.indexOf(item);
            this.items.splice(idx, 1);
        }
    },
    template: '<ul class="timers_list">' +
    '   <li class="timers_list__item" v-for="item in items">{{item.timer}} ' +
    '       <button class="btn" v-on:click="removeTimer(item)">' +
    '           <i class="glyphicon glyphicon-remove"></i>' +
    '       </button>' +
    '   </li>' +
    '</ul>' +
    ''
});

Vue.component('timer-add', {
    mounted(){
        this.currentTimer = '08:00';
        this.lastId = 1;
    },
    data() {
        return { lastId: 0, currentTimer: '' }
    },
    methods: {
        getNextId: function() {
          this.lastId += 1;
          return this.lastId;
        },
        onAdd: function() {
            console.info("onAdd");

            let item = new TimerItem(
                this.getNextId(),
                this.currentTimer
            );

            this.$root.$emit('addtimer', item );
        },
        onEnter: function(event) {
            if (event.keyCode === 13) {
                event.stopImmediatePropagation();
                console.info("PRESS ENTER");
                this.onAdd();
                event.stopPropagation();
            }
        }
    },
    template: '<div class="timer_add">' +
    '<input type="time" v-model="currentTimer" v-on:keydown="onEnter">' +
    '<button :tabindex="3" class="btn btn-primary" v-on:click="onAdd">Add</button>' +
    '</div>'
});

var app = new Vue({
    el: '#app',
    data: {
        title: 'Interaction between components'
    },
    methods: {
      keydown: function (event) {
          if (event.keyCode === 13) {
              console.info("PRESS ENTER");
              event.stopPropagation();
              event.stopImmediatePropagation();
          }
      }  
    },
});
