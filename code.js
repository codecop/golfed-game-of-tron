e = 0 // e is going to contain the keyboard event
c = document.getElementById("gc")

function ok(event) {
    e=event
}

function ol() {
    z = c.getContext('2d');
    g = {} // We are going to use g to store our grid to detect collisions.
    s = 0 // keeps track of the score and is set to 0.
    n = 150
    x = 11325 // tron's position, and is set to 11325 (11325=75*75+75=center of the grid).
    z.fillRect(0, 0, n, x);
    i = setInterval(interval, 9)
}

function interval() {
    if (e) {
        if (0 < x % n &&
            x < n * n &&
            (g[x += [1, -n, -1, n][e.which & 3]] ^= 1)) { // Updates x based on the value of e (remember, onkeyup saves the event in the e variable).

            // draw a white pixel at the tron's position
            z.clearRect(x % n, x / n, 1, 1, s++)

        } else {

            // We replace the page's content with "game over" and the score when a collision occurs.
            document.body.innerHTML = 'game over: ' + s
            window.clearInterval(i)
        }
    }

}
