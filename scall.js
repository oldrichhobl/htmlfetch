/**
 * Lokalizace odd�lova�e desetinn�ch m�st
 * 
 */
var lok = ['te�ka', '��rka'];
// ************  scglobal.xml  **************
//   
//  Hobl a Pech s.r.o. Plzen tel 377423042
// 
/** @global */
var
  Debagr = false;

/**
 *  parametry p��kazov� ��dky napln�no p�i startu
 * @global
 */
var gparams = [],
  hash;

/**
 *  @constant
 *  @default
 */
const
  // definice okna pro sestavy 
tvaroknass = "toolbar=yes,menubar=yes,location=no,directories=no,status=yes,scrollbars=auto,resizable=yes,copyhistory=no,left=0, width=1200,height=800";
tvaroknaimp = "toolbar=yes,menubar=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,left=0, width=1200,height=700";

/** @global */
goblast = ""; // zobrazovat sestavy pro vybranou oblast ?
/** @global */
guser = ""; // zobrazovat sestavy pro vybraneho u?ivatele ?
/** @global */
gspz = ""; // predana SPZ nebo seznam SPZ ?

/** @global */
var cridici = null; // seznam ridicu 
/** @global */
var pickSPZ = null;
/** @global */
var pickRidice = null;
/** @global */
var pickInterval = null; // 
/** @global */
var ckodyRad = null; //Seznam kodu radek - viz vyvyb 
var spzNahrano = false; // nahral se jiz seznam SPZ ?
//
// globalni data pro zapamatovani v kuk cookies
//
/* Vymaz�n� v�ech soubor� cookie
V po��ta�i spus�te Chrome.
Vpravo naho�e klikn�te na ikonu mo�nost� Nastaven�.
V sekci Ochrana soukrom� a zabezpe�en� klikn�te na Soubory cookie a jin� data web�.
Klikn�te na Zobrazit v�echny soubory cookie a data web� Odstranit v�e
*/

/** @global */
var kuk = {
  info: {
    Version: "4.7.460",
    Datum: "26.4.2021"
  },
  ff: {
    Vradio: "0",
    Cradio: "0",
    Rradio: "0",
    Dradio: "1", // desetinny oddelovac 0=tecka 1=carka
    CooRok: "2021",
    CooMes: "4",
    CooDen: "1",
    autospz: "0",
    oridici: "0",
    oblast: 0,
    ridskup: 0,
    skupina: 0,
    opcas: 1,
    ointerval: "01.01.2021",
    dinterval: "31.01.2021",
    Jenoblast: false,

    Prepravce: "",
    Substraty: "",
    Provpod: "",
    Kodsazby: "",
    Praczar: "",
    Vlastnostipp: ""

  },

  CooStyle: "BASE",
  // barvy pozadi
  barvy: ["e2ffe6", /* body */
    "e2ffe6", /* table */
    "oldlace", /* thead td th */
    "papayawhip", /* tfoot td */

    "#FFFFCE", /* bg0 */
    "#EFEFEF", /* bg1 */
    "#DEDEDE", /* bg2 */
    "#CECECE", /* bg3 */
    "#CFCFCF", /* bg4 */
    "#BFBFBF", /* bg5 */

    "inherit", /* .podnik */

    "inherit", /* .sestava */
    "inherit", /* .header  */
    "inherit", /* .r */
    "inherit", /* .total */
    "inherit", /* reserva */
    "inherit", /* reserva */
    "inherit", /* .zapati  */
    "inherit", /* .tableContainer */
    "inherit" /* reserva */
  ],
  //barvy popredi
  barvy2: ["black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black",
    "black"
  ]
};


//  barvy implicitne nastavene
var barvyI = ["e2ffe6", /* body */
  "e2ffe6", /* table */
  "oldlace", /* thead td th */
  "papayawhip", /* tfoot td */

  "#FFFFCE", /* bg0 */
  "#EFEFEF", /* bg1 */
  "#DEDEDE", /* bg2 */
  "#CECECE", /* bg3 */
  "#CFCFCF", /* bg4 */
  "#BFBFBF", /* bg5 */

  "inherit", /* .podnik */

  "inherit", /* .sestava */
  "inherit", /* .header  */
  "inherit", /* .r */
  "inherit", /* .total */
  "inherit", /* reserva */
  "inherit", /* reserva */
  "inherit", /* .zapati  */
  "inherit", /* .tableContainer */
  "inherit" /* reserva */
];

//
// selektory definovane pro tabulku 
var selektor = ["body", "table", "thead td, thead th", "tfoot td",
  ".bg0", ".bg1", ".bg2", ".bg3", ".bg4", ".bg5", ".podnik", ".sestava",
  ".header", ".r", ".total", ".reserva", ".reserva", ".zapati", ".tableContainer", "reserva"
];
var seltitle = ["Podkladov� barva", "Barva tabulky", "Z�hlav� tabulky", "Pati�ka tabulky",
  "Sou�et �rovn� 0", "Sou�et �rovn� 1", "Sou�et �rovn� 2", "Sou�et �rovn� 3", "Sou�et �rovn� 4", "Sou�et �rovn� 5", "Podnik, 1.��dka ", "N�zev sestavy.",
  "Z�hlav� tabulky", "reserva r", "Texty v sou�tech", "reserva", "reserva", ".zapati", "tableContainer", "reserva"
];

//
//  
/**
 * nastaveni seznamu styl� do pole links
 */
var links = new Array();
links = document.getElementsByTagName("link");

/**
 * N�zev z�kladn�ho pou��van�ho stylu
 */
var BASE = "BASE";

// ************  prace s oblasti a uzivatelem  **************
//

/**
 * nacti parametry url
 * @returns obj pole parametru vars
 * 
 */
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
/**
 * nacti globalni parametry
 */
function nactiGparams() {
  // naplni glob�ln�ch parametr� dle volani str�nky
  gparams = getUrlVars();
  goblast = gparams["obla"];
  if (goblast == undefined) goblast = "";
  guser = gparams["user"];
  if (guser == undefined) guser = "";
  gspz = gparams["spz"];
  if (gspz == undefined) gspz = "";
  console.log("goblast = ", goblast)
}


function gotoobla(sestava) {
  var url = sestava + '?obla=' + goblast;
  if (guser != "") url = url + '&user=' + guser;
  window.location = url;
}

function gotoURL(url) {
  // let url = document.getElementById("url").value;
  window.location = url;
}

function openURL(url) {
  //let url = document.getElementById("url").value;
  // window.location = url;
  console.log(`** openURL url=${url} `)
  let aPopUp = window.open(url, '_blank');
}

/**
 * otevre sestavu ve stejnem(aktualnim) okne
 * @param {*} sestava 
 */
function gotoSestava(sestava) {
  var url = sestava;
  window.location = url;
}
/**
 * Doplni k url sestavy oblast a user a p�ejde na nove URL
 */
function showobla(sestava) {
  var url = sestava + '&obla=' + goblast;
  if (guser != "") url = url + '&user=' + guser;
  window.location = url;
}

/**
 * prepnuti lokalizace - carka/tecka
 */
function zmenaloc() {
  if (confirm(lok[(kuk.ff.Dradio + 1) % 2] + " ? ")) {
    kuk.ff.Dradio = (kuk.ff.Dradio + 1) % 2;
    lokalizace.innerHTML = lok[kuk.ff.Dradio];
  };
}


// ************  scopenxml.xml  **************

/**
 * Otevre nove okno a zapise do nej dany text, nevhodn� proto�e okno se mus� otv�rat na p��kaz u�ivatele a ne
 * a� po Promise
 * @param {*} text 
 * @param {*} tvarokna 
 * @returns obj obj
 */
function openwin(text, tvarokna) {
  console.log("openwin() ", text);
  if (!tvarokna) {
    tvarokna = tvaroknaimp;
  }; // implicitni tvar okna       
  let aPopUp = window.open('', '_blank', tvarokna);
  let ndoc = aPopUp.document;
  ndoc.write(text);
  ndoc.close();
  aPopUp.focus();
  return;
}

function getError(errorObject) {
  var Error = new String;
  Error = "Chyba: " + errorObject.parseError.url + "<BR/>" +
    "��dek: " + errorObject.parseError.line + "<BR/>" +
    "Znak: " + errorObject.parseError.linepos + "<BR/>" +
    "Popis: " + errorObject.parseError.reason;
  return Error;
}

// 
//
function showxpost(XMLDATA, xslfile)
// posle pres httprequest definici sestavy a vracena data 
// zobrazi v okne
{
  if (document.getElementById("txgurl")) txgurl.value = 'showses.php?' + DejFiltry() + DejFiltry2();
  if (document.getElementById("txtype")) txtype.value = 'showxpost(); POST ';
  if (document.getElementById("txxsl")) txxsl.value = xslfile;
  // na�teme sestavu pomoc� AJAXu.
  ajax({
    // HERMES by mel cist z POST
    url: 'showses.php?' + DejFiltry() + DejFiltry2(),
    // typ prenosu
    typhttp: "POST",
    // typ vystupu
    typ: "xml",
    // data posilana POST
    datapost: XMLDATA.xml,
    // Tato funkce bude vol�na, jakmile po?adavek usp�je.
    onSuccess: function (dataXML) {
      var xslXmlView = openXML(xslfile);
      var result = "";
      try { // vysledek ztransformujem
        result = dataXML.transformNode(xslXmlView);
      } catch (e) {
        result = e.description;
      };
      openwin(result);
    }
  });
}

function storpost(XMLDATA, fname)
//  ulozeni XML DOM XMLDATA do souboru fname
{
  // pi = XMLDATA.createProcessingInstruction('xml', 'version="1.0"  encoding="Windows-1250" ');
  // XMLDATA.insertBefore(pi, XMLDATA.childNodes.item(0));
  // alert('STOR:' + XMLDATA.xml);
  // na�teme sestavu pomoc� AJAXu.
  ajax({
    // HERMES cte soubor z POST
    url: 'sendto.php?fname=' + fname,
    // typ prenosu
    typhttp: "POST",
    // typ vystupu
    typ: "xml",
    // data posilana POST
    datapost: XMLDATA.xml,
    // Tato funkce bude vol�na, jakmile po?adavek usp�je.
    onSuccess: function (dataXML) {
      //alert("Konec xml: " + dataXML.xml);
    }
  });
}
//
// ******************  sccookie.xml  ******************
// 
function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}
//
// -------------------  cookies Chrome ------------------------
//
/**
 * objekt pro praci s cookies
 */
