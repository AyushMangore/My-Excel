// Here we will provide the functionality of download and upload option
let downloadbtn = document.querySelector(".download");
let openbtn = document.querySelector(".open");

downloadbtn.addEventListener("click", (e) => {
    
    // Whenever download button is clicked we will stringyfy the sheet DB and graph component matrix
    // and stroe them it in json format
    // The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be 
    // read as text or binary data, or converted into a ReadableStream so its methods 
    // can be used for processing the data. Blobs can represent data that isn't necessarily in a JavaScript-native format.
    let jsondata = JSON.stringify([sheetDB,graphcomponentmatrix]);
    let file = new Blob([jsondata],{type: "application/json"});
    
    // we will create an anchor element and create an url object in which we will pass our file then we will give name of our sheet
    // on download functioality and then click the anchor element
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();

})

openbtn.addEventListener("click", (e) => {
    
    // open file explorer to upload
    // Create an input element and set attribute to file and then click
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    // if the file is uploaded the nlistener will be active
    // we will collect our file in a file object and after readng it as a text we will add load listener
    // now we will parse our json data and we will implicitly clic kthe add sheet button so that our new
    // sheet and sheetdb will be created, then we will assign our sheet data to sheet db and graph matrix data to graph matrix component matrix 
    // we will add both new shet db and graph componenet matrix to the collected sheet db and collected graph componenet matrix
    // and then we will call handle sheet properties which will manage all the ui operations of this new sheet
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