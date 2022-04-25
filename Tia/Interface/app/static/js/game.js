//game play: contre la montre, premier arrivé ou total de l'équipe.
// peut être import Math 

//Players dictionnary
let players = {
    Italie:{1:[0,0],
    2:[0,1],
    3:[0,2], 
    cards:{number:0,card:[]}},

    Hollande:{1:[1,0], //robot
    2:[1,1],
    3:[1,2], 
    cards:{number:0,card:[]}},

    Belgique:{1:[2,0],
    2:[2,1],
    3:[2,2], 
    cards:{number:0,card:[]}},

    Allemagne:{1:[3,0], //robot
    2:[3,1],
    3:[4,0], 
    cards:{number:0,card:[]}},
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
"17,0":[1023,86],"18,0":[1077,86]/**1 tournant */,"19,0":[1129,86],"20,0":[1129,137],

/** Deuxième ligne premier tournant */
"0,1":[123,136],"1,1":[177,136],"2,1":[230,136],"3,1":[285,136],"4,1":[337,136],
"5,1":[390,136],"6,1":[444,136],"7,1":[498,136],"8,1":[550,136],
"9,1":[604,136],"10,1":[658,136],"11,1":[710,136],"12,1":[762,136],
"13,1":[814,136],"14,1":[865,136]/**chance */,"15,1":[918,136],"16,1":[972,136],
"17,1":[1023,136],"18,1":[1077,136]/**tournant 1*/,

/** ligne 3 premier tournant */
"0,2":[123,188],"1,2":[177,188],"2,2":[230,188],"7,2":[498,188],"8,2":[550,188],

/** ligne 1  juqu'au deuxième tournant*/
"21,0":[1129,188],"22,0":[1129,239],"23,0":[1129,288],"24,0":[1129,339],
"25,0":[1129,390]/**chance */,"26,0":[1129,440],"27,0":[1129,491],"28,0":[1129,542],

/** Deuxième ligne second tournant */
"21,1":[1077,188],"22,1":[1077,239],"23,1":[1077,288]/**chance */,"24,1":[1077,339],
"25,1":[1077,390],"26,1":[1077,440],"27,1":[1077,491],"28,1":[1077,542],

/**Troisieme ligne second tournant */
"23,2":[1023,288],"24,2":[1023,339],
"25,2":[1023,390],

/** première ligne entre tournant 2 et 3 */
"29,0":[1129,593]/**2 tournant */,"30,0":[1129,643],"31,0":[1077,643],"32,0":[1023,643],
"33,0":[972,643],"34,0":[918,643],"35,0":[865,643],"36,0":[811,643],"37,0":[758,643],
"38,0":[705,643],"39,0":[653,643],"40,0":[600,643],"41,0":[548,643],"42,0":[495,643],
"43,0":[442,643],"44,0":[388,643],"45,0":[335,643],"46,0":[283,643]/**chance */,"47,0":[229,643],
"48,0":[176,643],"49,0":[122,643]/**3 tournant */,

/** Deuxième ligne entre 2 et 3ieme tournant */
"29,1":[1076,593]/**2 tournant */,"32,1":[1023,593],
"33,1":[972,593],"34,1":[918,593],"35,1":[865,593],"36,1":[811,593],"37,1":[758,593],
"38,1":[705,593]/**chance */,"39,1":[653,593],"40,1":[600,593],"41,1":[548,593],"42,1":[495,593],
"43,1":[442,593]/**chance */,"44,1":[388,593],"45,1":[335,593],"46,1":[283,593],"47,1":[229,593],
"48,1":[176,593],"49,1":[122,593]/**3 tournant */,

/**3ieme ligne entre 2 et 3 ieme tournant */
"37,2":[758,542],"38,2":[705,542],"39,2":[653,542],"40,2":[600,542],"45,2":[335,542],"46,2":[283,542],"47,2":[229,542],

/**première ligne tournant 3-4 */
"50,0":[70,643],"51,0":[70,591],"52,0":[70,542],"53,0":[70,492],"54,0":[70,441],
"55,0":[70,391]/**4ieme tournant */,"56,0":[70,340],

/** Deuxième ligne quatrième tournant */
"51,1":[122,591],"52,1":[122,542],"53,1":[122,492],"54,1":[122,441],
"55,1":[122,391]/**4ieme tournant */,

/**Arrivée 1 ligne */
"57,0": [122,340],"58,0":[176,340],"59,0":[229,340],"60,0":[283,340],
"61,0":[335,340],"62,0":[388,340],"63,0":[442,340],"64,0":[495,340],"65,0":[548,340],
"66,0":[600,340]/** chance */,"67,0":[653,340],"68,0":[705,340],"69,0":[758,340]/**arrivée */,"70,0":[811,340],"71,0":[865,340],

/** Deuxième ligne arrivée */
"57,1": [122,391],"58,1":[176,391],"59,1":[229,391],"60,1":[283,391],
"61,1":[335,391],"62,1":[388,391],"63,1":[442,391],"64,1":[495,391],"65,1":[548,391],
"66,1":[600,391],"67,1":[653,391],"68,1":[705,391],"69,1":[758,391]/**arrivée */,"70,1":[811,391],"71,1":[865,391],

/**Troisième ligne arrivée */
"62,2":[388,441],"63,2":[442,441],"64,2":[495,441],"69,2":[758,441]/**arrivée */,"70,2":[811,441],"71,2":[865,441]}



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
    instruction = order.split("-")
    instruction2= parseInt(instruction[2])
    move(instruction[0],instruction2)
}


