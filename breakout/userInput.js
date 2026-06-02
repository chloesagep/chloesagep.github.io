function keyPressed() {
    // organized user inputs by gameState

    switch (gameState) {
        // START STATE
        case "start":

            // choose start of high score
            if (keyCode == UP_ARROW) {
                highlighted = 1
                paddleHit.play()
            }
            if (keyCode == DOWN_ARROW) {
                highlighted = 2
                paddleHit.play()
            }

            // go to start game
            if (keyCode == ENTER || keyCode == RETURN) {
                if (highlighted == 1) {
                    gameState = "paddleSelect"
                } else {
                    gameState = "highScores"
                }
            }
            break

            // PADDLE SELECT STATE
        case "paddleSelect":
            if (keyCode == LEFT_ARROW) {
                if (currentPaddle == 0) {
                    noSelect.play()
                } else {
                    select.play()
                    currentPaddle--
                }
            } else if (keyCode == RIGHT_ARROW) {
                if (currentPaddle == 3) {
                    noSelect.play()
                } else {
                    select.play()
                    currentPaddle++
                }
            }

            if (keyCode == ENTER || keyCode == RETURN) {
                paddle = new Paddle(currentPaddle)
                health = 3
                score = 0
                level = 0
                recoverPoints = 5000
                confirmSound.play()
                init()
                gameState = "serve"
            }

            // SERVE STATE
        case "serve":
            if (keyCode == ENTER || keyCode == RETURN) {
                ball.dx = random(-3, 3)
                ball.dy = random(-1, -2)
                gameState = "play"
            }
            break

            // VICTORY STATE
        case "victory":
            if (keyCode == ENTER || keyCode == RETURN) {
                level++
                gbricks = createMap(level)
                gameState = "serve"
            }
            break

            // GAME OVER STATE
        case "gameOver":
            if (keyCode == ENTER || keyCode == RETURN) {
                if (checkIfHighScore()) {
                    highScore.play()
                    gameState = "enterHighScore"
                } else {
                    init()
                    ganeState = "start"
                }
            }
            break

            // ENTER HIGH SCORE
        case "enterHighScore":
            if (keyCode == LEFT_ARROW) {
                select.play()
                highlightedChar = highlightedChar == 0 ? 2 : highlightedChar - 1
            } else if (keyCode == RIGHT_ARROW) {
                select.play()
                highlightedChar = highlightedChar == 2 ? 0 : highlightedChar + 1
            }

            if (keyCode == UP_ARROW) {
                chars[highlightedChar]++
                if (chars[highlightedChar] > 90) {
                    chars[highlightedChar] = 65
                }
            } else if (keyCode == DOWN_ARROW) {
                chars[highlightedChar]--
                if (chars[highlightedChar] < 65) {
                    chars[highlightedChar] = 90
                }
            } else if (keyCode == ENTER || keyCode == RETURN) {
                saveNewHighScore()
                gameState = "highScores"
            }
            break

            // HIGH SCORES
        case "highScores":
            if (keyCode == ESCAPE) {
                wallHit.play()
                init()
                gameState = "start"
            }
            break

        case "play":
            if (keyCode == 32) {
                gameState = "paused"
                brickHit2.play()
            }
            break
        case "paused":
            if (keyCode == 32) {
                gameState = "play"
                brickHit2.play()
            }
    }
}
