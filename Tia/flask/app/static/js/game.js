//game play: contre la montre, premier arrivé ou total de l'équipe.
// peut être import Math

//Players dictionnary
let players = {
    Italie:{1:[0,0],
    2:[0,1],
    3:[0,2], 
    cards:{number:0,card:[]}
    ,aspiration:false,total:0},

    Hollande:{1:[1,0], //robot
    2:[1,1],
    3:[1,2], 
    cards:{number:0,card:[]},
    aspiration:false,total:0},

    Belgique:{1:[2,0],
    2:[2,1],
    3:[2,2], 
    cards:{number:0,card:[]},
    aspiration:false,total:0},

    Allemagne:{1:[3,0], //robot
    2:[3,1],
    3:[4,0], 
    cards:{number:0,card:[]},
    aspiration:false,total:0},

    turn_player:"Italie"
};

//Game card dictionary
let cards_game ={1:8,2:8,3:8,4:8,5:8,6:8,7:8,8:8,9:8,10:8,11:8,12:8}; //nombre de secondes / nombres de cartes

//Chance case list
let chance_case= [[66,0],[43,1],[38,1],[46,0],[23,1],[25,0],[14,1],[9,0]]

//Map game list
let map={"0,0":[123,86],"1,0":[177,86],"2,0":[230,86],"3,0":[285,86],"4,0":[337,86],
"5,0":[390,86],"6,0":[444,86],"7,0":[498,86],"8,0":[550,86],
"9,0":[604,86]/**1 chance */,"10,0":[658,86],"11,0":[710,86],"12,0":[762,86],
"13,0":[814,86],"14,0":[865,86],"15,0":[918,86],"16,0":[972,86],
"17,0":[1023,86]/**1 tournant ancien [19,0]*/,"18,0":[1129,86],//Ancien 20,

/** Deuxième ligne premier tournant */
"0,1":[123,136],"1,1":[177,136],"2,1":[230,136],"3,1":[285,136],"4,1":[337,136],
"5,1":[390,136],"6,1":[444,136],"7,1":[498,136],"8,1":[550,136],
"9,1":[604,136],"10,1":[658,136],"11,1":[710,136],"12,1":[762,136],
"13,1":[814,136],"14,1":[865,136]/**chance */,"15,1":[918,136],"16,1":[972,136],
"17,1":[1023,136],"18,1":[1077,136]/**tournant 1*/,

//Tournant 1 ligne 3
"18,2":[1031,187],

/** ligne 3 premier tournant */
"0,2":[123,188],"1,2":[177,188],"2,2":[230,188],"7,2":[498,188],"8,2":[550,188],

/** ligne 1  juqu'au deuxième tournant*/
"19,0":[1129,188],"20,0":[1129,239],"21,0":[1129,288],"22,0":[1129,339],
"23,0":[1129,390]/**chance */,"24,0":[1129,440],"25,0":[1129,491],"26,0":[1129,542],

/** Deuxième ligne second tournant */
"19,1":[1077,188],"20,1":[1077,239],"21,1":[1077,288]/**chance */,"22,1":[1077,339],
"23,1":[1077,390],"24,1":[1077,440],"25,1":[1077,491],"26,1":[1077,542],


/**Troisieme ligne second tournant */
"21,2":[1023,288],"22,2":[1023,339],
"23,2":[1023,390]

/** première ligne entre tournant 2 et 3 */

/**2 tournant */,"27,0":[1129,643],"28,0":[1023,643],
"29,0":[972,643],"30,0":[918,643],"31,0":[865,643],"32,0":[811,643],"33,0":[758,643],
"34,0":[705,643],"35,0":[653,643],"36,0":[600,643],"37,0":[548,643],"38,0":[495,643],
"39,0":[442,643],"40,0":[388,643],"41,0":[335,643],"42,0":[283,643]/**chance */,"43,0":[229,643],
"44,0":[176,643]/**3 tournant */,

/** Deuxième ligne entre 2 et 3ieme tournant */
"27,1":[1076,593]/**2 tournant */,"28,1":[1023,593], 
"29,1":[972,593],"30,1":[918,593],"31,1":[865,593],"32,1":[811,593],"33,1":[758,593],
"34,1":[705,593]/**chance */,"35,1":[653,593],"36,1":[600,593],"37,1":[548,593],"38,1":[495,593],
"39,1":[442,593]/**chance */,"40,1":[388,593],"41,1":[335,593],"42,1":[283,593],"43,1":[229,593],
"44,1":[176,593],"45,1":[122,593]/**3 tournant */,

//Tournant 2 ligne 3
"27,2":[1023,542],

/**3ieme ligne entre 2 et 3 ieme tournant */
"33,2":[758,542],"34,2":[705,542],"35,2":[653,542],"36,2":[600,542],"41,2":[335,542],"42,2":[283,542],"43,2":[229,542],

/**première ligne tournant 3-4 */
"45,0":[70,643],"46,0":[70,542],"47,0":[70,492],"48,0":[70,441],
/**4ieme tournant */"49,0":[70,340],

//Tournant 3, 3ieme ligne
"45,2":[176,542],

/** Deuxième ligne quatrième tournant */
"45,1":[122,591],"46,1":[122,542],"47,1":[122,492],"48,1":[122,441],
"49,1":[122,391]/**4ieme tournant */,

//Tournant 4, 3ieme ligne
"49,2":[177,441],

/**Arrivée 1 ligne */
"50,0":[176,340],"51,0":[229,340],"52,0":[283,340],
"53,0":[335,340],"54,0":[388,340],"55,0":[442,340],"56,0":[495,340],"57,0":[548,340],
"58,0":[600,340]/** chance */,"59,0":[653,340],"60,0":[705,340],"61,0":[758,340]/**arrivée */,"62,0":[811,340],"63,0":[865,340],"64,0":[0,0],"65,0":[0,0],"66,0":[0,0]
,"67,0":[0,0],"68,0":[0,0],"69,0":[0,0],"70,0":[0,0],"71,0":[0,0],"72,0":[0,0],

/** Deuxième ligne arrivée */
"50,1":[176,391],"51,1":[229,391],"52,1":[283,391],
"53,1":[335,391],"54,1":[388,391],"55,1":[442,391],"56,1":[495,391],"57,1":[548,391],
"58,1":[600,391],"59,1":[653,391],"60,1":[705,391],"61,1":[758,391]/**arrivée */,"62,1":[811,391],"63,1":[865,391],"64,1":[0,0],"65,1":[0,0],"66,1":[0,0]
,"67,1":[0,0],"68,1":[0,0],"69,1":[0,0],"70,1":[0,0],"71,1":[0,0],"72,1":[0,0],

/**Troisième ligne arrivée */
"54,2":[388,441],"55,2":[442,441],"56,2":[495,441],"61,2":[758,441]/**arrivée */,"62,2":[811,441],"63,2":[865,441],"64,2":[0,0],"65,2":[0,0],"66,2":[0,0]
,"67,2":[0,0],"68,2":[0,0],"69,2":[0,0],"70,2":[0,0],"71,2":[0,0],"72,2":[0,0]}

