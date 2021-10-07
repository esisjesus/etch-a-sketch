function initEditor(){
    const globalConfig = {
        penColor: "#000000",
        bgColor: "#ffffff",
        cellsAmount: 32,
    }
    // TOOLS' PANEL FUNCTIONS:
    const penColorInput = document.getElementById("pen-color-panel")
    const bgColorInput = document.getElementById("bg-color-panel")
    penColorInput.addEventListener('input', changePenColor)
    bgColorInput.addEventListener('input', paintBg)
    function changePenColor(e){
        globalConfig.penColor = e.target.value
    }
    function paintBg(e){
        globalConfig.bgColor = e.target.value;
        const grid = document.getElementById("container")
        grid.style.backgroundColor = globalConfig.bgColor
    }
    


    // GRID, CELLS AND STROKES FUNCTIONS:
    function createGrid(a){
        const grid = document.getElementById("container")
        const panel = document.getElementById("panel")
        for(let i = 0; i < a*a; i++){
            let gridElement = document.createElement('div')
            gridElement.classList.add("cell")
            gridElement.addEventListener('mousedown', initStroke)
            gridElement.addEventListener('mouseup', finishStroke)
            grid.appendChild(gridElement)
        }
        grid.style.gridTemplateColumns = `repeat(${a}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${a}, 1fr)`
        panel.addEventListener("mouseup", finishStroke)
    }
    
    function initStroke(){
        let cells = document.querySelectorAll(".cell")
        this.style.backgroundColor = globalConfig.penColor
        cells.forEach(cell => {
            cell.addEventListener("mouseover", paintCell)
        })
    }
    
    function finishStroke(){
        let cells = document.querySelectorAll(".cell")
        cells.forEach(cell => {
            cell.removeEventListener("mouseover", paintCell)
        })
    }    
    
    function paintCell(){
        this.style.backgroundColor = globalConfig.penColor
    }
    createGrid(globalConfig.cellsAmount)
}


initEditor()

