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
const dt = new Date();
const timestamp = dt.getTime();
const datetime = dt.toDateString();
const basewhite = [253,253,243];
const baseblack = [25,25,24];
const profile = "day";
const profilecolor = baseblack;
const fontops = [0.2,0.3,0.4,0.4,0.4,0.5,0.6,0.7,0.8,0.9,0.9,0.9,1,1,1,1,1,1,1,1];
const getfontop = () => {
	return fontops[tools.randominteger(0,fontops.length)];
}
const getrgbacolor = () => {
	return `rgba(${profilecolor[0]},${profilecolor[1]}, ${profilecolor[2]}, ${getfontop()})`;
}
const punctuations = ["|||","|.|","=>","<=",".^.","#-#","&&","++","_¶",".ä.","(æ)", "ƶƶƶ", "ǡ", "Ǝ!", "Ʃ", "ò"];
const getpunctuation  = () => {
	return punctuations[tools.randominteger(0,punctuations.length)];
}
const decorations = ["underline","underline","underline","overline","line-through","line-through","line-through","none","none","none","none","none","none"];
const getdecoration  = () => {
	return decorations[tools.randominteger(0,decorations.length)];
}
const fonts = ["narratorfont","zerofont","riderfont","archivefont","scribefont"];
const getfont  = () => {
	return `var(--${fonts[tools.randominteger(0,fonts.length)]})`;
}
const fontweights = [200,300,400,500,500,500,600,600,600,600,700,700,700,700,700,800,800,800,800,800,900,900,900,900,900]
const getfontweight = () => {
	return fontweights[tools.randominteger(0,fontweights.length)];
}
const markcss = [...Array(20).keys()].reduce( (acc,j) => {
	acc = acc +  `
	mark.mark${j} {
		font-weight:${getfontweight()};
		color:${getrgbacolor()};
		font-family: ${getfont()}; 
		text-decoration: ${getdecoration()};
		text-decoration-color: var(--red);
		/*text-decoration-thickness: 0.1em;*/
	}
	`;
	return acc;
}, "");
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
		--corecolor: var(--${profile}color);
	  	--corebg: var(--${profile}bg);
	  	--coreveilbg: var(--${profile}veilbg);
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
	mark {
		background-color: var(--white);
	}
	mark.mark9 {
		text-transform: uppercase;
	}
	mark.mark19 {
		text-shadow: 2px 2px var(--gray);
	}
	li:first-child:first-letter {
	  color: var(--gray);
	  float: left;
	  font-size: 75px;
	  line-height: 60px;
	  padding-top: 4px;
	  padding-right: 8px;
	  padding-left: 3px;
	}
	${markcss}
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
		${poem.text}`;
	poemstr = poemstr + `
	</div></div>`
	if(poem.figure.picture) {
		poemstr = poemstr + `
	<figure class=" ">
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