//61 =96


function cards_probability(cards_list){
    var random_cards = [];
    for(let i =1; i<= 12; i++){
        for(let j=0; j< cards_list[i]; j++){
            random_cards.push(i);
        }
    }
    var probability = Math.floor(Math.random()*random_cards.length);
    return random_cards[probability];
}

function pioche(){
    for(let playerss in players){
        if(playerss != "turn_player"){
            if (players[playerss]["cards"]["number"] ===0){
                for(let i =0; i< 5; i++){
                    numbers = cards_probability(cards_game);
                    cards_game[numbers]-=1;
                    players[playerss]["cards"]["card"].push(numbers); //ajoute la carte temps au joueur
                    players[playerss]["cards"]["number"] +=1; //ajoute la carte au total de carte
                }
            }
        }       
    }
}

function orderCommand(order){
    let instruction = order.split("-")
    let instruction2= parseInt(instruction[2])
    let which_player= players["turn_player"]
    if(players[which_player]["cards"]["card"].includes(instruction2)){
        if(players[which_player][instruction[0]][0]===-1){
            document.getElementById("error").innerHTML = "This player is already on the finish line.";
            throw new Error('This player is already on the finish line.')
        }
        else{
            document.getElementById("error").innerHTML="";
            move(instruction[0],instruction2)
        }   
    }
    else{
        document.getElementById("error").innerHTML = "You don\'t have this card";
        throw new Error("You don\'t have this card")
    }
}


