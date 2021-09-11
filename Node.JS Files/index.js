const si = require('systeminformation');
var fs = require('fs');

//localStorage.clear();                //uncomment to clear localstorage cache
////////////WHEN FIRST RUN DEFINE THESE VARIABLES!///////////////////
 
var CPUDIR = "D:/Temp Panel/CPU.txt"        // C:/Program Files/Temp Panel/CPU.txt
var GPUDIR = "D:/Temp Panel/GPU.txt"        // C:/Program Files/Temp Panel/GPU.txt


if (localStorage.getItem("FileExistBool") == null){
    localStorage.setItem("FileExistBool", "I exist");
    
    fs.mkdir('D:/Temp Panel', { recursive: true }, (err) => { if (err) throw err; });   //makes folder
    console.log("Created Folder")


    var newPathEXE = 'D:/Temp Panel/Temps.exe'
    var oldPathEXE = 'Temps.exe'
    var newPathHardware = 'D:/Temp Panel/OpenHardwareMonitorLib.dll'
    var oldPathHardware = 'OpenHardwareMonitorLib.dll'
    
    fs.rename(oldPathHardware, newPathHardware, function (err) {
        if (err) throw err
        console.log("Successfully moved")
    })

    fs.rename(oldPathEXE, newPathEXE, function (err) {
        if (err) throw err
        console.log("Successfully moved")
    })

}
var exec = require('child_process').execFile;    //starts temps exe
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
exec('D:/Temp Panel/Temps.exe', function(err){
console.log(err)
});
console.log("Started EXE")

if (localStorage.getItem("ALLdataSpecs") == null){
    getInfo()
}
if (localStorage.getItem("defineVars") == null){
        localStorage.setItem("darkMode", "false");
        localStorage.setItem("beepBool", "True");
        localStorage.setItem("beepTemp", 90);
        localStorage.setItem("performanceMode", "High");
        localStorage.setItem("guageInterval", "5000");
        localStorage.setItem("diskInterval", "60000");
        localStorage.setItem("defineVars", "I exist")
    }

///////////////SETTINGS////////////
function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");

    let isDarkMode = JSON.parse(localStorage.getItem("darkMode"));

    if(isDarkMode == true){
        localStorage.setItem("darkMode", "false");
        let isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    }
    if(isDarkMode == false){
        localStorage.setItem("darkMode", "true");
        let isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    }
}


function checkDarkMode(){
    let isDarkMode = JSON.parse(localStorage.getItem("darkMode")); //sets dark mode on every page load if true
    if(isDarkMode == true){
        var element = document.body;
        element.classList.toggle("dark-mode");
    }
}


checkDarkMode()

function beep(){
    if (localStorage.getItem("beepBool") == "True"){
        localStorage.setItem("beepBool", "False")
        document.getElementById("beep").innerHTML = localStorage.getItem("beepBool");
    }
    else if (localStorage.getItem("beepBool") == "False"){
        localStorage.setItem("beepBool", "True")
        document.getElementById("beep").innerHTML = localStorage.getItem("beepBool");
    }
}

function updateBeepNumber(){
    localStorage.setItem("beepTemp", document.getElementById('beepUpdate').value);
    console.log(localStorage.getItem("beepTemp"));
}

//removeLocalStorage
function removeLocalStorage(){
    localStorage.clear()
    sessionStorage.clear()
}

function getSettingStates(){   //updates settings page with current values
    document.getElementById("performance").innerHTML = localStorage.getItem("performanceMode");
    document.getElementById("beep").innerHTML = localStorage.getItem("beepBool");
    document.getElementsByName('beepInput')[0].placeholder=localStorage.getItem("beepTemp");;
}



function lowPerformance(){
    if (localStorage.getItem("performanceMode") == "High"){
        localStorage.setItem("performanceMode", "Low"); //low performance settings
        localStorage.setItem("guageInterval", "10000");
        localStorage.setItem("diskInterval", "300000");
        document.getElementById("performance").innerHTML = localStorage.getItem("performanceMode");
    }
    else if (localStorage.getItem("performanceMode") == "Low"){
        localStorage.setItem("performanceMode", "High");  //high performance settings
        localStorage.setItem("guageInterval", "5000");
        localStorage.setItem("diskInterval", "60000");
        document.getElementById("performance").innerHTML = localStorage.getItem("performanceMode");
    }
}

