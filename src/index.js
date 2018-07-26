
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


Vue.component('timer-countdown', {
    props: {
        title: String
    },
    data() {
        return { count: 0}
    },
    mounted() {
        this.count = Utils.time2seconds("00:" + this.title) / 1000;
        setInterval(() => {
                this.count -= 1;
            }, 1000);
    },
    template: '<i>{{this.title}}  [<b>{{this.count}}</b> sec.]</i>'
});

Vue.component('timer-item', {
    props: ['item'],
    data() {
      return { isRemoving: false }
    },
    methods: {
        removeTimer: function (item) {
            console.log(this.$el);
            $(this.$el).addClass("removing");
            let context = this;
            setTimeout(()=>{
                context.$parent.removeTimer(item);
            }, 500);
        }
    },
    template: '   <li class="timers_list__item"  >' +
    '       <timer-countdown v-bind:title="item.timer"></timer-countdown> ' +
    '       <button class="btn" v-on:click="removeTimer(item)">' +
    '           <i class="glyphicon glyphicon-remove"></i>' +
    '       </button>' +
    '   </li>'
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
            const seconds = Utils.time2seconds("00:" + item.timer);
            let context = this;

            setTimeout(()=>{

                context.removeTimer(item);
            }, seconds);
        },
        removeTimer: function (item) {
            const idx = this.items.indexOf(item);
            this.items.splice(idx, 1);
        }
    },
    template: '' +
    '<ul class="timers_list">' +
    '   <timer-item v-for="item in items" :key="item.id" v-bind:item="item" ></timer-item>' +
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
        title: 'Timers managment'
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