function move(who,carte){
    let move_ok_1 = true;
    let move_ok_2 = true;
    let move_ok_3 = true;
    let move_change=false;
    let chance = [-3,-2,-1,1,2,3]
    which_player = players["turn_player"];
    let all_player_coord =[]
    for(let l=1;l<=3;l++){
    all_player_coord.push(players["Italie"][l],players["Hollande"][l],players["Belgique"][l],players["Allemagne"][l])
    }
        for(var i = 0; i < all_player_coord.length; i++){
            if(((players[which_player][who][0] + carte+1 === all_player_coord[i][0]) ||players[which_player][who][0] + carte+1 == all_player_coord[i][0]-1)&& players[which_player]["aspiration"]===true){ //arrive a coté d'un joueur avec l'ASPI ou derrière
                let x_movement = players[which_player][who][0]+carte+1;
                let y_movement = 0;
                let final_movement_str = x_movement.toString()+ "," + y_movement.toString();
                y_movement+=1
                let final_movement_str_1 =x_movement.toString()+ "," + y_movement.toString();
                y_movement+=1
                let final_movement_str_2 =x_movement.toString()+ "," + y_movement.toString();
                for(let k=0;k<all_player_coord.length; k++){ 
                    if( 0 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte+1){
                        move_ok_1 =false;
                    }
                    else if(1 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte+1){//check si c'est une case qui existe dans le dico 
                        move_ok_2 = false;}
                                    
                    else if(2 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte+1){
                        move_ok_3 = false;}

                    } // fin du for
                    if(move_ok_1===true){
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 0;
                            move_change = true;
                        }
                    }
                    else if(move_ok_2===true){
                        if(map[final_movement_str_1] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 1;
                            move_change = true;
                        }
                    }

                    else if(move_ok_3===true){
                        if(map[final_movement_str_2] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 2;
                            move_change = true;
                        }
                        else{ // Si elle existe pas mettre sur la case 1 car la case 2 est déjà occupée donc crash
                            if(map[final_movement_str] !== undefined){
                                players[which_player][who][0] = players[which_player][who][0]+carte;
                                players[which_player][who][1] = 0;
                                move_change = true;
                                //crash function
                                crash(players[which_player][who][0])
                                pioche()  
                            }
                        }
                    }
                    else{//crash le ploton le mettre sur la case X 0 
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 0;
                            move_change = true;
                            //crash function
                            crash(players[which_player][who][0])
                            pioche()
                        }
                    }
                    break;    
            }
            
                
            else if(players[which_player][who][0] + carte === all_player_coord[i][0]){ //arrive sur un joueur sans aspi
                let x_movement = players[which_player][who][0]+carte;
                let y_movement = 0;
                let final_movement_str = x_movement.toString()+ "," + y_movement.toString();
                y_movement+=1
                let final_movement_str_1 =x_movement.toString()+ "," + y_movement.toString();
                y_movement+=1
                let final_movement_str_2 =x_movement.toString()+ "," + y_movement.toString();
                
                for(let k=0;k<all_player_coord.length; k++){ 
    
                    if( 0 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte){
                        move_ok_1 =false;
                    }
                    else if(1 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte){//check si c'est une case qui existe dans le dico 
                        move_ok_2 = false;}
                                    
                    else if(2 === all_player_coord[k][1] && all_player_coord[k][0] === players[which_player][who][0]+carte){
                        move_ok_3 = false;}

                    } // fin du for

                    if(move_ok_1===true){ //SI la case 1 est libre
                        if(map[final_movement_str] !== undefined){ // Si la case 1 est dans la map(pas en dehors du plateau)
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 0;
                            move_change = true;
                        }
                    }
                    else if(move_ok_2===true){//Si la case 2 est libre
                        if(map[final_movement_str_1] !== undefined){ // Si la case 2 est dans la map(pas en dehors du plateau)
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 1;
                            move_change = true;
                        }
                    }

                    else if(move_ok_3===true){ //Si la case 3 est libre
                        if(map[final_movement_str_2] !== undefined){// Si la case 3 est dans la map(pas en dehors du plateau)
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 2;
                            move_change = true;
                        }
                        else{ // Si elle existe pas mettre sur la case 1 car la case 2 est déjà occupée donc crash
                            if(map[final_movement_str] !== undefined){
                                players[which_player][who][0] = players[which_player][who][0]+carte;
                                players[which_player][who][1] = 0;
                                move_change = true;
                                //crash function Fait crash le code par la même occasion change les X de tous les pays par celui ou je veux aller
                                let x=players[which_player][who][0]
                                crash(x)
                                pioche()
                            }
                        }
                    }
                    else{//crash le ploton le mettre sur la case X 0 
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 0;
                            move_change = true;
                            //crash function
                            crash(players[which_player][who][0])
                            pioche()
                            
                        }
                    }
                    break; 
                } 
            }
            if(move_change === false){
                let x_movement = players[which_player][who][0]+carte;
                let y_movement = 0;
                let final_movement_str = x_movement.toString()+ "," + y_movement.toString();
                if(map[final_movement_str] !== undefined){ 
                    players[which_player][who][0] = players[which_player][who][0]+carte;
                    players[which_player][who][1] = 0;
                }
            }
        /** Fin */
    //Verifier si pas sur une case chance
    let move_1 = true;
    let move_2 = true;
    let move_3 = true;
    for(let o=0;o<chance_case.length;o++){
        if(players[which_player][who][0] ===chance_case[o][0] && players[which_player][who][1] === chance_case[o][1]){
            var rand = Math.floor(Math.random()*chance.length);
            var rValue2 = chance[rand];
            let temp = players[which_player][who][0]+rValue2;
            
            let x_movement_chance = temp;
            let y_movement_chance =0;

            let final_movement_str = x_movement_chance.toString()+ "," + y_movement_chance.toString();
            y_movement_chance+=1

            let final_movement_str_1 =x_movement_chance.toString()+ "," + y_movement_chance.toString();
            y_movement_chance+=1

            let final_movement_str_2 =x_movement_chance.toString()+ "," + y_movement_chance.toString();
            
            for(let k=0;k<all_player_coord.length; k++){

                 if( 0 === all_player_coord[k][1] && all_player_coord[k][0] === temp){
                        move_1 =false;
                    }
                    else if(1 === all_player_coord[k][1] && all_player_coord[k][0] === temp){//check si c'est une case qui existe dans le dico 
                        move_2 = false;}
                                    
                    else if(2 === all_player_coord[k][1] && all_player_coord[k][0] === temp){
                        move_3 = false;
                    }

                    } // fin du for
                    if(move_1===true){
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = temp;
                            players[which_player][who][1] = 0;
                        }
                    }
                    else if(move_2===true){
                        if(map[final_movement_str_1] !== undefined){
                            players[which_player][who][0] = temp;
                            players[which_player][who][1] = 1;
                        }
                    }

                    else if(move_3===true){
                        if(map[final_movement_str_2] !== undefined){
                            players[which_player][who][0] = temp;
                            players[which_player][who][1] = 2;
                        }
                        else{ // Si elle existe pas mettre sur la case 1 car la case 2 est déjà occupée donc crash
                            if(map[final_movement_str] !== undefined){
                                players[which_player][who][0] = temp;
                                players[which_player][who][1] = 0;
                                //crash function
                                crash(players[which_player][who][0])
                                pioche()  
                            }
                        }
                    }
                    else{//crash le ploton le mettre sur la case X 0 
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 0;
                            //crash function
                            crash(players[which_player][who][0])
                            pioche()
                        }
                    }

                }
        }
        
    //retirer LA CARTE utilisée 
    let index = players[which_player]["cards"]["card"].indexOf(carte);
    players[which_player]["cards"]["card"].splice(index,1);
    players[which_player]["cards"]["number"] -=1;
    pioche()
    if(players[which_player][who][0]>60){
       let x_value= players[which_player][who][0] -60;
       players[which_player]["total"]+=61-x_value;
       players[which_player][who][0]= -1;
    }
    
}

