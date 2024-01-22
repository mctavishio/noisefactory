const fs = require("fs"); 
const poemfile = `./poems.js`;
const bookfile = `./book.js`;
const tools = require("./tools.js");
const mills = require("./indexNoiseFiles.js").reverse();
const dt = new Date();
const timestamp = dt.getTime();
const datetime = dt.toDateString();
const description = "code art ::: algorithmic noise patterns";
const rooturl = "https://noisefactory.work";
const gsurl = "https://storage.googleapis.com/noisefactory";
const authorurl = "https://mctavish.work";
const chosenmill = mills[tools.randominteger(0,mills.length)];
let indexhtml = `
<html>
<head>
	<title>noise factory</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="description" content="${description}"/>
	<meta name="author" content="kathy mctavish">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "noise factory",
			"breadcrumb": "core text",
			"url": "${rooturl}",
			"description": "${description}",
			"datePublished": "${datetime}",
			"image": "/apple-touch-icon.png",
			"author": "${authorurl}",
			"license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
		}
	</script>

	<link rel="stylesheet" media="screen" href="css/core.css"/>
	<style>
	:root {
		--corecolor: var(--daycolor);
	  	--corebg: var(--daybg);
	  	--coreveilbg: var(--dayveilbg); 
	}
	html {
		background-color: var(--warmblack);
	}
	body {
		background-image: url("${gsurl}/${mills[8]}/poster0000_${mills[8].substring(4)}.png"); 
		background-attachment: fixed;
		background-size: auto 100%;
		background-color:var(--warmblack);
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmgray);
		background-color: var(--corebg);
	}
	h5 {
		color: var(--warmblack);
	}
	main {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmblack);
		background-color: var(--corebg);
	}
	</style>
</head>
<body class="" >
<div id="mainflex">
<main class="expand narrow" id="top">
<header>
	<h1>noise factory</h1>
	<h2>compiled ::: <span class="small">${datetime}</span></h2>
</header>
<nav>
	<ul>
		<li><a href="https://mctavish.work/index.html" id="homelink">go to mctavish portfolio</a></li>
		<li><a href="#videoall">composite video</a></li>
		<li><a href="#list">noise sequences</a></li>
		<!--<li><a href="#about">about</a></li>-->
		<li><a href="#thanks">project support</a></li>
	</ul>
</nav>
<div class="screenreader-text">
	<p>Your feedback is always welcome.</p>
</div>
<article id="videoall">
	<header>
		<h1>composite video</h1>
	</header>
	<div id="content">
	<figure>
	<div class="vimeowrapper16x9" >
		<iframe src="https://player.vimeo.com/video/904247004?title=0&amp;byline=0&amp;portrait=0" width="600" height="338"frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	</div>
	</figure>
	</div>
</article>

<article id="list">
	<header>
		<h1>noise sequences</h1>
	</header>
	<div class="content">
		<p>These are a series of samples/experiments that can be expanded
		into longer single-channel or multi-channel
		works.</p>
	<h5>digital samples</h5>
	<ul>`