function openGoogleForm(){
    require("electron").shell.openExternal("https://forms.gle/1nGfSzUqZHYkvVGf7");
}
function openGoogleFormReq(){
    require("electron").shell.openExternal("https://forms.gle/weusDwUdfxoKo6jx9");
}
function openGoogleFormFeedback(){
    require("electron").shell.openExternal("https://forms.gle/giNajZd3nRv6GzD56");
}
function documentation(){
    require("electron").shell.openExternal("Read_Me.pdf");
}
///////////////////////////////////////SPECS PAGE/////////

function getCPUinfo(){
    let stinker = si.cpu();

        stinker.then(function(CPUinfo){
        CPUBRAND = CPUinfo.brand;
        CPUMANUFACTURER = CPUinfo.manufacturer;
        CPUSPEED = CPUinfo.speed;
        localStorage.setItem('CPUBRAND', CPUBRAND);
        localStorage.setItem('CPUMANUFACTURER', CPUMANUFACTURER); //saves to localstorage for fast load next time
        localStorage.setItem('CPUSPEED', CPUSPEED);
        localStorage.setItem('CPUstorage', 'I exist');

        //document.getElementById("CPUBRAND").innerHTML = CPUBRAND;
        //document.getElementById("CPUMANUFACTURER").innerHTML = CPUMANUFACTURER; //sets label element in specs to result
        //document.getElementById("CPUSPEED").innerHTML = (CPUSPEED+"GHZ");
    });
}

function getGPUinfo(){
    let stinker1 = si.graphics();
    
        stinker1.then(function(GPUinfo){
        GPUMANUFACTURER = GPUinfo.controllers[0].vendor;
        GPUBRAND = GPUinfo.controllers[0].model;
        GPUMEMORY = GPUinfo.controllers[0].memoryTotal;
        localStorage.setItem('GPUMANUFACTURER', GPUMANUFACTURER);
        localStorage.setItem('GPUBRAND', GPUBRAND);
        localStorage.setItem('GPUMEMORY', GPUMEMORY);
        localStorage.setItem('GPUstorage','I exist');

        //document.getElementById("GPUBRAND").innerHTML = GPUBRAND;
        //document.getElementById("GPUMANUFACTURER").innerHTML = GPUMANUFACTURER;
        //document.getElementById("GPUMEMORY").innerHTML = (GPUMEMORY+"GB");
    });
}

function getOSinfo(){
    let stinker2 = si.osInfo();
    
        stinker2.then(function(osInfo){
        OSMANUFACTURER = osInfo.distro;
        localStorage.setItem('OSMANUFACTURER', OSMANUFACTURER);
        localStorage.setItem('OSstorage', 'I exist');
        //document.getElementById("osVersion").innerHTML = OSMANUFACTURER;
    });
}

function getRAM(){
    let stinker3 = si.mem();
    stinker3.then(function(RAMT){

        RAMTOTAL = Math.round(RAMT.total/1073741824)+"GB";
        localStorage.setItem('RAMTOTAL', RAMTOTAL);
        //document.getElementById("RAMTOTAL").innerHTML = RAMTOTAL;
    });
    let stinker99 = si.memLayout();
    stinker99.then(function(RAML){

        RAMSPEED = RAML[0].clockSpeed + "MHZ";
        localStorage.setItem("RAMSPEED", RAMSPEED);
        //document.getElementById("RAMSPEED").innerHTML = RAMSPEED;
        localStorage.setItem('RAMstorage', 'I exist');
        })
}

function getMBO(){
    let stinker4 = si.baseboard();
    stinker4.then(function(MBO){

        MBOMANUFACTURER = MBO.manufacturer;
        MBOMODEL = MBO.model;
        localStorage.setItem('MBOMANUFACTURER', MBOMANUFACTURER);
        localStorage.setItem('MBOMODEL', MBOMODEL);
        localStorage.setItem('MBOstorage', 'I exist');
        //document.getElementById("MBOMANUFACTURER").innerHTML = MBOMANUFACTURER;
        //document.getElementById("MBOMODEL").innerHTML = MBOMODEL;
    });
}

function getDISK(){
    let stinker5 = si.diskLayout();
    stinker5.then(function(DISK){
        DISKnum = 0;
        while (0 == 0){
            if (DISK[DISKnum] == null){
                localStorage.setItem('DISKnum', DISKnum);
                break;
            }
            if (DISK[DISKnum] != null){
                DISKnum = DISKnum + 1;
            }
        }
        DISKnames = '';
        for (let i = 0; i < localStorage.getItem('DISKnum'); i++){
            DISKnames = DISKnames + DISK[i].name + ', ';
        }
        localStorage.setItem('DISKnames', DISKnames);
        localStorage.setItem('DISKstorage', 'I exist');
        //document.getElementById("DRIVENAMES").innerHTML = DISKnames;

    });
}