pioche()
console.log(players["Italie"]["cards"]["card"])

function crash(x){
    for(element in players){
        if(element !== "turn_player"){
            for(let j=1;j<=3;j++){
                if(players[element][j][0]===x){
                    let rando= Math.floor(Math.random()*players[element]["cards"]["card"].length);
                    let rValue = players[element]["cards"]["card"][rando];
                    let index = players[element]["cards"]["card"].indexOf(rValue)
                    players[element]["cards"]["card"].splice(index,1)
                    players[element]["cards"]["number"] -=1;
                    break;
                }
            }
        }
    }
}



//------------------------------------Draw-------------------------------------------

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var image = document.getElementById("plateau")
canvas.width= 1200;
canvas.height = 700;



function draw(){
    let player =  players["turn_player"];
    document.getElementById("player").innerHTML = player;
    document.getElementById("Italie").innerHTML = players["Italie"]["cards"]["card"];
    document.getElementById("Hollande").innerHTML = players["Hollande"]["cards"]["card"];
    document.getElementById("Belgique").innerHTML = players["Belgique"]["cards"]["card"];
    document.getElementById("Allemagne").innerHTML = players["Allemagne"]["cards"]["card"];
    document.getElementById("Aspi").innerHTML = players[player]["aspiration"];
    spanText = document.querySelector('b');
    var color = "blue";
    if(player == "Italie"){
        color = "blue";

    }
    if(player == "Belgique"){
        color = "red";
        
    }
    if(player == "Hollande"){
        color = "orange";
        
    }
    if(player == "Allemagne"){
        color = "black";
    }

    spanText.style.color = color;
    
    ctx.drawImage(image,30,0)
    //on dessine tous les pions  

    for(let i =1; i<= 3; i++){
        if(players["Italie"][i][0] !== -1){
            drawCircle(map[players["Italie"][i][0].toString()+','+players["Italie"][i][1].toString()][0], map[players["Italie"][i][0].toString()+','+players["Italie"][i][1].toString()][1], "blue");
        }
        if(players["Hollande"][i][0] !== -1){
            drawCircle(map[players["Hollande"][i][0].toString()+','+players["Hollande"][i][1].toString()][0], map[players["Hollande"][i][0].toString()+','+players["Hollande"][i][1].toString()][1], "orange")
        }
        if(players["Belgique"][i][0] !== -1){
            drawCircle(map[players["Belgique"][i][0].toString()+','+players["Belgique"][i][1].toString()][0], map[players["Belgique"][i][0].toString()+','+players["Belgique"][i][1].toString()][1], "red") 
        }
        if(players["Allemagne"][i][0] !== -1){
            drawCircle(map[players["Allemagne"][i][0].toString()+','+players["Allemagne"][i][1].toString()][0], map[players["Allemagne"][i][0].toString()+','+players["Allemagne"][i][1].toString()][1], "white")
        }
     }
}
draw()
function drawCircle(x, y, color){
    //fonction permettant de faire un rond
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI *2, false);
    ctx.stroke();
    ctx.fill();
  }