indexhtml = indexhtml + mills.map( name=>name.slice(4) ).map( name=>{
	return	`
		<li><a href="index${name}.html">noise sequence ${name}</a></li>`;
}).join("");
indexhtml = indexhtml + ` 
	</ul>
	</div>
</article>
<!--
<article id="about">
	<header>
		<h1>notes</h1>
	</header>
	<div class="content">
	<p>This is part of a larger research project into the sequences ::: the continuums
	<ul>
		<li>tonal fragements => sound threads</li>
		<li>frame sequence => film</li>
		<li>list of text & image blocks => book</li>
		<li>list of vectors => composite image</li>
		<li>list of composite images => prints</li>
		<li>list of media packages => index</li>
	</ul>
	</p>
	<p>I am also interested in the act of tweening ::: that discrete
	set of bridges from one moment to the next.</p>
	</div>
</article>
-->
<article id="thanks">
	<header>
		<h1>project support</h1>
	</header>
	<div class="content">
	<p>Kathy McTavish was a fiscal year 2023 recipient of a Creative Support for Individuals grant from the Minnesota State Arts Board. This activity was made possible by the voters of Minnesota through a grant from the Minnesota State Arts Board, thanks to a legislative appropriation from the arts and cultural heritage fund.</p>
	<p><a href="https://quiltfactory.work">the quilt factory</a></p>
	<p>see also: <a href="https://netfactory.work">the net factory</a></p>
	<p>see also: <a href="https://clockfactory.work">the clock factory</a></p>
	</div>
</article>
</main>
</div>
</body>
</html>`;
mills.map( mill=> {
	let s = mill.substring(4);
	let year = s.substring(0,4);
	let month = s.substring(4,6)-1;
	let date = s.substring(6,8);
	let hour = s.substring(8,10);
	let minute = s.substring(10,12);
	let dt = new Date(year,month,date,hour,minute);
	return {
		name: mill,
		suffix: mill.substring(4),
		//datetime: dt.toString(),
		datetime: dt.toDateString(),
		posters: [
			`poster0000_${s}.png`,
			`poster0001_${s}.png`,
			`poster0002_${s}.png`,
			`poster0004_${s}.png`,
		],
		title: `noise ${s}`,
		subtitle: `${year}.${month}.${date} ${hour}:${minute}`, 
		url: `index${s}.html`,
	}
}).forEach( mill => {
	let head = `
<head>
	<title>${mill.title}</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="description" content="${description}"/>
	<meta name="author" content="kathy mctavish">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "${mill.title}",
			"breadcrumb": "core text",
			"url": "${rooturl}/${mill.url}",
			"description": "${description}",
			"datePublished": "${mill.datetime}",
			"image": "/apple-touch-icon.png",
			"author": "${authorurl}",
			"license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
		}
	</script>

	<link rel="stylesheet" media="screen" href="css/core.css"/>
	<style>
	:root {
		--corecolor: var(--daycolor);
	  	--corebg: var(--daybg);
	  	--coreveilbg: var(--dayveilbg); 
	}
	body {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmlightwhite);
		background-color: var(--corebg);
		background-image: url("${gsurl}/${mill.name}/${mill.posters[tools.randominteger(0,3)]}"); 
		background-attachment: fixed;
		background-size: auto 100%;
		}
	main {
		border-left: solid;
		border-left-width: 6px;
		border-left-color: var(--warmblack);
		border-right: solid;
		border-right-width: 6px;
		border-right-color: var(--warmblack);
		background-color: var(--corebg);
	}
	</style>
</head>
`
	let html = `<html>${head}
<body class="" >
<div id="mainflex">
<main class="expand narrow" id="top">`;
	html = html + `
<header>
	<h1>noise sequence</h1>
	<h2>created ::: ${mill.datetime}</h2>
</header>
<nav>
	<ul>
		<li><a href="index.html" id="indexlink">back to noise index</a></li>
		<li><a href="https://mctavish.work/index.html" id="homelink">go to mctavish portfolio</a></li>
		<li><a href="#audio">audio tracks</a></li>
		<li><a href="#books">books</a></li>
	</ul>
</nav>
<div class="screenreader-text">
	<p>Your feedback is always welcome.</p>
</div>
<article id="video">
	<header>
		<h1>video</h1>
	</header>
	<div class="content">
<figure>
<video controls poster="${gsurl}/${mill.name}/${mill.posters[tools.randominteger(0,3)]}">
  <source src="${gsurl}/${mill.name}/filmsound.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</figure>
	</div>
</article>
<article id="audio">
	<header>
		<h1>audio</h1>
	</header>
	<div class="content">
	<h5>soundscape with reverb</h5>
	<p>
		<audio loop=true controls="true" id="soundscape" src="${gsurl}/${mill.name}/line_all_thread_all_reverb.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>
	</p>
	<h5>soundscape with reverb & echo</h5>
	<p>
		<audio loop=true controls="true" id="soundscape" src="${gsurl}/${mill.name}/line_all_thread_all_echo_reverb.mp3" type="audio/mpeg">Your browser does not support the audio tag.</audio>
	</p>
	<h5>sound files</h5>
	<p>
	<ul>
		<li><a href="${gsurl}/${mill.name}/line_all_thread_all_reverb.mp3">sound file with reverb</a></li>
		<li><a href="${gsurl}/${mill.name}/line_all_thread_all_echo_reverb.mp3">sound file with reverb & echo</a></li>
	</ul>
	</p>
	</div>
</article>
<article id="books">
	<header>
		<h1>books</h1>
	</header>
	<div class="content">
	<ul>
		<li><a href="${gsurl}/${mill.name}/printbook.pdf">illustrated book</a></li>
		<li><a href="${gsurl}/${mill.name}/printbroadsides.pdf">broadsides</a></li>
	</ul>
	</div>
</article>
<article id="notes">
	<header>
		<h1>notes</h1>
	</header>
	<div class="content">
	<p>code package @ ${mill.name}</p>
	</div>
</article>
</main>
</div>
</body>
</html>`;
	console.log(`${mill.url}`);
	console.log(`${JSON.stringify(mill.posters)}`);
	fs.writeFileSync(`${mill.url}`, html, (err) => {
		if (err)
			console.log(err);
		else {
			console.log(`${mill.url} written successfully\n`);
		}
	});
});
fs.writeFileSync(`index.html`, indexhtml, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`index.html written successfully\n`);
	}
});
//console.log(`prince ${filename} -o ./print.pdf`);
//console.log(`open ./print.pdf`);
