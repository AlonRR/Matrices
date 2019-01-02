class Matrix {
    constructor(rows, cols) {
        this.matrixMaker(rows, cols)
    }
    matrixMaker(rows, cols) {
        let n = 1
        let matrix = []
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < cols; j++) {
                row.push(n++)
            }
            matrix.push(row)
        }
        this.matrix = matrix
    }
    alter(row, col, num) {
        this.matrix[row][col] = num
    }
    print() {
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ``
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += this.matrix[i][j] + `\t`
            }
            console.log(line)
        }
    }
    printColumn(col) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][col])
        }
    }
    printRow(row) {
        for (let i = 0; i < this.matrix[row].length; i++) {
            console.log(this.matrix[row][i])
        }
    }
    get(row, col) {
        return this.matrix[row][col]
    }
    findCoordinate(num) {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] === num) {
                    return { x: j, y: i }
                }
            }
        }
    }
}
class EmployeeMatrix extends Matrix {
    constructor() {
        super()
    }
    loadData(salaryData) {
        this.matrixMaker(salaryData.length, 4)
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = [salaryData[i]._id, salaryData[i].name, salaryData[i].department, salaryData[i].salary]
        }
    }
    getEmployees(type) {
        let people = []
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.get(i, 2) === type) {
                people.push(this.get(i, 1))
            }
        }
        return people
    }
    getTotalSalary(type) {
        let sum = 0
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.get(i, 2) === type) {
                sum += this.get(i, 3)
            }
        }
        return sum
    }
    findRichest() {
        let person = { salary: null, name: null }
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.get(i, 3) > person.salary || person === null) {
                person = { salary: this.get(i, 3), name: this.get(i, 1) }
            }
        }
        return person.name
    }
}
class TicTacToe extends Matrix {
    constructor() {
        super()
        this.turn = null
    }
    loadBoard() {
        this.matrixMaker(3, 3)
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = [`.`, `.`, `.`]
        }
    }
    play(row, col, player) {
        let sym
        if (player === 1) {
            sym = `X`
        } else {
            sym = `O`
        }
        if (this.alter(row, col, sym, player)) { return }
        else {
            row = this.getRow(row)
            col = this.getCol(col)
            if (row === `${sym.repeat(3)}` || col === `${sym.repeat(3)}`) {
                this.print()
                console.log(`Congratulations Player ${player}`)
                this.loadBoard()
            }
        }
    }
    alter(row, col, sym, player) {//true if taken
        if (this.get(row, col) != `.`) {
            console.log(`Alredy played there`)
            return true
        } else if (this.turnCheck(player)) {
            super.alter(row, col, sym)
            return false
        }
    }
    turnCheck(player) {//true if player turn
        if (this.turn != player || this.turn === null) {
            this.turn = player
            return true
        } else {
            console.log(`Not your turn player ${player}`)
            return false
        }
    }
    getRow(num,sym) {
        let row = ``
        if(this.matrix[num]===[sym,sym,sym]){

        }
        for (let i = 0; i < this.matrix.length; i++) {
            row += this.matrix[num][i]
        }
        return row
    }
    getCol(num) {
        let col = ``
        for (let i = 0; i < this.matrix[num].length; i++) {
            col += this.matrix[i][num]
        }
        return col
    }
}
/*
let data = [
    { _id: "e10021", name: "Gillian", department: "Finance", salary: 2000 },
    { _id: "e10725", name: "Tibor", department: "Design", salary: 1200 },
    { _id: "e10041", name: "Anisha", department: "Finance", salary: 2300 },
    { _id: "e10411", name: "Jakub", department: "Design", salary: 1600 },
    { _id: "e11995", name: "Mar", department: "Design", salary: 1300 },
    { _id: "e10732", name: "Nisha", department: "Design", salary: 1200 }
]

let m = new EmployeeMatrix()

m.loadData(data)

//ex1
let m = new Matrix(3, 4)
m.print()
//prints

// 1       2       3       4
// 5       6       7       8
// 9       10      11      12


m.alter(0, 0, m.get(1, 1))
m.printColumn(0) //prints 6, 5, 9 (separate lines)
m.printRow(0) //prints 6, 2, 3, 4 (separate lines)

//ex2
let m = new Matrix(3, 4)
console.log(m.findCoordinate(12)) //prints {x: 3, y: 2}
console.log(m.findCoordinate(7)) //prints {x: 2, y: 1}

//ex3
m.print()

// prints:
//row\colm 0    1       2       3
// 0    e10021  Gillian Finance 2000
// 1    e10725  Tibor   Design  1200
// 2    e10041  Anisha  Finance 2300
// 3    e10411  Jakub   Design  1600
// 4    e11995  Mar     Design  1300
// 5    e10732  Nisha   Design  1200

//ex4
console.log(m.getEmployees("Finance")) //prints [ 'Gillian', 'Anisha' ]
console.log(m.getEmployees("Design")) //prints [ 'Tibor', 'Jakub', 'Mar', 'Nisha' ]

//ex5
console.log(m.getTotalSalary("Finance")) //prints 4300
console.log(m.getTotalSalary("Design")) //prints 5300

//ex6
console.log(m.findRichest()) //prints Anisha

//ex7
let board = new TicTacToe()
board.loadBoard()
board.print()
//prints
// .       .       .
// .       .       .
// .       .       .

//ex8
let board = new TicTacToe()
board.loadBoard()

board.play(2, 2, 1)
board.play(0, 0, 2)
board.print()
//prints 
// o       .       .
// .       .       .
// .       .       x

//ex9
let board = new TicTacToe()
board.loadBoard()

board.play(2, 2, 1)
board.play(0, 0, 0)
board.play(0, 2, 1)
board.play(1, 0, 0)
board.play(1, 2, 1) //prints Congratulations Player 1

board.print()
//prints
// o       .       x
// o       .       x
// .       .       x
*/
// extens
let board = new TicTacToe()
board.loadBoard()

//exten1
board.play(2, 2, 1)
board.play(2, 2, 0)//Alredy played there

// exten2
board.play(2, 0, 1)
board.play(2, 1, 1)//Not your turn player 1
board.print()

//exten3
board.play(2, 2, 1)
board.play(0, 0, 0)
board.play(0, 2, 1)
board.play(1, 0, 0)
board.play(1, 2, 1) //prints Congratulations Player 1 and board also resets board
board.print()


/*
    .   x   o
    .   x   .
    o   .   o
*/