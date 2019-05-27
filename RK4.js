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
    arrayPontos.push(new Ponto(flag,salvaA));   
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