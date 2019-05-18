var quantiA = 0;
var quantiB = 0;
var quantiC = 0;
var timeStep = 0.001; 
var vazaoA = 0.1;
var vazaoB = 0.05;
var vazaoC = 0.01;
var salvaA = 0;
var salvaB = 0;
var salvaC = 0;
var desenharA = quantiA;
var dias = 0;
var flag = 0;
var checaA = 0;

function setup() {
  createCanvas(5000, 2000);   

    //Caixas de texto
  caixaDias = createInput();
  caixaDias.position(45, 40);
    
  caixaVazaoA = createInput();
  caixaVazaoA.position(808, 40);
  
  caixaVazaoB = createInput();
  caixaVazaoB.position(808, 70);    
  
  caixaVazaoC = createInput();
  caixaVazaoC.position(808, 100);
    
  caixaQuantiA = createInput();
  caixaQuantiA.position(400, 40);
    
    //botões
  botao = createButton('Calcular');  
  botao.position(1000, 80);  
  botao.mousePressed(defValores);     
    
  textSize(15);
  textAlign(LEFT,CENTER);
    
  noLoop();
}

function defValores(){
    quantiA = Number(caixaQuantiA.value());
    dias = caixaDias.value();
    vazaoA = caixaVazaoA.value();
    vazaoB = caixaVazaoB.value();
    vazaoC = caixaVazaoC.value();
    desenharA = quantiA;
    loop();
}

function draw() {
    var encherA = map(quantiA, desenharA, 0, -175, 0);
    var encherB = map(quantiB, 0, desenharA, 0, -175);
    var encherC = map(quantiC, 0, desenharA, 0, -175);
    background(255);
    
    
    //caixa A
    stroke(0);
    strokeWeight(10);
    strokeCap(SQUARE);
    line(50, 120, 50, 300);
    line(45, 300, 245, 300);
    line(250, 305, 250, 120);
    
    //caixa B
    stroke(0);
    strokeWeight(10);
    strokeCap(SQUARE);
    line(300, 120, 300, 300);
    line(295, 300, 500, 300);
    line(500, 305, 500, 120);
    
    //caixa C
    stroke(0);
    strokeWeight(10);
    strokeCap(SQUARE);
    line(550, 120, 550, 300);
    line(545, 300, 745, 300);
    line(750, 305, 750, 120);
    
    
    //agua A
    strokeWeight(0);
    fill(51, 153, 255)
    rect(55, 295, 190, encherA);
    
    //agua B
    strokeWeight(0);
    fill(51, 153, 255)
    rect(305, 295, 190, encherB);
    
    //agua C
    strokeWeight(0);
    fill(51, 153, 255)
    rect(555, 295, 190, encherC);
    
    //textos acima 
    fill(0);
    text('Diga o valor em dias (numeros naturais apenas):', 35, 20);
    text('Diga o valor da vazão de :', 800, 20);
    text('Diga a quantidade do compartimento A:', 392, 20);
    //imprimirDia(salvaDias, salvaA, salvaB);
    //text('Valor de cada container por hora ao longo do dia :', 800, 40);
    //aviso(quantiA);
    text('A', 145, 280);
    text('B', 397.5, 280);
    text('C', 645, 280);
    
    text('A', 780, 45);
    text('B', 780, 75);
    text('C', 780, 105);
    
    frameRate(600);
    //tabela([quantiA, quantiB]);
    //console.log(quantiA, quantiB, quantiC);
    checaA = quantiA;
    
    tabela([flag,quantiA, quantiB, quantiC]);
    
    quantiA = CalculaA(quantiA, quantiC);
    quantiB = CalculaB(quantiB, quantiA);
    quantiC = CalculaC(quantiC, quantiB);
    flag++;
    
    if(flag == dias){
        noLoop();
        console.log(quantiA, quantiB, quantiC);
        text('Valor no final do dia selecionado de cada container: A: ' + quantiA + ', B: ' + quantiB + ', C: ' + quantiC, 50, 350);
    } 
    else if (quantiA.toFixed(8) == checaA.toFixed(8) && flag != dias){
        noLoop();
        console.log(quantiA, quantiB, quantiC);
        text('O sistema entrou em equilibrio no dia ' + flag + ', a quantidade dos containers é de: A: ' + quantiA + ', B: ' + quantiB + ', C: ' + quantiC, 50, 350);
    }
}

