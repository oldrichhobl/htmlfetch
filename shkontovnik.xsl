<?xml version="1.0" encoding="Windows-1250"  ?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns="http://www.w3.org/TR/REC-html40" >
    <!-- shkontovnik.xsl
        specialni  zobrazeni tabulky ze statistik (Herma) 
        K O N T O V N I K 
        zobrazuje sestavu, která vypadá takto:
        - prvni sloupec je (objednatel nebo den), druhy (dodavatel nebo kod substr. ) 
	    a treti (Kč nebo tuny)
	- mezisoučty jsou ve dvou urovnich vnořené v sobě
	- sloupce na konci tabulky jsou přesunuty k prvnímu (klíčovému )sloupci
    
    2013-03-08 oh: uprava pro HTMLV
    
    -->
    <!--                                                         -->
   <xsl:output method="html" encoding="windows-1250" /> 
    <!-- vypisy pro odladovani -->
   <xsl:variable name="debug"  select="false()" />
    

<!--  -->
   <xsl:key match="//SUBTOTAL[@level=1]/RS" name="ksloup" use="H[2]"/>
   <!-- priznak pro zobrazovani kodu v hlavicce tabulky a neanalyzovat text -->
   <xsl:variable name="zobrkod"  select="//PARAMS = 'kody'" />
   <!-- sbirka souctu z urovne 1 -->
   <xsl:variable name="sloupce"  select="//SUBTOTAL[@level=1]" />
   <!-- seznam unikatnich nadpisu z druheho sloupce nesetrideny -->
   <xsl:variable name="unique" select="//SUBTOTAL[@level=1]/RS[count(.|key('ksloup',H[2])[1])=1]"/>


 <!-- priznak pro lokalizaci desetinneho oddelovace: 0=tecka 1=carka -->
 <xsl:variable name="local" select="//ORIGIN/LOKALIZACE" />
 <!--                 nezobrazovane udaje                 -->
 <xsl:template match="text()"/>
 <!-- priznak testovani zaporne hodnoty -->
 <xsl:variable name="zaporsloupec" select="//APPENDIX/barva/zapor/@sloupec" />
 <xsl:variable name="zaporbarva" select="//APPENDIX/barva" />

 <!-- seznam nastavenych filtru -->
 <xsl:variable name="varFil" select="//OBLAST/node()[string-length(name()) = 2]" />

 <xsl:template match="/">
   <html> <head><title><xsl:value-of select="//ORIGIN/SESTAVATX"/> </title>
   <META content="text/html; charset=windows-1250" http-equiv="Content-Type"/>
   <script>
   <xsl:comment><![CDATA[ 
    function changevisi(secNum) {
      if (secNum.className=="off")
	    {secNum.className="on";
		  showTab.value = "Skryj" } 
      else
	    {secNum.className="off";
		showTab.value = "Info" }
    }

    var skrytadata = false;
    
    function pouzesoucty() {
     if (skrytadata)
      { document.styleSheets[0].removeRule(0);       }
      else
      { document.styleSheets[0].addRule(".rhide","display: none;",0); }
     skrytadata = !skrytadata
    }
       
    function informace() {
     if (oInfo.style.display == 'none')
       {
          oInfo.style.display="block";
       }
	else
       {
          oInfo.style.display="none";
       }
      return;
   }

    function callexcel(){
    // převod po jednotlivých řádkách
     var x=tbl.rows;
      try{
        var oXL = new ActiveXObject("Excel.Application");
	}
	catch(e)
	{alert("Ne, nelze spustit Excel :: " + e.description + "\n obvyklé příčiny chyby:"+
	"\n - na počítači není nainstalován Excel "+
	"\n - zabezpečení IE zakazuje spouštět ActiveX prvky ");
	return
	} 
      oXL.Visible = true;
      var oWB = oXL.Workbooks.Add();
      var oSheet = oWB.ActiveSheet;
      var y;
      for (i = 0; i < x.length; i++)
      {y = x[i].cells;
      for (j = 0; j < y.length; j++){oXL.Cells( i+1, j+1).Value = y[j].innerText}
      }
      oXL.Visible = true;
      oXL.UserControl = true;
    }
    
    function callexcel2() {
      try{
        var oXL = new ActiveXObject("Excel.Application");
	}
	catch(e)
	{alert("Nelze spustit Excel :: " + e.description + "\n obvyklé příčiny chyby:"+
	"\n - na počítači není nainstalován Excel "+
	"\n - zabezpečení IE zakazuje spouštět ActiveX prvky ");
	return
	} 
      oXL.Visible = true;
      var oWB = oXL.Workbooks.Add();
      var oSheet = oWB.ActiveSheet;
      window.clipboardData.setData("Text",document.body.innerHTML );
      oSheet.Paste();   
      oXL.Visible = true;
      oXL.UserControl = true;
    }
    
    
   function callopenoffice() {
      try{
        var oXL = new ActiveXObject("com.sun.star.ServiceManager");
	}
	catch(e)
	{alert("Ne, nelze spustit Open Office :: " + e.description + "\n Na tomto počítači není zřejmě nainstalován Open Office!!");
	return
	} 
	 var objDesktop = oXL.createInstance("com.sun.star.frame.Desktop");
	 var args = new Array();
	 var Document= objDesktop.loadComponentFromURL("private:factory/scalc", "_blank", 0, args);
	 var rSheets = Document.getSheets(); 
	 // vlozeni noveho listu na pozici 1
	 rSheets.insertNewByName("DMDsheet", 0);
	 var rSheet = rSheets.getByName("DMDsheet"); 
	 rSheet.IsVisible = true;
	 // zapis nadpisu do prvni radky
	 var rCell = rSheet.getCellByPosition(0, 0);
	 rCell.setFormula(nadpish1.innerText);
 	var rSpreadsheetController = Document.getCurrentController();
	rSpreadsheetController.setActiveSheet(rSheet);
        var x=tbl.rows;
	for (i = 0; i < x.length; i++)
	{
	var y = x[i].cells
	for (j = 0; j < y.length; j++)
	{
	rCell = rSheet.getCellByPosition(j+1, i+1);
        rCell.setFormula(y[j].innerText);
	}
	}
     return;
    }
    
    function posvit(A)
    {
      if (A.style.backgroundColor==document.body.style.backgroundColor)
        {A.style.backgroundColor="#B0E0E6"}
      else
        {A.style.backgroundColor=document.body.style.backgroundColor}
    }    

  function zpet()
   {
     if (window.opener && !window.opener.closed) window.opener.focus();
     window.close();
   }

    ]]>
   </xsl:comment>
   </script>

