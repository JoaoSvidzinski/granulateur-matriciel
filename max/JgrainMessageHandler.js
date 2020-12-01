//--------------------------------------------------------------------------------------// 
inlets = 1;
outlets = 3;
//--------------------------------------------------------------------------------------//
//global variables
var size, del, rar, fdx, fdMat, inp, out;
var lineNumber = 8;

//the js mTapMessageHandler.js object should have one parameter that is the size//
//of the arrays//
//by default, the size is 16//

if (jsarguments.length == 2) {
	lineNumber = jsarguments[1];
	post("JGrain_MessageHandler initialization with", lineNumber, "delay lines\n");
}
else {
	post("missing line number as argument of the js object\n");
}

var size = new Array(lineNumber);
var del = new Array(lineNumber);
var rar = new Array(lineNumber);
var fdx = new Array(lineNumber);
var fdMat = new Array(lineNumber*lineNumber);
var inp = new Array(lineNumber);
var out = new Array(lineNumber);

//--------------------------------------------------------------------------------------//
//Fonctions formatage à 2 ou 3 chiffres des indices//
function format2(i)
{
	if (i < 10)
		{
			return '0'+i;
		}
	else
		{
			return i;
		}
}
//--------------------------------------------------------------------------------------//
function format3(i)
{
	if (i < 10)
		{
			return '00'+i;
		}
	else
		{
			if (i < 100)
				{
					return '0'+i;
				}
			else
				{
					return i;
				}
		}
}

//--------------------------------------------------------------------------------------//
//
//-----SIZE
//
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setSize1 function
//--------------------------------------------------------------------------------------//
function setSize1(i, x)
{
	size[i] = x;
	var label = 'size'+format2(i);
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setSize2 function
//--------------------------------------------------------------------------------------//
function setSize2(i, x)
{
	if (size[i] != x)
	{
		setSize1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setSize function
//--------------------------------------------------------------------------------------//
function setSize(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setSize2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setSize2(k, arguments[i]);
			}
		}
	}
}

//--------------------------------------------------------------------------------------//
//durUI function
//--------------------------------------------------------------------------------------//
function sizeUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setSize2(k, arguments[i]);
		}
	}
}

//--------------------------------------------------------------------------------------//
//outputAllDurations function
//--------------------------------------------------------------------------------------//
function outputAllSize()
{
	outlet(1, "SizeToDisplay", size);
}

//*****END OF DURATION FUNCTIONS********************************************************//

//--------------------------------------------------------------------------------------//
//
//-----DELAY
//
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setFd1 function
//--------------------------------------------------------------------------------------//
function setDel1(i, x)
{
	del[i] = x;
	var label = 'del'+format2(i);
	//post("i=", i, "\n");
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setFd2 function
//--------------------------------------------------------------------------------------//
function setDel2(i, x)
{
	if (del[i] != x)
	{
		setDel1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setFd function
//--------------------------------------------------------------------------------------//
function setDel(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setDel2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setDel2(k, arguments[i]);
			}
		}
	}
}

//--------------------------------------------------------------------------------------//
//fdUI function
//--------------------------------------------------------------------------------------//
function delUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setDel2(k, arguments[i]);
		}
	}
}

//--------------------------------------------------------------------------------------//
//outputAllFds function
//--------------------------------------------------------------------------------------//
function outputAllDel()
{
	outlet(1, "DelToDisplay", del);
}

//*****END OF FEEDBACK FUNCTIONS********************************************************//

//--------------------------------------------------------------------------------------//
//
//-----Rarefaction
//
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setTransposition1 function
//--------------------------------------------------------------------------------------//
function setRare1(i, x)
{
	rar[i] = x;
	var label = 'rar'+format2(i);
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setTransposition2 function
//--------------------------------------------------------------------------------------//
function setRare2(i, x)
{
	if (rar[i] != x)
	{
		setRare1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setTransposition function
//--------------------------------------------------------------------------------------//
function setRare(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setRare2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setRare2(k, arguments[i]);
			}
		}
	}
}

//--------------------------------------------------------------------------------------//
//traUI function
//--------------------------------------------------------------------------------------//
function rarUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setRare2(k, arguments[i]);
		}
	}
}


//--------------------------------------------------------------------------------------//
//outputAllTranspositions function
//--------------------------------------------------------------------------------------//
function outputAllRare()
{
	outlet(1, "RareToDisplay", rar);
}