function move(who,carte){
    let move_ok_1 = true;
    let move_ok_2 = true;
    let move_ok_3 = true;
    let chance = [-3,-2,-1,1,2,3]
    let all_player_coord=[]
    for(let l=1;l<=3;l++){
    all_player_coord.push(players["Italie"][l],players["Hollande"][l],players["Belgique"][l],players["Allemagne"][l])
    }
    which_player = players["turn_player"];
    console.log(which_player)
    console.log(carte)
    console.log(players[which_player]["cards"]["card"][0])
    console.log(players[which_player]["cards"]["card"])
    let temp= players[which_player][who]
    if(carte in players[which_player]["cards"]["card"]){
        for(var i = 0; i < all_player_coord.length; i++){
            if((players[which_player][who][0] + carte+1 === all_player_coord[i][0]) ||players[which_player][who][0] + carte+1 == all_player_coord[i][0]-1){ //arrive a coté d'un joueur avec l'ASPI ou derrière
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
                        }
                    }
                    else if(move_ok_2===true){
                        if(map[final_movement_str_1] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 1;
                        }
                    }

                    else if(move_ok_3===true){
                        if(map[final_movement_str_2] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte+1;
                            players[which_player][who][1] = 2;
                        }
                        else{ // Si elle existe pas mettre sur la case 1 car la case 2 est déjà occupée donc crash
                            if(map[final_movement_str] !== undefined){
                                players[which_player][who][0] = players[which_player][who][0]+carte;
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
                    break;    
            }
            
                
            else if(players[which_player][who][0] + carte === all_player_coord[i][0]){ //arrive sur un joueur sans aspi
                console.log("iciiiiii")
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
                        }
                    }
                    else if(move_ok_2===true){//Si la case 2 est libre
                        if(map[final_movement_str_1] !== undefined){ // Si la case 2 est dans la map(pas en dehors du plateau)
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 1;
                        }
                    }

                    else if(move_ok_3===true){ //Si la case 3 est libre
                        if(map[final_movement_str_2] !== undefined){// Si la case 3 est dans la map(pas en dehors du plateau)
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 2;
                        }
                        else{ // Si elle existe pas mettre sur la case 1 car la case 2 est déjà occupée donc crash
                            if(map[final_movement_str] !== undefined){
                                players[which_player][who][0] = players[which_player][who][0]+carte;
                                players[which_player][who][1] = 0;
                                //crash function
                                crash(players[which_player][who][0])
                                pioche()  
                            }
                        }
                    }
                    else{//crash le ploton le mettre sur la case X 0 
                        if(map[final_movement_str] !== undefined){
                            players[which_player][who][0] = players[which_player][who][0]+carte;
                            players[which_player][who][1] = 0;
                            //crash function
                            crash(players[which_player][who][0])
                            pioche()
                        }
                    }
                    break; 
                } 
            }
            if(temp=== players[which_player][who]){
                console.log("ICIIIII 1")
                let x_movement = players[which_player][who][0]+carte;
                let y_movement = 0;
                let final_movement_str = x_movement.toString()+ "," + y_movement.toString();
                if(map[final_movement_str] !== undefined){ 
                    players[which_player][who][0] = players[which_player][who][0]+carte;
                    players[which_player][who][1] = 0;
                }
            }
        }
    else{
        throw new Error("You don\'t have this card")
    }
        /** Fin */
    //Verifier si pas sur une case chance
    let move_1 = true;
    let move_2 = true;
    let move_3 = true;
    for(let o=0;o<chance_case.length;o++){
        if(players[which_player][who][0] ===chance_case[o][0] && players[which_player][who][1] === chance_case[o][1]){
            var rand = Math.floor(Math.random()*chance.length);
            var rValue = myArray[rand];
            let temp = players[which_player][who][0]+rValue;
            
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
    console.log("yoooo  "+players[which_player]["cards"]["card"])
    let index = players[which_player]["cards"]["card"].indexOf(carte);
    console.log(index) //=-1 ?
    players[which_player]["cards"]["card"].splice(index,1);
    players[which_player]["cards"]["number"] -=1;
    pioche()
    
}
pioche()
console.log(players["Italie"]["cards"]["card"])
function crash(x){
    for(playerss in players){
        if(playerss !== "turn_player"){
        for(let j=1;j<=3;j++){
            if(players[playerss][j][0]=x){
                console.log(players[playerss]["cards"]["card"].length)
                let rando= Math.floor(Math.random()*players[playerss]["cards"]["card"].length);
                let rValue = players[playerss]["cards"]["card"][rando];
                let index = players[playerss]["cards"]["card"].indexOf(rValue)
                players[playerss]["cards"]["card"].splice(index,1)
                players[playerss]["cards"]["number"] -=1;
            }
            }
        }
    }
}



//------------------------------------Draw-------------------------------------------
//plateau
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var image = document.getElementById("plateau")
canvas.width= 1200;
canvas.height = 700;



function draw(){
    let player =  players["turn_player"];
    document.getElementById("player").innerHTML = player;
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
        color = "white";
        
    }
    spanText.style.color = color;
    
    ctx.drawImage(image,30,0)
    //on dessine tous les pions  

    for(let i =1; i<= 3; i++){
        drawCircle(map[players["Italie"][i][0].toString()+','+players["Italie"][i][1].toString()][0], map[players["Italie"][i][0].toString()+','+players["Italie"][i][1].toString()][1], "blue");
        drawCircle(map[players["Hollande"][i][0].toString()+','+players["Hollande"][i][1].toString()][0], map[players["Hollande"][i][0].toString()+','+players["Hollande"][i][1].toString()][1], "orange")
        drawCircle(map[players["Belgique"][i][0].toString()+','+players["Belgique"][i][1].toString()][0], map[players["Belgique"][i][0].toString()+','+players["Belgique"][i][1].toString()][1], "red") 
        drawCircle(map[players["Allemagne"][i][0].toString()+','+players["Allemagne"][i][1].toString()][0], map[players["Allemagne"][i][0].toString()+','+players["Allemagne"][i][1].toString()][1], "white")
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
  

  

  
function order_get(){
    var order_game = document.getElementById('order').value;
    document.getElementById('order').value = ""; //reset the input when we added the task
    console.log(order_game)
    if (order_game == "" || order_game == " " || ! order_game){ //if it contains space, I don't consider that as void (en francais : si ca contient un espace je ne considère pas l'ordre comme une tache vide)
        alert("Enter a command")

    } else {
        orderCommand(order_game);
        console.log(players["Italie"])
        if(players["turn_player"]=="Italie"){
            players["turn_player"] = "Hollande";
        }
        else if(players["turn_player"]=="Hollande"){
            players["turn_player"] = "Belgique";
        }
        else if(players["turn_player"]=="Belgique"){
            players["turn_player"] = "Allemagne";
        }
        else if(players["turn_player"] = "Allemagne"){
            players["turn_player"] = "Italie";
        }
        draw();
    }
}