<style type="text/css">
<xsl:comment><![CDATA[
BODY {
FONT-SIZE: 1em; FONT-FAMILY: Arial CE,Helvetica CE,Arial,Helvetica, sans-serif;
BackGround-color:e2ffe6;
/* BackGround-image: url(pozadi/zelenkavy.gif); */

}

.header {
   margin: 0 0 0 0;
   /* border: thin red solid;  */ 
}
A {font-size:10pt;
   text-decoration:none;
}
button {font-size:10pt;
   font:bold;
   width:25px;
   margin:1 10 1 5;
}
H1 {
	font-size: 20pt;
	margin : 0,0,0,0;
	padding: 0 10 0 10;
	text-align: center;
}
div.headContainer {
	width: 100%;
	margin: 0 auto;
	/* border: thin red solid; */
	}
div.tableContainer {
	width: 100%;		/* table width will be 99% of this*/
	height: expression(parentNode.parentNode.offsetHeight - 150); /* must be greater than tbody*/
	overflow: auto;
	margin: 0 auto;
	/* border: thin blue solid; */
	}

table {
	width: 100%;		/*100% of container produces horiz. scroll in Mozilla*/
	border: none;
	BackGround-color:e2ffe6;
	border-spacing:0;
	/* border-collapse:collapse;  */
	}
	
table>tbody	{  /* child selector syntax which IE6 and older do not support*/
	overflow: auto; 
	height: 250px;
	overflow-x: hidden;
	}
	
thead tr	{
	position:relative; 
	top: expression(offsetParent.scrollTop-2); /*IE5+ only*/
	}
	 
thead td, thead th {
	text-align: center;
	font-size: 14px; 
	background-color: oldlace;
	font-weight: bold;
	margin: 0 0 0 0;
	border: solid 1px black;

	}	
	
td	{
	padding-right: 2px;
	font-size: 12px;
	text-align: right;
	border-bottom: solid 1px #d8d8d8;
	border-left: solid 1px #d8d8d8;
	}
	
table tfoot tr { /*idea of Renato Cherullo to help IE*/
      position: relative; 
      overflow-x: hidden;
      border-bottom: solid 1px #d8d8d8;
      border-left: solid 1px #d8d8d8;

      top: expression(parentNode.parentNode.offsetHeight >= 
	  offsetParent.offsetHeight ? 0 - parentNode.parentNode.offsetHeight + offsetParent.offsetHeight + offsetParent.scrollTop+1 : 0);
      }
tfoot td	{
	text-align: center;
	font-size: 11px;
	font-weight: bold;
	background-color: papayawhip;
	color: steelblue;
	border: solid 1px #BFBFBF;
	}
td:last-child {padding-right: 20px;} /*prevent Mozilla scrollbar from hiding cell content*/

.bg5 {
	font:8pt Verdana;
	background-color: #BFBFBF;
}
.bg4 {
	font:8pt Verdana;
	background-color: #CFCFCF;
}
.bg3 {
	font:8pt Verdana;
	background-color: #CECECE;
}
.bg2 {
	font:8pt Verdana;
	background-color: #DEDEDE;
}
.bg1 {
	font:8pt Verdana;
	background-color: #EFEFEF;
	}
.bg0 {
	font:8pt Verdana;
	background-color: #FFFFCE;
}

.total {
	font:8pt Verdana;
	background-color: #FFFFCE;
}
.row {font:8pt Verdana;
    border-bottom:1px solid #CC88CC;
    text-align:left;}
.rown {font:8pt Verdana;
    border-bottom:1px solid #CC88CC;
    text-align:right;}

div#oInfo {
  border:thin double #CC88CC;
  font:10pt Verdana;
  margin:10 10 10 30;
  padding:5 5 5 15;
  background-color: #FFFFCE;
  color:black;
  display:none;
  
}
.mbutton {
  font:8pt Verdana;
  padding:0 0 0 0;
  width: 15px;
  heigth: 12px;
}

.idfil {
  display:none; 
  width:50%; 
  border:1px red solid;
  text-align:left;
  }
.filrad {
  display:block; 
  width:50%; 
  text-align:left;
  }


    ]]>
   </xsl:comment>
