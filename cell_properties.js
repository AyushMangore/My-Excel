// In this file all the properties of cells are being managed
// we have two arrays collected sheets for storing multiple sheets and sheet for storing all cells of a single sheet
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

// we have collected the reference of all the properties that can be applied on our cells
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

//Attach property listeners
//Application of 2 way binding
//Ui change
//Data change

// Bold click listener, if a user is in any cell writing something and clicks on bold icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value by toggling it and on that basis we will 
// change the style to bold in ui and when user will click on bold button it will be highlighted by changing its background color
bold.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.bold = !cellprop.bold;
    cell.style.fontWeight = cellprop.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellprop.bold ? activeColorProp : inactiveColorProp;
})
// Italic click listener, if a user is in any cell writing something and clicks on italic icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value by toggling it and on that basis we will 
// change the style to italic in ui and when user will click on italic button it will be highlighted by changing its background color
italic.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.italic = !cellprop.italic;
    cell.style.fontStyle = cellprop.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellprop.italic ? activeColorProp : inactiveColorProp;
})
// Underline click listener, if a user is in any cell writing something and clicks on underline icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value by toggling it and on that basis we will 
// change the style to underline in ui and when user will click on underline button it will be highlighted by changing its background color
underline.addEventListener("click",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    // modify
    cellprop.underline = !cellprop.underline;
    cell.style.textDecoration = cellprop.underline ? "underline" : "none";
    underline.style.backgroundColor = cellprop.underline ? activeColorProp : inactiveColorProp;
})
// Font size click listener, if a user is in any cell writing something and clicks on font size icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value and on that basis we will 
// change the font size in ui, default font size is 14
fontsize.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontsize = fontsize.value;// data change
    cell.style.fontSize = cellprop.fontsize + "px";
    fontsize.value = cellprop.fontsize;
})
// Font family click listener, if a user is in any cell writing something and clicks on font family icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value and on that basis we will 
// change the font family in ui, default font family is monospace
fontfamily.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontfamily = fontfamily.value;// datda change
    cell.style.fontFamily = cellprop.fontfamily;
    fontfamily.value = cellprop.fontfamily;
})
// Font color click listener, if a user is in any cell writing something and clicks on font color icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value and on that basis we will 
// change the font color in ui, default font color is black
fontcolor.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.fontcolor = fontcolor.value;// datda change
    cell.style.color = cellprop.fontcolor;
    fontcolor.value = cellprop.fontcolor;
})
// Back ground color click listener, if a user is in any cell writing something and clicks on background color icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value and on that basis we will 
// change the background color in ui, default background color is transparent
bgcolor.addEventListener("change",(e) => {
    let address = addressbar.value;
    let [cell,cellprop] = activecell(address);
    cellprop.bgcolor = bgcolor.value;// data change
    cell.style.backgroundColor = cellprop.bgcolor;
    bgcolor.value = cellprop.bgcolor;
})
// alignment click listener, if a user is in any cell writing something and clicks on any of three alignment icon then we have to change the style of the text
// whenever user will click on any cells its location will be visible on address bar we will fetch the location from there
// after fetching address we will pass this address to a  function named as active cell this will return an object containing instance of 
// of the cell denotes ui and cell prop denotes database, we will first change our database value and on that basis we will 
// change the alignment in ui, default text alignment is left
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

// Now we will add default properties to each cells, therefore by iterating through each cell we will pass it to a function
let allcells = document.querySelectorAll(".cell");
for(let i=0;i<allcells.length;i++){
    addlistenertoattachcellprop(allcells[i]);
}

// For each cell first we will fetch its address from address bar value and pass this address to another function which will decode the address
// and return the row and column of the cell and with that row and column value we will get the instance of the cell from the database
// and then will change the style of the cell in ui according to the value stored in the database, this will make the ui responsive whenever user will click on
// any of the cell we will restore its properties from the database
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

// This function is designed to return the ui reference and database reference on providing the address
// address will be like A10 denoting row number 10 and column number A, after decoding the address we will fetch the row and column
// and then on the basis of row and column we will select cell in ui and also from the database and thyen after creating an object of these two 
// refernces we will simply return it
function activecell(address){
    let [rid,cid] = decoderidcidfromaddress(address);
    // acceess cell and storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop = sheetDB[rid][cid];
    return [cell,cellprop];
}

// With the help of this function we will decode the row and column through address and return it
function decoderidcidfromaddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1)-1); //1 -> 0
    let cid = Number(address.charCodeAt(0)) - 65; // "A" -> 65 -> 0
    return [rid,cid];
}