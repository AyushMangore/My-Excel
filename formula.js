// blur works before than click event listener
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
function setcellUiandCellProp(evaluatedValue,formula,address){
    let [cell,cellprop] = activecell(address);
    //update ui
    cell.innerText = evaluatedValue;
    //update database
    cellprop.value = evaluatedValue;
    cellprop.formula = formula;
}