function getBIOS(){
    let stinker24 = si.bios();
    stinker24.then(function(BIOS){
        BIOSVERSION = BIOS.version;
        BIOSDATE = BIOS.releaseDate;
        localStorage.setItem('BIOSVERSION', BIOSVERSION)
        localStorage.setItem('BIOSDATE', BIOSDATE);
        localStorage.setItem('BIOSstorage', "I EXIST");
    })
}
function getInfo(){
    if (localStorage.getItem('CPUstorage') != null){ //if exists in local storage set element to value
        document.getElementById("CPUBRAND").innerHTML = localStorage.getItem('CPUBRAND');
        document.getElementById("CPUMANUFACTURER").innerHTML = localStorage.getItem('CPUMANUFACTURER');
        document.getElementById("CPUSPEED").innerHTML = localStorage.getItem('CPUSPEED')+"GHZ";
    }
    if (localStorage.getItem('CPUstorage') == null){  //if not exist locally gets results using library
        getCPUinfo();
    }
    if (localStorage.getItem('GPUstorage') != null){
        document.getElementById("GPUBRAND").innerHTML = localStorage.getItem('GPUBRAND');
        document.getElementById("GPUMANUFACTURER").innerHTML = localStorage.getItem('GPUMANUFACTURER');
        document.getElementById("GPUMEMORY").innerHTML = localStorage.getItem('GPUMEMORY')+"GB";
    }
    if (localStorage.getItem('GPUstorage') == null){
        getGPUinfo();
    }
    if (localStorage.getItem('OSstorage') != null){
        document.getElementById("osVersion").innerHTML = localStorage.getItem('OSMANUFACTURER');
    }
    if (localStorage.getItem('OSstorage') == null){
        getOSinfo();
    }
    if (localStorage.getItem('RAMstorage') != null){
        document.getElementById("RAMTOTAL").innerHTML = localStorage.getItem('RAMTOTAL');
        document.getElementById("RAMSPEED").innerHTML = localStorage.getItem('RAMSPEED');
    }
    if (localStorage.getItem('RAMstorage') == null){
        getRAM();
    }
    if (localStorage.getItem('MBOstorage') != null){
        document.getElementById("MBOMANUFACTURER").innerHTML = localStorage.getItem('MBOMANUFACTURER');
        document.getElementById("MBOMODEL").innerHTML = localStorage.getItem('MBOMODEL');
    }
    if (localStorage.getItem('MBOstorage') == null){
        getMBO();
    }
    if (localStorage.getItem('DISKstorage') != null){
        document.getElementById("DRIVENAMES").innerHTML = localStorage.getItem('DISKnames');
    }
    if (localStorage.getItem('DISKstorage') == null){
        getDISK();
    }
    if (localStorage.getItem("BIOSstorage") != null){
        document.getElementById("BIOSVERSION").innerHTML = localStorage.getItem('BIOSVERSION');
        document.getElementById("BIOSDATE").innerHTML = localStorage.getItem('BIOSDATE');
    }
    if (localStorage.getItem("BIOSstorage") == null){
        getBIOS();
    }
    localStorage.setItem("ALLdataSpecs", "I exist");
};

//////////////////////////////////////////////GPU GRAPHING SHIT/////////////
console.log("GPUTEMP IS:" + sessionStorage.getItem("GPUtemperature"));
if(sessionStorage.getItem('GPUtemperature') != null){
    GPUtemperature = JSON.parse(sessionStorage.getItem('GPUtemperature'));  //checks session storage for past GPU temps ect.
}
if(sessionStorage.getItem('labels') != null){
    labels = JSON.parse(sessionStorage.getItem('labels'));
}
if(sessionStorage.getItem('_label_increment') != null){
    _label_increment = JSON.parse(sessionStorage.getItem('_label_increment'));
}

else{
    GPUtemperature = [0];
    labels = [];                 //if not exist locally sets vars
    _label_increment = 0;
};

function getGPU(label_increment, labels){
    labels.push(label_increment);  //appends to array
    label_increment = label_increment + 1; //increments time
    return label_increment  
};

function getGPUtemp(GPUtemperature){    //function to get GPU temp then append to array
    try {  
        var data = fs.readFileSync('GPUDIR', 'utf8');
        GPUtempGraph = Math.round(data.toString()); 
    } catch(e) {
        console.log('Error:', e.stack);
    }
        GPUtemperature.push(GPUtempGraph);
        return GPUtemperature

}