var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) {
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

/**
 * Na�te cookie HTMLV v JSON a rozbal� do variable kuk 
 * @returns obj true/false
 */
function cticookie() {
  console.log("cticookie **Chrome**");
  // getActive.then(getCookie);
  let kukNacten = docCookies.getItem("HTMLV");
  if (kukNacten == null) return false;
  if (kukNacten.length != 0) {
    kuk = JSON.parse(kukNacten);
  }
  console.dir(kuk);
  return true;
};
/**
 * Nastav� kuk.ff. podle aktu�ln�ho stavu v�ech vstup� a zap�e JSON do cookie HTMLV
 */
function zapiscookies() {
  console.log("Zapiscookies 1");

  if (document.all["ooblasti"] != undefined) kuk.ff.oblast = ooblasti.selectedIndex;
  if (document.all["oridskup"] != undefined) kuk.ff.ridskup = oridskup.selectedIndex;
  if (document.all["oskupiny"] != undefined) kuk.ff.skupina = oskupiny.selectedIndex;
  if (document.all["opcas"] != undefined) kuk.ff.opcas = opcas.selectedIndex;
  if (document.all["ointerval"] != undefined) kuk.ff.ointerval = ointerval.value;
  if (document.all["dinterval"] != undefined) kuk.ff.dinterval = dinterval.value;
  if (document.all["autospz"] != undefined) kuk.ff.autospz = autospz.value;
  if (document.all["oridici"] != undefined) kuk.ff.oridici = oridici.value;
  kuk.ff.Vradio = getRadioIndex("V");
  kuk.ff.Cradio = getRadioIndex("C");
  kuk.ff.Rradio = getRadioIndex("R");
  //   
  JinyRok();
  JinyMes();
  if (document.all["jenob"] != undefined) {
    kuk.ff.Jenoblast = document.all["jenob"].checked;
  };
  if (document.all["kodp"] != undefined) {
    kuk.ff.Prepravce = document.all["kodp"].value;
  };
  if (document.all["kods"] != undefined) {
    kuk.ff.Substraty = document.all["kods"].value;
  };
  if (document.all["kodpp"] != undefined) {
    kuk.ff.Provpod = document.all["kodpp"].value;
  };
  if (document.all["kodr"] != undefined) {
    kuk.ff.Kodsazby = document.all["kodr"].value;
  };
  if (document.all["kodpr"] != undefined) {
    kuk.ff.Praczar = document.all["kodpr"].value;
  };
  if (document.all["kodpvp"] != undefined) {
    kuk.ff.Vlastnostipp = document.all["kodpvp"].value;
  };

  /* kuk.info     = info;
  kuk.ff       = ff;
  kuk.CooStyle = CooStyle;
  kuk.barvy    = barvy;
  kuk.barvy2   = barvy2;
  */
  console.dir(kuk);
  docCookies.setItem("HTMLV", JSON.stringify(kuk), Infinity);
}

function nastavDleCookies() {
  console.log("NastavDleCookies");
  console.dir(kuk);

  //if (document.all["ooblasti"] != undefined) {
  //  console.log("selecindex = ", kuk.ff.oblast);
  //  ooblasti.selectedIndex = kuk.ff.oblast;
  //  }
  // if (document.all["oridskup"] != undefined) oridskup.selectedIndex = kuk.ff.ridskup;
  // if (document.all["oskupiny"] != undefined) oskupiny.selectedIndex = kuk.ff.skupina;
  // if (document.all["opcas"] != undefined) opcas.selectedIndex = kuk.ff.opcas;
  if (document.all["ointerval"] != undefined) ointerval.value = kuk.ff.ointerval;
  if (document.all["dinterval"] != undefined) dinterval.value = kuk.ff.dinterval;
  if (document.all["C"] != undefined) document.all["C"][kuk.ff.Cradio].checked = true;
  if (document.all["V"] != undefined) document.all["V"][kuk.ff.Vradio].checked = true;
  if (document.all["R"] != undefined) document.all["R"][kuk.ff.Rradio].checked = true;

  if (document.all["vybrrok"] != undefined) vybrrok.selectedIndex = 1; //kuk.ff.CooRok - 1999;
  if (document.all["vybrmes"] != undefined) vybrmes.selectedIndex = kuk.ff.CooMes - 1;
  if (document.all["jenob"] != undefined) jenob.checked = kuk.ff.Jenoblast;
  //  ??? ff.Jenoblast  =  what.ff.Jenoblast;

  if (document.all["autospz"] != undefined) autospz.value = kuk.ff.autospz;
  if (document.all["oridici"] != undefined) oridici.value = kuk.ff.oridici;
  // ???  ff.Dradio               =  what.ff.Dradio;
  //  jsou-li filtry na strance definovany - ulozime je 
  if (document.all["kodp"] != undefined) {
    document.all["kodp"].value = kuk.ff.Prepravce
  };

  if (document.all["kods"] != undefined) {
    document.all["kods"].value = kuk.ff.Substraty
  };

  if (document.all["kodpp"] != undefined) {
    document.all["kodpp"].value = kuk.ff.Provpod
  };

  if (document.all["kodr"] != undefined) {
    document.all["kodr"].value = kuk.ff.Kodsazby
  };

  if (document.all["kodpr"] != undefined) {
    document.all["kodpr"].value = kuk.ff.Praczar
  };
  if (document.all["kodpvp"] != undefined) {
    document.all["kodpvp"].value = kuk.ff.Vlastnostipp
  };
  // styly
  CooStyle = kuk.CooStyle;
  barvy = kuk.barvy;
  barvy2 = kuk.barvy2;

};
/**
 * index vybraneho radio-butonu pro ulo�en� do cookies
 * @param {*} name jmeno radioelementu ()
 * @returns obj index nastaveneho radio-butonu
 */
function getRadioIndex(name) {
  let ele = document.getElementsByName(name);
  let radio = 0;
  if (ele != undefined) {
    for (let i = 0; i < ele.length; i++) // pres cely radiobutton
      if (ele[i].checked) radio = i;
  }
  console.log("getRadioIndex Vradio =  " + radio);
  return radio;
}

// ************  sccontext.xml  **************
//
function ContextMenu() {
  console.log("CONTEXT MENU ")
  var lefter = window.event.x;
  var topper = window.event.y;
  //  alert('Kontext ' + lefter +'  '+topper);
  oContextHTML.style.top = topper - 10;
  oContextHTML.style.left = lefter - 10;
  oContextHTML.style.display = "block";
  return false
  // oPopup.document.body.innerHTML = oContextHTML.innerHTML; 
  //This popup is displayed relative to the body of the document.
  // oPopup.show(topper, lefter, 200, 85, document.body);
}

function hideMenu() {
  console.log('Hide Kontext ');
  oContextHTML.style.display = "none";
  return false
}

function hideMenuSpz() {
  console.log('Hide Kontext SPZ ');
  oSelectSpz.style.display = "none";
  return false
}

var ZadejRZ = "!! Zadejte RZ. !! ";

// ************  scinit1.xml 2012-06-15 11:20 **************
var gurl = 'globalni url pro volani sestav '; // ???? mo�n� se vol� v�ce sestav ???
var skupiny;
var statusx;
var strediska;
var casy;
var auta;

var skupinysrc = "/gskupiny.php";
var statusxsrc = "/status.xml";
var strediskasrc = "/data/XML/stredisk.xml";
var casysrc = "/CasTypy.xml";
var autasrc = "/showses.php?defses=dsestav/katvozvyber.xml";
var ridicisrc = "/showses.php?defses=dsestav/katridvyber.xml";
// format chybove zpravy:
var hermessagexsl = '/hermessage.xsl';
//
function getValueById(stringId, stringNazev) {
  // z�skan� konkr�tn�ho elementu, kde id=stringId
  console.log(`getValueById(${stringId}, ${stringNazev})`);
  let element = document.getElementById(stringId);
  if (element) {
    console.dir(element);
    let val = element.value;
    if (val != '')
      return stringNazev + '=' + escaped(val);
  }
  return '';
}

function getRadioPrvek(nazevr, nazevp)
// vrati parametr pro URL podle nastaveni radiobuttonu
{
  var radioObj = document.all[nazevr];
  if (!radioObj)
    return "";
  var radioLength = radioObj.length;
  if (radioLength == undefined)
    if (radioObj.checked)
      return '&' + nazevp + '=' + radioObj.value;
    else
      return "";
  for (var i = 0; i < radioLength; i++) {
    if (radioObj[i].checked) {
      return '&' + nazevp + '=' + radioObj[i].value;
    }
  }
  return "";
}

/**
 * Vr�t� hledany seznam nod�
 */
function selectSingleNode(xml, xpath)
{
  let nodes = xml.evaluate(xpath, xml, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  console.log("selectSingleNode " + xpath);
  console.dirxml(nodes);  /*
   var thisNode = nodes.iterateNext();
   while (thisNode) {
      console.log( thisNode.textContent );
      thisNode = nodes.iterateNext();
   }
   */
  return nodes;
}

/**
 * 
 * @param {*} CooRok 
 * @returns obj 
 */
function nactiroky(CooRok) {
  if (document.getElementById("vybrrok") == undefined) return;
  var today = new Date();
  var actrok = today.getFullYear();
  var lastindex = vybrrok.length;
  var lastrok = Number(vybrrok[vybrrok.length - 1].text);
  for (let i = lastrok; i <= actrok; i++) {
    lastrok++;
    vybrrok.options[vybrrok.length] = new Option(lastrok, lastrok);
  }
  for (let i = 0; i < vybrrok.length; i++) {
    if (vybrrok[i].text == CooRok) vybrrok.selectedIndex = i;
  }
  console.log("nactiroky " + vybrrok.selectedItem);
}

/**
 * !!! openXML ??? na�te �idi�e ze sestavy katridvyber.xml 
 */
function nactiridice() {
  var ses = ridicisrc + '&time=21'; // epocha DMD;
  if (guser != "") ses = ses + '&user=' + guser;

  // var xmlDoc = openXML(ses);
  // na�ten� ridicu do globalu "cridici"
  cridici = xmlDoc.selectSingleNode("//DATA");
  if (cridici == null) {
    alert('Nelze na��st seznam �idi�� ! \n Pro u?ivatele : ' + guser + '\n' + ses);
  }
}

/**
 * !!! nahrazuje escape() nekoduje �esk� znaky
 * 
 * @param {*} s 
 * @returns obj 
 */
function escaped(s)
// nahrazuje escape() nekoduje �esk� znaky
{
  var re = / /g;
  return s.replace(re, '%20');
}

/**
 * vraci parametr filtry ve tvaru pro URL
 * dle vybran�ch skupin 
 * @returns obj 
 */
function pfiltry() {
  var skupina = '';
  if (oskupiny.selectedIndex > 0) // prvn� skupina je -- nevybr�no --
    skupina =
    '&filtry=' + escaped(oskupiny.item(oskupiny.selectedIndex).text) + '&fvoz=2';
  if (ooblasti.selectedIndex > 0) {
    skupina = '&obla=' + escaped(ooblasti.item(ooblasti.selectedIndex).text) + skupina;
  }
  return skupina;
}
/**
 * Vyplneni select pro vyber radek stazek
 * @returns obj 
 */
function fetchvyvyb() {
  console.log("** fetchvyvyb START");
  let svysrc = '/showses.php?defses=dsestav/tablesvyvyb.xml';
  if (document.getElementById("opsvy") == undefined) return;
  ckodyRad = []; // globalni seznam kodu radek

  fetch(svysrc)
    .then(response => {
      if (response.status != 200) {
        console.log(`Nelze na��st :: ${svysrc} : ${response.statusText}`);
        throw 'cancel';
      }
      return response.arrayBuffer()
    })
    .then(data => {
      console.log('fetchvyvyb =' + data) // Prints result 
      const decoder = new TextDecoder('Windows-1250');
      const text = decoder.decode(data);
      let xmlDocc = new DOMParser().parseFromString(text, 'application/xml');
      console.dirxml(xmlDocc);

      // test zda je to chybova zprava  ????? tenhle test nefunguje !!!! kdyz je chyba 404
      let pp = selectSingleNode(xmlDocc, "//MESSAGES/INFO").iterateNext();
      if (pp) {
        console.log("chybova zprava ? " + pp.textContent);
        // je to chybova zprava
        showMessage(xmlDocc," in fetchvyvyb()");
        //showErrText(svysrc," in fetchvyvyb()");
        return;
      };

      if (xmlDocc == null) return;
      //
      var ccc = selectSingleNode(xmlDocc, "//DATA").iterateNext();
      for (let i = 0; i < ccc.childNodes.length; i++) {
        let nodesloup = ccc.children.item(i);
        let kod = nodesloup.getElementsByTagName("H")[0].innerHTML.replace(/ /g, "");
        console.log("fetchvyvyb kod = >" + kod + "<");
        ckodyRad.push(kod);
        newOpt = document.createElement("OPTION");
        newOpt.text = `${kod}: ${nodesloup.getElementsByTagName("H")[1].innerHTML}`;
        opsvy.add(newOpt, i + 1);
      };
    })
    .catch(function (err) {
      console.log('!!! fetch_vyvyb error : ', err);
    });
}

//
/**
 * nasklada do options volby z xml nody
 * @param {*} nody 
 * @param {*} options ID of HTML node select
 * @param {*} selected index of selected option
 * @returns obj 
 */
function ulozSeznam(nody, options, selected) {
  if (selected == -1) return;
  try {
    console.log("ulozseznam " + options);
    // console.dir(nody);
    var op = document.getElementById(options);
    var thisNode = nody.iterateNext();
    var i = 1;
    while (thisNode) {
      // console.log("C* thisNode = " + thisNode.textContent );
      newOpt = document.createElement("OPTION");
      //  newOpt.text = thisNode.firstChild.textContent;
      newOpt.text = thisNode.firstChild.innerHTML;
      op.add(newOpt, i + 1)
      i++;
      thisNode = nody.iterateNext();
    }
  } catch (e) {
    alert('Chyba na�teni gskupiny.php : ' + e);
  };

  console.log("KONEC ulozSeznam " + selected);
  console.dir(op);
  op.selectedIndex = selected;

}

/**
 * nacteme casy ze souboru CasTypy.xml pomoci fetch.
 * @param {*} cookie 
 * @returns obj 
 */
function fetchcasy(cookie) {
  console.log("Nacti casy pres fetch  " + cookie);
  if (document.getElementById("opcas") == undefined) return;
  fetch(casysrc)
    .then(response => response.arrayBuffer())
    .then(data => {
      console.log('DATA NACTICASY =' + data) // Prints result 
      const decoder = new TextDecoder('Windows-1250');
      const text = decoder.decode(data);
      let responseDoc = new DOMParser().parseFromString(text, 'application/xml');
      console.dir(responseDoc);
      //
      console.log("CAS = " + responseDoc.getElementsByTagName('CAS')[0].textContent)
      let ccc = selectSingleNode(responseDoc, "//TABLE/CAS");
      ulozSeznam(ccc, "opcas", cookie);
    })
    .catch(function (err) {
      console.log('!!! fetch_casy error : ', err);
    });

}

/**
 * Nacte skupiny, oblasti a skupiny ridicu 
 * @param {*} sk 
 * @param {*} obl 
 * @param {*} rid 
 */
function fetchSkupinyOblasti(sk, obl, rid) {
  console.log("Fetch Skupiny Oblasti  sk=" + sk + "  obl=" + obl + "  rid=" + rid);
  // na�teme skupiny oblasti pomoc� fetch.
  fetch(skupinysrc)
    .then(response => response.arrayBuffer())
    .then(data => {
      // console.log('DATA SkupinyOblasti =' + data) // Prints result 
      const decoder = new TextDecoder('Windows-1250');
      const text = decoder.decode(data);
      let responseDoc = new DOMParser().parseFromString(text, 'application/xml');
      //  console.dir(responseDoc);
      let ccc = selectSingleNode(responseDoc, "//SKUPINY/SKUPINA");
      ulozSeznam(ccc, "oskupiny", sk);
      ccc = selectSingleNode(responseDoc, "//OBLASTI/SKUPINA");
      ulozSeznam(ccc, "ooblasti", obl);
      ccc = selectSingleNode(responseDoc, "//SKUPINYRIDICU/SKUPINA");
      ulozSeznam(ccc, "oridskup", rid);

    })
    .catch(function (err) {
      console.log('Nacti SkupinyOblasti error : ', err);
    });
}

function nactiSkupinyOblastiPUV(sk, obl, rid) {
  console.log("NactiSkupinyOblasti !!! NEPOUZIVAT !!!  ? " + skupinysrc);

  // xmlDocc=openXML(skupinysrc);
  // na�teme skupiny a oblasti pomoc� AJAXu.
  ajax({
    url: skupinysrc,
    typhttp: "GET",
    // typ vystupu
    typ: "xml",
    // Tato funkce bude vol�na, jakmile pozadavek usp�je.
    onSuccess: function (dataXML) {
      let ccc = selectSingleNode(dataXML, "//SKUPINY/SKUPINA");
      ulozSeznam(ccc, "oskupiny", 1);
      ccc = selectSingleNode(dataXML, "//OBLASTI/SKUPINA");
      ulozSeznam(ccc, "ooblasti", 1);
      ccc = selectSingleNode(dataXML, "//SKUPINYRIDICU/SKUPINA");
      ulozSeznam(ccc, "oridskup", 1);

    }
  });
  return;
  //***************  !!!!!!!!!   *******************
  var ccc = xmlDocc.selectSingleNode("//SKUPINY");
  if (sk) {
    if (ccc) {
      if (ccc.childNodes.length <= 0) {
        document.getElementById("skvozidel").style.display = 'none';
      } else
        for (var i = 0; i < ccc.childNodes.length; i++) {
          var sk = ccc.childNodes.item(i);
          var nazev = sk.selectSingleNode("NAZEV").text;
          var newOpt = document.createElement("OPTION");
          newOpt.text = nazev;
          document.getElementById("oskupiny").add(newOpt, i + 1)
        };
    };
  };
  // na�ten� oblast�

  if (obl) {
    ccc = xmlDocc.selectSingleNode("//OBLASTI");
    if (ccc) {
      if (ccc.childNodes.length <= 0) {
        document.getElementById("ooblasti").style.display = 'none';
      } else {
        for (var i = 0; i < ccc.childNodes.length; i++) {
          var sk = ccc.childNodes.item(i);
          var nazev = sk.selectSingleNode("NAZEV").text;
          var newOpt = document.createElement("OPTION");
          newOpt.text = nazev;
          document.getElementById("ooblasti").add(newOpt, i + 1)
        };
      }
    };
  };


  if (rid) {
    ccc = xmlDocc.selectSingleNode("//SKUPINYRIDICU");
    if (ccc) {
      if (ccc.childNodes.length <= 0) {
        document.getElementById("skridicu").style.display = 'none';
      } else
        for (var i = 0; i < ccc.childNodes.length; i++) {
          var sk = ccc.childNodes.item(i);
          var nazev = sk.selectSingleNode("NAZEV").text;
          var newOpt = document.createElement("OPTION");
          newOpt.text = nazev;
          document.getElementById("oridskup").add(newOpt, i + 1)
        };
    };
  };
}


function selectedSpz() {
  console.log("select SPZ");
  let spz = "";
  let checkboxes = document.getElementsByName("cpz");
  let numberOfCheckedItems = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked)
      spz = spz + checkboxes[i].value + ",";
  }
  document.getElementById("autospz").value = spz;
  hideMenuSpz();
}

