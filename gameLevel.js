console.log("level 222");
var winningPattern=["111000000","000111000","000000111","100100100","010010010","001001001",
					"100010001","001010100"];//due to this
var r=[];
//r=new Array(winningPattern.length);
for(var i=winningPattern.length-1;i>=0;i--)
{
	r[i]=parseInt(winningPattern[i],2);
}
console.log(r);




var button=[];
for(var i=1;i<10;i++)
	button[i]=document.getElementById('canvas'+i);
var ctx=[];
for(var i=1;i<10;i++)
	ctx[i]=button[i].getContext('2d');
var bDisabled=[];
for(var i=1;i<10;i++)
	bDisabled[i]=false;
var isResult=false;
var content=[];
function loop(x)
{
	if(!bDisabled[x])
	{
		bDisabled[x]=true;
		button[x].style.opacity=0.7;
		content[x]='x';
		button[x].style.webkitTransform="rotateY(180deg)";
		button[x].style.msTransform="rotateY(180deg)";
		button[x].style.mozTransform="rotateY(180deg)";
		button[x].style.oTransform="rotateY(180deg)";
		button[x].style.Transform="rotateY(180deg)";
	console.log(content);
		console.log(content.length);
	
	setTimeout(function()
	{
		ctx[x].lineWidth=3;
		ctx[x].beginPath();
		ctx[x].moveTo(10,10);
		ctx[x].lineTo(90,90);
		ctx[x].moveTo(90,10);
		ctx[x].lineTo(10,90);
		ctx[x].stroke();
		ctx[x].closePath();

    ai=new computerTurn(content);
    var k=ai.move();
	console.log("move returns "+k);
	if(k>0)
	draw0Steps(k);
	},300);
	setTimeout(checkWinner,1000);
	
	}
}


function computerTurn(data)
{  var data=data, computer , user;
   computer='0';
   user='x';
   data[0]='#'

     this.move=function()
	 {
		return minimax(2,computer)[1];
	 }
     
	 function minimax(depth,player)
	 {  console.log("NEXT LOOP");
	    var nextMoves=getValidMoves();
	    console.log("nextMoves"+ nextMoves);
	    console.log("lenght of array"+ nextMoves.length);
		var bestScore=(player===computer)? -1e100: 1e100;
		var currentScore,bestId=-1;
		
		if(nextMoves.length === 0 || depth === 0)
		    {bestScore=evaluate();	console.log("best Score:"+bestScore);	}
		 else
		    { 
		      for(var i=(nextMoves.length)-1;i>=0;i--)
			  {
				 var n=nextMoves[i];
				  console.log("player "+player);
                 data[n]=player;
				 console.log("dat "+data);
                 
                 //
				 if(player===computer)//maximize
				 {
					 currentScore=minimax(depth-1,user)[0];
					 if(currentScore>bestScore){
						 bestScore=currentScore;
						 bestId=n;
					 }
				 }				 
				 else{//minimize
				  	 currentScore=minimax(depth-1,computer)[0];
					 if(currentScore<bestScore){
						 bestScore=currentScore;
						 bestId=n;
					 }
				 }
				 
				 //UNDO MOVE
				 data[n]=null;
			  }
		    }
			return [bestScore,bestId]; 
	 }//minimax closed

	 
	 function getValidMoves()
	 {console.log("data is :"+data+"   data lenght :"+data.length);
		var boardSpaces=[];
         if(hasWon(computer) || hasWon(user))/////******
		 { console.log("Somebody won!");	
			 return boardSpaces;}
         
          for(var i=9;i>=1;i--)
		  {
			  if(data[i]!='x' && data[i]!='0')
				  boardSpaces.push(i);
		  }		  
		  return boardSpaces;
	 }
	 
	 //Calculates Score
	 function evaluate()
	 {
		 var s=0;
		 s=s+evaluateLine(1,2,3); 
		 s=s+evaluateLine(4,5,6); 
		 s=s+evaluateLine(7,8,9); 
		 s=s+evaluateLine(1,4,7); 
		 s=s+evaluateLine(2,5,8); 
		 s=s+evaluateLine(3,6,9); 
		 s=s+evaluateLine(1,5,9); 
		 s=s+evaluateLine(3,5,7); 
		 return s;
	 }	 
	 
	 function evaluateLine(id1,id2,id3)
	 {
		 var score=0;
		 
		 ///First Cell
		 if(content[id1]===computer)
		 {score=1;}
	     else if(content[id1]===user)
		 {score=-1;}
	 
	     ///Second Cell
	     if(content[id2]===computer){
			 if(score===1)   score=10;//cell one is computer
			 else if(score===-1) return 0;//cell one is user
			 else  score=1;//cell one is empty
		 }
		 else if(content[id2]==user){
			 if(score===-1) score=-10;//cell one is user
			 else if(score===1) return 0;//cell one is computer
			 else score=-1;//cell one is empty cell
		 }
		 
		 ///Third Cell
		 if(content[id3]=== computer){
			 if(score>0)  score*=10;
			 else if(score< 0) return 0;
			 else score=1;
		 }
		 else if(content[id3]===user){
			 if(score<0)  score*=10;
			 else if(score>0) return 0;
             else score=-1;			 
		 }
		 return score;
	 }//evaluateLine()
	 
	 function hasWon(player)
	 {var p=0,i=0;
	 for( i=9;i>=1;i--)
	 {
		 if(data[i]==(player)) 
		 {
			 //console.log(i+"=1 ");
			 p|=(1<<(i-1));//console.log("p'="+p);
			 }
		 //else console.log(i+"=0 ");
	 }
	 //console.log("p="+p);
	 
	 for( i=0;i<=7;i++)//i wrote i<=8
	 {
		 if((r[i]&p)===r[i]){
			 //console.log("winner seq:"+p+"  no."+i +" player is:"+player);
			 return true;}
	 }
	 return false;
	 }
	 
	 
}//computerTurn()

