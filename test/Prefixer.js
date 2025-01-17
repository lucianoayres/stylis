import {compile, serialize, stringify, middleware, prefixer, prefix} from "../index.js"

const globalCssValues = ['inherit', 'initial', 'unset', 'revert', 'revert-layer']

describe('Prefixer', () => {
	test('flex-box', () => {
		globalCssValues.concat(['block', 'inline', 'inline-block', 'flow-root', 'none', 'contents', 'table', 'table-row', 'list-item']).forEach(v => expect(prefix(`display:${v};`, 7)).to.equal([`display:${v};`].join()))

		expect(prefix(`display:flex!important;`, 7)).to.equal([`display:-webkit-box!important;`, `display:-webkit-flex!important;`, `display:-ms-flexbox!important;`, `display:flex!important;`].join(''))
		expect(prefix(`display:flex !important;`, 7)).to.equal([`display:-webkit-box !important;`, `display:-webkit-flex !important;`, `display:-ms-flexbox !important;`, `display:flex !important;`].join(''))
		expect(prefix(`display:flex     !important;`, 7)).to.equal([`display:-webkit-box     !important;`, `display:-webkit-flex     !important;`, `display:-ms-flexbox     !important;`, `display:flex     !important;`].join(''))
		expect(prefix(`display:inline-flex;`, 7)).to.equal([`display:-webkit-inline-box;`, `display:-webkit-inline-flex;`, `display:-ms-inline-flexbox;`, `display:inline-flex;`].join(''))
		expect(prefix(`flex:inherit;`, 4)).to.equal([`-webkit-flex:inherit;`, `-ms-flex:inherit;`, `flex:inherit;`].join(''))
		expect(prefix(`flex-grow:none;`, 9)).to.equal([`-webkit-box-flex:none;`, `-webkit-flex-grow:none;`, `-ms-flex-positive:none;`, `flex-grow:none;`].join(''))
		expect(prefix(`flex-shrink:none;`, 11)).to.equal([`-webkit-flex-shrink:none;`, `-ms-flex-negative:none;`, `flex-shrink:none;`].join(''))
		expect(prefix(`flex-basis:none;`, 10)).to.equal([`-webkit-flex-basis:none;`, `-ms-flex-preferred-size:none;`, `flex-basis:none;`].join(''))
		expect(prefix(`align-self:flex-start;`, 10)).to.equal([`-webkit-align-self:flex-start;`, `-ms-flex-item-align:start;`, `align-self:flex-start;`].join(''))
		expect(prefix(`align-self:flex-end;`, 10)).to.equal([`-webkit-align-self:flex-end;`, `-ms-flex-item-align:end;`, `align-self:flex-end;`].join(''))
		expect(prefix(`align-self:baseline;`, 10)).to.equal([`-webkit-align-self:baseline;`, `-ms-flex-item-align:baseline;`, `align-self:baseline;`].join(''))
		expect(prefix(`align-self:first baseline;`, 10)).to.equal([`-webkit-align-self:first baseline;`, `-ms-flex-item-align:first baseline;`, `align-self:first baseline;`].join(''))
		expect(prefix(`align-content:value;`, 13)).to.equal([`-webkit-align-content:value;`, `-ms-flex-line-pack:value;`, `align-content:value;`].join(''))
		expect(prefix(`align-content:flex-start;`, 13)).to.equal([`-webkit-align-content:flex-start;`, `-ms-flex-line-pack:start;`, `align-content:flex-start;`].join(''))
		expect(prefix(`align-content:flex-end;`, 13)).to.equal([`-webkit-align-content:flex-end;`, `-ms-flex-line-pack:end;`, `align-content:flex-end;`].join(''))
		expect(prefix(`align-items:value;`, 11)).to.equal([`-webkit-align-items:value;`, `-webkit-box-align:value;`, `-ms-flex-align:value;`, `align-items:value;`].join(''))
		expect(prefix(`justify-content:flex-end;`, 15)).to.equal([`-webkit-box-pack:end;`, `-ms-flex-pack:end;`, `-webkit-justify-content:flex-end;`, `justify-content:flex-end;`].join(''))
		expect(prefix(`justify-content:flex-start;`, 15)).to.equal([`-webkit-box-pack:start;`, `-ms-flex-pack:start;`, `-webkit-justify-content:flex-start;`, `justify-content:flex-start;`].join(''))
		expect(prefix(`justify-content:justify;`, 15)).to.equal([`-webkit-box-pack:justify;`, `-ms-flex-pack:justify;`, `-webkit-justify-content:justify;`, `justify-content:justify;`].join(''))
		expect(prefix(`justify-content:space-between;`, 15)).to.equal([`-webkit-box-pack:justify;`, `-webkit-justify-content:space-between;`, `justify-content:space-between;`].join(''))
		expect(prefix(`justify-items:center;`, 13)).to.equal([`justify-items:center;`].join(''))
		expect(prefix(`order:flex;`, 5)).to.equal([`-webkit-order:flex;`, `-ms-flex-order:flex;`, `order:flex;`].join(''))
		expect(prefix(`flex-direction:column;`, 14)).to.equal([`-webkit-flex-direction:column;`, `-ms-flex-direction:column;`, `flex-direction:column;`].join(''))
	})

	test('transform', () => {
		expect(prefix(`transform:rotate(30deg);`, 9)).to.equal([`-webkit-transform:rotate(30deg);`, `-moz-transform:rotate(30deg);`, `-ms-transform:rotate(30deg);`, `transform:rotate(30deg);`].join(''))
	})

	test('cursor', () => {
		expect(prefix(`cursor:none;`, 6)).to.equal([`cursor:none;`].join(''))
		expect(prefix(`cursor:grab;`, 6)).to.equal([`cursor:-webkit-grab;`, `cursor:grab;`].join(''))
		expect(prefix(`cursor:image-set(url(foo.jpg) 2x), pointer;`, 6)).to.equal([
			`cursor:-webkit-image-set(url(foo.jpg) 2x), pointer;`,
			`cursor:image-set(url(foo.jpg) 2x), pointer;`
		].join(''))
		expect(prefix(`cursor:image-set(url(foo.jpg) 2x), grab;`, 6)).to.equal([
			`cursor:-webkit-image-set(url(foo.jpg) 2x), -webkit-grab;`,
			`cursor:image-set(url(foo.jpg) 2x), grab;`
		].join(''))
	})

	test('backface-visibility', () => {
		expect(prefix(`backface-visibility:hidden;`, 19)).to.equal([`-webkit-backface-visibility:hidden;`, `backface-visibility:hidden;`].join(''))
	})

	test('transition', () => {
		expect(prefix(`transition:transform 1s,transform all 400ms,text-transform;`, 10)).to.equal([
			`-webkit-transition:-webkit-transform 1s,-webkit-transform all 400ms,text-transform;`,
			`transition:transform 1s,transform all 400ms,text-transform;`
		].join(''))
	})

	test('writing-mode', () => {
		expect(prefix(`writing-mode:none;`, 12)).to.equal([`-webkit-writing-mode:none;`, `-ms-writing-mode:none;`, `writing-mode:none;`].join(''))
		expect(prefix(`writing-mode:vertical-lr;`, 12)).to.equal([`-webkit-writing-mode:vertical-lr;`, `-ms-writing-mode:tb;`, `writing-mode:vertical-lr;`].join(''))
		expect(prefix(`writing-mode:vertical-rl;`, 12)).to.equal([`-webkit-writing-mode:vertical-rl;`, `-ms-writing-mode:tb-rl;`, `writing-mode:vertical-rl;`].join(''))
		expect(prefix(`writing-mode:horizontal-tb;`, 12)).to.equal([`-webkit-writing-mode:horizontal-tb;`, `-ms-writing-mode:lr;`, `writing-mode:horizontal-tb;`].join(''))
		expect(prefix(`writing-mode:sideways-rl;`, 12)).to.equal([`-webkit-writing-mode:sideways-rl;`, `-ms-writing-mode:tb-rl;`, `writing-mode:sideways-rl;`].join(''))
		expect(prefix(`writing-mode:sideways-lr;`, 12)).to.equal([`-webkit-writing-mode:sideways-lr;`, `-ms-writing-mode:tb;`, `writing-mode:sideways-lr;`].join(''))
	})

	test('columns', () => {
		expect(prefix(`columns:auto;`, 7)).to.equal([`-webkit-columns:auto;`, `columns:auto;`].join(''))
		expect(prefix(`column-count:auto;`, 12)).to.equal([`-webkit-column-count:auto;`, `column-count:auto;`].join(''))
		expect(prefix(`column-fill:auto;`, 11)).to.equal([`-webkit-column-fill:auto;`, `column-fill:auto;`].join(''))
		expect(prefix(`column-gap:auto;`, 10)).to.equal([`-webkit-column-gap:auto;`, `column-gap:auto;`].join(''))
		expect(prefix(`column-rule:auto;`, 11)).to.equal([`-webkit-column-rule:auto;`, `column-rule:auto;`].join(''))
		expect(prefix(`column-rule-color:auto;`, 17)).to.equal([`-webkit-column-rule-color:auto;`, `column-rule-color:auto;`].join(''))
		expect(prefix(`column-rule-style:auto;`, 17)).to.equal([`-webkit-column-rule-style:auto;`, `column-rule-style:auto;`].join(''))
		expect(prefix(`column-rule-width:auto;`, 17)).to.equal([`-webkit-column-rule-width:auto;`, `column-rule-width:auto;`].join(''))
		expect(prefix(`column-span:auto;`, 11)).to.equal([`-webkit-column-span:auto;`, `column-span:auto;`].join(''))
		expect(prefix(`column-width:auto;`, 12)).to.equal([`-webkit-column-width:auto;`, `column-width:auto;`].join(''))
	})

	test('text', () => {
		expect(prefix(`text-align:left;`, 10)).to.equal([`text-align:left;`].join(''))
		expect(prefix(`text-transform:none;`, 14)).to.equal([`text-transform:none;`].join(''))
		expect(prefix(`text-shadow:none;`, 11)).to.equal([`text-shadow:none;`].join(''))
		expect(prefix(`text-size-adjust:none;`, 16)).to.equal([`-webkit-text-size-adjust:none;`, `-moz-text-size-adjust:none;`, `-ms-text-size-adjust:none;`, `text-size-adjust:none;`].join(''))
		expect(prefix(`text-decoration:none;`, 15)).to.equal([`-webkit-text-decoration:none;`, `text-decoration:none;`].join(''))
	})

	test('mask', () => {
		expect(prefix(`mask:none;`, 10)).to.equal([`-webkit-mask:none;`, `mask:none;`].join(''))
		expect(prefix(`mask-image:none;`, 10)).to.equal([`-webkit-mask-image:none;`, `mask-image:none;`].join(''))
		expect(prefix(`mask-image:linear-gradient(#fff);`, 10)).to.equal([`-webkit-mask-image:linear-gradient(#fff);`, `mask-image:linear-gradient(#fff);`].join(''))
		expect(prefix(`mask-mode:none;`, 10)).to.equal([`-webkit-mask-mode:none;`, `mask-mode:none;`].join(''))
		expect(prefix(`mask-clip:none;`, 10)).to.equal([`-webkit-mask-clip:none;`, `mask-clip:none;`].join(''))
		expect(prefix(`mask-size:none;`, 10)).to.equal([`-webkit-mask-size:none;`, `mask-size:none;`].join(''))
		expect(prefix(`mask-repeat:none;`, 10)).to.equal([`-webkit-mask-repeat:none;`, `mask-repeat:none;`].join(''))
		expect(prefix(`mask-origin:none;`, 10)).to.equal([`-webkit-mask-origin:none;`, `mask-origin:none;`].join(''))
		expect(prefix(`mask-position:none;`, 10)).to.equal([`-webkit-mask-position:none;`, `mask-position:none;`].join(''))
		expect(prefix(`mask-composite:none;`, 10)).to.equal([`-webkit-mask-composite:none;`, `mask-composite:none;`].join(''))
	})

	test('filter', () => {
		expect(prefix(`filter:grayscale(100%);`, 6)).to.equal([`-webkit-filter:grayscale(100%);`, `filter:grayscale(100%);`].join(''))
		expect(prefix(`fill:red;`, 4)).to.equal([`fill:red;`].join(''))
	})

	test('position', () => {
		expect(prefix(`position:relative;`, 8)).to.equal([`position:relative;`].join(''))
		expect(prefix(`position:static;`, 8)).to.equal([`position:static;`].join(''))
		expect(prefix(`position:fixed;`, 8)).to.equal([`position:fixed;`].join(''))
		expect(prefix(`position:absolute;`, 8)).to.equal([`position:absolute;`].join(''))
		globalCssValues.forEach(v => expect(prefix(`position:${v};`, 8)).to.equal([`position:${v};`].join()))

		expect(prefix(`position:sticky;`, 8)).to.equal([`position:-webkit-sticky;`, `position:sticky;`].join(''))
		expect(prefix(`position:sticky!important;`, 8)).to.equal([`position:-webkit-sticky!important;`, `position:sticky!important;`].join(''))
		expect(prefix(`position:sticky !important;`, 8)).to.equal([`position:-webkit-sticky !important;`, `position:sticky !important;`].join(''))
		expect(prefix(`position:sticky      !important;`, 8)).to.equal([`position:-webkit-sticky      !important;`, `position:sticky      !important;`].join(''))
	})

	test('color-adjust', () => {
		expect(prefix(`color:none;`, 5)).to.equal([`color:none;`].join(''))
		expect(prefix(`color-adjust:none;`, 12)).to.equal([`-webkit-print-color-adjust:none;`, `color-adjust:none;`].join(''))
	})

	test('box', () => {
		expect(prefix(`box-decoration-break:slice;`, 20)).to.equal([`-webkit-box-decoration-break:slice;`, `box-decoration-break:slice;`].join(''))
		expect(prefix(`box-sizing:border-box;`, 10)).to.equal([`box-sizing:border-box;`].join(''))
	})

	test('clip', () => {
		expect(prefix(`clip-path:none;`, 9)).to.equal([`-webkit-clip-path:none;`, `clip-path:none;`].join(''))
	})

	test('size', () => {
		expect(prefix(`width:auto;`, 5)).to.equal([`width:auto;`].join(''))
		expect(prefix(`width:unset;`, 5)).to.equal([`width:unset;`].join(''))
		expect(prefix(`width:initial;`, 5)).to.equal([`width:initial;`].join(''))
		expect(prefix(`width:inherit;`, 5)).to.equal([`width:inherit;`].join(''))
		expect(prefix(`width:10;`, 5)).to.equal([`width:10;`].join(''))
		expect(prefix(`width:min();`, 5)).to.equal([`width:min();`].join(''))
		expect(prefix(`width:var(--foo-content);`, 5)).to.equal([`width:var(--foo-content);`].join(''))
		expect(prefix(`width:var(-content);`, 5)).to.equal([`width:var(-content);`].join(''))
		expect(prefix(`width:var(--max-content);`, 5)).to.equal([`width:var(--max-content);`].join(''))
		expect(prefix(`width:--max-content;`, 5)).to.equal([`width:--max-content;`].join(''))
		expect(prefix(`width:fit-content;`, 5)).to.equal([`width:-webkit-fit-content;`, `width:-moz-fit-content;`, `width:fit-content;`].join(''))
		expect(prefix(`width:stackWidth;`, 5)).to.equal([`width:stackWidth;`].join(''))
		expect(prefix(`min-width:max-content;`, 9)).to.equal([`min-width:-webkit-max-content;`, `min-width:-moz-max-content;`, `min-width:max-content;`].join(''))
		expect(prefix(`max-width:min-content;`, 9)).to.equal([`max-width:-webkit-min-content;`, `max-width:-moz-min-content;`, `max-width:min-content;`].join(''))
		expect(prefix(`height:fill-available;`, 6)).to.equal([`height:-webkit-fill-available;`, `height:-moz-available;`, `height:fill-available;`].join(''))
		expect(prefix(`max-height:fit-content;`, 10)).to.equal([`max-height:-webkit-fit-content;`, `max-height:-moz-fit-content;`, `max-height:fit-content;`].join(''))
		expect(prefix(`width:stretch;`, 5)).to.equal([`width:-webkit-fill-available;`, `width:-moz-available;`, `width:fill-available;`, `width:stretch;`].join(''))
		expect(prefix(`width:stretch !important;`, 5)).to.equal([`width:-webkit-fill-available !important;`, `width:-moz-available !important;`, `width:fill-available !important;`, `width:stretch !important;`].join(''))
		expect(prefix(`min-block-size:max-content;`, 14)).to.equal([`min-block-size:-webkit-max-content;`, `min-block-size:-moz-max-content;`, `min-block-size:max-content;`].join(''))
		expect(prefix(`min-inline-size:max-content;`, 15)).to.equal([`min-inline-size:-webkit-max-content;`, `min-inline-size:-moz-max-content;`, `min-inline-size:max-content;`].join(''))
		expect(prefix(`width:max(250px, 100px);`, 5)).to.equal([`width:max(250px, 100px);`].join(''))
		expect(prefix(`height:min(150px, 200px);`, 6)).to.equal([`height:min(150px, 200px);`].join(''))
		expect(prefix(`min-width:min(100px, 50px);`, 9)).to.equal([`min-width:min(100px, 50px);`].join(''))
		expect(prefix(`max-width:max(150px, 200px);`, 9)).to.equal([`max-width:max(150px, 200px);`].join(''))
		expect(prefix(`min-height:max(100px, 50px);`, 10)).to.equal([`min-height:max(100px, 50px);`].join(''))
		expect(prefix(`max-height:min(150px, 200px);`, 10)).to.equal([`max-height:min(150px, 200px);`].join(''))
	})

	test('zoom', () => {
		expect(prefix(`min-zoom:0;`, 8)).to.equal([`min-zoom:0;`].join(''))
	})

	test('background', () => {
		expect(prefix(`background:none;`, 10)).to.equal([`background:none;`].join(''))
		expect(prefix(`background:image-set(url(foo.jpg) 2x);`, 10)).to.equal([`background:-webkit-image-set(url(foo.jpg) 2x);`, `background:image-set(url(foo.jpg) 2x);`].join(''))
		expect(prefix(`background-image:image-set(url(foo.jpg) 2x);`, 16)).to.equal([`background-image:-webkit-image-set(url(foo.jpg) 2x);`, `background-image:image-set(url(foo.jpg) 2x);`].join(''))
	})

	test('background-clip', () => {
		expect(prefix(`background-clip:text;`, 15)).to.equal([`-webkit-background-clip:text;`, `background-clip:text;`].join(''))
	})

	test('margin-inline', () => {
		expect(prefix(`margin-inline-start:20px;`, 19)).to.equal([`-webkit-margin-start:20px;`, `margin-inline-start:20px;`].join(''))
		expect(prefix(`margin-inline-end:20px;`, 17)).to.equal([`-webkit-margin-end:20px;`, `margin-inline-end:20px;`].join(''))
	})

	test('user-select', () => {
		expect(prefix(`user-select:none;`, 11)).to.equal([`-webkit-user-select:none;`, `-moz-user-select:none;`, `-ms-user-select:none;`, `user-select:none;`].join(''))
	})

	test('appearance', () => {
		expect(prefix(`appearance:none;`, 10)).to.equal([`-webkit-appearance:none;`, `-moz-appearance:none;`, `-ms-appearance:none;`, `appearance:none;`].join(''))
	})

	test('animation', () => {
		expect(prefix(`animation:inherit;`, 9)).to.equal([`-webkit-animation:inherit;`, `animation:inherit;`].join(''))
		expect(prefix(`animation-duration:0.6s;`, 18)).to.equal([`-webkit-animation-duration:0.6s;`, `animation-duration:0.6s;`].join(''))
		expect(prefix(`animation-name:slidein;`, 14)).to.equal([`-webkit-animation-name:slidein;`, `animation-name:slidein;`].join(''))
		expect(prefix(`animation-iteration-count:infinite;`, 25)).to.equal([`-webkit-animation-iteration-count:infinite;`, `animation-iteration-count:infinite;`].join(''))
		expect(prefix(`animation-timing-function:cubic-bezier(0.1,0.7,1.0,0.1);`, 25)).to.equal([
			`-webkit-animation-timing-function:cubic-bezier(0.1,0.7,1.0,0.1);`,
			`animation-timing-function:cubic-bezier(0.1,0.7,1.0,0.1);`
		].join(''))
	})

	test('grid', () => {
		expect(prefix('display:grid;', 7)).to.equal([`display:-ms-grid;`, `display:grid;`].join(''))
		expect(prefix('display:inline-grid;', 7)).to.equal([`display:-ms-inline-grid;`, `display:inline-grid;`].join(''))
		expect(prefix('display:inline-grid!important;', 7)).to.equal([`display:-ms-inline-grid!important;`, `display:inline-grid!important;`].join(''))
		expect(prefix('display:inline-grid !important;', 7)).to.equal([`display:-ms-inline-grid !important;`, `display:inline-grid !important;`].join(''))
		expect(prefix(`align-self:value;`, 10)).to.equal([`-webkit-align-self:value;`, `-ms-flex-item-align:value;`, `-ms-grid-row-align:value;`, `align-self:value;`].join(''))
		expect(prefix(`align-self:safe center;`, 10)).to.equal([`-webkit-align-self:safe center;`, `-ms-flex-item-align:safe center;`, `-ms-grid-row-align:safe center;`, `align-self:safe center;`].join(''))
		expect(prefix('align-self:stretch;', 10)).to.equal([`-webkit-align-self:stretch;`, `-ms-flex-item-align:stretch;`, `-ms-grid-row-align:stretch;`, `align-self:stretch;`].join(''))
		expect(prefix('align-self:start;', 10)).to.equal([`-webkit-align-self:start;`, `-ms-flex-item-align:start;`, `-ms-grid-row-align:start;`, `align-self:start;`].join(''))
		expect(prefix('align-self:flex-start;', 12)).to.equal([`align-self:flex-start;`].join(''))
		expect(prefix('justify-self:end;', 12)).to.equal([`-ms-grid-column-align:end;`, `justify-self:end;`].join(''))
		expect(prefix('justify-self:self-end;', 12)).to.equal([`-ms-grid-column-align:self-end;`, `justify-self:self-end;`].join(''))
		expect(prefix('justify-self:flex-start;', 12)).to.equal([`justify-self:flex-start;`].join(''))
		expect(prefix('justify-self:baseline;', 12)).to.equal([`justify-self:baseline;`].join(''))
		expect(prefix('justify-self:safe center;', 12)).to.equal([`-ms-grid-column-align:safe center;`, `justify-self:safe center;`].join(''))
		expect(prefix('grid-template-columns:1fr auto;', 21)).to.equal([`-ms-grid-columns:1fr auto;`, `grid-template-columns:1fr auto;`].join(''))
		expect(prefix('grid-template-columns:1fr [header content] auto;', 21)).to.equal([`-ms-grid-columns:1fr [header content] auto;`, `grid-template-columns:1fr [header content] auto;`].join(''))
		expect(prefix('grid-template-rows:1fr auto;', 18)).to.equal([`-ms-grid-rows:1fr auto;`, `grid-template-rows:1fr auto;`].join(''))
		// grid-(column|row) - simple position value
		expect(prefix('grid-column:5;', 11)).to.equal([`-ms-grid-column:5;`, `grid-column:5;`].join(''))
		expect(prefix('grid-column:20;', 11)).to.equal([`-ms-grid-column:20;`, `grid-column:20;`].join(''))
		expect(prefix('grid-row:3;', 8)).to.equal([`-ms-grid-row:3;`, `grid-row:3;`].join(''))
		expect(prefix('grid-row:17;', 8)).to.equal([`-ms-grid-row:17;`, `grid-row:17;`].join(''))
		// grid-(column|row) - expand short hand
		expect(prefix('grid-column:3 / 5;', 11)).to.equal([`-ms-grid-column:3;`, `-ms-grid-column-span:2;`, `grid-column:3 / 5;`].join(''))
		expect(prefix('grid-column:3 / span 1;', 11)).to.equal([`-ms-grid-column:3;`, `-ms-grid-column-span:1;`, `grid-column:3 / span 1;`].join(''))
		expect(prefix('grid-row:2 / 7;', 8)).to.equal([`-ms-grid-row:2;`, `-ms-grid-row-span:5;`, `grid-row:2 / 7;`].join(''))
		expect(prefix('grid-row:2 / span 3;', 8)).to.equal([`-ms-grid-row:2;`, `-ms-grid-row-span:3;`, `grid-row:2 / span 3;`].join(''))
		expect(prefix('grid-row:2 / span 3!important;', 8)).to.equal([`-ms-grid-row:2!important;`, `-ms-grid-row-span:3!important;`, `grid-row:2 / span 3!important;`].join(''))
		// grid-column - ignore non-numeric values (IE11 doesn't support line-names)
		expect(prefix('grid-column:main-start / main-end;', 11)).to.equal([`grid-column:main-start / main-end;`].join(''))
		expect(prefix('grid-row:main-start / main-end;', 11)).to.equal([`grid-row:main-start / main-end;`].join(''))
		expect(prefix('grid-row:main-start / main-end!important;', 11)).to.equal([`grid-row:main-start / main-end!important;`].join(''))
		// grid-(column|row)-(start|end)
		expect(serialize(compile(`.test{grid-row-start:3;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{-ms-grid-row:3;grid-row-start:3;}`
		].join(''))
		expect(serialize(compile(`.test{grid-row-start:span 3;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{-ms-grid-row:span 3;grid-row-start:span 3;}`
		].join(''))
		expect(serialize(compile(`.test{grid-row-end:3;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{-ms-grid-row-span:3;grid-row-end:3;}`
		].join(''))
		expect(serialize(compile(`.test{grid-row-end:span 3;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{-ms-grid-row-span:3;grid-row-end:span 3;}`
		].join(''))
		expect(serialize(compile(`.test{grid-row-start:3;grid-row-end:5;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{-ms-grid-row:3;grid-row-start:3;-ms-grid-row-span:2;grid-row-end:5;}`
		].join(''))
		// should not prefix a cell with non-numerical position values
		expect(serialize(compile(`.test{grid-row-start:3;grid-row-end:span 5;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{grid-row-start:3;grid-row-end:span 5;}`
		].join(''))
		expect(serialize(compile(`.test{grid-row-start:span 3;grid-row-end:5;}`), middleware([prefixer, stringify]))).to.equal([
		  `.test{grid-row-start:span 3;grid-row-end:5;}`
		].join(''))
	})

	test('scroll-snap', () => {
		expect(prefix(`scroll-snap-type:none;`, 16)).to.equal([`-webkit-scroll-snap-type:none;`, `-ms-scroll-snap-type:none;`, `scroll-snap-type:none;`].join(''))
		expect(prefix(`scroll-margin:0;`, 13)).to.equal([`scroll-snap-margin:0;`, `scroll-margin:0;`].join(''))
		expect(prefix(`scroll-margin-top:0;`, 17)).to.equal([`scroll-snap-margin-top:0;`, `scroll-margin-top:0;`].join(''))
		expect(prefix(`scroll-margin-right:0;`, 19)).to.equal([`scroll-snap-margin-right:0;`, `scroll-margin-right:0;`].join(''))
		expect(prefix(`scroll-margin-bottom:0;`, 20)).to.equal([`scroll-snap-margin-bottom:0;`, `scroll-margin-bottom:0;`].join(''))
		expect(prefix(`scroll-margin-left:0;`, 18)).to.equal([`scroll-snap-margin-left:0;`, `scroll-margin-left:0;`].join(''))
	})

	test('tab-size', () => {
		expect(prefix(`tab-size:1;`, 8)).to.equal([`-moz-tab-size:1;`, `tab-size:1;`].join(''))
	})
})
