// control with click
let ctrlkey;
document.addEventListener("keydown",(e) => {
    ctrlkey = e.ctrlKey;
})
document.addEventListener("keyup",(e) => {
    ctrlkey = e.ctrlKey;
})
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

let rangestorage = [];

function handleSelectedCells(cell){
    cell.addEventListener("click",(e) =>{
        // select cells range
        if(!ctrlkey) return;
        if(rangestorage.length >= 2){
            handleselectcellsui();
            rangestorage = [];
        }

        //ui
        cell.style.border = "3px solid #55efc4"

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangestorage.push([rid,cid]);
        console.log(rangestorage);
    })
}

function handleselectcellsui(){
    for(let i=0;i<rangestorage.length;i++){
        let cell = document.querySelector(`.cell[rid="${rangestorage[i][0]}"][cid="${rangestorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
    }
}

let copydata = [];

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