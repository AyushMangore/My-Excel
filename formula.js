// In this file formula functionality has been implemented
// first iterating through each cell we will add a blur click listener 
// blur works before than click event listener
// And change the content in database if user has written something in the cell
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e) => {
            let address = addressbar.value;
            let[activeCell,cellprop] = activecell(address);
            let entereddata = activeCell.innerText;
            if(entereddata === cellprop.value) return;
            cellprop.value = entereddata;
            // if data has been modified update it
            // remove parent relation and formula -> updtae children
            removeChildFromParent(cellprop.formula);
            cellprop.formula = "";
            updateChildrenCells(address);
            // console.log(cellprop);
        })
    }
}
// Getting the reference of formula bar from query selector function
// We have added a keyboard key pressed listener in formula after writing formula in the format of
// ( op1 operator op2 ) if user click enter button then we will process it, we will acquire the address through address bar and
// then cell ui and cell database reference trhough active cell function, if our formula is different then preious formula stored in the 
// database we break the relations with other cell if there is any.It might possible that while writing formula we have used any other cell
// therefore we will pass our new formula and address of the current cell to another function which we discuss later in the code.
// Now we will check is there any cycle or not with this new formula, we have a separate function for that called is graph cyclic
// If cyclic then we will alert the user and until user does not cancel the alert box we will keep on tracking the cycle path again with the help of cycle trace function
// If there is no cycle then we simply evaluate our formula with the help of separate funtion and then update our ui and database accordingly the other functions which are used here will be 
// discussed in the further code below
let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async (e) => {
    let inputFomula = formulaBar.value;
    if(e.key === "Enter" && inputFomula){
        

        let address = addressbar.value;
        let [cell,cellprop] = activecell(address);
        // if formula changed then break old relation and calculate new formula
        if(inputFomula !== cellprop.formula){
            removeChildFromParent(cellprop.formula);
        }

        addchildtographcomponent(inputFomula,address);
        // check cycle exists or not
        let cycleresponse =  isGraphCyclic(graphcomponentmatrix);
        if(cycleresponse){
            // alert("Formula Contains Cycle Please Check!");
            
            let response = confirm("Formula Contains Cycle, Do You Want To Trace The Cyclic Path!");
            while(response){
                // keep on tracing the color until user click cancel
                await isGraphCyclicTracePath(graphcomponentmatrix,cycleresponse);
                // To complete full iteration of color tracking
                response = confirm("Formula Contains Cycle, Do You Want To Trace The Cyclic Path!");
            }

            removeChildFromGraphComponent(inputFomula,address);
            return;
        }


        let evaluatedValue = evaluateFormula(inputFomula);
        

        
        setcellUiandCellProp(evaluatedValue,inputFomula,address);
        addChildToParent(inputFomula);

        console.log(sheetDB);

        updateChildrenCells(address);
    }
})

// This function will remove a partcular value fro graph componenet matrix this smatrix will take care of graph cycle detection
// We have passed two things in this function first the formula and another is the child address with the help of the formula after spliting it
// around the spaces we wll decode its row and column and then simply pop that attribute from graph componenet matrix
function removeChildFromGraphComponent(formula,childaddress){
    let [crid,ccid] = decoderidcidfromaddress(childaddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [prid,pcid] = decoderidcidfromaddress(encodedFormula[i]);
            // B1 = A1 + 100;
            graphcomponentmatrix[prid][pcid].pop();
        }
    }
}

// This function will add a child to graph componenet matrix, actually each element in our graph componenet matrix is an array which contains the
// child, child is refers to the depenency of formula, first we will decode the row and col of our child address with the help of decode rid cid function
// then we will encode the formula by spliting it through spaces and then for each address in formula we will find its row and column and then from the graph
// componenet matrix at that parent row and column we will add the address of the child in terms of crid and ccid
function addchildtographcomponent(formula,childaddress){
    let [crid,ccid] = decoderidcidfromaddress(childaddress);
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [prid,pcid] = decoderidcidfromaddress(encodedFormula[i]);
            // B1 = A1 + 100;
            graphcomponentmatrix[prid][pcid].push([crid, ccid]);
        }
    }
}

// We have to update all the cells which are dependent on the parent cell therefore we have designed this function
// with the help of parent address we will get cell ui and cell database reference and we have an array of children with each each in database which will
// keep the information of all childs connected through it, after getting the children we will iterate through each of them and will acquire their ui and database reference and then
// evaluate the formula associated with each child and then update our database and ui accordingly
function updateChildrenCells(parentaddress){
    let [parentcell,parentcellprop] = activecell(parentaddress);
    let children = parentcellprop.children;
    
    // if children length 0 then automatically returns
    for(let i=0;i<children.length;i++){
        let childaddress = children[i];
        let [childcell,childcellprop] = activecell(childaddress);
        let childformula = childcellprop.formula;
        let evaluatedValue = evaluateFormula(childformula);
        setcellUiandCellProp(evaluatedValue,childformula,childaddress);
        updateChildrenCells(childaddress);
    }
}

// This function is designed to add childs to each cell if there are any, after clicking on any cell when user will write some formula then that
// formula will be passed in this fuction and we will check does it contain any dependency or not if it contains then simply get the reference of ui and database with
// the help of active cell function and then we will add our child address that is the address of the current cell to the parent cell
function addChildToParent(formula){
    let childaddress = addressbar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [parentcell,parentcellprop] = activecell(encodedFormula[i]);
            parentcellprop.children.push(childaddress);
        }
    }
}
// Every thing is same as that of above adding child function but here instead of adding we will remove the current cell as child from the parent cell
function removeChildFromParent(formula){
    let childaddress = addressbar.value;
    let encodedFormula = formula.split(" ");
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [parentcell,parentcellprop] = activecell(encodedFormula[i]);
            let idx = parentcellprop.children.indexOf(childaddress);
            parentcellprop.children.splice(idx,1);
        }
    }
}
// This is the very important function in which we input the formula and it will return the calculated output, our formula may or may not
// contain the address therefore we have to check after spliting our formula through the spaces, if it is the address then we have to replace its value
// we csn do this with the help of stored value in the database and then finally we will join our formula again with the spaces and then pass this to 
// function eval which takes formula in terms of ( operan1 oerator opereand2 ) and returns the calculated value
function evaluateFormula(formula){
    // formula must be space separated
    let encodedFormula = formula.split(" ");
    // ( A1 + A2 ) 0 1 2 3 4
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue = encodedFormula[i].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [cell,cellprop] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellprop.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula);
}
// Once our value is calculated we will update ui and database
function setcellUiandCellProp(evaluatedValue,formula,address){
    let [cell,cellprop] = activecell(address);
    //update ui
    cell.innerText = evaluatedValue;
    //update database
    cellprop.value = evaluatedValue;
    cellprop.formula = formula;
}