function onListeners(event, callback) {
    var _listener = this._listener;
    if (!_listener[event]) {
        _listener[event] = [];
    }
    _listener[event].push(callback);
}
function emitListeners(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!this._listener[event]) {
        console.error('Такая функция не установлена');
    }
    else {
        this._listener[event].forEach(function (listener) {
            listener(args[0]);
        });
    }
}
export { onListeners, emitListeners };
