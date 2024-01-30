const fs = require("fs"); 
const poemfile = `./poems.js`;
const bookfile = `./book.js`;
const tools = require("./tools.js");
const poems = require(poemfile);
const book = require(bookfile);
const w = Number(book.bookwidth), h = Number(book.bookheight);
const m = Number(book.bookmargin);
const width = book.bookwidth+"in";
const height = book.bookheight+"in";
const innerwidth = (w-2.0*m)+"in";
const innerheight = (h-2.0*m)+"in";
const margin = book.bookmargin+"in";
const margingutter = (book.bookmargin*1+0.2)+"in";
const svgwidth = book.bookwidth*book.pixelsperunit;
const svgheight = book.bookheight*book.pixelsperunit;
let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();
const markup = str => {
	let words = str.split(" ").map( (w,j) => {
		return tools.randominteger(0,20)<2 ? `<span class="mark${j%5}">${w}</span>` : w;
	});
	return words.join(" ");
};
let head = `
<head>
	<title>${book.title} :::  ${timestamp}</title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
	<meta name="description" content="${book.description} :::  ${timestamp}"/>
	<meta name="author" content="${book.author}">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "${book.title}",
			"breadcrumb": "core text",
          	"url": "${book.rooturl}/${book.file}.html",
			"description": "${book.description}",
			"datePublished": "${datetime}",
          	"image": "/apple-touch-icon.png",
			"author": "${book.authorurl}",
			"license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
		}
	</script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-0989MECNZV"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'G-0989MECNZV');
	</script>
	<link rel="stylesheet" media="screen" href="css/core.css"/>
	<link rel="stylesheet" media="print" href="css/print.css"/>
	<style>
	:root {
		--corecolor: var(--daycolor);
	  	--corebg: var(--daybg);
	  	--coreveilbg: var(--dayveilbg);
		--margin:${margin};
		--margingutter:${margingutter};
		--width:${width};
		--height:${height};
		--innerwidth: ${innerwidth};
		--innerheight: ${innerheight};
	}
	body {
		background-color: var(--corecolor);
	}
	main {
		background-color: var(--corebg);
	}
	@page {
		--margin:${margin};
		--width:${width};
		--height:${height};
		--innerwidth: ${innerwidth};
		--innerheight: ${innerheight};
		margin: var(--margin);
		size: var(--width) var(--height);
	}
	</style>
	<script src=""></script>
</head>
`;
/*
 * <body class="illustratedbook">
 * <body class="film notext">
 * <body class="broadsides notext">
*/
let html = `<html>${head}
<body class="illustratedbook">
<div id="mainflex">
<main class="expand wide" id="top">`;
html = html + `
<div class="blank"></div>
<!--
<header>
	<h1>${book.title}</h1>
	<h2>${book.subtitle}</h2>
	<h3 id="author">${book.author}</h3>
</header>
-->
<header>
	<h1>noise factory</h1>
	<h2>sketch ::: ${timestamp}</h2>
	<h3 id="author">${book.author}</h3>
</header>
<section class="interior num1 pagestartnumbers booksection" id="section0">`;
html = html + tools.shuffle(book.poemids).filter( (p,j)=>j<49 ).reduce( (poemstr,poemid,p) => {
	//console.log(`poemid=${poemid}`);
	let poem = poems.filter(poem=>poem.id===poemid)[0];
	let cssstr = poem.cssclasses ? poem.cssclasses.join(" ") : "";
	poemstr = poemstr + `
<article id="${poem.id}" class="${cssstr}">`;
	poemstr = poemstr + `
	<header>
		<h1>${poem.title}</h1>
	</header>`;
	poemstr = poemstr + `
	<div class="flex">
	<div class="content">`;
	poemstr = poemstr + `
		${markup(poem.text)}`;
	poemstr = poemstr + `
	</div></div>`
	if(poem.figure.picture) {
		poemstr = poemstr + `
	<figure class="frame">
		${poem.figure.picture}
	</figure>`
	}
	poemstr = poemstr + `
</article>`;
	return poemstr;
}, "");
html = html + `
</section>
</main>
</div>
</body>
</html>`;
let poemids = poems.map(poem => poem.id); 
let filename = `./printzine.html`;
fs.writeFileSync(filename, html, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${filename} written successfully\n`);
	}
});
//console.log(`prince ${filename} -o ./print.pdf`);
//console.log(`open ./print.pdf`);