//minimax

function canMove(country, player, card) {

    let initPos = players[country][player][0];
    let finalPos = initPos + card;

    let posList = [];

    for (const c in players) {
        if (c !== "turn_player") {
            for (var j=1; j<4; j++) {
                if (players[c][j][0] >= initPos && players[c][j][0] <= finalPos) {
                    posList.push(players[c][j][0])
                }
            }
        }
    }

    for (let i=initPos+1; i<= finalPos; i++) {
        if (posList.includes(i)) {
            if (posList.filter(x => x === i).length === 2) {
                let pos = "" + i + ",2";
                if (map[pos]===undefined) {
                    // S'il y a 2 joueur et qu'il n'y a pas de 3e case possible
                    return false;
                }
            } else if (posList.filter(x => x === i).length === 3) {
                return false;
            }
        }
    }

    return true;
}

function canWin(country, player, card) {

    let initPos = players[country][player][0];
    let finalPos = initPos + card;

    if (initPos+card-62 < 0) {
        // card n'est pas assez grand pour gagner
        return false;
    } else {
        return canMove(country, player, card);
    }

}

function whichMove(country, player, card) {

    let score = 0;

    if (!canMove(country, player, card)) {
        score = -15;
    } else {
        score = 15 + ((players[country][player][0]+card) /10);
    }

    if (canWin(country, player, card)) {
        score = 50 + ((players[country][player][0]+card-62) /10);
    }

    return score;
}


