/*-
This is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This software is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this software.  If not, see <http://www.gnu.org/licenses/>.
*/

var screen = document.getElementById("screen");
var context = screen.getContext("2d");

//Images' path
var playerImagePath = "images/plane5.png";
var bombImagePath = "images/bomb2.png";
var backgroundImagePath = "images/sky01.png";

//Player
var player = new Player();
player.getImage().src = playerImagePath;

//Bomb
var bombs = [];
var bombsFired = 0;

//Key actions
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
function keyUp(e) {
    if (e.keyCode === 38) {
        player.decreaseAngle(false);
    } else if (e.keyCode === 40) {
        player.increaseAngle(false);
    } else if (e.keyCode === 32) {
        playerFire();
    }
}
function keyDown(e) {
    if (e.keyCode === 38) {
        player.decreaseAngle(true);
    } else if (e.keyCode === 40) {
        player.increaseAngle(true);
    }
}

//Player is firing a bomb
function playerFire() {
    bombs[bombsFired] = new Bomb();
    bombs[bombsFired].setCoordinateX(player.getCoordinateX());
    bombs[bombsFired].setCoordinateY(player.getCoordinateY());
    bombs[bombsFired].setVelocityY(player.getVelocityY());
    bombs[bombsFired].setVelocityX(player.getVelocityX());
    bombs[bombsFired].setAngle(player.getAngle());
    bombs[bombsFired].getImage().src = bombImagePath;
    bombsFired++;
}

//Clear the draws
function clearScreen() {
    var backgroundImage = new Image();
    backgroundImage.src = backgroundImagePath;
    context.drawImage(backgroundImage, 0, 0, screen.width, screen.height);
}

//The game's life cicle
function gameLifeCicle() {
    clearScreen();

    //Drawing and moving the player
    player.move();
    player.draw(context, screen);
    
    //Drawing and moving the bombs
    for (i = 0; i < bombsFired; i++) {
        bombs[i].move();
        bombs[i].draw(context, screen);
    }

}
window.setInterval(gameLifeCicle, 5);