function vratrid(rid) {
  document.getElementById("oridici").value = rid;
}

function vyberkod() {
  let index = opsvy.selectedIndex;
  let ele = document.getElementsByName('kodrad');
  ele[0].value = opsvy.options[index].text;
};

function zobrazauto() {
  var spz = autospz.value;
  var oblast = '';
  // pridame oblast, pokud je nejaka vybr�na
  if (document.getElementById("ooblasti").selectedIndex > 0)
    oblast = escaped(document.getElementById("ooblasti").item(document.getElementById("ooblasti").selectedIndex).text);
  else
    oblast = goblast;
  if (spz == '') {
    alert(ZadejRZ);
    return;
  }
  var url = '/VozPodr.html?spz=' + spz;
  if (guser != "") url = url + '&user=' + guser;
  if (oblast != "") url = url + '&obla=' + oblast;

  aPopUp = window.open(url, 'Auto_detail', tvaroknaimp);
  if (aPopUp) aPopUp.focus();
  return;
};
/**
 * Zobrazi oSelectSpz pro vyber vozidla, pokud seznam vozidel
 * jeste nebyl nahran, nacte autasrc a vytvori sspz a zobrazi
 * @param {*} none 
 */
function vyberauto() {
  if (spzNahrano) {
    oSelectSpz.style.display = "block";
    return;
  };
  let url = autasrc + '&time=21'; // epocha DMD
  if (guser != "") url = url + '&user=' + guser;

  fetch(url)
    .then(response => response.arrayBuffer())
    .then(xml => {
      const decoder = new TextDecoder('Windows-1250');
      const text = decoder.decode(xml);
      let responseDoc = new DOMParser().parseFromString(text, 'application/xml');
      console.dirxml(responseDoc);
      // test zda je to chybova zprava  ????? tenhle test nefunguje !!!! kdyz je chyba 404
      let pp = selectSingleNode(responseDoc, "//MESSAGES/INFO").iterateNext();
      console.dir(responseDoc);
      if (pp) {
        console.log("chybova zprava ? " + pp.textContent);
        // je to chybova zprava
        // showErrText(pp.textContent)
        showMessage(responseDoc," in vyberauto()");
        return;
      };
      // test zda je to vubec sestava
      pp = selectSingleNode(responseDoc, "/SHOWX/ORIGIN/XSLFILE").iterateNext();

      if (pp == null) {
        return 'Nen� na�tena spr�vn� definice sestavy !!   ::  ' + responseDoc;
      };
      var ss = ' ';
      let nodes = selectSingleNode(responseDoc, "//TABLE/DATA/R/H[3]");
      let rr = nodes.iterateNext();
      let nazev = "NIC";
      let i = 0;
      while (rr) {
        nazev = rr.textContent;
        rr = nodes.iterateNext();
        ss = ss + '<label>' + nazev + '<input type="checkbox" name="cpz" value="' + nazev + '" > </label>';
      };
      ss = ss + ' ';
      sspz.innerHTML = ss;
      spzNahrano = true;
      oSelectSpz.style.display = "block";
      return;
    });

  // konverze do html ????????
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}

/**
 * vybere auto ze seznamu 
 * @returns obj 
 */
function vyberautoNewWindow() {
  let url = autasrc + '&time=21'; // epocha DMD
  if (guser != "") url = url + '&user=' + guser;

  fetchSes(url)
    .then(xml => {
      console.log("VYBERAUTO then fetchSes " + xml);
      let responseDoc = new DOMParser().parseFromString(xml, 'application/xml');
      console.dirxml(responseDoc);
      // test zda je to chybova zprava  ????? tenhle test nefunguje !!!! kdyz je chyba 404
      let pp = selectSingleNode(responseDoc, "//MESSAGES/INFO").iterateNext();
      console.dir(responseDoc);
      if (pp) {
        console.log("chybova zprava ? " + pp.textContent);
        // je to chybova zprava
        // showErrText(pp.textContent)
        showMessage(responseDoc," in vyberautoNew()");
        return;
      };
      // test zda je to vubec sestava
      pp = selectSingleNode(responseDoc, "/SHOWX/ORIGIN/XSLFILE").iterateNext();

      if (pp == null) {
        return 'Nen� na�tena spr�vn� definice sestavy !!   ::  ' + responseDoc;
      };
      aPopUp = window.open('Vyber_vozidla', '_blank');
      ndoc = aPopUp.document;
      // ndoc.write((new XMLSerializer()).serializeToString(responseDoc));
      var ss = '<html><head><title>Vyber vozidlo</title></head>';
      ss = ss + '<style type=text/css>';
      ss = ss + 'BODY {FONT-FAMILY: Arial CE,Helvetica CE,Arial,Helvetica, sans-serif;BackGround-color:e2ffe6; }';
      ss = ss + 'A {float:left;background-color: papayawhip; border:1px solid #000;';
      ss = ss + 'padding: 2px 2px 2px 1px; margin: 1px 1px 1px 1px; width : 120px;height:20px;}';
      ss = ss + 'table {table-LAYOUT:fixed; border-collapse:collapse;';
      ss = ss + 'margin-left: 10pt;margin-right: 10pt}';
      ss = ss + '</style>';
      ss = ss + ' ';
      ss = ss + '<body bgcolor="Silver"> <table cellpadding="2" >';
      // ss = ss + '<THEAD><tr><td>----------</td><td>----------</td><td>----------</td><td>----------</td><td>----------</td></tr></THEAD>
      ss = ss + '<TBODY><tr>';


      let nodes = selectSingleNode(responseDoc, "//TABLE/DATA/R/H[3]");
      let rr = nodes.iterateNext();
      let nazev = "NIC";
      let i = 0;
      while (rr) {
        nazev = rr.textContent;
        rr = nodes.iterateNext();
        ss = ss + '<td><a href="javascript:window.opener.vrat(\'' + nazev + '\');window.opener.focus();">' + nazev + '</a></td>';
        if (((i + 1) % 5) == 0) {
          ss = ss + '</tr><tr>';
        }
        i++;
      };
      ss = ss + '</tr></TBODY> </table> </body> </html>';
      ndoc.write(ss);
      ndoc.close();
      if (aPopUp) aPopUp.focus();
      return;
    });

  // konverze do html ????????
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}

/**
 * ?? 
 * Zobrazi v novem okne vyber ridice
 */
function vyberridice() {
  if (pickRidice != null) {
    if (pickRidice.closed) {
      pickRidice = null;
    }
  };

  if (pickRidice == null) { // dosud nevytvorene okno nebo nepristupne 
    pickRidice = window.open('', '_blank',
      'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=440,height=160');

    ndoc = pickRidice.document;
    ndoc.close();
    ndoc.open();
    ndoc.write('V�b�r �idi�e .....');
    if (cridici === null) {
      nactiridice()
    }
    var ss = '<html><head><title>Vyber ridice</title></head>';
    ss = ss + '<style type=text/css>';
    ss = ss + 'A {COLOR: #f60; float:left;background:#ffc; border:1px solid #000;';
    ss = ss + 'padding: 2px 2px 2px 1px; margin: 1px 1px 1px 1px; width : 190px;height:20px;}';
    ss = ss + '</style>';
    ss = ss + ' ';
    ss = ss + '<BODY bgcolor="Silver"><div>';

    if (cridici) {
      for (var i = 0; i < cridici.childNodes.length; i++) { // pres vsechny Radky
        var sk = cridici.childNodes.item(i);
        var nazev = sk.selectSingleNode("H[3]").text;
        ss = ss + '<a href="javascript:window.opener.vratrid(\'' + nazev + '\');">' + nazev + '</a>';
      };
    };
    ss = ss + '</div></BODY></HTML>';
    ndoc.write(ss);
  }; // konec if (pckRidice==null)
  pickRidice.focus();
}

/**
 * 
 * @returns obj 
 */
function zobrazridice() {
  var jmeno = oridici.value;
  var oblast = '';
  // pridame oblast, pokud je nejaka vybr�na
  if (document.getElementById("ooblasti").selectedIndex > 0)
    oblast = escaped(document.getElementById("ooblasti").item(document.getElementById("ooblasti").selectedIndex).text);
  else
    oblast = goblast;
  if (jmeno == '') {
    alert("!! Zadejte jm�no �idi�e. !!");
    return;
  }
  var url = '/RidPodr.html?spz=' + jmeno;
  if (guser != "") url = url + '&user=' + guser;
  if (oblast != "") url = url + '&obla=' + oblast;

  aPopUp = window.open(url, 'Ridic_detail', tvaroknaimp);
  if (aPopUp) aPopUp.focus();
  return;
}

/**
 * sebere nastavene filtry: na auta = v�echna, jedno, skupina a na ridice 
 * �asov� filter = m�s�c, obdob� , �asov� �sek
 * @returns obj 
 */