function draw0Steps(x) //draw0Steps(cell to be Oed)
{
	
	bDisabled[x]=true;
	button[x].style.opacity=0.7;
	content[x]='0';
	button[x].style.webkitTransform="rotateY(180deg)"; 
	button[x].style.msTransform="rotateY(180deg)";
	button[x].style.mozTransform="rotateY(180deg)";
	button[x].style.oTransform="rotateY(180deg)";
	button[x].style.Transform="rotateY(180deg)";
		
	
	setTimeout(function(){
	ctx[x].beginPath();
	ctx[x].lineWidth=3;
	ctx[x].arc(50,50,34,0,Math.PI*2,false);
	ctx[x].stroke();
	ctx[x].closePath();
	},300);
}


function checkWinner()
{
	if(isResult==false)
	{
		 if(content[1]=='x' && content[2]=='x' && content[3]=='x') showWinner('You Win!');
	else if(content[4]=='x' && content[5]=='x' && content[6]=='x') showWinner('You Win!');
	else if(content[7]=='x' && content[8]=='x' && content[9]=='x') showWinner('You Win!');
	else if(content[1]=='x' && content[4]=='x' && content[7]=='x') showWinner('You Win!');
	else if(content[2]=='x' && content[5]=='x' && content[8]=='x') showWinner('You Win!');
	else if(content[3]=='x' && content[6]=='x' && content[9]=='x') showWinner('You Win!');
	else if(content[1]=='x' && content[5]=='x' && content[9]=='x') showWinner('You Win!');
	else if(content[3]=='x' && content[5]=='x' && content[7]=='x') showWinner('You Win!');
	
	else if(content[1]=='0' && content[2]=='0' && content[3]=='0') showWinner('You Lose!');
	else if(content[4]=='0' && content[5]=='0' && content[6]=='0') showWinner('You Lose!');
	else if(content[7]=='0' && content[8]=='0' && content[9]=='0') showWinner('You Lose!');
	else if(content[1]=='0' && content[4]=='0' && content[7]=='0') showWinner('You Lose!');
	else if(content[2]=='0' && content[5]=='0' && content[8]=='0') showWinner('You Lose!');
	else if(content[3]=='0' && content[6]=='0' && content[9]=='0') showWinner('You Lose!');
	else if(content[1]=='0' && content[5]=='0' && content[9]=='0') showWinner('You Lose!');
	else if(content[3]=='0' && content[5]=='0' && content[7]=='0') showWinner('You Lose!');
	
	else if(
	(content[1]=='x' || content[1]=='0') &&
	(content[2]=='x' || content[2]=='0') &&
	(content[3]=='x' || content[3]=='0') &&
	(content[4]=='x' || content[4]=='0') &&
	(content[5]=='x' || content[5]=='0') &&
	(content[6]=='x' || content[6]=='0') &&
	(content[7]=='x' || content[7]=='0') &&
	(content[8]=='x' || content[8]=='0') &&
	(content[9]=='x' || content[9]=='0') 
	)
	showWinner("Kichdiii ! ");
	}
}

function showWinner(x)
{
	alert(x);
	isResult=true;
}