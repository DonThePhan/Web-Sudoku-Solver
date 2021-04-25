// INITIAL PUZZLE (BLANK)
var remaining = []
const matrix = [
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    ['', '', '',    '', '', '',     '', '', ''],
    
]
  
/************************************************************************/
// SOLVE PUZZLE

solutionFinder = (remaining) => {
    if (remaining.length === 0) return true

    for (let num = 1; num <= 9; num++) {
        matrix[remaining[0][0]][remaining[0][1]] = num

        if (numValid(remaining[0])) {
            let removed = remaining.shift()
            
            if (solutionFinder(remaining)) {
                return true
            }
            remaining.unshift(removed)
        }
        matrix[remaining[0][0]][remaining[0][1]] = ''
    }  
    return false
}

numValid = (coord) => {
    let y = coord[0]
    let x = coord[1]

    //column (y's)
    for (let i = 0; i < 9; i++) {
        if (i != y && matrix[i][x] === matrix[y][x]) return false
    }

    //rows (x's)
    for (let i = 0; i < 9; i++) {
        if (i != x && matrix[y][i] === matrix[y][x]) return false
    }

    // 3X3 grid
    var lowerY = Math.floor(y/3)*3
    var upperY = Math.floor(y/3)*3+3
    var lowerX = Math.floor(x/3)*3
    var upperX = Math.floor(x/3)*3+3

    for (let iy = lowerY; iy < upperY; iy++) {
        for (let ix = lowerX; ix < upperX; ix++) {
            if (matrix[iy][ix] === matrix[y][x] && (y != iy || x != ix)) return false
        }
    }

    return true
}

/************************************************************************/
// HTML/CSS/JS

// create DOM of puzzle
const elementMatrix = document.querySelector(".matrix")
const coordMatrix = []

//rows
for (let y = 0; y < 9; y++) {

    let coordRow =[]
    let elementRow = document.createElement("div")

    // columns
    for (let x = 0; x < 9; x++) {
        let cell = document.createElement("input")

        cell.addEventListener('change', function () {
            // update puzzle w/ DOM values
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {

                    // filter invalide entries
                    if (!parseInt(coordMatrix[y][x].value) || !(1 <= parseInt(coordMatrix[y][x].value) && parseInt(coordMatrix[y][x].value) <= 9)) coordMatrix[y][x].value = ''
                    else coordMatrix[y][x].value = parseInt(coordMatrix[y][x].value)
       
                    matrix[y][x] = coordMatrix[y][x].value
                }
            }
        })

        // add CSS borders to DOM
        if (y % 3 === 0) cell.style.borderTop = "1px solid #84521B"
        if (y % 3 === 2) cell.style.borderBottom = "1px solid #84521B"
        if (x % 3 === 0) cell.style.borderLeft = "1px solid #84521B"
        if (x%3 ===2) cell.style.borderRight = "1px solid #84521B"

        
        cell.value = matrix[y][x]
        
        elementRow.appendChild(cell)
        coordRow.push(cell)
    }
    elementMatrix.appendChild(elementRow)
    coordMatrix.push(coordRow)
}

// create Solve Button DOM
var solve = document.querySelector('.solve')
solve.addEventListener('click', function () {

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (matrix[y][x]!= '' && !numValid([y, x])) {
                alert("There doesn't seem to be a solution")
                return
            }
        }
    }
    
    remaining = []
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            coordMatrix[y][x].classList.remove('blank')
            if (matrix[y][x] === '') {
                remaining.push([y, x])
                coordMatrix[y][x].classList.add('blank')
            }
            else matrix[y][x] = parseInt(matrix[y][x])
        }
    }

    if (solutionFinder(remaining)) {
        for (let y = 0; y < 9; y++) {
            console.log(matrix[y])
            for (let x = 0; x < 9; x++) {
                coordMatrix[y][x].value = matrix[y][x]
            }
        }
    }

    else {
        alert("There doesn't seem to be a solution")
    }

})

// create Solve Button DOM
var clear = document.querySelector('.clear')
clear.addEventListener('click', function () {
    console.log('clearing')
    for (y = 0; y < 9; y++) {
        for (x = 0; x < 9; x++) {
            coordMatrix[y][x].value = ''
            matrix[y][x] = ''
            coordMatrix[y][x].classList.remove('blank')
        }
    }
})