function DejFiltry() {
  console.log("**DejFiltry**");
  // priznak pro lokalizaci desetinne tecky/carky
  var local = '&local=' + kuk.ff.Dradio;
  // ------------- filtry na auta -------------- 
  var vozf = '';
  // pouze je-li  filter na vozidla
  if (document.getElementById("Vfilter")) {
    if (document.all["V"][1].checked) {
      if (document.getElementById("oskupiny").selectedIndex > 0) // prvn� skupina je nevybr�no 
        vozf =
        '&filtry=' + escaped(document.getElementById("oskupiny").item(oskupiny.selectedIndex).text) + '&fvoz=2';
    }
    if (document.all["V"][2].checked) {
      vozf = '&filtry=' + escaped(document.getElementById("autospz").value) + '&fvoz=1';
    }

    try {
      if (document.getElementById("orgzv").value != '') {
        vozf += '&str=' + escaped(document.getElementById("orgzv").value);
      }
    } catch (ex) {}
  }

  // --------------- casove filtry ----------------
  // implicitne nastaveny mesic / rok
  JinyMes();
  JinyRok();
  var casf = '&time=19' + '&mesic=' + kuk.ff.CooMes + '&rok=' + kuk.ff.CooRok;
  if (document.all["C"][1].checked) // zadany interval
  {
    var time = document.getElementById("opcas").selectedIndex;
    var oddata = '';
    var dodata = '';
    time = 0;
    if (document.getElementById("ointerval").value == '') {
      alert('Nen� zad�n �asov� interval !  return;    ');
    } else {
      let odi = document.getElementById("ointerval").value.split('-');
      let doi = document.getElementById("dinterval").value.split('-');
      console.log("DATUM OD 1 = ", odi);
      casf = '&od=' + odi[2] + '.' + odi[1] + '.' + odi[0] + '&do=' + doi[2] + '.' + doi[1] + '.' + doi[0] + '&time=' + time;
    }
  };
  if (document.all["C"][2].checked) // jiny vybrany interval
  {
    var time = document.getElementById("opcas").selectedIndex;
    var oddata = '';
    var dodata = '';
    console.log("DATUM OD time  = ", time);
    if (time == 0) {
      if (document.getElementById("ointerval").value == '') {
        alert('Nen� zad�n �asov� interval !  return;    ');
      } else {
        let odi = document.getElementById("ointerval").value.split('-');
        let doi = document.getElementById("dinterval").value.split('-');
        console.log("DATUM OD 2 = ", odi);
        casf = '&od=' + odi[2] + '.' + odi[1] + '.' + odi[0] + '&do=' + doi[2] + '.' + doi[1] + '.' + doi[0] + '&time=' + time;
      }
    } else {
      casf = '&time=' + time;
    }
  }
  // -------------  filtry �idi�� ---------------------
  //    pouze je-li  filter na ridice na strance
  if (document.getElementById("Rfilter")) {
    let radioR = document.getElementsByName("R");
    if (radioR[0].checked) vozf += '';
    if (radioR[1].checked) {
      if (document.getElementById("oridskup").selectedIndex > 0) // prvn� skupina je nevybr�no 
        vozf +=
        '&filtryr=' + escaped(document.getElementById("oridskup").item(oridskup.selectedIndex).text) + '&frid=2';
    };
    if (radioR[2].checked){
      vozf += getValueById('oridici', '&frid=1&filtryr');
      console.log("radioR2 "+vozf);
      }
  }
  // ------ pridame oblast pokud je vybrana -----------
  if (document.getElementById("ooblasti").selectedIndex > 0) { // prvn� skupina je -- nevybr�no --
    vozf +=
      '&obla=' + escaped(document.getElementById("ooblasti").item(document.getElementById("ooblasti").selectedIndex).text);
  }
  if (guser != "") vozf = vozf + '&user=' + guser;
  console.log("**** oblast,user =  ", vozf);
  // Filtry viditelnosti a za�azen� �innosti
  vozf += getRadioPrvek("rvv", "vv");
  vozf += getRadioPrvek("rvp", "vp");
  vozf += getRadioPrvek("rvr", "vr");
  vozf += getRadioPrvek("rvt", "vt");
  vozf += getRadioPrvek("rvo", "vo");

  vozf += getRadioPrvek("rzv", "zv");
  vozf += getRadioPrvek("rzp", "zp");
  vozf += getRadioPrvek("rzr", "zr");
  vozf += getRadioPrvek("rzt", "zt");
  vozf += getRadioPrvek("rzo", "zo");

  gcasf = casf;
  return casf + vozf + local;
}

/**
 * sebere nastavene filtry v druhe skupine filtru - kody, PP atd.
 * @returns obj 
 */
function DejFiltry2() {
  console.log("**DejFiltry2()**");
  // pridame kodradky , pokud je uveden
  let index = 0;
  let kodf = '';
  let kod = '';
  if (document.getElementById("opsvy")) {
    index = opsvy.selectedIndex;
    kod = ckodyRad[index];
    if (index !== 0) kodf = '&filtryk=' + ckodyRad[index - 1];
  }
  // pridame kod substratu , pokud je uveden
  let kodsub = getValueById('kods', '&filtrys');
  // pridame kod pracovn�ho za�azen� �idi�e , pokud je uveden
  let kodprac = getValueById('kodpr', '&filtrypz');
  // pridame kod provoznich podminek , pokud jsou uvedeny
  let kodprov = getValueById('kodpp', '&filtrypp');
  // pridame filter objednatele , pokud je uveden
  let kodo = getValueById('kodp', '&fobj=1&filtryo');

  console.log("**DejFiltry2() = " + kodf + kodsub + kodo + kodprac + kodprov);
  //  vratime pripravene filtry
  return kodf + kodsub + kodo + kodprac + kodprov;
}


/**
 * konverze chybove zpravy z Herma do html
 * @param {*} xml 
 * @returns obj 
 */
function hermessage(xml) {
  console.log("CHYBA Hermesmsg ", xml);
  var xsl = openMSXML();
  if (!xsl.load(hermessagexsl)) {
    return ("Nelze naj�t stylesheet : /hermessage.xsl  \n " + xsl.parseError.reason);
  }
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}

/**
 * vrati string sestavy, kterou lze zapsat do ok�nka
 * sestava je tvorena podle sesxsl s parametrem str
 * @param {*} sestava 
 * @param {*} sesxsl 
 * @param {*} str 
 * @returns obj 
 */
function konvertses(sestava, sesxsl, str) {
  var url = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  var xml = openMSXML();

  if (!xml.load(url)) {
    return ("Nelze naj�t definici sestavy : " + url + " \n" + xml.parseError.reason);
  }
  if (xml.parseError.errorCode != 0) {
    return ("Nelze na��st sestavu : " + url + " \n" + xml.parseError.reason +
      xml.parseError.srctext);
  }
  // test zda je to vubec sestava 
  var pp = xml.selectSingleNode("//PARAMS")
  if (pp == null) {
    return ("Nen� na�tena spr�vn� definice sestavy !! " + xml.xml);
  }
  var xsl = openMSXML();
  if (!xsl.load(sesxsl)) {
    return ("Nelze naj�t stylesheet : " + sesxsl + " \n" + xsl.parseError.reason);
  }
  // v parametru "str" je filter na st�edisko nebo ridice apod.
  var pp = xml.selectSingleNode("//PARAMS")
  if (pp == null) {
    return ("Nen� na�tena spr�vn� definice sestavy !! " + sestava);
  }
  pp.text = str; // parametr str     

  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}
/**
 * zmena vektoru barev podle nastaveni 
 * @param {*} s 
 * @returns obj 
 */
function zmenaBarev(s) {
  var r = '';
  for (var i = 0; i < selektor.length; i++) {
    r = r + selektor[i] + '{background-color:' + barvy[i] + '; color: ' + barvy2[i] + ';}\n';
  }
  return r;
}

/**
 * otevre xsl a zmeni v nem barvy pokud v nem je style s id=barvy
 * podle nastaveni v array barvy a barvy2
 * @param {*} zmenaxsl 
 * @returns obj 
 */
function xslZmenaBarev(zmenaxsl) {
  var xsl = openMSXML();
  // doplneni namespace kvuli hledani v xsl
  xsl.setProperty("SelectionLanguage", "XPath");
  xsl.setProperty("SelectionNamespaces",
    "xmlns:xsl='http://www.w3.org/1999/XSL/Transform' xmlns:def='http://www.w3.org/TR/REC-html40'")
  if (!xsl.load(zmenaxsl)) {
    return ("Nelze naj�t stylesheet : " + zmenaxsl + " \n" + xsl.parseError.reason);
  }
  //
  // doplneni barevneho schematu do xsl:
  // vyhledame definici stylu, ktera obsahuje definici barev
  var style = xsl.selectSingleNode("//def:style[@id='barvy']");
  if (style != null) {
    // zmena barev dle vektoru barev
    style.text = zmenaBarev(style.text);
  }
  return xsl;
}

/**
 * 
 * @param {*} url 
 * @returns obj 
 */
async function fetchSes(url) {
  console.log("fetchSes url = ", url);
  let response = await fetch(url);
  let data = await response.text();
  return data;
}

/**
 * zavola Herma url a vrati sestavu vcetne filtru, je-li zmenaxsl vyplneno pouzije se jiny
 * xsl nez je uveden v sestave.
 * uprava na fetch  26.2.2020
 * @param {*} url 
 * @param {*} zmenaxsl 
 * @returns obj nic
 */
function dejses(url, zmenaxsl) {
  console.log("dejses -> fetchSes(url): ", url);
  fetchSes(url)
    .then(xml => {
      console.log("PO AWAIT fetchSes \n " /* + xml*/ );
      let responseDoc = new DOMParser().parseFromString(xml, 'application/xml');
      console.dir(responseDoc);
      // test zda je to chybova zprava
      let pp = selectSingleNode(responseDoc, "/MESSAGES/INFO").iterateNext();
      console.log("Chybov� zpr�va ? MESSAGES/INFO = " + pp);
      if (pp) {
        console.log("Chybov� zpr�va : " + pp.textContent);
        // je to chybova zprava
        // showErrText(pp.textContent)
        showMessage(responseDoc," in dejses()");
        return; // hermessage(responseDoc);
      };
      // test zda je to vubec sestava
      pp = selectSingleNode(responseDoc, "/SHOWX/ORIGIN/XSLFILE").iterateNext();
      console.log("Je to v�bec sestava ? /SHOWX/ORIGIN/XSLFILE = " + pp);
      if (pp == null) {
        console.log("!! Nen� na�tena spr�vn� definice sestavy    ::  " + responseDoc);
        return 'Nen� na�tena spr�vn� definice sestavy !!   ::  ' + responseDoc;
      };
      if (zmenaxsl == null) zmenaxsl = pp.textContent;
      console.log("zmenaxsl = " + pp.textContent);
      if (document.getElementById("txxsl")) txxsl.value = zmenaxsl;
      // konverze do html 
      // window.open(URL, name, specs, replace)
      // console.log("dejses: xml = \n", xml);
      openwin(xml);
      //let aPopUp = window.open('', '_blank');
      //console.dir(aPopUp);
      //let ndoc = aPopUp.document;
      // ndoc.close();
      // ndoc.open();
      // ndoc.write(responseDoc);
      // ndoc.write(xml);
      // ndoc.close();
      // if (aPopUp) aPopUp.focus();
      return;

    });
  return "Nazdar";

  // konverze do html 
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
};

function dejsesPUVODNI(url, zmenaxsl)
// zavola Herma a vrati sestavu vcetne filtru, je-li zmenaxsl vyplneno pouzije se jiny
// xsl nez je uveden v sestave.
{
  var xml = openMSXML();
  if (!xml.load(url)) {
    return ("<br/>Nelze naj�t definici sestavy : <br/>" + url + "<br/>" + xml.parseError.reason) +
      "<a href=\"" + url + "\" >PODROBNOSTI</a>";
  }
  if (xml.parseError.errorCode != 0) {
    return ("Nelze na��st sestavu : " + url + " \n" + xml.parseError.reason +
      xml.parseError.srctext);
  }
  // test zda je to chybova zprava
  var pp = xml.selectSingleNode("/MESSAGES/INFO")
  if (pp) {
    // je to chybova zprava
    return hermessage(xml);
  };
  // test zda je to vubec sestava
  var pp = xml.selectSingleNode("/SHOWX/ORIGIN/XSLFILE")
  if (pp == null) {
    return 'Nen� na�tena spr�vn� definice sestavy !!   ::  ' + xml.xml;
  };
  if (zmenaxsl == null) zmenaxsl = pp.text;
  if (document.getElementById("txxsl")) txxsl.value = zmenaxsl;
  // zmena barev dle nastaveni v cookies (barvy a barvy2)
  var xsl = xslZmenaBarev(zmenaxsl);
  // konverze do html 
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}
/**
 * 
 * @param {*} url definice sestavy - kompletn� cesta
 * @param {*} xsl 
 * @returns obj text/chybu v HTML kodu
 */
function dejsesdoexpco(url, xsl)
// zavola Herma a vrati sestavu 
{
  var xml = openMSXML();
  if (!xml.load(url)) {
    return ("<br/>Nelze naj�t definici sestavy : <br/>" + url + "<br/>" + xml.parseError.reason) +
      "<a href=\"" + url + "\" >PODROBNOSTI</a>";
  }
  if (xml.parseError.errorCode != 0) {
    return ("Nelze na��st sestavu : " + url + " \n" + xml.parseError.reason +
      xml.parseError.srctext);
  }
  // test zda je to chybova zprava
  var pp = xml.selectSingleNode("/MESSAGES/INFO")
  if (pp) {
    // je to chybova zprava
    return hermessage(xml);
  };
  // zmena barev dle nastaveni v cookies (barvy a barvy2)
  var xsl = xslZmenaBarev(xsl);
  // konverze do html 
  try {
    return (xml.transformNode(xsl));
  } catch (e) {
    return (e.description);
  }
}



