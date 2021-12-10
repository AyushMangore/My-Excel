// storage
// 2d matrix 
let collectedGraphComponent = [];
let graphcomponentmatrix = [];

// for(let i=0;i<rows;i++){
//     let row = [];
//     for(let j=0;j<cols;j++){
//         // more than one child relation dependencies therefore using array
//         row.push([]);
//     }
//     graphcomponentmatrix.push(row);
// }

function isGraphCyclic(graphcomponentmatrix){
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

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j] === false){
                let response = dfscycledetection(graphcomponentmatrix,i,j,visited,dfsvisited);
                if(response === true){
                    return [i , j];
                }
            }
        }
    }
    return null;
}

// initially visited = true then dfs visited true
// last dfs visited false
// cycle detection condition
// if ( visited[i][j] == true && dfsvisited[i][j] == true) : cycle
// boolean value will be returned
function dfscycledetection(graphcomponentmatrix,srcr,srcc,visited,dfsvisited){
    visited[srcr][srcc] = true;
    dfsvisited[srcr][srcc] = true;


    // A1 -> [0,1] , [1,0] , [2,3] , [5,7] ...........
    for(let children=0;children<graphcomponentmatrix[srcr][srcc].length;children++){
        let [nbrr,nbrc] = graphcomponentmatrix[srcr][srcc][children];
        if(visited[nbrr][nbrc] === false){
            let response = dfscycledetection(graphcomponentmatrix,nbrr,nbrc,visited,dfsvisited);
            if(response === true){
                return true;// return immediately if cycle found
            }
        }else if(visited[nbrr][nbrc] === true && dfsvisited[nbrr][nbrc] === true){
            return true;
        }
    }
    
    dfsvisited[srcr][srcc] = false;
    return false;
}