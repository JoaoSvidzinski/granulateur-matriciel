declare name "Jgrain 7";
declare version "1.0";

import("stdfaust.lib");


//--------------------------------------------------------------------------------------//
//GENERAL MATRIX//
//--------------------------------------------------------------------------------------//
//matrix of N x M toggles//
toggle(c, in) = checkbox("h:Lines/h:Reinjection_Matrix/v:Grain%2c-->/r%3in");
Mixer(N,out) 	= par(in, N, *(toggle(in, in+out*N)) ) :> _ ;
Matrix(N,M) 	= par(in, N, _) <: par(out, M, Mixer(N, out));


//--------------------------------------------------------------------------------------//
sinus = os.sinwaveform(tablesize);
sinuso = sinus * sinus * sinus * sinus;
mili = ma.SR / 1000.0;
maxdelay = 262144;
tablesize = 192000;

//--------------------------------------------------------------------------------------//

//Grain parametres - from 0 to 1//
size(ind) = hslider("h:Grain/v:Grain_Size/size%2ind", 50, 0, 1000, 0.01);
del(ind) = hslider("h:Grain/v:Grain_Delay/del%2ind", 0, 0, 5000, 0.1);
rar(ind) = hslider("h:Grain/v:Grain_Rarefaction/rar%2ind", 0.5, 0, 1, 0.0001);

//Feedback externe  - from 0 to 1//
fdx(ind) = hslider("h:Grain/v:Grain_FeedBackext/fdx%2ind", 1, 0, 1, 0.01) : si.smoo;

//Input gains - from 0 to 1//
inp(ind) = hslider("h:Grain/v:Input/inp%2ind [5]", 1, 0, 1, 0.01) : si.smoo;

//OUTPUT GAINS - from 0 to 1//
out(ind) = hslider("h:Grain/v:Output/out%2ind [6]", 1, 0, 1, 0.01) : si.smoo;

//--------------------------------------------------------------------------------------//
//FEEDBACK REINJECTION MATRICES N x N
//--------------------------------------------------------------------------------------//
fdMatrix(N) = Matrix(N, N);

//--------------------------------------------------------------------------------------//
grain(size, del, rar) = grainS
with
{

freq = 1000 / size;
Phasor = os.phasor(1, freq);

index = Phasor * tablesize;
env = rdtable(tablesize, sinuso, int(index));

No = no.noise : +(1) : *(0.5);
no_trigger = (No < rar);

No2 = no.noise : +(1);
delayInSamples = *(No2,del) : *(mili);

adjustedPhasor = Phasor : ma.decimal;
th_trigger = (adjustedPhasor > 0.001) * (adjustedPhasor@1 <= 0.001);

trig_grain = no_trigger : ba.sAndH(th_trigger);
trig_delay = delayInSamples : ba.sAndH(th_trigger);

envG 	= trig_grain: *(_,env);
grainS = *(_,1) : de.fdelay(maxdelay, trig_delay) : *(envG);
};


//--------------------------------------------------------------------------------------//
inputSort(n) = si.bus(2*n) <: par(i, n, (ba.selector(i, 2*n), ba.selector(i+n, 2*n)));

//--------------------------------------------------------------------------------------//

grainBlock(n) = par(i, n, (+ : grain(size(i), del(i), rar(i))));

fdBlock(n) = par(i, n, *(fdx(i)));

fdToMatrixBlock(n) = fdBlock(n) : fdMatrix(n);

inputBlock(n) = par(i, n, *(inp(i)));

outputBlock(n) = par(i, n, *(out(i)));

//--------------------------------------------------------------------------------------//
grainG(n) = (inputSort(n) : grainBlock(n)) ~ (fdToMatrixBlock(n));

jgrain(n) = inputBlock(n) : grainG(n) : outputBlock(n);

//--------------------------------------------------------------------------------------//
  
process = jgrain(7);