setInterval( function() {
    _label_increment = getGPU(_label_increment, labels);   //updates graph every period of time with latest GPU temp
    getGPUtemp(GPUtemperature);
    chartGPU.update();

}, 60000 );

window.onbeforeunload = function(){
    unloadGPU()
    unloadCPU()
}

function unloadGPU(){
    sessionStorage.setItem('GPUtemperature', JSON.stringify(GPUtemperature)); //before leave page saves vars to local storage
    sessionStorage.setItem('labels', JSON.stringify(labels));
    sessionStorage.setItem('_label_increment', JSON.stringify(_label_increment));
}

///////////////CPU GRAPHING SHIT/////////////////////
console.log("CPUTEMP IS:" + sessionStorage.getItem("CPUtemperature"));
if(sessionStorage.getItem('CPUtemperature') != null){
    CPUtemperature = JSON.parse(sessionStorage.getItem('CPUtemperature'));
}
if(sessionStorage.getItem('CPUlabels') != null){
    CPUlabels = JSON.parse(sessionStorage.getItem('CPUlabels'));
}
if(sessionStorage.getItem('CPU_label_increment') != null){
    CPU_label_increment = JSON.parse(sessionStorage.getItem('CPU_label_increment'));
}

else{
    CPUtemperature = [0];
    CPUlabels = [];
    CPU_label_increment = 0;
}

function getCPU(CPUlabel_increment, CPUlabels){
    CPUlabels.push(CPUlabel_increment);  //appends to array
    CPUlabel_increment = CPUlabel_increment + 1; //increments time
    return CPUlabel_increment  
}

function getCPUtemp(CPUtemperature){
    try {  
        var data = fs.readFileSync(CPUDIR, 'utf8');
        CPUtempGraph = Math.round(data.toString()); 
    } catch(e) {
        console.log('Error:', e.stack);
    }
        CPUtemp = CPUtempGraph;
        CPUtemperature.push(CPUtempGraph);
        return CPUtemperature
}

setInterval( function() {
    CPU_label_increment = getCPU(CPU_label_increment, CPUlabels);
    getCPUtemp(CPUtemperature);
    chartCPU.update();

}, 60000 );


function unloadCPU(){
    sessionStorage.setItem('CPUtemperature', JSON.stringify(CPUtemperature));
    sessionStorage.setItem('CPUlabels', JSON.stringify(CPUlabels));
    sessionStorage.setItem('CPU_label_increment', JSON.stringify(CPU_label_increment));
}

//////////////HOME PAGE DATA//////

function getDRIVEpercent(){
    let stinker = si.fsSize();
    stinker.then(function(DISK){

        DRIVE1ANGLE = (DISK[0].used/DISK[0].size); //find decimal percent of storage used
        document.getElementById("DRIVE1").innerHTML = Math.round(DRIVE1ANGLE*100)+'%'; //sets guage to percent
        document.documentElement.style.setProperty('--DRIVE1ANGLE', Math.round(DRIVE1ANGLE*180) + 'deg'); //draws line around guage
        if (localStorage.getItem("DISKnum") >= 2){
            document.documentElement.style.setProperty('--D2VISIBLE', 'visible'); //sets guage visibile
            DRIVE2ANGLE = (DISK[1].used/DISK[1].size);
            document.getElementById("DRIVE2").innerHTML = Math.round(DRIVE2ANGLE*100)+'%';
            document.documentElement.style.setProperty('--DRIVE2ANGLE', Math.round(DRIVE2ANGLE*180) + 'deg');
        }
        if (localStorage.getItem("DISKnum") >= 3){
            document.documentElement.style.setProperty('--D3VISIBLE', 'visible'); //sets guage visibile
            DRIVE3ANGLE = (DISK[2].used/DISK[2].size);
            document.getElementById("DRIVE3").innerHTML = Math.round(DRIVE3ANGLE*100) +'%';
            document.documentElement.style.setProperty('--DRIVE3ANGLE', Math.round(DRIVE3ANGLE*180) + 'deg');
        }
    });
}

