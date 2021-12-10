

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

    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         if(visited[i][j] === false){
    //             let response = dfscycledetectionTracePath(graphcomponentmatrix,i,j,visited,dfsvisited);
    //             if(response === true){
    //                 return true;
    //             }
    //         }
    //     }
    // }
    let response = await dfscycledetectionTracePath(graphcomponentmatrix,srcr,srcc,visited,dfsvisited);

    if(response === true){
        return Promise.resolve(true);
    }

    return Promise.resolve(false);
}

function colorpromise(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

async function dfscycledetectionTracePath(graphcomponentmatrix,srcr,srcc,visited,dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);

    cell.style.backgroundColor = "lightblue";
    await colorpromise();
    

    // A1 -> [0,1] , [1,0] , [2,3] , [5,7] ...........
    for(let children=0;children<graphcomponentmatrix[srcr][srcc].length;children++){
        let [nbrr,nbrc] = graphcomponentmatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc] === false){

            let response = await dfscycledetectionTracePath(graphcomponentmatrix,nbrr,nbrc,visited,dfsvisited);

            if(response === true){
                cell.style.backgroundColor = "transparent";
                await colorpromise();
                return Promise.resolve(true);
            }
        }else if(visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true){
            let cycliccell = document.querySelector(`.cell[rid="${nbrr}"][cid="${nbrc}"]`);
            
            cycliccell.style.backgroundColor = "lightsalmon";
            await colorpromise();
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