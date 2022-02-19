# htmlfetch
test fetch zalozeni
## popis zobrazování kontovníků

začíná se voláním 
  1. funkce zobrKontov(xml,f1,f2,xsl)
které se předá univerzální definice sestavy kontovníku Kontovnik.xml
dále se předají filtry na svislé sloupce a filtr na řádky
vzorový vstupní soubor XML se upraví podle filtru F1 F2
upravuje se shape mask filtry a součty
upravená definice sestavy se pošle Hermovi pomocí 
   2. fetchPostXML
pomocí POST se pošle definice sestavy a v řádce URL jsou požadované filtry
vrácená sestava se zobrazí pomocí 
   3. showXML(xml,showx.xsl) - to je jeden ze způsobů zobrazení XML souboru