//*****END OF TRANSPOSITION FUNCTIONS***************************************************//



//--------------------------------------------------------------------------------------//
//
//-----xvd COEFFICIENTS = HARMONIZERS VERSUS DELAYS
//
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setxvd1 function
//--------------------------------------------------------------------------------------//
function setFdx1(i, x)
{
	fdx[i] = x;
	var label = 'fdx'+format2(i);
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setxvd2 function
//--------------------------------------------------------------------------------------//
function setFdx2(i, x)
{
	if (fdx[i] != x)
	{
		setFdx1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setxvd function
//--------------------------------------------------------------------------------------//
function setFdx(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setFdx2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setFdx2(k, arguments[i]);
			}
		}
	}
}

//--------------------------------------------------------------------------------------//
//xvdUI function
//--------------------------------------------------------------------------------------//
function fdxUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setFdx2(k, arguments[i]);
		}
	}
}


//--------------------------------------------------------------------------------------//
//outputAllxvds function
//--------------------------------------------------------------------------------------//
function outputAllFdx()
{
	outlet(1, "FdxToDisplay", fdx);
}

//*****END OF Xvd FUNCTIONS*************************************************************//


//--------------------------------------------------------------------------------------//
//
//-----AMPLITUDES OF INPUTS
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setInp1 function
//--------------------------------------------------------------------------------------//
function setInp1(i, x)
{
	inp[i] = x;
	var label = 'inp'+format2(i);
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setInp2 function
//--------------------------------------------------------------------------------------//
function setInp2(i, x)
{
	if (inp[i] != x)
	{
		setInp1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setInp function
//--------------------------------------------------------------------------------------//
function setInp(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setInp2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setInp2(k, arguments[i]);
			}
		}
	}
}

//--------------------------------------------------------------------------------------//
//mInpUI function
//--------------------------------------------------------------------------------------//
function inpUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setInp2(k, arguments[i]);
		}
	}
}


//--------------------------------------------------------------------------------------//
//outputAllInps function
//--------------------------------------------------------------------------------------//
function outputAllInps()
{
	outlet(1, "InpToDisplay", inp);
}

//*****END OF INP FUNCTIONS*************************************************************//


//--------------------------------------------------------------------------------------//
//
//-----AMPLITUDES OF OUTPUTS
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//setOut1 function
//--------------------------------------------------------------------------------------//
function setOut1(i, x)
{
	out[i] = x;
	var label = 'out'+format2(i);
	outlet(0, label, x);
}

//--------------------------------------------------------------------------------------//
//setOut2 function
//--------------------------------------------------------------------------------------//
function setOut2(i, x)
{
	if (out[i] != x)
	{
		setOut1(i, x);
	}
}

//--------------------------------------------------------------------------------------//
//setOut function
//--------------------------------------------------------------------------------------//
function setOut(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all durations//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			setOut2(i, j);
		}
	}
	else
	{
		//several arguments are passed//
		j = arguments[0];//starting index//
		for (i = 1; i < arguments.length; i++) {
			k = j+i-1;
			if (k < lineNumber) {
				setOut2(k, arguments[i]);
			}
		}
	}
}


//--------------------------------------------------------------------------------------//
//outUI function
//--------------------------------------------------------------------------------------//
function outUI(a)
{
	//variable size
	var i, j, k;
	j = arguments[0];//starting index//
	for (i = 1; i < arguments.length; i++)
	{
		k = j+i-1;
		if (k < lineNumber) {
			setOut2(k, arguments[i]);
		}
	}
}


//--------------------------------------------------------------------------------------//
//outputAllOuts function
//--------------------------------------------------------------------------------------//
function outputAllOuts()
{
	outlet(1, "OutToDisplay", out);
}

//*****END OF OUTPUT FUNCTIONS**********************************************************//


//--------------------------------------------------------------------------------------//
//
//-----FEEDBACK ROUTING MATRIX
//
//--------------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------------//
//setFdMatCell function
//--------------------------------------------------------------------------------------//
function setFdMatCell(x, y, val)
{
	var ind; //index of the toggle in the matrix
	var faustMsg;
	//
	ind = x + lineNumber*y;
	if (fdMat[ind] != val)
	{
		fdMat[ind] = val;
		faustMsg = 'r'+format3(ind);
		outlet(0, faustMsg, val); 
	}
}

