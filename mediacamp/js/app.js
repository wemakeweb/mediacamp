App.controller = (function(){
	var con = {
		$el: null,
		username: null,

		init: function(){
			this.$el = $('#chat');
			this.$input = this.$el.find('.js-message-input');
			this.initSocket();
			this.bind();
		},

		bind: function(){
			this.$el.find('.js-save').on('click', this.set.bind(this));
			this.$input.on('keyup', this.sendMessage.bind(this));
			App.socket.on('message', this.renderItem.bind(this));
		},

		initSocket: function(){
			App.socket = io.connect('http://heythere.de:3000');
		},

		set: function(){
			var $save = this.$el.find('.js-username');
			this.username = $save.val();
		},

		renderItem: function(msg){
			var message = '<div class="message">' +
			'<div class="message-head">' + msg.username + '</div>' +
			msg.message + '</div>';

			this.$el.find('.chat-messages').append(message);
		},

		sendMessage: function(event){
			if(event.keyCode !== 13){
				return;
			}

			var val = this.$input.val();
			this.$input.val('');

			App.socket.emit('message', {
				username: this.username,
				message: val
			});
		}
	}

	$(function(){
		con.init();
	});

	return con;
})();