function showsourcexml(tvarokna) {
  // v gurl si pamatuje prikazovou radku !! z prvniho volani
  aPopUp = window.open('', '_blank', tvarokna);
  ndoc = aPopUp.document;
  ndoc.close();
  ndoc.open();
  ndoc.write(dejses(gurl, '/visualize.xsl'));
  ndoc.close();
  if (aPopUp) aPopUp.focus();
  return;
}
//
// ***********  zobrazovani sestav *****************
//

/**
 * Universalni zobrazeni sestavy
 * volba v�stupn�ho form�tu HTML XML PDF  20101124 oh.
 * - dejses() - window.open()- ndoc.write() 
 * @param {*} url 
 * @param {*} tvarokna 
 * @param {*} xslnew 
 * @returns obj 
 */
function showsesx(url, tvarokna, xslnew) {
  console.log("showsesx")
  // ?????? 2021
  var xslfile = 'nepou�ito';
  if (document.getElementById("txgurl")) txgurl.value = url;
  if (document.getElementById("txtype")) txtype.value = 'showsesx(); GET ';
  if (!tvarokna) {
    tvarokna = tvaroknaimp;
  }; // implicitni tvar okna
  // *-*-*-*-* window.open(URL, name, specs, replace)
  const aPopUp = window.open('', '_blank', tvarokna);
  ndoc = aPopUp.document;
  ndoc.close();
  ndoc.open();
  if (document.all["Ou"][0].checked) {
    xslfile = xslnew;
    ndoc.write(dejses(url, xslfile));
    ndoc.close();
  };
  if (document.all["Ou"][1].checked) {
    xslfile = '/visualize.xsl';
    ndoc.write(dejses(url, xslfile));
    ndoc.close();
  };
  if (document.all["Ou"][2].checked) {
    ndoc.write("PDF not yet implemented");
    ndoc.close();
  };
  if (aPopUp) aPopUp.focus();
  return;
}
/**
 * zobrazeni sestavy s vybranymi filtry p��m�m zavol�n�m showses.php do aktualniho okna
 * @param {*} sestava 
 * @param {*} tvarokna 
 * @param {*} xslnew 
 * @returns obj nic
 */
function showsesXXX(sestava, tvarokna, xslnew) {
  gurl = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  console.log("showses: ", gurl);
  gotoSestava(gurl);
  // showsesx(gurl, tvarokna, xslnew)
  return;
}

/**
 * Zobraz� standardn� chybovou zpr�vu od Herma
 * @param {*} messDoc standardn� chybov� zpr�va z Herma v nodu MESSAGE
 * @returns obj nic
 */
function showMessage(messDoc, messTxt) {
  // oMessage.style.display = "block";
  // let mess = messDoc.documentElement.getElementsByTagName("MESSAGE")[0].innerHTML;
  let text = "<font style='font-size:24pt;'>&#9888;</font> <br/>";
  let mess = messDoc.documentElement.getElementsByTagName("MESSAGE")[0];
  if (mess) {
    text = "<font style='font-size:24pt;'>&#9888;</font> <br/>" + mess.getElementsByTagName("TYPSTR")[0].innerHTML + "<br/>" +
      mess.getElementsByTagName("ZAHLAVI")[0].innerHTML + "<br/>" +
      mess.getElementsByTagName("OBSAH1")[0].innerHTML + "<br/>" +
      mess.getElementsByTagName("OBSAH2")[0].innerHTML + "<br/>";
  }
  document.getElementById('messContent').innerHTML = text + "<br/>" + messTxt + "<hr/>";
  window.location.hash = 'popup1';
  document.getElementById('popup1').scrollIntoView();
  return;
};

/**
 * zobraz� textovou chybovou zpr�vu
 * @param {*} text 
 * @returns obj nic
 */
function showErrText(text1, text2 = '?') {
  document.getElementById('messContent').innerHTML = `${text1}<br/>${text2}<hr/>`;
  window.location.hash = 'popup1';
  document.getElementById('popup1').scrollIntoView();
  return;
};

function openWinUrlError() {
  console.log("!!! ** openWinUrlError");
  console.log("!!! 2 ** openWinUrlError");

  alert("openWinUrlError");
}

/**
 * Zobraz� v nov�m okn� zadan� url
 * @param {*} url 
 * @param {*} topic 
 * @param {*} tvarokna 
 * @returns obj odkaz na document v nov�m okn� aPopUp
 */
function openwinUrl(url, topic, tvarokna) {
  console.log("openwin " + topic + "---" + url);
  zapisListShowSes(url, 'openwinUrl(); GET ', 'dle definice')
  if (!tvarokna) {
    tvarokna = tvaroknaimp;
  }; // implicitni tvar okna       
  const aPopUp = window.open(url, topic, tvarokna);
  console.log("openWinUrl")
  console.dir(aPopUp);
  aPopUp.navigator.onload = openWinUrlError;
  /*aPopUp.addEventListener('load', () => {
    console.log(aPopUp.document.body.innerHTML);
      // or
    console.log(aPopUp.document.body.innerText);
   });
   */
  aPopUp.focus();
  return aPopUp.document;
}

/**
 * Zobrazen� sestavy za pomoci Promise.allSettled(urls[xsl,xml])
 * BYlo na zkousku Promise.allSettled - asi se nebude pouzivat.
 * Nahrazeno novym showses()se dvema fetch() v sobe vnorenymi
 * @param {*} sestava 
 * @param {*} tvarokna 
 * @param {*} xslnew 
 * @returns obj nic
 */
function showPromise(sestava, tvarokna, xslnew)
// zobrazeni sestavy p��mo vol�n�m Herma*
{
  let gurl = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  console.log("***** showPromise: ", gurl);
  let xslfile = '/showx.xsl';
  if (document.all["Ou"][1].checked) {
    xslfile = '/visualize.xsl';
  };
  if (document.getElementById("txgurl")) txgurl.value = gurl;
  if (document.getElementById("txxsl")) txxsl.value = xslfile;
  if (document.getElementById("txtype")) txtype.value = 'showPromise(); Promise.allSetled ';

  let urls = [xslfile, gurl];

  Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
      results.forEach((result, num) => {
        console.log(num, result);
        if (result.status == "fulfilled") {
          console.log(`${urls[num]}: ${result.value.status}`);
        }
        if (result.status == "rejected") {
          alert(`${urls[num]}: ${result.reason}`);
          throw 'cancel';
          return;
        }
        if (result.value.status != 200) {
          console.log(`Nelze nacist :: ${urls[num]} : ${result.value.statusText}`);
          throw 'cancel';
        }
        if (result.value.status != 200) {
          console.log(`Nelze nacist :: ${urls[num]} : ${result.value.statusText}`);
          throw 'cancel';
        }
      });
      // vysledek: 
      console.log("XML.status = \n ", results[0].value.status, results[0].value.statusText, results[0].value.documentElement);
      console.log("XSL.status = \n ", results[1].value.status, results[1].value.statusText, results[1].value.documentElement);

      console.log("XML = \n ", results[0].value);
      console.log("XSL = \n ", results[1].value);

      let data = [results[0].value.text(), results[1].value.text()];

      Promise.allSettled(data).then(res => {
        // console.dir(res[0].value);
        // console.dir(res[1].value);
        let xmlDoc = new DOMParser().parseFromString(res[1].value, 'application/xml');
        console.log("OBSAH xmlDoc:");
        console.dir(xmlDoc);

        let xslDoc = new DOMParser().parseFromString(res[0].value, 'application/xml');
        console.dir(xslDoc);

        // co jsem vlastne obdrzel?
        console.log("XML.documentElement.tagName = \n ", xmlDoc.documentElement.tagName);
        console.log("XSL.documentElement.tagName = \n ", xslDoc.documentElement.tagName);
        //console.log("XML.firstElementChild = \n ", xmlDoc.firstElementChild);
        //console.log("XSL.firstElementChild = \n ", xslDoc.firstElementChild);

        if (xmlDoc.documentElement.tagName == "MESSAGES") {
          console.log("!!! MESSAGES: ", xmlDoc)
          showMessage(xmlDoc);
        };


        if (xmlDoc.documentElement.tagName == "SHOWX") {
          // konverze do html 
          let text = "? ERROR ?";
          let xsltProc = new XSLTProcessor();
          xsltProc.importStylesheet(xslDoc);
          try {
            text = xsltProc.transformToFragment(xmlDoc, document);
            // document.getElementById('result').appendChild(result);
          } catch (exc) {
            alert(exc);
          };

          console.dir(text);
          const innerHTML = [...text.childNodes].map(n => n.outerHTML).join('\n');
          // !!! po transformaci chybi zacatek : ...DOCTYPE atd. zacina az od <meta ????
          // console.log("OBSAH po transformToFragment:");
          // console.dir(innerHTML);
          // console.log(innerHTML);
          openwin(innerHTML);
        }
      });
    })
    .catch(err => {
      console.log("Catch promis error ", err)
      return;
    });

  // otvirat novou zalozku:
  // *-*-*-*-* window.open(URL, name, specs, replace)
  // let aPopUp = window.open(gurl, '_blank', tvarokna);
  // nebo neotvirat novou zalozku
  // window.location = gurl;
  return;
} // showPromise - end


/**
 * otevreme si predem okno s textem cekani + dodelat stack oken !!!!
 * @param {*} sestava 
 * @param {*} typ 
 * @param {*} xslnew 
 * @returns obj 
 */
function predOpenWokno(sestava) {
  popUpWokno = window.open("", "_blank", tvaroknaimp);
  let ndoc = popUpWokno.document;
  ndoc.open();
  //  ??? favicon v podokne sestavy nefunguje !!!
  var scriptjs = "<sc" + "ript>" +
    "(function() {" +
    "   var link = document.createElement('link');" +
    "   link.type = 'image/x-icon';" +
    "   link.rel = 'shortcut icon';" +
    "   link.href = 'favicon.png';" +
    "   document.getElementsByTagName('head')[0].appendChild(link);" +
    "}());" +
    "</sc" + "ript>";

  let linkFavicon = '<link rel="icon" type="image/x-icon" href="favicon.png" />'
  ndoc.writeln(
    '<html><head><title>Waiting for Hermes</title>' +
    linkFavicon + '</head>' +
    `<style>
      .loader{
        top: 25px;

        border: #0bbdc0 2px solid;
        height: 20px;
        width:30px;
        text-align: center;
        padding: 1em;
        margin: 0 auto 1em;
        vertical-align: top;
        }
        .wait{
          border: #0bbdc0 2px solid;
          border-radius: 90px;
          height: 180px;
          width:350px;
          text-align: center;
          padding: 1em;
          margin: 0 auto 1em;
          vertical-align: top;
          }
       </style> 
      ` +
    '<body bgcolor=lightgreen onLoad="self.focus()">' +
    '<div  class="wait"> *** P��prava sestavy : <b>' + sestava + '</b> ***' +
    `
     
     <!-- 5 spinner -->
     <div class="loader loader--style5" title="Pracuji ze vsech sil!">
       <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         x="0px" y="0px" width="34px" height="30px" viewBox="0 0 38 30" style="enable-background:new 0 0 50 50;"
         xml:space="preserve">
         <rect x="0" y="0" width="8" height="10" fill="#333">
           <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
             begin="0" dur="0.8s" repeatCount="indefinite" />
         </rect>
         <rect x="10" y="0" width="8" height="10" fill="#333">
           <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
             begin="0.6s" dur="0.8s" repeatCount="indefinite" />
         </rect>
         <rect x="20" y="0" width="8" height="10" fill="#833">
           <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
             begin="0.4s" dur="0.8s" repeatCount="indefinite" />
         </rect>
         <rect x="30" y="0" width="8" height="10" fill="#333">
           <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
             begin="0.2s" dur="0.8s" repeatCount="indefinite" />
         </rect>
       </svg>
     </div>
      <h1> Pracuji </h1>
    </div>
  
     ` +
    '</body></html>'
  );
  ndoc.close();
  return popUpWokno;
}
/**
 * Nacte xslFile a zobrazi v novem okne xmlDoc
 * @param {*} xmlDoc 
 * @param {*} xslFile 
 * @returns nic
 */
