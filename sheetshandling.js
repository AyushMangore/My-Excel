// Here we will manage multiple sheets 
// There is button at the bottom of our page when ever user will click on it new sheet should appear and also we have to 
// manage removal of sheets as well sheets can be removed by clcik on sheet name and then clicking right key
// we have taken the reference of the add button and sheets content
let addSheetBtn = document.querySelector(".sheet-add-icon");
let activesheetcolor = "#b2bec3";
let sheetsfoldercont = document.querySelector(".sheets-folder-cont");
// Now when ever add button is clicked we will create new sheet element for this first we will create a div element and then add a class
// sheet-folder, we are adding this class to all the sheet element therefore when we do query selector all then the total length will be returned
// and we will assign the length to our newly created sheet element and the nwe add little html with the help of inner html function
// In this small html snippet we will add variable length which wll shown in the ui and finally we will append our sheet in the main sheets folders content
// After new sheet element is created we have to manage other properties, for which we have created different functions will call them one by one and click our current sheet
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

// In this function we will manage our sheet removal, action will be right click on the sheet for this we have listener called
// mouse down and then we will first check the sheet which user want to delete is last one or not if it is the last sheet then
// we have to put an alert that single sheet can't be deleted and if it is not the last sheet then we will ask user to confirm the delete operation
// First we will acquire the sheet index which is there with every sheet element
// And then first we remove the sheet from our database and then from collected graph component
// as collected sheet db contains all the sheets similarily collected graph component contains the information about graph representation of each matrix
// after data base removal we will remove the sheet from ui in a separate function and by default we will assign our very first sheet to default sheet
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

// This function manages the ui removal of the sheet, simply there is a function remove through whic hour sheet will be removed from ui
// But we have to updtae the sheets container area as well therefore we will now traverse through all sheets and again set the attribute of sheet number
// and modify the inner text and then we wiull make all sheets back ground color transparent and finally will highlight the very first sheet at index 0
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
// If a new sheet is clicked the nwe have to change the sheet Db and graph componenet matrix as well, on the basis of sheet index
// we will getch the sheet from the collected sheet db and graph componenet matrix from collected graph componenet and assign
function handlesheetDB(sheetidx){
    sheetDB = collectedSheetDb[sheetidx];
    graphcomponentmatrix = collectedGraphComponent[sheetidx];
}

// Actually we need not to handle sheet properties agin as we have already done it in it cell properties .js we know that
// with each cell we have associated a click listener therefore we will simply traverse through each cell and click the cell
// and by default we will click the very first cell so that our address bar will not remain empty
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

// So when new sheet will be created we have to update the sheet container section as well therefore we will itearte through all
// the sheet elemets and make back ground color transparent and then the sheet element which is passed will be highlighted
function handlesheetui(sheet){
    let allsheetfolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allsheetfolders.length;i++){
        allsheetfolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = activesheetcolor;
}

// Whenever a sheet will be clicked all the three important functions handle sheet db then handle sheet properties and then
// handle sheet ui will be called
function handlesheetactiveness(sheet){
    sheet.addEventListener("click",(e) => {
        let sheetindex = Number(sheet.getAttribute("id"));
        handlesheetDB(sheetindex);
        handlesheetproperties();
        handlesheetui(sheet);
    })
}

// This is the function where we will design our sheet DB 2D array in which each cell will be represented as an object
// first we will iterate through each row and for each column inside it we create a default cell object with the default style properties
// and then push it to our row array and when we exit the column loop we will append this array to our sheet DB arrayand finnaly we will aadd
// our sheet DB array to collected sheet DB array 
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

// In this function we will create our hraph component matrixwe will iterate through each row and column and at each cell
// we will push an empty array in which our child relation will be stored later in the form of co - ordinates
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