</style>

<!-- ******** nastaveni  barev *********** -->
<style id="barvy" type="text/css">
<xsl:comment><![CDATA[
BODY{
BackGround-color:e2ffe6;
}

table{BackGround-color:e2ffe6;
	}
	
thead td, thead th {background-color: oldlace;
	color: black;
	}	
tfoot td{background-color: papayawhip;
	}
.bg5{background-color: #BFBFBF;
}
.bg4{background-color: #CFCFCF;
}
.bg3{background-color: #CECECE;
}
.bg2{background-color: #DEDEDE;
}
.bg1{background-color: #EFEFEF;
}
.bg0{background-color: #FFFFCE;
}
    ]]>
   </xsl:comment>
</style>


<!-- print style sheet -->
<style type="text/css" media="print">
 <xsl:comment><![CDATA[ 
div.tableContainer {overflow: visible;	}
table>tbody	{overflow: visible; }
td {height: 14pt;} /*adds control for test purposes*/
thead td	{font-size: 11pt;	}
tfoot td	{
	text-align: center;
	font-size: 9pt;
	border-bottom: solid 1px slategray;
	}
	
thead	{display: table-header-group;	}
tfoot	{display: table-footer-group;	}
thead th, thead td	{position: static; } 

thead tr	{position: static; } /*prevent problem if print after scrolling table*/ 
table tfoot tr {     position: static;    }
table tfoot tr A {    visibility:hidden;
    }

.noprint{
display:none;
visibility:hidden;
}

    ]]>
   </xsl:comment>
</style>

