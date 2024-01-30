#!/bin/bash
ts=$(date +"%s")
dt=$(date +"%Y%m%d%H%M%S")
echo $ts
echo $dt

node inputMill.js

#mv poemTextLists.js poemTextLists$dt
node createTextLists.js
mv rawPoemsList.js poemTextLists.js

mkdir data/mill$dt
mkdir data/mill$dt/css
cp buildMill.sh data/mill$dt/buildMill.sh
cp createTextLists.js data/mill$dt/createTextLists.js
cp inputMill.js data/mill$dt/inputMill.js
cp input.js data/mill$dt/input.js
cp pigments.js data/mill$dt/pigments.js
cp tools.js data/mill$dt/tools.js
cp poemTextLists.js data/mill$dt/poemTextLists.js
cp scores.js data/mill$dt/scores.js
cp Bmill.js data/mill$dt/Bmill.js
cp poemMill.js data/mill$dt/poemMill.js
cp bookMill.js data/mill$dt/bookMill.js
cp filmMill.js data/mill$dt/filmMill.js
cp soundMill.js data/mill$dt/soundMill.js
cp rawSoundFiles.js data/mill$dt/rawSoundFiles.js
# cp pdfToFilm.sh data/mill$dt/pdfToFilm.sh
cp buildMill.sh data/mill$dt/buildMill.sh

cp getsoundfiledata.sh data/mill$dt/getsoundfiledata.sh
cd css
 bash clean.sh
 bash compileCSS.sh
cd ../
cp css/print.css data/mill$dt/css/print.css
cp css/bookweb.css data/mill$dt/css/bookweb.css

echo "copied files"
cd data/mill$dt
echo ls data/mill$dt
ls

node soundMill.js
echo done with soundMill
echo run SOX: sound weaving . . . 
bash runSOX.sh 
echo done running SOX 
rm line_0*_thread_*.mp3
echo module.exports = [ > outSoundFiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", url:\"https://storage.googleapis.com/soundfactory/1696901930244/$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> outsoundfiles.js; done; echo ] >> outSoundFiles.js;
echo done writing outSoundFiles.js 

echo "module.exports = { dt:'$dt',datetime:'$(date)',directory:'data/mill$dt' }" > millinfo.js
node Bmill.js
echo done running Bmill
node poemMill
echo done running poemMill

node bookMill
echo done running bookMill

prince -s css/print.css print.html -o printbook_temp.pdf
echo done making print book
pdfseparate printbook_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbook.pdf
rm page*.pdf
rm printbook_temp.pdf
echo done removing front matter from printbook.pdf

sed "s/illustratedbook/broadsides/" print.html > printbroadsides.html
prince -s css/print.css printbroadsides.html -o printbroadsides_temp.pdf
echo done making broadside book
pdfseparate printbroadsides_temp.pdf page%03d.pdf
rm page001.pdf
rm page002.pdf
pdfunite page*.pdf printbroadsides.pdf
rm page*.pdf
rm printbroadsides_temp.pdf
echo done removing front matter from printbroadsides.pdf

node filmMill
echo done running filmMill
prince -s css/print.css film.html -o film.pdf
echo done making film book

#sed "s/notext/withtext/" film.html > filmtext.html
#prince -s css/print.css filmtext.html -o filmtext.pdf
#echo done making word film book

# https://www.princexml.com/doc/command-line/
#prince -s css/print.css film.html --raster-dpi=300 --raster-output=frame%04d.png;
#cp frame0048.png picture0000_$dt.png
#cp frame0098.png picture0001_$dt.png
#cp frame0218.png picture0002_$dt.png
#cp frame0340.png picture0004_$dt.png
#cp frame0480.png picture0005_$dt.png
#cp frame0580.png picture0006_$dt.png
#cp frame0680.png picture0007_$dt.png
#cp frame0780.png picture0008_$dt.png
#cp frame0880.png picture0009_$dt.png
#cp frame0948.png picture0010_$dt.png
#cp frame1098.png picture0011_$dt.png
#cp frame1118.png picture0012_$dt.png
#cp frame1280.png picture0014_$dt.png
#cp frame1380.png picture0015_$dt.png
#cp frame1480.png picture0016_$dt.png
#cp frame1060.png picture0017_$dt.png
#cp frame1160.png picture0018_$dt.png
#cp frame1260.png picture0019_$dt.png
#rm frame*.png
#echo done creating 300dpi pictures 

prince -s css/print.css film.html --raster-dpi=150 --raster-output=frame%04d.png;
rm frame0000.png
rm frame0001.png
rm frame0002.png
rm frame0003.png
cp frame0048.png poster0000_$dt.png
cp frame0298.png poster0001_$dt.png
cp frame0418.png poster0002_$dt.png
cp frame0r618.png poster0003_$dt.png
cp frame0818.png poster0004_$dt.png
ffmpeg -framerate 24 -i frame%04d.png -c:v libx264 -r 24 -pix_fmt yuv420p film.mp4
rm frame*.png
echo done making film.mp4
ffmpeg -i film.mp4 -i line_all_thread_all_echo_reverb.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmsound.mp4
echo done making filmsound 

# with text film
#prince -s css/print.css filmtext.html --raster-dpi=150 --raster-output=frame%04d_text.png;
#rm frame0000_text.png
#rm frame0001_withtext.png
#ffmpeg -framerate 24 -i frame%04d_text.png -c:v libx264 -r 24 -pix_fmt yuv420p filmtext.mp4
#cp frame0048_withtext.png poster_withtext.png
#cp frame0098_withtext.png poster0001_withtext.png
#cp frame0218_withtext.png poster0002_withtext.png
#cp frame0480_withtext.png poster0003_withtext.png
#rm frame*_withtext.png
#echo done making filmtext.mp4
#ffmpeg -i filmtext.mp4 -i line_all_thread_all_echo.mp3 -map 0:v:0 -map 1:a:0  -c:v copy -c:a aac -b:a 192k filmtextsound.mp4
#echo done making filmtextsound 

open filmsound.mp4
echo "directory=data/mill$dt" >> readMe.txt
echo "$(date)" > readMe.txt
echo "directory=data/mill$dt" >> readMe.txt
echo "done"
echo "|:|"
cd ../..
echo gsutil -m cp -r data/mill$dt gs://clockfactory/
echo "cd data/mill$dt"
echo open data/mill$dt/printbook.pdf
echo open data/mill$dt/printbroadsides.pdf
echo "open data/mill$dt/film.mp4"
echo "open data/mill$dt/filmtext.mp4"
echo "open data/mill$dt/filmsound.mp4"
echo "open data/mill$dt/filmtextsound.mp4"
echo "bash createFilm.sh"
echo gsutil -m cp -r film_file$dt.mp4 gs://clockfactory/

echo "|:|"
