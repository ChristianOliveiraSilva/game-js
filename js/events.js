
const setEvents = () => {
    document.addEventListener('keydown', handleKeyPress);
}

const handleKeyPress = (event) => {
    const stepSize = 10;
    
    switch (event.key) {
        case 'w':
            player.y -= stepSize;
            player.orientation = event.key;
            break;
        case 'a':
            player.x -= stepSize;
            player.orientation = event.key;
            break;
        case 's':
            player.y += stepSize;
            player.orientation = event.key;
            break;
        case 'd':
            player.x += stepSize;
            player.orientation = event.key;
            break;
        case ' ':
            player.items.push(...items.filter(e => calcDistance(player.x, player.y, e.x, e.y) <= 30))
            items = items.filter(e => calcDistance(player.x, player.y, e.x, e.y) > 30)
            break;
    }

        if (player.y < 0) {
            player.y = 0
        }

        if (player.x < 0) {
            player.x = 0
        }
}