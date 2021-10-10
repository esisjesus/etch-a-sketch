function initEditor(){
    const globalConfig = {
        defaultPen: "#000000",
        defaultBg: "#ffffff",
        defaultGrid: "#6b6b6b3b",
        defaultCells: 32,
        penColor: "#000000",
        bgColor: "#ffffff",
        gridColor: "#6b6b6b3b",
        cellsAmount: 32,
    }
    // TOOLS' PANEL FUNCTIONS:

    // Colors:
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
    // Grid toggle : 
    const gridToggle = document.getElementById("grid-toggle")
    const gridColorInput = document.getElementById("grid-color-panel")
    gridToggle.addEventListener("change", toggleGrid)
    gridColorInput.addEventListener("input", changeGridColor)
    function toggleGrid(e){
        const cells = document.querySelectorAll(".cell")
        if(e.target.checked == true){
            gridColorInput.style.display = "block"
            cells.forEach(cell =>{
                cell.style.border = `solid 0.1px ${globalConfig.gridColor} `
            })
        }else{
            gridColorInput.style.display = "none"
            cells.forEach(cell =>{
                cell.style.border = "none"
            })
        }
    }
    function changeGridColor(e){
        const cells = document.querySelectorAll(".cell")
        globalConfig.gridColor = e.target.value
        cells.forEach(cell =>{
            cell.style.border = `solid 0.1px ${globalConfig.gridColor} `
        })
    }

    // Number of cells
    const range = document.getElementById("cells-range")
    range.addEventListener("input", cellsNumber)
    const gridButton = document.getElementById("create-grid")
    gridButton.addEventListener("click", createGrid)
    function cellsNumber(e){
        globalConfig.cellsAmount = e.target.value
        gridButton.disabled = false
        gridButton.innerText = `Create ${globalConfig.cellsAmount} x ${globalConfig.cellsAmount} grid`
    }
    
    // Clear y Reset

    const reset = document.getElementById("reset")
    const clear = document.getElementById("clear")
    reset.addEventListener("click", ()=>{
        globalConfig.bgColor = globalConfig.defaultBg
        globalConfig.penColor = globalConfig.defaultPen
        globalConfig.gridColor = globalConfig.defaultGrid
        globalConfig.cellsAmount = globalConfig.defaultCells

        createGrid()
    })
    clear.addEventListener("click", ()=>{
        const cells = document.querySelectorAll(".cell")
        cells.forEach(cell=>{
            cell.style.backgroundColor = "transparent"
        })
    })


    // GRID, CELLS AND STROKES CREATION FUNCTIONS:
    function createGrid(){
        const grid = document.getElementById("container")
        const panel = document.getElementById("panel")
        gridButton.innerText = "Create grid"
        gridButton.disabled = true
        grid.replaceChildren()
        for(let i = 0; i < globalConfig.cellsAmount*globalConfig.cellsAmount; i++){
            let gridElement = document.createElement('div')
            gridElement.classList.add("cell")
            gridElement.style.border = `solid 0.1px ${globalConfig.gridColor} `
            gridElement.addEventListener('mousedown', initStroke)
            gridElement.addEventListener('mouseup', finishStroke)
            grid.appendChild(gridElement)
        }
        grid.style.gridTemplateColumns = `repeat(${globalConfig.cellsAmount}, 1fr)`
        grid.style.gridTemplateRows = `repeat(${globalConfig.cellsAmount}, 1fr)`
        grid.style.backgroundColor = globalConfig.bgColor
        gridColorInput.style.display = "block"
        gridToggle.checked = true
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
    
    createGrid()
}


initEditor()