function showXML(xmlDoc, xslFile)
// zobrazeni XML pomoci xslFile 
{
  let text = '';
  // xslFile = "visualize.xsl";  // !!!! test
  if (!(xslFile)) // nezadano xsl pro zobrazeni - 
  {
    let ndoc = popUpWokno.document;
    ndoc.open();
    const serializer = new XMLSerializer();
    const xmlStr = serializer.serializeToString(xmlDoc);
    console.log(xmlStr);
    ndoc.writeln(xmlStr);
    return;
  }
  // na�teme xsl pomoc� 1.fetch.
  console.log('SHOWXML - START FETCH XSLFILE = ' + xslFile);
  fetch(xslFile)
    .then(function (result) {
      console.dirxml(result);
      if (result.status != 200) {
        console.log(`Nelze nacist :: ${xslFile} : ${result.statusText}`);
        throw `Nelze nacist :: ${xslFile} : ${result.statusText}`;
      }
      return result.arrayBuffer();
    })
    .then(data => {
      const decoder = new TextDecoder('Windows-1250');
      const text1 = decoder.decode(data);

      console.log('showXML: DATA xslfile = '+xslFile) // Prints result 
      let xslDoc = new DOMParser().parseFromString(text1, 'application/xml');
      console.dirxml(xslDoc);
      console.log(xslDoc.documentElement.tagName);
      if (xslDoc.documentElement.tagName == "html") {
        console.log("!!! showXML : xslfile =  ", xslDoc.documentElement.innerText)
        showMessage(xslDoc, xslFile + ": " + xslDoc.documentElement.innerText);
        popUpWokno.close();
        return;
      };
      if (xslDoc.documentElement.tagName == "MESSAGES") {
        console.log("!!! MESSAGES: ", xslDoc)
        showMessage(xslDoc);
        popUpWokno.close();
        return;
      };
      // xslDoc pripraveno    
      let text = "? ERROR ?";
      let xsltProc = new XSLTProcessor();
      xsltProc.importStylesheet(xslDoc);
      try {
        text = xsltProc.transformToFragment(xmlDoc, document);
        // document.getElementById('result').appendChild(result);
      } catch (exc) {
        alert("Chyba konverze v showXML " + exc);
      };
      console.dir(text);
      const innerHTML = [...text.childNodes].map(n => n.outerHTML).join('\n');
      // !!! po transformaci chybi zacatek : ...DOCTYPE atd. zacina az od <meta ????
      console.log("OBSAH po transformToFragment:");
      console.dir(innerHTML);
      // console.log(innerHTML);
      // openwin(innerHTML);

      // predOpenWokno - kontrolni vypis>
      let ndoc = popUpWokno.document;
      ndoc.open();
      ndoc.writeln(innerHTML);
      //
    })
    .catch(function (err) {
      console.log('!!! fetch showXML URL error : ', err);
      showErrText('showXML() error : ' + err);
      popUpWokno.close();
    });

}
/**
 * Nacte xslFile a vrati zkonvertovany xmlDoc jako text
 * @param {*} xmlDoc 
 * @param {*} xslFile 
 * @param {*} fce - funkce volana po uspesne konverzi s parametrem textovy vysledek konverze
 * @returns vysledek konverze textovy do fce()
 */
 function konvertXML(xmlDoc, xslFile, fce)
 // zobrazeni XML pomoci xslFile 
 {
   let text = '';
   // xslFile = "visualize.xsl";  // !!!! test
   if (!(xslFile)) // nezadano xsl pro zobrazeni - 
   {
     let ndoc = popUpWokno.document;
     ndoc.open();
     const serializer = new XMLSerializer();
     const xmlStr = serializer.serializeToString(xmlDoc);
     console.log(xmlStr);
     ndoc.writeln(xmlStr);
     return;
   }
   // na�teme xsl pomoc� 1.fetch.
   console.log('konvertXML - START FETCH XSLFILE = ' + xslFile);
   fetch(xslFile)
     .then(function (result) {
       console.dirxml(result);
       if (result.status != 200) {
         console.log(`konvertXML() :Nelze nacist :: ${xslFile} : ${result.statusText}`);
         throw `konvertXML(): Nelze nacist :: ${xslFile} : ${result.statusText}`;
       }
       return result.arrayBuffer();
     })
     .then(data => {
       const decoder = new TextDecoder('Windows-1250');
       const text1 = decoder.decode(data);
 
       console.log('konvertXML: DATA xslfile = '+xslFile) // Prints result 
       let xslDoc = new DOMParser().parseFromString(text1, 'application/xml');
       console.dirxml(xslDoc);
       console.log(xslDoc.documentElement.innerText);
       console.log(xslDoc.documentElement.tagName);
       if (xslDoc.documentElement.tagName == "html") {
         console.log("!!! konvertXML : xslfile =  ", xslDoc.documentElement.innerText)
         showMessage(xslDoc, xslFile + ": " + xslDoc.documentElement.innerText);
         popUpWokno.close();
         return;
       };
       if (xslDoc.documentElement.tagName == "MESSAGES") {
         console.log("!!! MESSAGES: ", xslDoc)
         showMessage(xslDoc);
         popUpWokno.close();
         return;
       };
       // xslDoc pripraveno    
       let text = "? ERROR ?";
       let xsltProc = new XSLTProcessor();
       xsltProc.importStylesheet(xslDoc);
       try {
         text = xsltProc.transformToFragment(xmlDoc, document);
         // document.getElementById('result').appendChild(result);
       } catch (exc) {
         alert("Chyba konverze v konvertXML " + exc);
       };
       const innerHTML = [...text.childNodes].map(n => n.outerHTML).join('\n');
       // console.log("OBSAH po transformToFragment:");
       // console.dir(innerHTML);
       // vratime vysledek konverze do fce()
       fce(innerHTML);
       //
       })
     .catch(function (err) {
       console.log('!!! fetch konvertXML URL error : ', err);
       showErrText('konvertXML() error : ' + err);
       popUpWokno.close();
     });
 
 }
 

 function typToURL(typ,sestava)
{
  switch (typ) {
    case "fullurl":
    return `${sestava}`;
    case "fullpath":
    return `/showses.php?defses=${sestava}${DejFiltry()}${DejFiltry2()}`
    case "universal":  // volani primo Herma bez fetch
    return `/showses.php?defses=dsestav/${sestava}${DejFiltry()}${DejFiltry2()}`
    case "vybavy":
    return `/showses.php?defses=dsestav/${sestava}${DejFiltry()}${DejVybavy()}`
    case "showseskat":
    return `/showses.php?defses=dsestav/${sestava}${DejFiltry()}${DejFiltry2()}`
    case "doexpco":
    return `/do_expco.php?defses=dsestav/${sestava}${DejFiltry()}${DejFiltry2()}`
    default:
      break;
  } 
}
function kontrolniZapis(gurl,xslfile,pozn)
{
  if (document.getElementById("txgurl")) txgurl.value = gurl;
  if (document.getElementById("txxsl")) txxsl.value = xslfile;
  if (document.getElementById("txtype")) txtype.value = pozn;
}

/**
 * Jako showPromise, ale nepouziva allSettled, n�br� ma dva fetch() v sob� vno�en�
 * protoze jsem si puvodne myslel, ze velke sestavy se v Edge nezobrazi - 
 * problem, ale byl v otevirani nove zalozky a pak v nasledujici dlouhe pauze
 * 
 * @param {*} sestava 
 * @param {*} typ 
 * @param {*} xslnew 
 * @returns obj 
 */
function showses(sestava, typ, xslnew)
// zobrazeni sestavy p��mo vol�n�m Herma*
{

  console.log("********************!! showses typ = ", typ);

  if (typ === undefined) {
      let typin = "universal";
      let gurl = typToURL(typin,sestava);
      kontrolniZapis(gurl,'direct bez fetch;','showses() ' + typin);
      openURL(gurl);
    return;    
  }  
  let gurl = typToURL(typ,sestava);

  console.log("!!!! gurl.url = " + gurl);
  let typin = typ;

  let xslfile = 'showx.xsl';
  if (xslnew !== undefined) xslfile = xslnew;
  if (document.getElementsByName("Ou")[1].checked) {
    xslfile = 'dle definice sestavy: XSLFILE ';
    // testovaci vypis !!!
    // gotoSestava(gurl);
    let aPopUp = window.open(gurl, 'SestavaX');
    kontrolniZapis(gurl,xslfile,`Direct-showses(${sestava},${typin}); `)
    return;
  };
  kontrolniZapis(gurl,xslfile,'showses(); ' + typin);
  //********
  // otevreme si predem okno s textem cekani + dodelat stack oken !!!!
  popUpWokno = predOpenWokno(sestava);
  let ndoc = popUpWokno.document;
  // 
  // na�teme xsl pomoc� 1.fetch.
  console.log('SHOWSES - START FETCH XSLFILE = ' + xslfile);
  fetch(xslfile)
    .then(function (result) {
      console.dir(result);
      if (result.status != 200) {
        console.log(`Nelze nacist :: ${xslfile} : ${result.statusText}`);
        throw `Nelze nacist :: ${xslfile} : ${result.statusText}`;
      }
      return result.arrayBuffer();
    })
    .then(data => {
      const decoder = new TextDecoder('Windows-1250');
      const text1 = decoder.decode(data);

      console.log('DATA xslfile = ') // Prints result 
      let xslDoc = new DOMParser().parseFromString(text1, 'application/xml');
      console.dir(xslDoc);
      if (xslDoc.documentElement.tagName == "MESSAGES") {
        console.log("!!! MESSAGES: ", xslDoc)
        showMessage(xslDoc);
        popUpWokno.close();
        return;
      };
      //
      // 2.fetch nacte GURL cili sestavu
      console.log('START FETCH GURL ')
      fetch(gurl)
        .then(function (result) {
          console.dir(result);
          if (result.status != 200) {
            console.log(`Nelze nacist :: ${gurl} : ${result.statusText}`);
            throw `Nelze nacist :: ${gurl} : ${result.statusText}`;
          }
          return result.arrayBuffer();
        })
        .then(data => {
          console.log('DATA GURL = ') // Prints result 
          const decoder = new TextDecoder('Windows-1250');
          const text2 = decoder.decode(data);
          let xmlDoc = new DOMParser().parseFromString(text2, 'application/xml');
          console.dir(xmlDoc);
          if (xmlDoc.documentElement.tagName == "MESSAGES") {
            console.log("!!! MESSAGES: ", xmlDoc)
            showMessage(xmlDoc);
            popUpWokno.close();
            return;
          };
          //
          console.log('UZ MAM OBA XML i XSL !!! ');
          console.dir(xmlDoc);
          console.dir(xslDoc);
          // co jsem vlastne obdrzel?
          console.log("XML.documentElement.tagName = \n ", xmlDoc.documentElement.tagName);
          console.log("XSL.documentElement.tagName = \n ", xslDoc.documentElement.tagName);
          // konverze do html 
          let text = "? ERROR ?";
          let xsltProc = new XSLTProcessor();
          xsltProc.importStylesheet(xslDoc);
          try {
            text = xsltProc.transformToFragment(xmlDoc, document);
            // document.getElementById('result').appendChild(result);
          } catch (exc) {
            alert(exc);
          };

          console.dir(text);
          const innerHTML = [...text.childNodes].map(n => n.outerHTML).join('\n');
          // !!! po transformaci chybi zacatek : ...DOCTYPE atd. zacina az od <meta ????
          // console.log("OBSAH po transformToFragment:");
          // console.dir(innerHTML);

          // console.log(innerHTML);

          // openwin(innerHTML); 
          // let aPopUp = window.open('', '_blank', tvaroknaimp);
          // console.dir(aPopUp);

          // let ndoc = aPopUp.document;
          // alert(innerHTML);
          ndoc.write(innerHTML);
          ndoc.close();
          popUpWokno.focus();

        })
        .catch(function (err) {
          console.log('!!! fetch showses URL error : ', err);
          showErrText('showses() error : ' + err);
          popUpWokno.close();
        });

    })
    .catch(function (err) {
      console.log('!!! fetch showses error : ', err);
      showErrText('!!! showses() : ' + err)
      popUpWokno.close();
    });
  return;
  //******** konec showses  ********
};


// otvirat novou zalozku:
// *-*-*-*-* window.open(URL, name, specs, replace)
// let aPopUp = window.open(gurl, '_blank', tvarokna);
// nebo neotvirat novou zalozku
// window.location = gurl;


/**
 * dopln� showses.php + filtry a zavol� openwinUrl 
 * 
 * @param {*} sestava 
 * @param {*} tvarokna 
 * @param {*} xslnew ?? nefunkcni 
 * @returns obj nic
 */
function showsesDirect(sestava, tvarokna, xslnew) {
  gurl = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  console.log("showsesDirect: ", gurl);
  // otvirat novou zalozku:
  // *-*-*-*-* window.open(URL, name, specs, replace)
  openwinUrl(gurl, '', tvarokna);
  // nebo neotvirat novou zalozku 
  // window.location = gurl;
  return;
}

/**
 * zobrazeni sestavy na locale p�es showsesx() - !!! nefunk�n� nepokra�uje v Promise
 * p�esn�ji Dejses() nezobrazuje v�sledek ve winopen()ani nevrac� textov� v�sledek
 * @param {*} sestava 
 * @param {*} tvarokna 
 * @param {*} xslnew 
 * @returns obj nic
 */
function showStatLoc(sestava, tvarokna, xslnew) {
  gurl = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  console.log("showStatLoc: ", gurl);
  // alert("showStatLoc")
  // gotoSestava(gurl);
  showsesx(gurl, tvarokna, xslnew)
  return;
}

// ***** 2021 KONEC *****



