#!/bin/bash
mill=$1
gsdir="noisefactory"
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt
echo $mill
echo $gsdir

cp zineMill.js data/$mill/zineMill.js
cp poemMill.js data/$mill/poemMill.js

echo "copied files"
cd data/$mill
echo ls data/$mill

node poemMill
node zineMill
echo done running zineMill

prince -s css/print.css printzine.html -o printzine_temp.pdf
echo done making print zine
pdfseparate printzine_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printzine.pdf
rm page*.pdf
rm printzine_temp.pdf
echo done removing front matter from printzine.pdf

sed "s/illustratedbook/broadsides/" printzine.html > printzinebroadsides.html
prince -s css/print.css printzinebroadsides.html -o printzinebroadsides_temp.pdf
echo done making broadside zine
pdfseparate printzinebroadsides_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printzinebroadsides.pdf
rm page*.pdf
rm printzinebroadsides_temp.pdf
rm printzinebroadsides.html 
echo done removing front matter from printzinebroadsides.pdf

sed "s/illustratedbook/broadsides notext/" printzine.html > printzinepicturebook.html
prince -s css/print.css printzinepicturebook.html -o printzinepicturebook_temp.pdf
echo done making broadside zine
pdfseparate printzinepicturebook_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printzinepicturebook.pdf
rm page*.pdf
rm printzinepicturebook_temp.pdf
rm printzinepicturebook.html
echo done removing front matter from printzinepicturebook.pdf

sed "s/illustratedbook/film notext/" printzine.html > printzinefilm.html
prince -s css/print.css printzinefilm.html -o printzinefilm_temp.pdf
echo done making broadside zine
pdfseparate printzinefilm_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printzinefilm.pdf
rm page*.pdf
rm printzinefilm_temp.pdf
rm printzinefilm.html
echo done removing front matter from printzinefilm.pdf

gsutil  cp printzinefilm.pdf gs://$gsdir/$mill/
gsutil  cp printzinebroadsides.pdf gs://$gsdir/$mill/
gsutil  cp printzinepicturebook.pdf gs://$gsdir/$mill/
gsutil  cp printzine.pdf gs://$gsdir/$mill/

sed "s/figure class=\"frame\"/figure class=\"\"/" printzine.html > printzine_temp.html
mv printzine_temp.html printzine.html
gsutil  cp printzine.html gs://$gsdir/$mill/
cp printzine.html ../../printzine${mill:4}.html

echo "|:|"
echo "vim printzine${mill:4}.html"
cd ../..
echo gsutil -m cp data/$mill/printzine.pdf gs://$gsdir/$mill
echo "done with data/$mill"

echo "|:|"