</head>
<body >
<!--  -->
    <div id="container">
      <xsl:apply-templates/>
    </div>
    <!-- neviditelne informacni okenko -->
    <div id="oInfo" style="display:none;">
      <text>Definice</text>:
      <xsl:value-of select="//ORIGIN/DEFFILE"/><br/>
      <text>Style</text>:
      <xsl:value-of select="//ORIGIN/XSLFILE"/><br/>
      <text>Sloupců</text>:
      <xsl:value-of select="//TAIL/PCSL"/>
      ::<text>řádek</text>:
      <xsl:value-of select="//TAIL/PCR"/>
      ::<text>mezisoučtů</text>:
      <xsl:value-of select="//TAIL/PCSUB"/>
      
      :APPENDIX:
      <xsl:value-of select="//APPENDIX"/><br/>
      
    </div>
   </body></html>
 </xsl:template>

 <xsl:template match="ORIGIN">
<div class="headContainer">
 <TABLE ID="main" BORDER="0" CELLSPACING="0" CELLPADDING="0"   ALIGN="center"  WIDTH="95%"> 
   <xsl:apply-templates/> 
 <TR>
    <TD class="noprint" style="text-align:left">
        <A  title="Zpět ">
	   <xsl:attribute name="HREF">javascript:zpet();</xsl:attribute>&#8656;&#160;&#160;&#160;&#160;</A>

    </TD>

    <TD ALIGN="center"> <text>Od</text> :
           <xsl:value-of select="./OD"/>
    </TD>
    <TD ALIGN="center"> <text>do</text> : 
           <xsl:value-of select="./DO"/>
    </TD>
    <TD class="noprint">
    <button  title="Vložit sestavu do OpenOffice ">
	   <xsl:attribute name="onClick">javascript:callopenoffice();</xsl:attribute>O</button>
    <button  title="Vložit datové řádky sestavy do Excelu ">
	   <xsl:attribute name="onClick">javascript:callexcel();</xsl:attribute>&#8658;</button>
    <button  title="Vložit celou sestavu do Excelu (včetně filtrů a komentářů)  ">
	   <xsl:attribute name="onClick">javascript:callexcel2();</xsl:attribute>E</button>
    <button  title="Podrobnosti o zobrazené sestavě ">
	 <xsl:attribute name="onClick">javascript:location='/Document/<xsl:value-of select="//ORIGIN/TYPSES"/>.htm';
	 </xsl:attribute>
	 ?
	 </button>	  
        </TD>
    </TR>
    
    <TR>
    <TD>
     <text>Filtry</text>:
       <xsl:if test="../NASTAVENI/OBLAST/VV">
         vv:<xsl:value-of select="../NASTAVENI/OBLAST/VV"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/VP">
         vp:<xsl:value-of select="../NASTAVENI/OBLAST/VP"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/VR">
         vr:<xsl:value-of select="../NASTAVENI/OBLAST/VR"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/VT">
         vt:<xsl:value-of select="../NASTAVENI/OBLAST/VT"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/VO">
         vo:<xsl:value-of select="../NASTAVENI/OBLAST/VO"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/ZV">
         zv:<xsl:value-of select="../NASTAVENI/OBLAST/ZV"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/ZP">
         zp:<xsl:value-of select="../NASTAVENI/OBLAST/ZP"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/ZR">
         zr:<xsl:value-of select="../NASTAVENI/OBLAST/ZR"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/ZT">
         zt:<xsl:value-of select="../NASTAVENI/OBLAST/ZT"/>
       </xsl:if>  
       <xsl:if test="../NASTAVENI/OBLAST/ZO">
         zo:<xsl:value-of select="../NASTAVENI/OBLAST/ZO"/>
       </xsl:if>  
     </TD>
     <TD ALIGN="center">
     <text>oblast</text> : 
           <xsl:value-of select="../NASTAVENI/OBLAST/SPEC_OBLASTUZIVATELE_NAZEV"/>
           <xsl:if test="../NASTAVENI/OBLAST/OBLASTUZIVATELEID != ../NASTAVENI/OBLAST/OBLASTID">
             <xsl:if test="../NASTAVENI/OBLAST/OBLASTUZIVATELEID != -1"> &#8745; </xsl:if>
             <xsl:value-of select="../NASTAVENI/OBLAST/SPEC_OBLAST_NAZEV"/> 
           </xsl:if>  
           
    </TD>

    <TD ALIGN="center"> <text>skupina</text>: 
             <xsl:value-of select="./FILTRY"/>
             <xsl:if test="string-length(./FILTRYR) &gt; 0">
               + (<xsl:value-of select="./FILTRYR"/>)
             </xsl:if>  
    </TD>
    <TD ALIGN="center"><text>čas výpočtu</text>: 
             <xsl:value-of select="./DATSTAT"/>
    </TD>
     </TR>
     
     </TABLE>
     </div>
     </xsl:template>

 <xsl:template match="PODNIK">
 <TR><TD class="podnik" COLSPAN="14"  ALIGN="center">
       <xsl:value-of select="."/>
 </TD></TR>
 </xsl:template>

  <xsl:template match="HEADSENAZEV">
    <TR><TD COLSPAN="14" class="sestava"  ALIGN="center">
    <H1 id="nadpish1">
              <xsl:value-of select="."/>
    </H1>
    </TD>
  </TR>
  </xsl:template>
 
   <xsl:template match="ROKDAT">
     <TD align="center"> <text>Rok</text>:        <xsl:value-of select="."/>
     </TD>
   </xsl:template>
   <xsl:template match="MESDAT">
     <TD align="center"> <text>měsíc</text>:        <xsl:value-of select="."/> . </TD>
   </xsl:template>

  <xsl:template match="SESTAVAN">
      <TD align="center"> <text>č.sestavy</text>:    <xsl:value-of select="."/>. </TD>
   </xsl:template>
   <xsl:template match="DEFFILE">
      <TD align="center"> </TD>
   </xsl:template>

