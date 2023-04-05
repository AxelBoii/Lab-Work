var app = new Vue({
    el: '#app',
    data: {
        message: '',
        processCommand: ''
    },
    methods: {
        process: function(){
            this.processCommand = 'Message is equal to: '
        }
    }
})