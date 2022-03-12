class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 4) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }


}



class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 8
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character, character8, character9) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character8 || matrix[y][x] == character9) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.energy >= 15) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let grEat = new GrassEater(newX, newY)
            grassEaterArr.push(grEat)
            this.energy = 8
        }
    }
    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.energy > 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
        else {
            this.die()
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1, 8, 9)
        let newCell = random(emptyCells)
        let count = 0;
        let count1 = 0;
        if (newCell) {
            this.energy += 2
            let newX = newCell[0]
            let newY = newCell[1]
            if (matrix[newY][newX] == 8) {
                count++
            }
            if (matrix[newY][newX] == 9) {
                count1++
            }
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in virusArr) {
                if (newX == virusArr[i].x && newY == virusArr[i].y) {
                    virusArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul()
            }
            if (count1 == 1) {
                matrix[newY][newX] = 7;
                let zomb = new Zombie(newX, newY);
                zombieArr.push(zomb)
            }


        } else {
            this.move()
        }
        if (count == 1) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }

        }
    }

}


class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 8
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character, character1, character8, character9) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1 || matrix[y][x] == character8 || matrix[y][x] == character9) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.energy >= 20) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let pred = new Predator(newX, newY)
            predatorArr.push(pred)
            this.energy = 8
        }
    }
    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.energy > 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
        else {
            this.die()
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1, 2, 8, 9)
        let newCell = random(emptyCells)
        let count = 0;
        let count1 = 0;
        if (newCell) {
            this.energy += 2
            let newX = newCell[0]
            let newY = newCell[1]
            if (matrix[newY][newX] == 8) {
                count++
            }
            if (matrix[newY][newX] == 9) {
                count1++
            }
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY


            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 10) {
                this.mul()
            }
            if (count1 == 1) {
                matrix[newY][newX] = 7;
                let zomb = new Zombie(newX, newY);
                zombieArr.push(zomb)
            }
        }
        else {
            this.move()
        }
        if (count == 1) {
            this.die()
        }
        
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}


class grSpawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 4) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1
            let grSp = new Grass(newX, newY)
            grassArr.push(grSp)
            this.multiply = 0
        }
    }

}
class grEatSpawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 4
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let grEatSp = new GrassEater(newX, newY)
            grassEaterArr.push(grEatSp)
            this.energy = 8
        }
    }
}
class predSpawn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 8
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1]

        ];
    }
    chooseCell(character, character1) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 4) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let predSpawn = new Predator(newX, newY)
            predatorArr.push(predSpawn)
            this.energy = 8
        }
    }
}

class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 10000000
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character, character1, character2) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;

    }
    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
    }
    eat() {
        let emptyCells = this.chooseCell(1, 2, 3)
        let newCell = random(emptyCells)
        if (newCell) {
            this.energy += 500
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 8
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }


        }
        else {
            this.move()
        }
    }
}

class virus {
    kill() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

class sunk {
    kill() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
