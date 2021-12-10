// In this file we will manage copy paste operation
// control with click
// we have created a flag whenevr user will click control key it will be true or else false
let ctrlkey;
document.addEventListener("keydown",(e) => {
    ctrlkey = e.ctrlKey;
})
document.addEventListener("keyup",(e) => {
    ctrlkey = e.ctrlKey;
})
// for each cell we will handle selected cell functionality
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

// this is the areray which will stroe the copy range
let rangestorage = [];

// adding click liistener to each cell and check if ctrlkey is down then we will do our operations and if two cells are selected
// then we will handle our selected cells and then empty our range storage array 
function handleSelectedCells(cell){
    cell.addEventListener("click",(e) =>{
        // select cells range
        if(!ctrlkey) return;
        if(rangestorage.length >= 2){
            handleselectcellsui();
            rangestorage = [];
        }

        // to show the cell is selected we will modify the border property
        //ui
        cell.style.border = "3px solid #55efc4"

        // after fetching row and column , we will push it to rangestorage array
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangestorage.push([rid,cid]);
        console.log(rangestorage);
    })
}

// Now we will set all selected cell to deafult border property
function handleselectcellsui(){
    for(let i=0;i<rangestorage.length;i++){
        let cell = document.querySelector(`.cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }
}

let copydata = [];

// When ever copy button will be clicked and range storage length is 2 we proceed 
// first we fetch the start row and start column and end row end col this is our desired copying area
// iterating from start row till end row and start column till end column we will fetch the properties of each cell
// and push cell in row array and finally push the row array in copy data array
copyBtn.addEventListener("click",(e) => {

    if(rangestorage.length < 2) return;
    copydata = [];

    let [startrow,startcol,endrow,endcol] = [rangestorage[0][0],rangestorage[0][1],rangestorage[1][0],rangestorage[1][1]];

    for(let i=startrow;i <= endrow;i++){
        let copyrow = [];
        for(let j=startcol; j<= endcol;j++){
            let cellprop = sheetDB[i][j];
            copyrow.push(cellprop);
        }
        copydata.push(copyrow);
    }

    console.log(copydata);
    handleselectcellsui();
})

cutBtn.addEventListener("click",(e) => {

    if(rangestorage.length < 2) return;

    let [startrow,startcol,endrow,endcol] = [rangestorage[0][0],rangestorage[0][1],rangestorage[1][0],rangestorage[1][1]];
    for(let i=startrow;i <= endrow;i++){
        let copyrow = [];
        for(let j=startcol; j<= endcol;j++){

            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

            let cellprop = sheetDB[i][j];
            copyrow.push(cellprop);
            //db

            cellprop.value = "";
            cellprop.bold = false;
            cellprop.italic = false;
            cellprop.underline = false;
            cellprop.fontsize = "14";
            cellprop.fontfamily = "monospace";
            cellprop.fontcolor = "#000000";
            cellprop.bgcolor = "#000000";
            cellprop.alignment = "left";

            //ui
            cell.click();
        }
        copydata.push(copyrow);
    }
    handleselectcellsui();
})

// When paste button will be clicked first we will calculate the row difference and column difference
// and observe the address strating from this cell only we have to paste
// starting from strat row till start row + start diff and start col + coldiff we will iterate and manipulate the 
// style of each cell with the help of copy data array
pasteBtn.addEventListener("click", (e) => {
    if(rangestorage.length < 2) return;

    let rowdiff = Math.abs(rangestorage[0][0] - rangestorage[1][0]);
    let coldiff = Math.abs(rangestorage[0][1] - rangestorage[1][1]);

    let address = addressbar.value;
    let [strow,stcol] = decoderidcidfromaddress(address);


    //r refers copydata row
    //c refers copydata column

    for(let i=strow,r=0;i<=strow+rowdiff;i++,r++){
        for(let j=stcol,c=0;j<=stcol+coldiff;j++,c++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell){
                continue;
            }
            
            // db
            let data = copydata[r][c];
            let cellprop = sheetDB[i][j];
            cellprop.value = data.value;
            cellprop.bold = data.bold;
            cellprop.italic = data.italic;
            cellprop.underline = data.underline;
            cellprop.fontsize = data.fontsize;
            cellprop.fontfamily = data.fontfamily;
            cellprop.fontcolor = data.fontcolor;
            cellprop.bgcolor = data.bgcolor;
            cellprop.alignment = data.alignment;
            //ui
            cell.click();
        }
    }
})