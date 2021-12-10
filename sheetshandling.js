let addSheetBtn = document.querySelector(".sheet-add-icon");
let activesheetcolor = "#b2bec3";
let sheetsfoldercont = document.querySelector(".sheets-folder-cont");
addSheetBtn.addEventListener("click",(e) => {
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");

    let allsheetfolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allsheetfolders.length);;
    
    sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allsheetfolders.length+1}</div>
    `
    sheetsfoldercont.appendChild(sheet);
    sheet.scrollIntoView();

    addSheetProperties();
    createGraphComponentMatrix();
    handlesheetactiveness(sheet);
    handlesheetremoval(sheet);
    sheet.click();
})

function handlesheetremoval(sheet){
    sheet.addEventListener("mousedown", (e) => {
        if(e.button !== 2){// 0 left 1 drag 2 right
            return;
        } 
        let allsheetfolders = document.querySelectorAll(".sheet-folder");
        if(allsheetfolders.length === 1){
            alert("Atleast one sheet needed");
            return;
        }
        let  response = confirm("Do you really want to delete this sheet, Are You Sure!");
        if(response === false){
            return;
        }
        let sheetindex = Number(sheet.getAttribute("id"));
        // db removal
        collectedSheetDb.splice(sheetindex,1);
        collectedGraphComponent.splice(sheetindex,1);
        // ui
        handlesheetuiremoval(sheet);
        // by default assign db to sheet 1  active
        sheetDB = collectedSheetDb[0];
        graphcomponentmatrix = collectedGraphComponent[0];
        handlesheetproperties();

    })
}

function handlesheetuiremoval(sheet){
    sheet.remove();
    let allsheetfolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetfolders.length;i++){
        allsheetfolders[i].setAttribute("id",i);
        let sheetcontent = allsheetfolders[i].querySelector(".sheet-content");
        sheetcontent.innerText = `Sheet ${i+1}`;
        allsheetfolders[i].style.backgroundColor = "transparent";
    }
    allsheetfolders[0].style.backgroundColor = activesheetcolor;
}

function handlesheetDB(sheetidx){
    sheetDB = collectedSheetDb[sheetidx];
    graphcomponentmatrix = collectedGraphComponent[sheetidx];
}

function handlesheetproperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstcell = document.querySelector(".cell");
    firstcell.click();
}

function handlesheetui(sheet){
    let allsheetfolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetfolders.length;i++){
        allsheetfolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = activesheetcolor;
}

function handlesheetactiveness(sheet){
    sheet.addEventListener("click",(e) => {
        let sheetindex = Number(sheet.getAttribute("id"));
        handlesheetDB(sheetindex);
        handlesheetproperties();
        handlesheetui(sheet);
    })
}

function addSheetProperties(){
            let sheetDB = [];
            for(let i=0;i<rows;i++){
                let sheetrow = [];
                for(let j=0;j<cols;j++){
                    let colprop = {
                        bold: false,
                        italic: false,
                        underline: false,
                        alignment: "left",
                        fontfamily: "monospace",
                        fontsize: "14",
                        fontcolor: "#000000",
                        bgcolor:"#000000",
                        value: "",
                        formula: "",
                        children: []
                    }
                    sheetrow.push(colprop);
                }
                sheetDB.push(sheetrow);
            }
    collectedSheetDb.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphcomponentmatrix = [];

    for(let i=0;i<rows;i++){
        let row = [];
        for(let j=0;j<cols;j++){
            // more than one child relation dependencies therefore using array
            row.push([]);
        }
        graphcomponentmatrix.push(row);
    }
    collectedGraphComponent.push(graphcomponentmatrix);
}