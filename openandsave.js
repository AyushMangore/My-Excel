let downloadbtn = document.querySelector(".download");
let openbtn = document.querySelector(".open");

downloadbtn.addEventListener("click", (e) => {
    
    let jsondata = JSON.stringify([sheetDB,graphcomponentmatrix]);
    let file = new Blob([jsondata],{type: "application/json"});
    
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();

})

openbtn.addEventListener("click", (e) => {
    
    // open file explorer to upload
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileobj = files[0];
        
        fr.readAsText(fileobj);
        fr.addEventListener("load",(e) => {
            let readsheetdata = JSON.parse(fr.result);
            
            // basic sheet will appear
            addSheetBtn.click();
            // sheet db + graph matrix

            sheetDB = readsheetdata[0];
            graphcomponentmatrix = readsheetdata[1];
            collectedSheetDb[collectedSheetDb.length-1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length] = graphcomponentmatrix;
            
            handlesheetproperties();
        })
    })
})