/**
 * 
 * @param {*} sestava z adresare dsestav
 * @param {*} pxsl pouzita xsl konverze
 * @returns obj nic
 */
function showdoexpco(sestava, pxsl)
// zobrazeni sestavy do_expco.php !!!
// 2010-10-25
//
{
  gurl = '/do_expco.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  // zvol vystup dle volby v zahlavi
  var xsl = '';
  if (document.all["Ou"][0].checked) {
    xsl = pxsl;
  };
  if (document.all["Ou"][1].checked) {
    xsl = '/visualize.xsl';
  };
  if (document.all["Ou"][2].checked) {
    ndoc.write("PDF not yet implemented");
    ndoc.close();
    return;
  };
  if (document.getElementById("txgurl")) txgurl.value = gurl;
  if (document.getElementById("txtype")) txtype.value = 'showdoexpco(); GET ';
  if (document.getElementById("txxsl")) txxsl.value = xsl;

  aPopUp = window.open('', '_blank', tvaroknaimp);
  ndoc = aPopUp.document;
  ndoc.close();
  ndoc.open();
  ndoc.write(dejsesdoexpco(gurl, xsl));
  ndoc.close();
  if (aPopUp) aPopUp.focus();
  return;
}

function showseskal(sestava, pxsl)
// zobrazeni sestavy do kalendare
{
  gurl = '/showses.php?defses=dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  // na�teme aktualni kalendar
  var fkalend = '/data/XML/kalendar.xml';
  var xmlk = openXML(fkalend);
  // do ORIGIN/PARAMS v kalendari doplnime cestu na zobrazovanou sestavu
  var pp = xmlk.selectSingleNode("//ORIGIN/PARAMS")
  if (pp == null) {
    alert("Nen� na�ten spr�vn� kalend��  !! " + fkalend);
  }
  pp.text = gurl; // xsl si sam zavola potrebnou sestavu     

  var xsl = openXML(pxsl);
  aPopUp = window.open('', '_blank', tvaroknaimp);
  ndoc = aPopUp.document;
  ndoc.close();
  ndoc.open();
  try {
    ndoc.write(xmlk.transformNode(xsl));
  } catch (e) {
    ndoc.write(e.description);
  }
  ndoc.close();
  if (aPopUp) aPopUp.focus();

  if (document.getElementById("txgurl")) txgurl.value = gurl;
  if (document.getElementById("txtype")) txtype.value = 'showseskal(); GET ';
  if (document.getElementById("txxsl")) txxsl.value = xsl;

  return;
}

function zapisListShowSes(url, type, xsl) {
  if (document.getElementById("txgurl")) txgurl.value = url;
  if (document.getElementById("txtype")) txtype.value = type;
  if (document.getElementById("txxsl")) txxsl.value = xsl;

}

function showsesbezfiltru(sestava, tvarokna, xslnew)
// zobrazeni pro tabulky
// 2009-11-19
{
  gurl = '/showses.php?defses=dsestav/' +
    sestava;
  zapisListShowSes(gurl, 'showsesbezfiltru(); GET ', xslnew)
  if (!tvarokna) {
    tvarokna = tvaroknaimp;
  }; // implicitni tvar okna       
  aPopUp = window.open('', '_blank', tvarokna);
  ndoc = aPopUp.document;
  ndoc.close();
  ndoc.open();
  ndoc.write(dejses(gurl, xslnew));
  ndoc.close();
  if (aPopUp) aPopUp.focus();
  return;
}

function showvlast(adresar, sestava, tvarokna)
// zobrazeni sestavy z vlastniho adresare se vsemi vybranymi filtry
{
  var url = '/showses.php?defses=' + adresar +
    sestava + DejFiltry() + DejFiltry2();
  showsesx(url, tvarokna)
  return;
}

function showjiz(sestava, kod, tvarokna)
// zobrazeni sestavy s vybranymi filtry
{
  var url = '/showses.php?defses=/dsestav/' +
    sestava + DejFiltry() + DejFiltry2();
  showses(url, "fullurl");
  return;
}


//
// Kontovnik zobrazeni
// global pro filter a mezisoucty
var filter = '';
var mezisoucty = '';
var kontovXsl = '';
var xslDoc = null;
var xslFile = '';

/**
 * Zobrazeni kontovniku do pripraveneho okna  
 * */
function zobrKontovZobr(xmlDoc) {
  console.log("zobrKontovZobr ??");
  console.dirxml(xmlDoc);
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDoc);
  // alert(xmlStr);
  if (xmlDoc.documentElement.tagName == "MESSAGES") {
    console.log("!!! MESSAGES: ", xmlDoc)
    showMessage(xmlDoc);
  };
  if (xmlDoc.documentElement.tagName == "SHOWX") {
    // konverze do html a zobrazeni
    // showXML(xmlDoc);
    showXML(xmlDoc,"/showx.xsl");
    //showXML(xmlDoc,xslFile);
    return;
  }
}

/**
 * Doplni do definice sestavy filtr a mezisoucty (hvezdicko/vykricnikova konvence)
 * @param {*} zoXml 
 * @returns obj 
 */
function zobrKontovGo(zoXml) {
  console.dir(zoXml);
  // pripravime si seznam sloupcu  selectSingleNode(responseDoc, "//TABLE/CAS");
  let pp = selectSingleNode(zoXml, "//SLOUPCE/SLOUPEC[POLE = 38]/@shape");
  let pmask = selectSingleNode(zoXml, "//FILTRY/FIL[@pole = 38]/@mask");
  let phodn = selectSingleNode(zoXml, "//FILTRY/FIL[@pole = 38]");
  let pmezi = selectSingleNode(zoXml, "//SOUCTY/SOUC[@skupina = 38]/POLE/@mask");
  let pzbmask = selectSingleNode(zoXml, "//SOUCTY/SOUC[@skupina = 38]/@zbmask");
  if ((pp == null) || (pmask == null) || (phodn == null) || (pmezi == null) || (pzbmask == null)) {
    alert(" !! Nespr�vn� definice kontovn�ku: ??? ");
    return null;
  }
  // vytvoreni filtru
  var mask = '';
  var zbmask = '';
  var hodn = '';

  for (let i = 0; i < filter.length; i++) {
    if (filter.charAt(i) == '!') {
      mask = mask + '*';
      zbmask = zbmask + '!';
      hodn = hodn + '*';
    } else {
      mask = mask + '!';
      zbmask = zbmask + '!';
      hodn = hodn + filter.charAt(i);
    }
  }
  // alert("filter = "+filter + " mask=" + mask + " hodn=" + hodn + " zbmask=" + zbmask );
  pp.text = filter;
  pmask.text = mask;
  phodn.text = hodn;
  pmezi.text = mezisoucty;
  pzbmask.text = zbmask;

  let url = 'showses.php?' + DejFiltry() + DejFiltry2();
  fetchPostXML(url, zoXml, zobrKontovZobr);
  // showxpost(zoXml, kontovXsl);

}
/**
 * Zobrazeni sestav typu Kontovnik
 * vola fetchXML('/dsestav/' + sestava,zobrKontovGo)
 * a dale fetchPostXML(url,zoXml,zobrKontovZobr);
 * @param {*} sestava definice sestavy kontovniku
 * @param {*} filterin pouzity filter
 * @param {*} mezisouctyin predpis pro mezisoucty
 * @param {*} xsl definice zobrazeni
 */
function zobrKontov(sestava, filterin, mezisouctyin, xslF)
// zobrazi sestavu tzv. kontovnik 
{
  console.log(`zobrKontov sestava:${sestava},
   filter:${filterin}
   mezisoucty:${mezisouctyin}
   xslFile:${xslF}`);

  // nastavim filter a mezisoucty do globalu !!!! upravit az bude stack stranek sestav
  filter = filterin;
  mezisoucty = mezisouctyin;
  xslFile = xslF;

  // nactem sestavu 
  fetchXML('/dsestav/' + sestava, zobrKontovGo)
}

function zobrKontovOld(sestava, filter, mezisoucty, xsl)
// zobrazi sestavu tzv. kontovnik 
{
  // nacteme definici sestavy 
  var XMLDATA = openXML('/dsestav/' + sestava);
  // pripravime si seznam sloupcu
  var pp = XMLDATA.selectSingleNode("//SLOUPCE/SLOUPEC[POLE = 38]/@shape");
  var pmask = XMLDATA.selectSingleNode("//FILTRY/FIL[@pole = 38]/@mask");
  var phodn = XMLDATA.selectSingleNode("//FILTRY/FIL[@pole = 38]");
  var pmezi = XMLDATA.selectSingleNode("//SOUCTY/SOUC[@skupina = 38]/POLE/@mask");
  var pzbmask = XMLDATA.selectSingleNode("//SOUCTY/SOUC[@skupina = 38]/@zbmask");
  if ((pp == null) || (pmask == null) || (phodn == null) || (pmezi == null) || (pzbmask == null)) {
    alert(" !! Nespr�vn� definice kontovn�ku: " + sestava);
    return;
  }
  // vytvoreni filtru
  var mask = '';
  var zbmask = '';
  var hodn = '';

  for (var i = 0; i < filter.length; i++) {
    if (filter.charAt(i) == '!') {
      mask = mask + '*';
      zbmask = zbmask + '!';
      hodn = hodn + '*';
    } else {
      mask = mask + '!';
      zbmask = zbmask + '!';
      hodn = hodn + filter.charAt(i);
    }
  }
  // alert(filter + " mask=" + mask + " hodn=" + hodn + " zbmask=" + zbmask );
  pp.text = filter;
  pmask.text = mask;
  phodn.text = hodn;
  pmezi.text = mezisoucty;
  pzbmask.text = zbmask;


  showxpost(XMLDATA, xsl);
  XMLDATA = null;
}

function JinyRok() {
  if (document.getElementById("vybrrok") == undefined) return;
  console.log("vybrrok.selectedIndex = " + vybrrok.selectedIndex);
  var last = vybrrok.length;
  for (i = 0; i < last; i++)
    if (vybrrok[i].selected) {
      kuk.ff.CooRok = vybrrok[i].text;
    }
}

function JinyMes() {
  if (document.getElementById("vybrmes") == undefined) return;

  for (i = 0; i < 12; i++)
    if (vybrmes[i].selected) {
      kuk.ff.CooMes = vybrmes[i].text;
    }
}

function JinyDen() {
  if (document.getElementById("vybrden") == undefined) return;
  for (i = 0; i < 30; i++)
    if (vybrden[i].selected) {
      CooDen = vybrden[i].text;
    }
}

function zapissdiv(adresar) {
  fetch(adresar + 'listdir.xml')
    .then(response => {
      if (response.status != 200) {
        console.log(`Nelze nacist :: ${adresar}listdir.xml : ${response.statusText}`);
        throw 'cancel';
      }
      return response.arrayBuffer()
    })
    .then(data => {
      console.log('ZAPISDIV listdir.xml =' + data) // Prints result 
      const decoder = new TextDecoder('Windows-1250');
      const text = decoder.decode(data);
      let xmlDocc = new DOMParser().parseFromString(text, 'application/xml');
      console.dir(xmlDocc);
      if (xmlDocc == null) return;
      //
      sdiv.innerHTML = "";
      var ccc = selectSingleNode(xmlDocc, "//FILES").iterateNext();
      if (ccc) {
        var pulka = ccc.childNodes.length / 2;
        for (let i = 0; i < ccc.childNodes.length; i++) {
          let sk = ccc.children.item(i);
          console.log(sk.innerHTML);
          let nazev = sk.children.item(0).innerHTML;
          let popis = sk.children.item(3).innerHTML;
          let popis1 = sk.children.item(7).innerHTML;
          let xslfile = sk.children.item(6).innerHTML;

          let tagp = '';
          if (xslfile.match('showkat.xsl')) {
            tagp = `<button class="mvbutton" onClick="javascript:showseskat( 
          '${adresar}${nazev}','fullpath')" title="${popis1}">&nbsp;${popis}</button>`;
          } else {
            tagp = `<button class="mvbutton" onClick="javascript:showses(
          '${adresar}${nazev}','fullpath')" title="${popis1}">&nbsp;${popis}</button>`;
          };
          // udelame dva sloupecky tlacitek           
          if (i > pulka) {
            sdiv2.innerHTML += tagp;
          } else {
            sdiv.innerHTML += tagp;
          }
        };
      }
    })
    .catch(function (err) {
      console.log('!!! fetch_zapisdiv error : ', err);
    });
}

// viditelnost ladicich informaci a radiobuttonu oblasti
function visilad() {
  if (dlad.style.display == 'none') {
    dlad.style.display = "block";
  } else {
    dlad.style.display = "none";
  }
  return;
}

//*************************************************************
//**************  seznam otevrenych sestav  *******************
// otevrena okna cekaji na dokonceni Promise
var listWokna = [];
var nameWokno = "A1";
var idWokno = "1";
var popUpWokno = null;

//*************************************************************
//**************  list of windows showseskat ******************

var listShowses = [];
var nameShowses = "A1";