function max(score, bestScore) {
    if (score >= bestScore) {
        return score;
    }
    else {
        return bestScore;
    }
}

function min(score, bestScore) {
    if (score <= bestScore) {
        return score;
    }
    else {
        return bestScore;
    }
}


function minimax(country, info, depth, isMaximizing) {
    if (depth === 0) {
        return whichMove(country, info[0], info[1]);
    }

    if (isMaximizing) {

        let bestScore = -Infinity;
        let movement = ""
        for (let i=1; i<4; i++) {

            let cards = players[country]["cards"]["card"]

            for (let j=0; j<cards.length; j++) {
                movement = "" + i + "-avance-" + cards[j];
                let score = minimax(country, [i, cards[j]], depth-1, false);
                bestScore = max(score, bestScore);
            }
        }

        return movement;
    } else {

        let bestScore = Infinity;
        let movement = ""
        for (let i=1; i<4; i++) {
            let cards = players[country]["cards"]["card"];
            for (let j=0; j<cards.length; j++) {
                movement = "" + i + "-avance-" + cards[j];
                let score = minimax(country, [i, cards[j]], depth-1, true);
                bestScore = min(score, bestScore);
            }
        }
        return movement;
    }
}




function order_get(){
    var order_game = document.getElementById('order').value;
    document.getElementById('order').value = ""; //reset the input when we added the task
    if (order_game === "" || order_game === " " || ! order_game){ //if it contains space, I don't consider that as void (en francais : si ca contient un espace je ne considère pas l'ordre comme une tache vide)
        alert("Enter a command")

    } else {
        if(players["turn_player"]==="Italie"){
            orderCommand(order_game);
            players["turn_player"] = "Hollande";
            draw();
            orderCommand(minimax("Hollande", [], 3, true));
            players["turn_player"] = "Belgique";
            draw();
        }

        else if(players["turn_player"]==="Belgique"){
            orderCommand(order_game);
            players["turn_player"] = "Allemagne";
            draw();
            orderCommand(minimax("Allemagne", [], 3, true));
            players["turn_player"] = "Italie";
            draw();
        }

        draw();
        end_game()
    }
}

function changement_aspi(){
    who = players["turn_player"]
    if(players[who]["aspiration"]===false){
        players[who]["aspiration"]=true;
    }
    else{
        players[who]["aspiration"]=false
    }
    draw()
}

function end_game(){
    count=0
    for(element in players){
        if(element !== "turn_player"){
            for(let j=1;j<=3;j++){
                if(players[element][j][0]===-1){
                    count+=1
                }
            }
        }
    }
    if(count ===9){
        if(players["Italie"]["total"]<players["Allemagne"]["total"] && players["Italie"]["total"]< players["Belgique"]["total"] && players["Italie"]["total"]< players["Hollande"]["total"]){
            alert("Italie WIN THE GAME")
        }
        else if(players["Allemagne"]["total"]<players["Italie"]["total"] && players["Allemagne"]["total"]< players["Belgique"]["total"] && players["Allemagne"]["total"]< players["Hollande"]["total"]){
            alert("Allemagne WIN THE GAME")
        }
        else if(players["Belgique"]["total"]<players["Italie"]["total"] && players["Belgique"]["total"]< players["Allemagne"]["total"] && players["Belgique"]["total"]< players["Hollande"]["total"]){
            alert("Belgique WIN THE GAME")
        }
        else{
            alert("Hollande WIN THE GAME")
        }
    }
}