<!-- vlastni tabulka rolovaci -->
 <xsl:template match="TABLE">

 <!-- ******************************************************* -->
 <div class="tableContainer">
 <TABLE id="tbl">     
  <!-- zahlavi tabulky podle seznamu unique -->
    <THEAD>
    <TR>
      <!-- klíčový sloupec -->
      <TH  class="header"><xsl:value-of select="TH/HH[1]"/></TH>
      <!-- sloupce od 4 přidáme dopředu -->
      <xsl:for-each select="TH/HH[position() &gt; 3]" >
      <TH  class="header">
        <xsl:value-of select="."/>
      </TH>
      </xsl:for-each>
      <!-- sloupce se součty podle počtu unikátních kódů -->
      <TH  class="header">
      <xsl:attribute name="colspan"><xsl:value-of select="count($unique)+1"/></xsl:attribute>
      <xsl:value-of select="TH/HH[2]"/>
      </TH>
    </TR>
    <TR>	
    <TH  class="header">&#160; </TH>
    <TH  class="header">&#160; </TH>
    <!-- nazvy do zahlavi tabulky -->
    <xsl:for-each select="$unique" >
        <xsl:sort select="H[2]"/>
	<!-- vypreparujeme z textu v hranatych zavorkach v nazvu substr. -->
	<xsl:variable name="tx"
	  select="substring-before(substring-after(H[3],'['),']')" />
         <TH  class="header">
	   <xsl:if test="(string-length($tx) &lt; 1) or $zobrkod">
            <xsl:value-of select="H[2]"/>
           </xsl:if>
	   <xsl:if test="(string-length($tx) &gt; 0) and not($zobrkod)">
            <xsl:value-of select="$tx"/>
	   </xsl:if>
         </TH>	
    </xsl:for-each>
    <TH  class="header"> Celkem </TH>	
    </TR></THEAD>
   <TFOOT>
     <TR class="zapati">
     <TD class="zapati"><A  title="Informace o sestavě" href="javascript:informace();" >?</A></TD>
     <TD class="zapati">
             <xsl:attribute name="colspan">
               <xsl:value-of select="count($unique)+2"/> 
             </xsl:attribute>
     <text>datum tisku</text>: <xsl:value-of select="//ORIGIN/DATE" /> 
     </TD></TR>
   </TFOOT>

   <!-- obsah kontovniku -->
     <TBODY>
          <xsl:apply-templates/>
        <!-- soucet sloupcu na konci kontovniku -->  
        <!--  -->
	<TR class="r" onclick="posvit(this)">
	<!-- podle urovne vnoreni mezisouctu tmavne barva -->
        <xsl:attribute name="class">bg<xsl:value-of select="2"/></xsl:attribute>
	<!-- sloupce vetsi nez 3 jsou presunuty vpred -->
        <TD class="row">
         <xsl:attribute name="colspan"><xsl:value-of select="count(TH/HH[position() &gt; 3])+1"/></xsl:attribute>
           Celkem:
        </TD>
	
	
        <xsl:for-each select="$unique" >
        <xsl:sort select="H[2]"/>
        <TD class="rown" >
	   <xsl:variable name="klicsloupce" select="H[2]"/>
	   <xsl:variable name="hodnota" select="format-number(sum($sloupce/RS[H[2]=$klicsloupce]/HN[1]),'0.00')"/>
	   <xsl:if test="$debug">
	     klic:<xsl:value-of  select="$klicsloupce"/>
	     sl:<xsl:for-each select="$sloupce/RS" >
	     <xsl:value-of  select="H[2]"/>=<xsl:value-of  select="HN[1]"/>:
	     </xsl:for-each>
	     sum:
	   </xsl:if>  
	    <xsl:choose>
	    <xsl:when test="$local = '0'">
            	<xsl:value-of  select="$hodnota"/>
	     </xsl:when>
	     <xsl:otherwise>
            	<xsl:value-of  select="translate($hodnota,'.',',')"/>
	     </xsl:otherwise>
	    </xsl:choose>
        </TD>
	</xsl:for-each>
        <!-- soucet souctu na konci radky -->
        <TD class="rown" >
            <xsl:variable name="hodnota" select="format-number(sum($sloupce/RS/HN[1]),'0.00')"/>
	    <xsl:choose>
	    <xsl:when test="$local = '0'">
            	<xsl:value-of  select="$hodnota"/>
	     </xsl:when>
	     <xsl:otherwise>
            	<xsl:value-of  select="translate($hodnota,'.',',')"/>
	     </xsl:otherwise>
	    </xsl:choose>
        </TD>
        </TR>
      </TBODY>
   </TABLE>
   </div> <!-- end tablecontainer -->
 </xsl:template>


 <!-- pres soucty na urovni 0  -->
 <xsl:template match="NADPIS[SUBTOTAL/@level=0]">
        <xsl:if test="NAZEV">
          <TR >
           <TD colspan="3">
               <xsl:value-of  select="NAZEV"/>
           </TD>
           <TD> : </TD>
           <TD colspan="3">
               <xsl:value-of  select="OBSAH"/>
           </TD>
          </TR>
        </xsl:if>
        <!-- vlastni radka kontovniku -->
	<TR class="r" onclick="posvit(this)">
	<!-- podle urovne vnoreni mezisouctu tmavne barva -->
        <xsl:attribute name="class">bg<xsl:value-of select="1"/></xsl:attribute>
        
	<xsl:variable name="klicradky" select="SUBTOTAL/RS/H[1]"/> 
        <TD class="row">
           <xsl:value-of  select="$klicradky"/>
        </TD>
        <!-- sloupce od 4 přidáme dopředu -->
        <xsl:for-each select="SUBTOTAL/RS/child::*[position() &gt; 3]" >
        <TD class="row" >
          <xsl:value-of select="."/>
        </TD>
        </xsl:for-each>
	
        <!-- jednotlive sloupce kontovniku -->
        <xsl:for-each select="$unique" >
        <xsl:sort select="H[2]"/>
        <TD class="rown">
	   <xsl:variable name="klicsloupce" select="H[2]"/> 
           <xsl:value-of  select="format-number(sum($sloupce/RS[H[1]=$klicradky and H[2]=$klicsloupce]/HN[1]),'0.00')"/>
        </TD>
	</xsl:for-each>
        <!-- soucet na konci radky -->
        <TD class="rown">
           <xsl:choose>
	    <xsl:when test="$local = '0'">
            	<xsl:value-of  select="SUBTOTAL/RS/HN[1]"/>
	     </xsl:when>
	     <xsl:otherwise>
            	<xsl:value-of  select="translate(SUBTOTAL/RS/HN[1],'.',',')"/>
	     </xsl:otherwise>
	    </xsl:choose>

        </TD>
        </TR>
	
 </xsl:template>
  

   <xsl:template match="PCR|PCSL|PCSUB">
 </xsl:template>

 
</xsl:stylesheet>
