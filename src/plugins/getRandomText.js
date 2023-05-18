function getRandomText(number) {
    var result = '';
    var words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var max_position = words.length - 1;
    for (var i = 0; i < number; ++i) {
        var position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
    }
    return result;
}
export default getRandomText;
