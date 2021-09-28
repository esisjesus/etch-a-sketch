const grid = document.getElementById("container")

for(let i = 0; i < 16*16; i++){
    let newDiv = document.createElement('div')
    newDiv.classList.add("cell")
    grid.appendChild(newDiv)
}