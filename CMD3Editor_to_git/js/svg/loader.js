async function loadSvg(paperProject) {
    let elements = [
        "resistor",
        "voltmeter",
        "ammeter",
        "eds",
        "substract"
    ]
    window.svgStore = {}
        // elements.forEach(i => {
        //     try {
        //         require([
        //                 `text!svg/${i}.svg!trim`
        //             ],
        //             function(loadedSvg) {
        //                 window.svgStore[i] = loadedSvg
        //             })
        //     } catch (e) {}
        // })
    window.svgStore["resistor"] = `<?xml version='1.0' encoding='iso-8859-1'?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 298" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 298 298" width="40px" height="40px">
      <g>
        <path d="M298,141h-50v-41H50v41H0v16h50v41h198v-41h50V141z M66,182v-66h166v66H66z"/>
      </g>
    </svg>
    `
    window.svgStore["voltmeter"] = `<?xml version='1.0' encoding='iso-8859-1'?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298 298" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 298 298" width="40px" height="40px">
      <g>
        <path d="M298,141.25h-34.101c-4-59.719-53.852-107.084-114.566-107.084S38.767,81.531,34.767,141.25H0v16h34.798   c4.244,59.483,53.99,106.584,114.535,106.584s110.291-47.101,114.535-106.584H298V141.25z M248.167,149   c0,54.497-44.337,98.834-98.834,98.834S50.499,203.497,50.499,149s44.337-98.834,98.834-98.834S248.167,94.503,248.167,149z"/>
        <polygon points="176.086,100.25 149.611,175.077 122.857,100.25 102.652,100.25 141.529,199.25 157.693,199.25 196.291,100.25  "/>
      </g>
    </svg>
    `
    window.svgStore["ammeter"] = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 298 298" width="40.64150943396227" height="40.37735849056605" style="">
    
  <g class="currentLayer" style=""><title>Layer 1</title><g class="selected"><path fill="#abecec" fill-opacity="1" stroke="#919191" stroke-opacity="1" stroke-width="1" stroke-dasharray="none" stroke-linejoin="miter" stroke-linecap="butt" stroke-dashoffset="" fill-rule="nonzero" opacity="1" marker-start="" marker-mid="" marker-end="" d="M6.99519899191798,21.751287422743466 C6.99519899191798,14.022970942336293 12.998645837956088,7.763034593206482 20.410308610842645,7.763034593206482 C27.821971383729203,7.763034593206482 33.825418229767315,14.022970942336293 33.825418229767315,21.751287422743466 C33.825418229767315,29.479603903150636 27.821971383729203,35.73954025228044 20.410308610842645,35.73954025228044 C12.998645837956088,35.73954025228044 6.99519899191798,29.479603903150636 6.99519899191798,21.751287422743466 z" id="svg_4" class=""/><g id="svg_1" class="">
      <path d="M40.594996769589855,20.574371785189445 h-4.6367661893425325 c-0.5438862425550617,-8.437751778382019 -7.322340483518783,-15.129995670327036 -15.577717816140774,-15.129995670327036 S5.346681190520834,12.136620006807425 4.802794947965773,20.574371785189445 H0.07547169923782349 v2.2606545396626254 h4.731538367107751 c0.5770633033509199,8.404407123921997 7.341104558886935,15.05935021596258 15.57350269776097,15.05935021596258 s14.99643939441005,-6.654943092040583 15.57350269776097,-15.05935021596258 H40.594996769589855 V20.574371785189445 zM33.819125988278266,21.669376327838528 c0,7.699930652999631 -6.028571084040934,13.964345673313495 -13.438613224171721,13.964345673313495 S6.941899539934827,29.369306980838164 6.941899539934827,21.669376327838528 s6.028571084040934,-13.964345673313495 13.438613224171721,-13.964345673313495 S33.819125988278266,13.969445674838896 33.819125988278266,21.669376327838528 z" id="svg_2"/>
      <path d="m19.224618527116405,14.781444527303963 l-5.1345580728410525,13.987799964162496 h2.6904692703592468 l1.2314944247052964,-3.5322727182228526 h4.6987692209938094 l1.2505304431947237,3.5322727182228526 h2.6904692703592468 l-5.115658025912262,-13.987799964162496 h-2.311516530859008 zm3.0125858975124817,8.61874543246376 h-3.7893914234417476 l1.9325637913587697,-5.4929666586539945 l1.8568276320829777,5.4929666586539945 z" id="svg_3"/>
    </g><path fill="" fill-opacity="1" stroke="none" stroke-opacity="1" stroke-width="1" stroke-dasharray="none" stroke-linejoin="miter" stroke-linecap="butt" stroke-dashoffset="" fill-rule="nonzero" opacity="1" marker-start="" marker-mid="" marker-end="" id="svg_5" d="M15.308799096966846,10.761049494546258 " style="color: rgb(0, 0, 0);" class=""/><rect fill="#eb1a1a" stroke="#e76767" stroke-dashoffset="" fill-rule="nonzero" id="svg_10" x="0.483386381154119" y="4.14930364545318" width="6.798578031938261" height="1.1303272698313127" style="color: rgb(0, 0, 0);" class=""/><rect fill="#eb1a1a" stroke="#e76767" stroke-dashoffset="" fill-rule="nonzero" x="32.97479041581141" y="4.095733411707875" width="6.798578031938261" height="1.1303272698313127" style="color: rgb(0, 0, 0);" class="" id="svg_13"/><rect fill="#eb1a1a" stroke="#e76767" stroke-dashoffset="" fill-rule="nonzero" x="229.03989776244404" y="24.364299005398305" width="49.999999999999964" height="8.471509933471673" style="color: rgb(0, 0, 0);" class="" id="svg_14" transform="matrix(0.0003474481676646541,0.1412904474444601,-0.1359711167208396,0.0003610406993559157,40.28430930020621,-31.162399721312756) "/></g></g></svg>`

    window.svgStore["eds"] = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 460 460" style="enable-background:new 0 0 460 460;" xml:space="preserve" width="40px" height="40px">
    <g id="XMLID_1013_">
      <polygon id="XMLID_1271_" points="65,215 10,215 10,245 65,245 65,460 95,460 95,0 65,0 	"/>
      <rect id="XMLID_1272_" x="245" width="30" height="460"/>
      <path id="XMLID_1275_" d="M450,215h-55V100c0-8.284-6.716-15-15-15h-60c-8.284,0-15,6.716-15,15v260c0,8.284,6.716,15,15,15h60
        c8.284,0,15-6.716,15-15V245h55V215z M365,345h-30V115h30V345z"/>
      <path id="XMLID_1279_" d="M200,85h-60c-8.284,0-15,6.716-15,15v260c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15V100
        C215,91.716,208.284,85,200,85z M185,345h-30V115h30V345z"/>
    </g>
    </svg>
    `
    window.svgStore["substract"] = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 42 42" style="enable-background:new 0 0 42 42;" xml:space="preserve" width="40px" height="40px"> 
    <rect y="20" width="42" height="2"/>
    </svg>
    `

}