<?xml version="1.0" encoding="Windows-1250"  ?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

  <!-- standardni zobrazeni tabulky ze statistik (Herma) -->
  <!--
    oh. : 26.05.2020 prechod na chromium:
          03.06.2021 zpet na Windows-1250
    -->
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="Windows-1250" />
  <xsl:variable name="version" select="'Chr. '" />

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
    <html>
      <head>
        <META content="text/html; charset=Windows-1250" http-equiv="Content-Type"/>
        <title>
          <xsl:value-of select="concat($version,//ORIGIN/SESTAVATX)"/>
        </title>
        <link rel="stylesheet" type="text/css" href="showx.css" />
        <script>
          <xsl:comment><![CDATA[ 
    function changevisi(secNum) {
      if (secNum.className=="off") {secNum.className="on";
		  showTab.value = "Skryj" } 
      else {secNum.className="off";
		showTab.value = "Info" }
    }

    var skrytadata = false;
    
    function zrusClass(A)
    {
      // najdem index selektoru A a zrusime to pravidlo
      var s = '';
      var index = -1; 
      var sel   = '.'+A;  // selektor je s teckou
      for(var i=0;i<document.styleSheets[0].rules.length; i++)
      {
        if (document.styleSheets[0].rules.item(i).selectorText == sel){
         index = i;
         return;
         };
       }; 
      if(index !== -1) // selektor nalezen -> zrusit selektor > zviditelnit R
         {  
          document.styleSheets[0].removeRule(index);
         };
    }    

    function nastavClass(A,rule)
    {
      // najdem index selektoru A
      var s = '';
      var index = -1; 
      var sel   ='.'+A;  // selektor je s teckou for(i=0;i<document.styleSheets[0].rules.length; i++)
       {
        if (document.styleSheets[0].rules.item(i).selectorText == sel)
         index = i;
         return;
       } 
      if(index == -1) // selektor nenalezen -> zalozit a zneviditelnit
        { document.styleSheets[0].addRule("." + A, rule,0);}
    }    

    function pouzesoucty() {
     var x=tbl.rows; 
     var last = 'hhhhhhhh';
     if (skrytadata)
      {  
        // odkryvani skrytych dat       
        for (var i = 0; i < x.length; i++){ if(x[i].name=='datover') {    // datova radka
            zrusClass(x[i].className);  // className.replace( /(?:^|\s)MyClass(?!\S)/g , '' )
            zrusClass(x[i].className);  // jeste jednou, kdyby to uz bylo jednou schovane 
            }
        };
      }
      else
      { 
        // skryvani dat
        for (var i = 0; i < x.length; i++)
        { if(x[i].name=='datover') {     // datova radka
            if(x[i].className != last){  
            nastavClass(x[i].className, 'display: none;');
            last = x[i].className;
            }
        };
        };
      } 
     skrytadata = !skrytadata;
    }
     
    
    function hideMezi(A)
    {
      if(A.length < 1) return;
      // najdem index selektoru A
      var s = '';
      var index = -1; 
      var sel   ='.'+A;  // selektor je s teckou for(i=0;i<document.styleSheets[0].rules.length; i++)
      {
        s = s + ">>" + document.styleSheets[0].rules.item(i).selectorText;
        if (document.styleSheets[0].rules.item(i).selectorText == sel)
         index = i;
       } 
      if(index == -1) // selektor nenalezen -> zalozit a zneviditelnit
        { 
          document.styleSheets[0].addRule("." + A, "display: none;",0);
        }
        else{         // selektor nalezen -> zrusit selektor > zviditelnit R
          // alert("RemoveRule : " + index);
          document.styleSheets[0].removeRule(index);
          };
    }    
   
       
    function informace() {
     if (oInfo.style.display == 'none')
       { oInfo.style.display="block";
       }
	else
       { oInfo.style.display="none";
       }
      return;
   }

   

     function callexcel(){
    // převod po jednotlivých řádkách vcetne zahlavi
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
      try{oSheet.Name = nadpish1.innerText.substr(0,30);}catch(e){};
      var y,ColorIndex;
      for (i = 0; i < x.length; i++){
        y = x[i].cells;
        switch(x[i].className){
          case 'bg1':
                      ColorIndex = 15724527;
                      break;
          case 'bg2':
                      ColorIndex = 14606046;
                      break;
          case 'bg3':
                      ColorIndex = 13553358;
                      break;
          case 'bg4':
                      ColorIndex = 13619151;
                      break;
          case 'bg5':
                      ColorIndex = 12566463;
                      break;
          case 'bg0':
          case 'total':
                      ColorIndex = 13565951;
                      break;                      
          case 'header':
                      ColorIndex = 6333690;
                      break;
          default:
                      ColorIndex = 16777215;
                      break;                      
        }              
        //  alert(x[i].currentStyle.backgroundColor);
        for (j = 0; j < y.length; j++){
          oXL.Cells( i+1, j+1).Value = y[j].innerText;
          oXL.Cells( i+1, j+1).Interior.Color = ColorIndex; 
          oXL.Cells( i+1, j+1).Borders.LineStyle = 1;
          if(i == 0) oXL.Cells( i+1, j+1).Borders(3).LineStyle = 9;
          if(i == 0) oXL.Cells( i+1, j+1).Borders(4).LineStyle = 9;
          if(i < (x.length-1)){
            if(j == 0) oXL.Cells( i+1, j+1).Borders(1).LineStyle = 9;
            if(j == (y.length-1)) oXL.Cells( i+1, j+1).Borders(2).LineStyle = 9;
          }
          if(i == (x.length-2)) oXL.Cells( i+1, j+1).Borders(4).LineStyle = 9;
        }
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
	 try{rCell.setFormula(nadpish1.innerText);}catch(e){};
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

   
  function showPage(urlPage)
  // zobrazeni urlPage v novem okne
  // predpoklada, ze v pripade souboru xml je odkaz na xsl
  // 2021-12-07
  //
 { 
     aPopUp= window.open('/Document/'+urlPage,'Popis',
      'toolbar=yes,menubar=yes,location=no,directories=no,status=yes,scrollbars=yes,resizable=yes,copyhistory=no,left=110, width=800,height=600');
     aPopUp.focus();
  return;  
 }


    ]]>
   </xsl:comment>
   </script>

   <style type="text/css">
     <xsl:comment><![CDATA[
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
          <xsl:value-of select="//ORIGIN/DEFFILE"/>
          <br/>
          <text>Stylesheet</text>:
          <xsl:value-of select="//ORIGIN/XSLFILE"/>
          <br/>
          <text>Sloupců</text>:
          <xsl:value-of select="//TAIL/PCSL"/>
      ::          <text>řádek</text>:
          <xsl:value-of select="//TAIL/PCR"/>
      ::          <text>mezisoučtů</text>:
          <xsl:value-of select="//TAIL/PCSUB"/>
      
      :          <text>APPENDIX</text>:
          <xsl:value-of select="//APPENDIX"/>
          <br/>

        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="ORIGIN">
    <div class="headContainer">
      <TABLE ID="main" BORDER="0" CELLSPACING="0" CELLPADDING="0" ALIGN="center" WIDTH="95%">
        <xsl:apply-templates/>
        <TR>
          <TD class="noprint" style="text-align:left">
            <A title="Zpět ">
              <xsl:attribute name="HREF">javascript:zpet();</xsl:attribute>&#8656;&#160;Zpět</A>

          </TD>

          <TD ALIGN="center">
            <text>Od</text> :
            <xsl:value-of select="./OD"/>
          </TD>
          <TD ALIGN="center">
            <text>do</text> : 
            <xsl:value-of select="./DO"/>
          </TD>
          <TD class="noprint">

            <button title="Zobrazit pouze součtové řádky ">
              <xsl:attribute name="onClick">javascript:pouzesoucty();</xsl:attribute>&#8721;</button>
            <button title="Vložit sestavu do OpenOffice ">
              <xsl:attribute name="onClick">javascript:callopenoffice();</xsl:attribute>O</button>
            <button title="Vložit datové řádky sestavy do Excelu ">
              <xsl:attribute name="onClick">javascript:callexcel();</xsl:attribute>&#8658;</button>
            <button title="Vložit celou sestavu do Excelu (včetně filtrů a komentářů)  ">
              <xsl:attribute name="onClick">javascript:callexcel2();</xsl:attribute>E</button>
            <button title="Podrobnosti o zobrazené sestavě ">
              <xsl:attribute name="onClick">javascript:showPage('<xsl:value-of select="//ORIGIN/TYPSES"/>.htm');
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

          <TD ALIGN="center">
            <text>skupina</text>: 
            <xsl:value-of select="./FILTRY"/>
            <xsl:if test="string-length(./FILTRYR) &gt; 0">
               + (              <xsl:value-of select="./FILTRYR"/>
)
            </xsl:if>
          </TD>
          <TD ALIGN="center">
            <text>čas výpočtu</text>: 
            <xsl:value-of select="./DATSTAT"/>
          </TD>
        </TR>

      </TABLE>
    </div>
  </xsl:template>

  <xsl:template match="PODNIK">
    <TR>
      <TD class="podnik" COLSPAN="14" ALIGN="center">
        <xsl:value-of select="."/>
      </TD>
    </TR>
  </xsl:template>

  <xsl:template match="HEADSENAZEV">
    <TR>
      <TD COLSPAN="14" class="sestava" ALIGN="center">
        <H1 id="nadpish1">
          <xsl:value-of select="."/>
        </H1>
      </TD>
    </TR>
  </xsl:template>

  <xsl:template match="ROKDAT">
    <TD align="center">
      <text>Rok</text>:      <xsl:value-of select="."/>
    </TD>
  </xsl:template>
  <xsl:template match="MESDAT">
    <TD align="center">
      <text>měsíc</text>:      <xsl:value-of select="."/>
 . </TD>
  </xsl:template>

  <xsl:template match="SESTAVAN">
    <TD align="center">
      <text>č.sestavy</text>:      <xsl:value-of select="."/>
. </TD>
  </xsl:template>
  <xsl:template match="DEFFILE">
    <TD align="center"></TD>
  </xsl:template>

  <!-- vlastni tabulka rolovaci -->
  <xsl:template match="TABLE">
    <div class="tableContainer">
      <TABLE id="tbl">
        <!-- zahlavi tabulky -->
        <xsl:for-each select="TH">
          <THEAD>
            <TR class="header">
              <xsl:for-each select="HH">
                <TH  >
                  <xsl:if test="@width">
                    <xsl:attribute name="width">
                      <xsl:value-of select="@width"/>
                    </xsl:attribute>
                  </xsl:if>
                  <!-- test pristupu ke sloupci -->
                  <xsl:if test="@ac='no'">
                    <xsl:attribute name="style">
                      <xsl:text>background-color:red</xsl:text>
                    </xsl:attribute>
                  </xsl:if>

                  <xsl:value-of select="."/>
                </TH>
              </xsl:for-each>
            </TR>
          </THEAD>
        </xsl:for-each>
        <TFOOT>
          <TR class="zapati">
            <TD class="zapati">
              <A class="noprint" title="Informace o sestavě" href="javascript:informace();">?</A>
            </TD>
            <TD class="zapati">
              <xsl:attribute name="colspan">
                <xsl:value-of select="count(TH/HH)-1"/>
              </xsl:attribute>
              <text>datum tisku</text>:              <xsl:value-of select="//ORIGIN/DATE" />
            </TD>
          </TR>
        </TFOOT>
        <TBODY>
          <xsl:apply-templates/>
        </TBODY>
      </TABLE>
    </div>    <!-- end tablecontainer -->
  </xsl:template>

  <xsl:template match="NADPIS">
    <xsl:variable name="xyz" select="'198'" />
    <xsl:if test="NAZEV">
      <TR >
        <TD colspan="3">
          <xsl:value-of select="NAZEV"/>
        </TD>
        <TD> : </TD>
        <TD colspan="3">
          <xsl:value-of select="OBSAH"/>
        </TD>
      </TR>
    </xsl:if>
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="DATA">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="R">
    <TR>
      <xsl:variable name="gidtx">'        <xsl:value-of select="generate-id(../../DATA)"/>
'</xsl:variable>
      <xsl:attribute name="onclick">
        <xsl:value-of select="'posvit(this)'"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:value-of select="generate-id(../../DATA)"/>
      </xsl:attribute>
      <xsl:attribute name="name">
        <xsl:value-of select="'datover'"/>
      </xsl:attribute>
      <!-- zvyrazneni radky se zapornou hodnotou -->
      <xsl:if test="$zaporsloupec">
        <xsl:if test="node()[number($zaporsloupec)] &lt; 0.0">
          <xsl:attribute name="style">background-color:<xsl:value-of select="$zaporbarva"/>
          </xsl:attribute>
        </xsl:if>
      </xsl:if>

      <xsl:apply-templates/>
    </TR>
  </xsl:template>

  <xsl:template match="SUBTOTAL/RS">
    <xsl:if test="normalize-space(.) != ''">
      <TR>
        <xsl:variable name="gidtx">'          <xsl:value-of select="generate-id(../../DATA)"/>
'</xsl:variable>
        <xsl:attribute name="onclick">
          <xsl:value-of select="concat('hideMezi(',$gidtx,')')"/>
        </xsl:attribute>

        <!-- podle urovne vnoreni mezisouctu tmavne barva -->
        <xsl:attribute name="class">bg<xsl:value-of select="../@level"/>
        </xsl:attribute>
        <xsl:apply-templates/>
      </TR>
    </xsl:if>
  </xsl:template>

  <xsl:template match="ZTOTAL">
    <TR class="total">
      <TD class="total">
        <xsl:attribute name="colspan">
          <xsl:value-of select="count(./RS/*)"/>
        </xsl:attribute>
        <text>Celkem</text> :
      </TD>
    </TR>
    <xsl:for-each select="RS">
      <TR class="total">
        <TD class="row">
          <xsl:attribute name="colspan">
            <xsl:value-of select="count(*)-count(HN)-2"/>
          </xsl:attribute>
        </TD>
        <TD class="row">
          <xsl:value-of select="H[1]"/>
        </TD>
        <xsl:for-each select="HN">
          <TD class="rown">
            <xsl:choose>
              <xsl:when test="$local = '0'">
                <xsl:value-of select="."/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:value-of select="translate(.,'.',',')"/>
              </xsl:otherwise>
            </xsl:choose>
          </TD>
        </xsl:for-each>
      </TR>
    </xsl:for-each>
  </xsl:template>
  <xsl:template match="ZSUBTOTAL/RS">
    <TR class="total">
      <TD class="row">
        <xsl:attribute name="colspan">
          <xsl:value-of select="count(*)-count(HN)-2"/>
        </xsl:attribute>
      </TD>
      <TD class="row">
        <xsl:value-of select="H[1]"/>
      </TD>

      <xsl:for-each select="HN">
        <TD class="rown">
          <xsl:choose>
            <xsl:when test="$local = '0'">
              <xsl:value-of select="."/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="translate(.,'.',',')"/>
            </xsl:otherwise>
          </xsl:choose>
        </TD>
      </xsl:for-each>
    </TR>
  </xsl:template>

  <xsl:template match="TOTAL/RS">
    <TR class="total">
      <TD align="CENTER">
        <xsl:attribute name="colspan">
          <xsl:value-of select="//TAIL/PCSL"/>
        </xsl:attribute>
        <text>C e l k e m</text> : 
      </TD>
    </TR>
    <TR class="total">
      <xsl:apply-templates/>
    </TR>
  </xsl:template>
  <xsl:template match="RS">
    <TR>
      <xsl:apply-templates/>
    </TR>
  </xsl:template>

  <xsl:template match="H">
    <TD class="row">
      <xsl:value-of select="."/>
    </TD>
  </xsl:template>

  <xsl:template match="HN">
    <TD class="rown">
      <xsl:choose>
        <xsl:when test="$local = '0'">
          <xsl:value-of select="."/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="translate(.,'.',',')"/>
        </xsl:otherwise>
      </xsl:choose>
    </TD>
  </xsl:template>

</xsl:stylesheet>
