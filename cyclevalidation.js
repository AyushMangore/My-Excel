// storage made with the help of two arrays
// 2d matrix 
let collectedGraphComponent = [];
let graphcomponentmatrix = [];

// Thisis done in a separate file therefore commented
// for(let i=0;i<rows;i++){
//     let row = [];
//     for(let j=0;j<cols;j++){
//         // more than one child relation dependencies therefore using array
//         row.push([]);
//     }
//     graphcomponentmatrix.push(row);
// }
// This function will check whether cycle exists or not
// Algorithm : we will maintained two visited array first will store the visited status and second one will store the dfs visited
// status we will call recursivly on preorder we will put true in both the visited array and when we come down again that means in postorder
// we will put false in the visited array and move to next node if in any node it happens that visited is also true and dfs visited is also 
// true it certainly means that the node has been visited before. But there is one corner case that is our graph can be disconnected as well
// therefore we have to check for each cell separately

function isGraphCyclic(graphcomponentmatrix){
    // dependency visited dfsvisited
    // 2d array
    let visited = [];
    let dfsvisited = [];

    // Initially assigning false at every cell
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

    // Now for each cell we are checking visited if visited is false then we check though this cell that cycle exists or not and collect the
    // response in separate variable, if cycle exists then we will return the location of the current cell or return null
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
// This is our main function it takes four arguments first is our graph componenet matrix the nsourcse and destination
// and then our visited and dfs visited array before calling first we will assign true in both of these arrays
// Now depeendency is checked on the basis of children in graph componenet matrix every cell has children array 
// which contains the locations of all the dependent childs therefore for the given cell we will traverse its children array
// we will call the location of children as neighbour and check whether it is already visited or not, if it is not visited
// then we will call our function recursively and now we will pass our neighbour row and column as source row and column
// and we will check the response if true that denotes cycle exists simply return true and break the loop or if neighbour is already visited the nwe will check
// both our visited and dfs visited array if both are true that denotes cycle we will return true simply or if both the conditions falis and we come out of the loop
// it denotes that there is no cycle and will return false
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