function showseskat(adresar, sestava, tvarokna)
// zobrazeni sestavy s vybranymi filtry s moznost� t��d�n�
// + udrzuje seznam otevrenych okenek
{
  //!!!! **** DODELAT - zatim presmerovano na obyc. sestavu:
  showses(sestava,"showseskat");
  return;
  //!!!! **** DODELAT *****  ?????
  var Ou = 'html';
  if (document.all["Ou"][1].checked) Ou = 'xml';
  if (document.all["Ou"][2].checked) Ou = 'pdf';

  gurl = '/showses.htm?defses=' + adresar +
    sestava + '&Ou=' + Ou + DejFiltry() + DejFiltry2();
  var direktUrl = '/showses.php?defses=' + adresar +
    sestava + DejFiltry() + DejFiltry2();
  zapisListShowSes(gurl, 'showseskat(); GET ', 'neuveden');

  if (!tvarokna) {
    tvarokna = tvaroknaimp;
  }; // implicitni tvar okna       
  aPopUp = window.open(gurl, 'ShowsesKat' + listShowses.length, tvarokna);
  if (aPopUp) aPopUp.focus();
  //
  // objekt okna se sestavou:
  var oSes = {
    vokno: aPopUp,
    name: "B1 - Jmeno okna",
    nazev: "N�zev sestavy",
    popis: "Popis sestavy",
    oblast: "neuvedena",
    casf: "od-do",
    url: "URLtext"
  };
  // vytvo��me n�zev sestavy a url pro vol�n� Herma
  oSes.name = 'B' + (listShowses.length + 1);
  oSes.popis = 'popis sestavy';
  oSes.nazev = sestava;
  oSes.oblast = unescape(goblast);
  oSes.casf = gcasf;
  oSes.url = direktUrl;
  // zaradit do seznamu podokenek
  listShowses.push(oSes);

  return;
}

function vypisListShowses() {
  var s = '<table class="dlist">';
  for (i = 0; i < listShowses.length; i++) {
    var naz = '???';
    var xml = null;
    try {
      xml = listShowses[i].vokno.XMLDocument;
    } catch (ex) {
      dlist.innerHTML = "Sestava �. " + i + " byla ji� zav�ena - nelze porovn�vat";
      return;
    };

    if (xml != null) {
      naz = listShowses[i].vokno.XMLDocument.selectSingleNode("//HEADSENAZEV").text;
      s = s + '<tr><td>' + listShowses[i].name + '</td><td>' +
        '<input class="clad" type="radio" name="rlist" value="X" >' +
        '</td><td>' + listShowses[i].nazev +
        '</td><td>' + naz +
        '</td><td>' + listShowses[i].casf +
        '</td><td>' + listShowses[i].oblast +
        '</td></tr>';
    }
  }
  s = s + '</table>';
  dlist.innerHTML = s;
}

function dejListShowses() {
  return listShowses;
}


function dejSibling(i) {
  var s = ' NAME = ';
  s = s + i + '=' + listShowses[i].name;
  // alert("dejSibling v parentu : " + s ); 
  return listShowses[i];
}

// ************  scvybavy.xml **************
// funkce specialne pro vybavy na strankach katalogv.html a katalogr.html
//
var sez_vyb = new Array();

function DejVybavy()
// nastavi vybrane vybavy do filtru pro vypis po radkach 
{
  console.log("*** DejVybavy ***")
  var filtr = '&filtryk=*****';
  for (var i = 0; i < sez_vyb.length; i++) {
    var vv = document.getElementById(sez_vyb[i]);
    if (vv.checked) filtr = filtr + ":" + vv.value;
  }
  return filtr;
}

function makefvybPUVODNI(table)
// nacte tabulku vybav podle nazvu v parametru table
// a vytvori zaskrtavaci seznam vybav
//
{
  console.log("*** MAKEFVYB *** \n " /* + xml*/ );
  const cesta = "showses.php?defses=dsestav/" + table;
  fetchSes(cesta)
    .then(xml => {
      console.log("PO AWAIT v MAKEFVYB \n " /* + xml*/ );
      let responseDoc = new DOMParser().parseFromString(xml, 'application/xml');
      console.dir(responseDoc);
      // test zda je to chybova zprava
      let pp = selectSingleNode(responseDoc, "/MESSAGES/INFO").iterateNext();
      console.log("Chybov� zpr�va ? MESSAGES/INFO = " + pp);
      if (pp) {
        console.log("Chybov� zpr�va : " + pp.textContent);
        // je to chybova zprava
        // showErrText(pp.textContent)
        showMessage(responseDoc," in makefvyb()");
        return; // hermessage(responseDoc);
      };
      // test zda je to vubec sestava
      pp = selectSingleNode(responseDoc, "/SHOWX/ORIGIN/XSLFILE").iterateNext();
      console.log("Je to v�bec sestava ? /SHOWX/ORIGIN/XSLFILE = " + pp.text);
      if (pp == null) {
        console.log("!! Nen� na�tena spr�vn� definice sestavy    ::  " + responseDoc);
        return 'Nen� na�tena spr�vn� definice sestavy !!   ::  ' + responseDoc;
      };
      console.log("OK  makefvyb OK");

      var ccc = selectSingleNode(responseDoc, "//TABLE/DATA").iterateNext();

      if (ccc) {
        var sdiv = document.getElementById("formvyb");
        for (let i = 0; i < ccc.childNodes.length; i++) {
          var sk = ccc.childNodes.item(i);
          var kod = sk.childNodes.item(0).textContent;
          var nazev = sk.childNodes.item(1).textContent;
          sez_vyb[i] = "idv_" + kod;
          var newSpan = document.createElement("span");
          newSpan.setAttribute("class", "boxvyb");

          var newInput = document.createElement("input");
          newInput.setAttribute("type", "checkbox");
          newInput.setAttribute("id", sez_vyb[i]);
          newInput.setAttribute("value", kod);
          newInput.setAttribute("title", nazev);
          var newText = document.createTextNode(kod);
          newSpan.appendChild(newText);
          newSpan.appendChild(newInput);
          sdiv.appendChild(newSpan);
        };
      } else {
        var newText =
          document.createTextNode('Neni nic nadefinov�no v tabulce v�bav/dokument�');
        sdiv.appendChild(newText);
      };

      return;

    });
}

/**
 * Posle xml pomoci POST na adresu url a vysledek zpracuje pomoci funkce fce(xmlDoc) 
 * @param {*} cesta 
 * @param {*} xml 
 * @param {*} fce 
 */
function fetchPostXML(cesta, xml, fce) {
  console.log("fetchPostXML " + cesta);
  predOpenWokno("Predotevrene okno : fetchPostXML ");
  console.dirxml(xml);
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xml);
  fetch(cesta, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'text/xml; charset=Windows-1250'
      }),
      body: xmlStr
    })
    .then(function (result) {
      console.dir(result);
      if (result.status != 200) {
        console.log(`Nelze na��st :: ${cesta} : ${result.statusText}`);
        throw `Nelze na��st :: ${cesta} : ${result.statusText}`;
      }
      return result.arrayBuffer();
    })
    .then(data => {
      const decoder = new TextDecoder('Windows-1250');
      const text1 = decoder.decode(data);
      let xmlDoc = new DOMParser().parseFromString(text1, 'application/xml');
      console.dir(xmlDoc);
      if (xmlDoc.documentElement.tagName == "MESSAGES") {
        console.log("!!! MESSAGES: ", xmlDoc);
        // zavreme rozpracovane okno
        if (popUpWokno) popUpWokno.close();
        showMessage(xmlDoc);
        return;
      };
      //  zpracujeme xml dodanou funkci
      fce(xmlDoc);
    })
    .catch(function (err) {
      console.log('!!! fetchPostXML error : ', err);
    });
};

/**
 * nacte xml z adresy cesta a zpracuje pomoci funkce fce(xmlDoc) 
 * @param {*} cesta 
 * @param {*} fce 
 */
function fetchXML(cesta, fce) {
  console.log(`fetchXML soubor: ${cesta}`);
  fetch(cesta)
    .then(function (result) {
      console.dir(result);
      if (result.status != 200) {
        console.log(`Nelze na��st :: ${cesta} : ${result.statusText}`);
        throw `Nelze na��st :: ${cesta} : ${result.statusText}`;
      }
      return result.arrayBuffer();
    })
    .then(data => {
      const decoder = new TextDecoder('Windows-1250');
      const text1 = decoder.decode(data);
      let xmlDoc = new DOMParser().parseFromString(text1, 'application/xml');
      console.log("fetchXML dirxml: ");
      console.dirxml(xmlDoc);
      if (xmlDoc.documentElement.tagName == "MESSAGES") {
        console.log("!!! MESSAGES: ", xmlDoc)
        showMessage(xmlDoc);
        return;
      };
      //  zpracujeme xml dodanou funkci
      fce(xmlDoc);
    })
    .catch(function (err) {
      console.log('!!! fetchXML error : ', err);
      showErrText(err,'fetchXML error');
    });
};

/**
 * 
 * @param {*} xmlDoc 
 */
function base64ToArrayBuffer(_base64Str) {
  var binaryString = window.atob(_base64Str);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

function ukazXML(xmlDoc) {
  console.log("*** ukazXML ");

  let _contentType = "data:text/xml";

  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDoc);

  // var byte = base64ToArrayBuffer(_base64Str);⅘
  // var byte = xmlStr.split("");
  // var byte = "<a><b><c/><d/></b><e/></a>";
  var byte = xmlStr;
  var blob = new Blob([byte], {
    type: _contentType
  });
  window.open(URL.createObjectURL(blob), "_blank");

  //var iframe = "<iframe width='300' height='300' src='" + blob + "'></iframe>"
  //var x = window.open();
  //x.document.open();
  //x.document.write(iframe);
  //x.document.close();
}

function ukazXML2(xmlDoc) {
  console.log("*** ukazXML 2 ");
  let _contentType = "data:text/xml";
  const serializer = new XMLSerializer();
  const xmlStr = serializer.serializeToString(xmlDoc);
7
  // var byte = base64ToArrayBuffer(_base64Str);
  // var byte = xmlStr.split("");
  // var byte = "<a><b><c/><d/></b><e/></a>";
  var byte = xmlStr;
  var blob = new Blob([byte], {
    type: _contentType
  });
  window.open(URL.createObjectURL(blob), "_blank");
}

// ************  scinit2.xml  **************
/**
 * spusti /gtankhis.htm s potrebnymi parametry
 * @returns obj
 */
function ukazGraf() {
  var tvaroknagraf = "toolbar=yes,menubar=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,left=0, width=900,height=600";
  var spz = "";
  spz = autospz.value;
  if (spz == '') {
    alert("!! Zadejte RZ. !!");
    return;
  }
  if (!document.querySelector("input[name='C']").checked) // neni zadany mesic a rok
  {
    alert("  !! Zadejte m�s�c a rok. !! \n  Graf je pouze pro obdob� jeden m�s�c");
    return;
  }
  var url = "/gtankhis.htm?" +
    'time=19' +
    '&amp;mesic=' + kuk.ff.CooMes +
    '&amp;rok=' + kuk.ff.CooRok +
    '&amp;filtry=' +
    spz + '&amp;fvoz=1';
  aPopUp = window.open(url, 'Obsah_n�dr�e', tvaroknagraf);
  aPopUp.focus();
  return;
}

function showPage(urlPage)
// zobrazeni urlPage v novem okne
// predpoklada, ze v pripade souboru xml je odkaz na xsl
// 2021-12-07
//
{
  var urlxml = '/dsestav/ds' + sestava + '.xml';

  aPopUp = window.open(urlPage, 'Document',
    'toolbar=yes,menubar=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,left=110, width=800,height=600');
  aPopUp.focus();
  return;
}


// ************  scinituniversal.xml  **************
//
/**
 * universalni inicializace modulu/stranky
 * @param {*} adresar  
 */
function init(adresar) {
  console.log("INIT v scall.xml");
  nactiGparams(); //nacte parametry prikazove radky a ulozi do globalu 
  cticookie();
  nastavDleCookies();

  fetchcasy(kuk.ff.opcas);
  nactiroky(kuk.ff.CooRok);
  fetchvyvyb();

  if (document.getElementById("oridskup")) {
    if (document.getElementById("oskupiny")) {
      fetchSkupinyOblasti(kuk.ff.skupina, kuk.ff.oblast, kuk.ff.ridskup);
    } else {
      fetchSkupinyOblasti(-1, kuk.ff.oblast, kuk.ff.ridskup);
    }
  } else
    fetchSkupinyOblasti(kuk.ff.skupina, kuk.ff.oblast, -1);
  // nastaveni stylu
  // pozor na poradi - napred nastavit zakladni styl
  //setStyle(BASE);
  // pak nacist nastaveny styl
  // a pak teprve nastavit pozadovany styl
  //nastavstyle();
  // pokud je volano pro vybranou oblast - zrusime vyber oblasti
  oblasttx.innerHTML = unescape(goblast);
  if (goblast == '') oblasttx.style.display = "none";
  // ----  vlastni definovane sestavy  -------
  zapissdiv(adresar);
  //  
  lokalizace.innerHTML = lok[kuk.ff.Dradio];
  console.log("KONEC INIT scall.xml ", kuk);
}
