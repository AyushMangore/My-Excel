// Every thing will be same as that of cycle validation code but here we will justadd some delays while we traverse and 
// also maniputate the cell background color, we will do all these with the help of async and await

async function isGraphCyclicTracePath(graphcomponentmatrix,cycleresponse){

    let [srcr, srcc] = cycleresponse;
    // dependency visited dfsvisited
    // 2d array
    let visited = [];
    let dfsvisited = [];

    for(let i=0;i<rows;i++){
        let visitedrow = [];
        let dfsvisitedrow = [];
        for(let j=0;j<cols;j++){
            visitedrow.push(false);
            dfsvisitedrow.push(false);
        }
        visited.push(visitedrow);
        dfsvisited.push(dfsvisitedrow);
    }

    // This is the same function which detect whether cycle exists or not
    let response = await dfscycledetectionTracePath(graphcomponentmatrix,srcr,srcc,visited,dfsvisited);

    // If cycle exists then we will return true but encapsulate it in a promise  similarily we do with false because we have made this 
    // function async therefore when this function is called from formula.js we have made the response to await there which get processed when our promise will be resolved
    if(response === true){
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}

// We have made this function to add some delay with the help of set time out function as our code executes very fast if we 
// don't add delay the nwe will not be able to figure out the cycle, this function also return a promise and we will await for the promise to be resolved
function colorpromise(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}
// Algorith is the same, just we have to add delays and change background color
async function dfscycledetectionTracePath(graphcomponentmatrix,srcr,srcc,visited,dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);

    // Preorder area
    // we have our cell we will change its background to blure and await for color promise function which will set delay
    // for one second
    cell.style.backgroundColor = "lightblue";
    await colorpromise();
    

    // A1 -> [0,1] , [1,0] , [2,3] , [5,7] ...........
    for(let children=0;children<graphcomponentmatrix[srcr][srcc].length;children++){
        let [nbrr,nbrc] = graphcomponentmatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc] === false){

            let response = await dfscycledetectionTracePath(graphcomponentmatrix,nbrr,nbrc,visited,dfsvisited);

            // Post order part 
            // after returning we will remove the background color and make it treansparent
            if(response === true){
                cell.style.backgroundColor = "transparent";
                await colorpromise();
                return Promise.resolve(true);
            }
        }else if(visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true){
            let cycliccell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            // if cycle exists and we reach at the node where both visited and dfs visited is true then we will highligh it with
            // different color and add the delay of 1 seconds
            cycliccell.style.backgroundColor = "lightsalmon";
            await colorpromise();
            // and finally we will remove colors from the root cell and other cell
            cycliccell.style.backgroundColor = "transparent";
            await colorpromise();
            cell.style.backgroundColor = "transparent";
            await colorpromise();
            return Promise.resolve(true);
        }
    }
    
    dfsvisited[srcr][srcc] = false;
    return Promise.resolve(false);
}