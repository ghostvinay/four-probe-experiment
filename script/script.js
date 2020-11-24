//Function for aim of the Experiment button
function aim() {
  document.getElementById('environment').innerHTML = document.getElementById('aim_env').innerHTML;
}

//Function for result button
function result() {
  document.getElementById('environment').innerHTML = document.getElementById('result_env').innerHTML;
}

//Function for discussion button
function discussion() {
  document.getElementById('environment').innerHTML = document.getElementById('discussion_env').innerHTML;
}

//Function for conclusion button
function conclusion() {
  document.getElementById('environment').innerHTML = document.getElementById('conclusion_env').innerHTML;
}

//Function for intro of the experiment button
function intro() {
  document.getElementById('environment').innerHTML = document.getElementById('intro_env').innerHTML;
}

//Function for demo1 button
function demo1() {
  document.getElementById('environment').innerHTML = document.getElementById('demo1_env').innerHTML;
}

//Function for demo2 button
function demo2() {
  document.getElementById('environment').innerHTML = document.getElementById('demo2_env').innerHTML;
}

//Function for Apparatus Required button
function appr() {
  document.getElementById('environment').innerHTML = document.getElementById("app_req").innerHTML;
}

// Functions inside apparatus Required
//Function to show four probe Arrangement
function fpa() {
  document.getElementById('image_region').innerHTML = document.getElementById("probe_arrangement").innerHTML;
}
//Function to show sample detail
function sample() {
  document.getElementById('image_region').innerHTML = document.getElementById("Sample").innerHTML;
}
//Function to show Oven
function oven() {
  document.getElementById('image_region').innerHTML = document.getElementById("oven").innerHTML;
}
//Function to show four probe set up
function setup() {
  document.getElementById('image_region').innerHTML = document.getElementById("set-up").innerHTML;
}



// Function for Procedure
function procedure() {
  document.getElementById('environment').innerHTML = document.getElementById("procedure").innerHTML;
}
//Function for different steps
//Step1
function ps1() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step1").innerHTML;
}
function cs1() {
  document.getElementById('step_region').innerHTML = document.getElementById("CStep1").innerHTML;
}

//Step 2
function ps2() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step2").innerHTML;
}
function cs2() {
  document.getElementById('step_region').innerHTML = document.getElementById("CStep2").innerHTML;
}
//Step 3
function ps3() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step3").innerHTML;
}
function cs3() {
  document.getElementById('step_region').innerHTML = document.getElementById("CStep3").innerHTML;
}
//Step 4
function ps4() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step4").innerHTML;
}
function cs4() {
  document.getElementById('step_region').innerHTML = document.getElementById("CStep4").innerHTML;
}
//Step 5
function ps5() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step5").innerHTML;
}
function cs5() {
  document.getElementById('step_region').innerHTML = document.getElementById("CStep5").innerHTML;
}

//Step 6
//This step takes parameters from the user and gets the experimental data and returns interval
var material = 'Ge'
var i = 8 //mA
var s = 2 //mm
var w = 0.66 //mm
var iT = 300 //K
var fT = 450 //K
var a = 3570
var b = -12.887
var dataT = []
var datav = []
var t = 0

function ps6() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step6").innerHTML;
}
function cs6() {
  material = document.getElementById('material').value
  i = parseFloat(document.getElementById('current').value)
  s = parseFloat(document.getElementById('separation').value)
  w = parseFloat(document.getElementById('thickness').value)
  iT = parseFloat(document.getElementById('iT').value)
  fT = parseFloat(document.getElementById('fT').value)
  dT = parseFloat(document.getElementById('sT').value)
  console.log(material);
  console.log(i);
  console.log(s);
  console.log(w);
  console.log(iT);
  console.log(fT);
  console.log(fT);
  if (isNaN(i) || isNaN(s) || isNaN(w) || isNaN(iT) || isNaN(fT) || isNaN(dT)){
    document.getElementById('save_alert').innerHTML = "Complete the above fields before saving."
  } else {
    document.getElementById('save_alert').innerHTML = "Parameters have been saved."
  }

}

// Step 7 - Generate and export
function ps7() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step7").innerHTML;
}

// generate
function generate() {
  dataT = []
  datav = []
  g7 = ((2*s)/w)*Math.log(2)
  if (typeof(dT)=="undefined") {
    dT = 10;
  }

  if (material == 'Ge') {
    a = 3570
    b = -12.887
  } else if (material == 'Si') {
    a = 3500
    b = -11.000
  } else {
    window.prompt("Complete Step 6 Properly.")
  }

  console.log('Loop Start')
  t = iT;
  lnrho = 0;
  rho_0 = 0;
  v = 0;
  while (t < fT) {
    lnrho = (a/t)+b
    rho = Math.exp(lnrho)
    rho_0 = g7*rho
    v = (rho_0*i)/(2*Math.PI*s)
    v = v + 0.05*v*(2*(Math.random())-1)
    dataT.push(t)
    datav.push(v)
    t = t+dT
  }
  console.log('Loop Ended')
  document.getElementById('calc_complete').innerHTML = "Calculation Completed"
}

//Step 8
function ps8() {
  document.getElementById('step_region').innerHTML = document.getElementById("Step8").innerHTML;
}
// Function to see the generated data
function see() {
  var htmlStr = "<table>";
  htmlStr += "<tr><th>Temperature in K</th><th>Voltage in Volt</th></tr>"
  for(var i=0; i < dataT.length; ++i) {
      htmlStr += "<tr>";
      htmlStr += "<th>" + dataT[i] + "</th>";
      htmlStr += "<th>" + datav[i].toFixed(8) + "</th>";
      htmlStr += "</tr>";
    }
    htmlStr += "</table>"
    document.getElementById('table').innerHTML = htmlStr
}

//Downloading the table
function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