//--------------------------------------------------------------------------------------//
//setFdMat function
//--------------------------------------------------------------------------------------//
function setFdMat(x, y, val)
{
	setFdMatCell(x, y, val);
	outlet(2, x, y, val);
}

//--------------------------------------------------------------------------------------//
//setFdMatList function
//-either one value only is passed
//-or a list of triplets is given with two indices : i, j and a value
//--------------------------------------------------------------------------------------//
function setFdMatList(a)
{
	//variable size
	var i, j, k, l;
	l = arguments.length;
	//if only one argument this is the common value of all fdMat cells//
	if (l == 1) {
		j = arguments[0];
		for (i = 0; i < lineNumber; i++) {
			for (k = 0; k < lineNumber; k++) {
				setFdMat(i, k, j);
			}
		}
	}
	else
	{
		//several arguments are given as triplets//
		if ((arguments.length % 3) == 0)
		{
			j = arguments.length / 3;
			for (i = 0; i < j; i++) {
				k = 3 * i;
				setFdMat(arguments[k], arguments[k+1], arguments[k+2]);
			}
		}
	}
}


//--------------------------------------------------------------------------------------//
//fdMatUI function
//--------------------------------------------------------------------------------------//
function fdMatUI(x, y, val)
{
	setFdMatCell(x, y, val);
}

//--------------------------------------------------------------------------------------//
//fdMatReset function
//--------------------------------------------------------------------------------------//
function fdMatReset()
{
	var i, j;
	for (i = 0; i < lineNumber; i++) {
		for (j = 0; j < lineNumber; j++) {
			//post("***\n");
			setFdMat(i, j, 0);
		}
	}
}


//--------------------------------------------------------------------------------------//
//fdMatColumnReset function
//resets n columns starting at i0
//--------------------------------------------------------------------------------------//
function fdMatColumnReset(i0, n)
{
	var i, j, k;
	for (i = i0; i < i0+n; i++) {
		k = i % lineNumber;
		for (j = 0; j < lineNumber; j++) {
			setFdMat(k, j, 0);
		}
	}
}

//--------------------------------------------------------------------------------------//
//fdMatInit function
//--------------------------------------------------------------------------------------//
function fdMatInit()
{
	var i;
	for (i = 0; i < lineNumber; i++) {
			setFdMat(i, i, 1);
	}
}


//--------------------------------------------------------------------------------------//
//anything function
//--------------------------------------------------------------------------------------//
function anything()
{
		post("Anything Grain\n");
}

//--------------------------------------------------------------------------------------//
//displayAll function
//--------------------------------------------------------------------------------------//
function displayAll()
{
	outputAllSize();
	outputAllDel();
	outputAllRare();
	outputAllFdx();
	outputAllInps();
	outputAllOuts();
}

//--------------------------------------------------------------------------------------//
//init function
//--------------------------------------------------------------------------------------//
function init()
{
		setSize(100);
		setDel(500);
		setRare(0.5);
		setFdx(0.5);
		setInp(1.0);
		setOut(1.0);
		fdMatReset();
		displayAll();
}

//----------------------------------------------------------------------------------------// 
//setColumn function
//----------------------------------------------------------------------------------------// 
function setColumn(colNum, size, del, rar, fdx, inp, out) {
	setSize2(colNum, size);
	setDel2(colNum, del);
	setRare2(colNum, rar);
	setFdx2(colNum, fdx);
	setInp2(colNum, inp);
	setOut2(colNum, out);
}

//--------------------------------------------------------------------------------------//
//demo1 function : upscale
//--------------------------------------------------------------------------------------//
function demo()
{
		var i;
		init();
		setSize(0, 40, 80, 100, 150, 150, 300, 350);
		setDel(0, 50, 150, 575, 700, 825, 1150, 2175);
		setRare(0, 0.25, 0.50, 0.75, 1., 0.125, 0.85, 0.75);
		setInp(0, 1, 1, 1, 1, 1, 1, 1);
		setOut(0, 1, 1, 1, 1, 1, 1, 1);
		for (i = 0; i < lineNumber; i++)
		{
			setFdMat(lineNumber-1, i, 1);
		}
		displayAll();
}




