let collectedSheetDb = [];
let sheetDB = [];

{
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}
// for(let i=0;i<rows;i++){
//     let sheetrow = [];
//     for(let j=0;j<cols;j++){
//         let colprop = {
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "left",
//             fontfamily: "monospace",
//             fontsize: "14",
//             fontcolor: "#000000",
//             bgcolor:"#000000",
//             value: "",
//             formula: "",
//             children: []
//         }
//         sheetrow.push(colprop);
//     }
//     sheetDB.push(sheetrow);
// }

// selectors for cell properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontsize = document.querySelector(".font-size-prop");
let fontfamily = document.querySelector(".font-family-prop");
let fontcolor = document.querySelector(".font-color-prop");
let bgcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];

let activeColorProp = "#b2bec3";
let inactiveColorProp = "#ecf0f1";

//attach property listeners
//application of 2 way binding
// ui change
// data change
bold.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.bold = !cellprop.bold;
    cell.style.fontWeight = cellprop.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellprop.bold ? activeColorProp : inactiveColorProp;
})
italic.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.italic = !cellprop.italic;
    cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellprop.italic ? activeColorProp : inactiveColorProp;
})
underline.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.underline = !cellprop.underline;
    cell.style.textDecoration = cellprop.underline ? "underline" : "none";
    underline.style.backgroundColor = cellprop.underline ? activeColorProp : inactiveColorProp;
})
fontsize.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontsize = fontsize.value;// datda change
    cell.style.fontSize = cellprop.fontsize + "px";
    fontsize.value = cellprop.fontsize;
})
fontfamily.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontfamily = fontfamily.value;// datda change
    cell.style.fontFamily = cellprop.fontfamily;
    fontfamily.value = cellprop.fontfamily;
})
fontcolor.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontcolor = fontcolor.value;// datda change
    cell.style.color = cellprop.fontcolor;
    fontcolor.value = cellprop.fontcolor;
})
bgcolor.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.bgcolor = bgcolor.value;// data change
    cell.style.backgroundColor = cellprop.bgcolor;
    bgcolor.value = cellprop.bgcolor;
})
alignment.forEach((alignelem) => {
    alignelem.addEventListener("click",(e) => {
        let address = addressbar.value;
        let [cell,cellprop] = activecell(address);

        let alignValue = e.target.classList[0];
        cellprop.alignment = alignValue;// data change
        cell.style.textAlign = cellprop.alignment;// ui
        switch(alignValue){
            case "left":
                leftalign.style.backgroundColor = activeColorProp;
                centeralign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftalign.style.backgroundColor = inactiveColorProp;
                centeralign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftalign.style.backgroundColor = inactiveColorProp;
                centeralign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = activeColorProp;
                break;
        }
    })
})

let allcells = document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++){
    addlistenertoattachcellprop(allcells[i]);
}

function addlistenertoattachcellprop(cell){
    cell.addEventListener("click",(e) => {
        let address = addressbar.value;
        let [rid,cid] =  decoderidcidfromaddress(address);
        let cellprop = sheetDB[rid][cid];
        //properties
        cell.style.fontWeight = cellprop.bold ? "bold" : "normal";
        cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
        cell.style.textDecoration = cellprop.underline ? "underline" : "none";
        cell.style.fontSize = cellprop.fontsize + "px";
        cell.style.fontFamily = cellprop.fontfamily;
        cell.style.color = cellprop.fontcolor;
        cell.style.backgroundColor = cellprop.bgcolor === "#000000" ? "transparent" : cellprop.bgcolor;
        cell.style.textAlign = cellprop.alignment;

        //ui properties
        
        bold.style.backgroundColor = cellprop.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellprop.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellprop.underline ? activeColorProp : inactiveColorProp;
        fontcolor.value = cellprop.fontcolor;
        bgcolor.value = cellprop.bgcolor;
        fontsize.value = cellprop.fontsize;
        fontfamily.value = cellprop.fontfamily;
        switch(cellprop.alignment){
            case "left":
                leftalign.style.backgroundColor = activeColorProp;
                centeralign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftalign.style.backgroundColor = inactiveColorProp;
                centeralign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftalign.style.backgroundColor = inactiveColorProp;
                centeralign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = activeColorProp;
                break;
        }
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellprop.formula;
        cell.innerText = cellprop.value;
    })
}

function activecell(address){
    let [rid,cid] = decoderidcidfromaddress(address);
    // acceess cell and storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop = sheetDB[rid][cid];
    return [cell,cellprop];
}

function decoderidcidfromaddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1)-1); //1 -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65 -> 0
    return [rid,cid];
}