function getGPUtempHome(){
    try {  
        var data = fs.readFileSync(GPUDIR, 'utf8');
        GPUtemp = Math.round(data.toString()); 
        document.getElementById("GPUtemps").innerHTML = GPUtemp+'°';
        document.documentElement.style.setProperty('--GPUTEMP', GPUtemp*1.8 + 'deg'); //draw line around guage

        if (GPUtemp > localStorage.getItem("beepTemp") & localStorage.getItem("beepBool") == 'True'){
            console.log("Playing audio");
            var audio = new Audio('beep.mp3');
            audio.play();
        };

    } catch(e) {
        console.log('Error:', e.stack);
    }
}
function getGPUtempPopout(){
    try {  
        var data = fs.readFileSync(GPUDIR, 'utf8');
        PGPUtemp = Math.round(data.toString()); 
        document.getElementById("PGPUtemps").innerHTML = PGPUtemp+'°';
        document.documentElement.style.setProperty('--PGPUTEMP', PGPUtemp*1.8 + 'deg'); //draw line around guage
    } catch(e) {
        console.log('Error:', e.stack);
    }
}

function getRAMhome(){
    let stinker3 = si.mem();
    stinker3.then(function(RAM){
        
        RAMUSAGE = Math.round(((RAM.used/RAM.total)*100));
        document.getElementById("RAMloads").innerHTML = RAMUSAGE+'%';
        document.documentElement.style.setProperty('--RAMLOAD', RAMUSAGE*1.8 + 'deg');
    });
}
function getRAMpopout(){
    let stinker3 = si.mem();
    stinker3.then(function(RAM){

        RAMUSAGE = Math.round(((RAM.used/RAM.total)*100));
        document.getElementById("PRAMLOAD").innerHTML = RAMUSAGE+'%';
        document.documentElement.style.setProperty('--PRAMLOAD', RAMUSAGE*1.8 + 'deg');
    });
}


function getCPUhome(){
    try {  
        var data = fs.readFileSync(CPUDIR, 'utf8');
        CPUtemp = Math.round(data.toString()); 
        document.getElementById("CPUtemps").innerHTML = CPUtemp+'°';
        document.documentElement.style.setProperty('--CPUTEMP', CPUtemp*1.8 + 'deg'); //draw line around guage
    } catch(e) {
        console.log('Error:', e.stack);
    }
}
function getCPUtempPopout(){
    try {  
        var data = fs.readFileSync(CPUDIR, 'utf8');
        PCPUtemp = Math.round(data.toString()); 
        document.getElementById("PCPUtemps").innerHTML = PCPUtemp+'°';
        document.documentElement.style.setProperty('--PCPUTEMP', PCPUtemp*1.8 + 'deg'); //draw line around guage
    } catch(e) {
        console.log('Error:', e.stack);
    }
}
 
function updateHomeGuages() {
    getGPUtempHome();
    getRAMhome();
    getCPUhome();
};
/////////HOME PAGE VISUALS//////
function setGuageColour(){
    if (localStorage.getItem("GuageColour") != null){
        document.documentElement.style.setProperty('--GuageColour', localStorage.getItem("GuageColour"));
    }
    if (localStorage.getItem("GuageColour") == null){
        document.documentElement.style.setProperty('--GuageColour', "#9e00b1");
    }
}

////////POPOUT WINDOWS/////
function openGPUpopout(){
    const electron = require("electron");
    const BrowserWindow = electron.remote.BrowserWindow;
    const path = require("path");
    const url = require("url");
    winGPU = new BrowserWindow({width: 225, height: 235, maxWidth: 225, maxHeight: 235, backgroundColor: ''});

    winGPU.loadURL(url.format({
        pathname: path.join(__dirname, 'popoutGPU.html'),   //creates window using index.html
        protocol: 'file',
        slashes: true
    }));

    winGPU.on('closed', () => {       //allows user to close window
        win = null;;
    })

};
function openRAMpopout(){
    const electron = require("electron");
    const BrowserWindow = electron.remote.BrowserWindow;
    const path = require("path");
    const url = require("url");
    winGPU = new BrowserWindow({width: 225, height: 235, maxWidth: 225, maxHeight: 235, backgroundColor: ''});

    winGPU.loadURL(url.format({
        pathname: path.join(__dirname, 'popoutRAM.html'),   //creates window using index.html
        protocol: 'file',
        slashes: true
    }));

    winGPU.on('closed', () => {       //allows user to close window
        win = null;;
    })

};
function openCPUpopout(){
    const electron = require("electron");
    const BrowserWindow = electron.remote.BrowserWindow;
    const path = require("path");
    const url = require("url");
    winGPU = new BrowserWindow({width: 225, height: 235, maxWidth: 225, maxHeight: 235, backgroundColor: ''});

    winGPU.loadURL(url.format({
        pathname: path.join(__dirname, 'popoutCPU.html'),   //creates window using index.html
        protocol: 'file',
        slashes: true
    }));

    winGPU.on('closed', () => {       //allows user to close window
        win = null;;
    })
};
///////