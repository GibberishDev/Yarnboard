hotkeys("ctrl+shift+A,O", {keyup: true}, function(e, handler) {
	if (e.type === 'keydown') {
		console.log("event fired!")
		if (handler.key === 'ctrl+shift+A') {
			console.log("A")
		}
		if (handler.key === 'O') {
			console.log("O")
		}
	}
	if (e.type === 'keyup') {
		console.log("event finished")
	}
})

hotkeys('f5', function(event, handler) {
  // Prevent the default refresh event under WINDOWS system
  event.preventDefault();
  alert('you pressed F5!');
});
