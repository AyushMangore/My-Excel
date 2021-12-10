// We will manage our grid in this code
let rows = 100;
let cols = 26;
// we will select the cell by column and by the tag name in html element
let addresscolcont = document.querySelector(".address-col-cont");
let addressrowcont = document.querySelector(".address-row-cont");
// we will select the cell element as well
let cellscont = document.querySelector(".cells-cont");
// we will select our address bar with the help of query selector function
let addressbar = document.querySelector(".address-bar");

// first we ahve to create our very first column which conatins row numbering 1 2 3 4 ..... 100
// we have function for doing this called create element, first we will create a div element
// and then add a class address col and will set the inner text of the div element as row number
// finally we will append this column in address col container
for(let i=0;i<rows;i++){
    let addresscol = document.createElement("div");
    addresscol.setAttribute("class","address-col");
    addresscol.innerText = i+1;
    addresscolcont.appendChild(addresscol);
}
// similarily after creating very first column, now we need very first row to denote all the columns
// every column will be numbered in alphabetical order we have 26 column A B .... Y Z
// for this we again create a div element and set class to address row and we need to convert the integer to
// character for labelling for this we will use frunction called from char code with the help of ascii code we will
// create our character 65 - A, 66 - B , ....... , Z - 90
// and append this first row in our main content 
for(let i=0;i<cols;i++){
    let addressrow = document.createElement("div");
    addressrow.setAttribute("class","address-row");
    addressrow.innerText = String.fromCharCode(65+i);
    addressrowcont.appendChild(addressrow);
}

// now when our labelling row and columns are ready its time to create our grid cells
// therefore we will use nested loop row on outer and column on inner and iterate through all the 2600 cells
// we will append 26 column in a row and then finally append our row in cells container
// first creating our roe container and adding class to it now iterating 26 times we will create our cell
// adding class cell to it and also we will set two attributes row and column in each cell for future use
// after all 26 cells created we will append them in a row and after all 100 rows are created finally it will be 
// appended in cells conatiner
for(let i=0;i<rows;i++){
    let rowcont = document.createElement("div");
    rowcont.setAttribute("class","row-cont");
    for(let j=0;j<cols;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("spellcheck","false");
        //attributes for cell and storage identification
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowcont.appendChild(cell);
        addlistenerforaddressbardisplay(cell,i,j);
    }
    cellscont.appendChild(rowcont);
}

// This function is basically a click listener whenever our cell will be clicked then its location should 
// be visible in address bar container for this we will pass its row and column and set the value of our address
// bar accordingly
function addlistenerforaddressbardisplay(cell,i,j){
    cell.addEventListener("click",(e) => {
        let rowid = i+1;
        let colid = String.fromCharCode(65+j);
        addressbar.value = `${colid}${rowid}`;
    })
}