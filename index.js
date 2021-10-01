const grid = document.getElementById("container")

function createGrid(a){
    for(let i = 0; i < a*a; i++){
        let gridElement= document.createElement('div')
        gridElement.classList.add("cell")
        grid.appendChild(gridElement)
    }
    grid.style.gridTemplateColumns = `repeat(${a}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${a}, 1fr)`

}

createGrid(100)