function CalculaA(quantiA, quantiC) {
    var k1 = calcKA(quantiA, quantiC);
    var k2 = calcKA(quantiA + (k1 * timeStep / 2), quantiC + (k1 * timeStep / 2));
    var k3 = calcKA(quantiA + (k2 * timeStep / 2), quantiC + (k2 * timeStep / 2));
    var k4 = calcKA(quantiA + (k3 * timeStep), quantiC + (k3 * timeStep));
    return quantiA + timeStep * (k1 + 2*k2 + 2*k3 + k4) / 6;
}

function CalculaB(quantiB, quantiA){
    var l1 = calcKB(quantiB, quantiA);
    var l2 = calcKB(quantiB + (l1 * timeStep / 2), quantiA + (l1 * timeStep / 2));
    var l3 = calcKB(quantiB + (l2 * timeStep / 2), quantiA + (l2 * timeStep / 2));
    var l4 = calcKB(quantiB + (l3 * timeStep), quantiA + (l3 * timeStep));
    return quantiB + timeStep * (l1 + 2*l2 + 2*l3 + l4) / 6;
}

function CalculaC(quantiC, quantiB){
    var m1 = calcKC(quantiC, quantiB); 
    var m2 = calcKC(quantiC + (m1 * timeStep / 2), quantiB + (m1* timeStep / 2));
    var m3 = calcKC(quantiC + (m2 * timeStep / 2), quantiB + (m2 * timeStep / 2));
    var m4 = calcKC(quantiC + (m3 * timeStep), quantiB + (m3 * timeStep));
    return quantiC + timeStep * (m1 + 2*m2 + 2*m3 + m4) / 6;
    //arrayPontos.push(new Ponto(flag,salvaA));   
}

function calcKA(quantiA, quantiC){
    return quantiC*vazaoC - vazaoA*quantiA;   
}

function calcKB(quantiB, quantiA){
    return quantiA*vazaoA - quantiB*vazaoB;   
}
    
function calcKC(quantiC, quantiB){
    return quantiB*vazaoB - quantiC*vazaoC;   
}


function tabela(rotulos,th,colspan){
        try{
            var table = document.getElementById('tabelaResultados');
            if(!table){
                alert('Erro Print.tabela(): tabelaResultados NotFound');
                return;
            }
            var tag = 'td';
            if(th)tag = 'th';
            var tr = document.createElement('tr');
            
            
            
            
            for(var i = 0; i< rotulos.length;i++){
                var tdRotulo = document.createElement(tag);
                var texto = rotulos[i];        
                var cor = null; 
                if(Array.isArray(rotulos[i])){
                    texto = rotulos[i][0];
                    cor = rotulos[i][1];
                    tdRotulo.style.backgroundColor = 'rgb('+cor[0]+','+cor[1]+','+cor[2]+')';                                    
                }
                tdRotulo.innerHTML = texto;
                if(colspan)tdRotulo.setAttribute('colspan',colspan);
                tr.appendChild(tdRotulo); 
            }
                        
            table.appendChild(tr);            
        }catch(err){
           alert('Erro new Print.tabela(): '+err);
        }
    
    }

/*
class Ponto{
    constructor(x,y){
        this.x = x;
        this.y = y;
        
    }
    
}
var arrayPontos = new Array();




 function imprimirDia(salvaDias, salvaA, salvaB){
    fill(0);
    text('No dia ' + salvaDias - 1 + ' a quantidade em A é de ' + quantiA + ' e B é ' + quantiB, 400, 320);
     
    }

function aviso(quantiA){
      if(quantiA < 1){
        text('Atenção! Esse calculo irá gerar um número infinitamente pequeno, o valor acima é o ultimo valor calculado no momento que da quantidade do conteiner A for menor que 1', 400, 280, 400, 200);
        noLoop();
        }
    }

/*

*/



