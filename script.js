// ==UserScript==
// @name         MULTI: Copy img links from galleries
// @version      0.1
// @description  To add a new site, @include it below with regex or @match if you don't know regex (ex. https://www.google.com/*). Then add the required info in the set_per_site_vars() function
// @author       You
// @include      /^http.*:\/\/.*urlgalleries\.net\/.+$/
// @include      /^http.*:\/\/(?:www\.)?nudecollect\.com\/content\/.+$/
// @include      /^http.*:\/\/(?:www\.)?imagefap\.com\/pictures\/.+$/
// @include      /^http.*:\/\/(?:www\.)?kitty-kats\.net\/threads\/.+$/
// @include      /^http.*:\/\/(?:www\.)?eropics\.to\/.+$/
// @include      /^http.*:\/\/(?:www\.)?vipergirls\.to\/threads\/.+$/
// @include      /^http.*:\/\/(?:www\.)?eroticity\.net\/threads\/.+$/
// @include      /^http.*:\/\/(?:www\.)?erohd\.net\/.+$/
// @include      /^http.*:\/\/(?:www\.)?greekfoot\.com\/.+$/
// @include      /^http.*:\/\/(?:www\.)?hotgirlspics\.net\/.+$/
// @include      /^http.*:\/\/(?:www\.)?pinkfineart\.com\/.+$/
// @include      /^http.*:\/\/(?:www\.)?thenude\.com\/cover\/.+$/
// @include      /^http.*:\/\/(?:www\.)?porncoven\.com\/threads\/.+$/
// @include      /^http.*:\/\/(?:www\.)?indexxx\.to\/threads\/.+$/
// @include      /^http.*:\/\/(?:www\.)?adultphotosets\.best\/softcore-photo-sets\/.+$/
// @include      /^http.*:\/\/(?:www\.)?photos18\.com\/.+$/
// @include      /^http.*:\/\/(?:www\.)?hothag\.com\/galleries\/.+$/
// @include      /^http.*:\/\/(?:www\.)?imx\.to\/g\/.+$/
// @include      /^http.*:\/\/(?:www\.)?eroboom\..{2,3}\/photoset\/.+$/
// @include      /^http.*:\/\/(?:www\.)?nudemodels\.cc\/gallery\/.+$/
// @include      /^http.*:\/\/(?:www\.)?x3vid\.com\/gallery.+$/
// @match        *://girlsreleased.com/*
// @grant        GM_setClipboard
// @grant        GM_download
// ==/UserScript==

(function() {
    'use strict';

    /****************************************************/
    // GLOBALS
    /****************************************************/

    //---------------------------------------------------
    // Working

    let SET_NAME = "";
    let COUNTER = 1;

    //---------------------------------------------------
    // Output

    let OUTPUT = [];
    let ERRORS = [];

    //---------------------------------------------------
    // Per site

    // Manditory
    let GALLERY_IMGS_SELECTOR = ""; // MUST BE SET

    // Optional
    let COPY_GALLERY_IMGS_SRCS = false; // by default, the href of the parent <a> element of each image is copied, but if the gallery has full size image in it, set this to true
    let FULL_SIZE_IMG_SELECTOR = ""; // setting this essentially means the script will open all the gallery img links and retrieve the full-size image link (must be on the same site)
    let PAGINATION_LINKS_SELECTOR = ""; // setting this tells the script you're dealing with a multi-page gallery. It gets all page links and loops to see if one called "next" exists
    let POST_WRAPPER_SELECTOR = ""; // setting this tells the script it needs the user to select a post. The selector is used to verify that it was clicked within post.

    /****************************************************/
    // START
    /****************************************************/

    init();

    /****************************************************/
    // INITIALIZE
    /****************************************************/

    function init()
    {
        set_per_site_vars();
        add_html();
    }

    function set_per_site_vars()
    {
        let urlObj = new URL(window.location.href);

        if (urlObj.host.includes("urlgalleries.net")) {
            GALLERY_IMGS_SELECTOR = `img[class="gallery"]`;
            PAGINATION_LINKS_SELECTOR = `div[style="font-weight:normal;width:480px;"] a`;
        }
        else if (urlObj.host.includes("nudecollect.com")) {
            GALLERY_IMGS_SELECTOR = `.image img`;
            FULL_SIZE_IMG_SELECTOR = `.ncimage img`;
            PAGINATION_LINKS_SELECTOR = `.imgpagebar a`;
        }
        else if (urlObj.host.includes("imagefap.com")) {
            GALLERY_IMGS_SELECTOR = `#gallery td img:not([src*="ajax-loader.gif"])`;
            PAGINATION_LINKS_SELECTOR = `a[class^="link3"]`;
            FULL_SIZE_IMG_SELECTOR = `#mainPhoto`;
        }
        else if (urlObj.host.includes("kitty-kats.net") || urlObj.host.includes("indexxx.to")) {
            GALLERY_IMGS_SELECTOR = ".message-userContent img";
        }
        else if (urlObj.host.includes("eropics.to")) {
            GALLERY_IMGS_SELECTOR = ".entry-content img";
        }
        else if (urlObj.host.includes("erohd.net")) {
            GALLERY_IMGS_SELECTOR = ".sigFreeImg";
        }
        else if (urlObj.host.includes("vipergirls.to") || urlObj.host.includes("eroticity.net") || urlObj.host.includes("porncoven.com")) {
            GALLERY_IMGS_SELECTOR = "img";
            POST_WRAPPER_SELECTOR = `div[id^="post_message_"]`;
        }
        else if (urlObj.host.includes("greekfoot.com")) {
            GALLERY_IMGS_SELECTOR = "img";
            POST_WRAPPER_SELECTOR = `div[id^="msg_"], div[class="list_posts"]`;
        }
        else if (urlObj.host.includes("hotgirlspics.net")) {
            GALLERY_IMGS_SELECTOR = `.entry-content img:not([loading]):not([title])`;
        }
        else if (urlObj.host.includes("pinkfineart.com")) {
            GALLERY_IMGS_SELECTOR = `a[id^="pic"] img`;
        }
        else if (urlObj.host.includes("adultphotosets.best")) {
            GALLERY_IMGS_SELECTOR = `article[class="box story fullstory"] img`;
        }
        else if (urlObj.host.includes("girlsreleased.com")) {
            GALLERY_IMGS_SELECTOR = `#set_list .setthumbs img`;
        }
        else if (urlObj.host.includes("thenude.com")) {
            GALLERY_IMGS_SELECTOR = `#lightgallery .gallery-thumb`;
        }
        else if (urlObj.host.includes("photos18.com")) {
            GALLERY_IMGS_SELECTOR = `#content .imgHolder img`;
        }
        else if (urlObj.host.includes("eroboom")) {
            GALLERY_IMGS_SELECTOR = `#jc img`;
        }
        else if (urlObj.host.includes("hothag.com")) {
            GALLERY_IMGS_SELECTOR = `#gal_blk a img`;
        }
        else if (urlObj.host.includes("imx.to")) {
            GALLERY_IMGS_SELECTOR = `#content .imgtooltip`;
        }
        else if (urlObj.host.includes("nudemodels.cc")) {
            GALLERY_IMGS_SELECTOR = `#album img`;
            COPY_GALLERY_IMGS_SRCS = true;
        }
        else if (urlObj.host.includes("x3vid.com")) {
            GALLERY_IMGS_SELECTOR = `#my-posts a figure img`;
            PAGINATION_LINKS_SELECTOR = `.pagination a`;
            FULL_SIZE_IMG_SELECTOR = `img[class="slide-img"]`;
        }

        // Validate
        if (COPY_GALLERY_IMGS_SRCS && FULL_SIZE_IMG_SELECTOR) {
            alert("COPY_GALLERY_IMGS_SRCS and FULL_SIZE_IMG_SELECTOR can't be both set");
            throw new Error("COPY_GALLERY_IMGS_SRCS and FULL_SIZE_IMG_SELECTOR can't be both set");
        }
        if (PAGINATION_LINKS_SELECTOR && POST_WRAPPER_SELECTOR) {
            alert("PAGINATION_LINKS_SELECTOR and POST_WRAPPER_SELECTOR can't be both set");
            throw new Error("PAGINATION_LINKS_SELECTOR and POST_WRAPPER_SELECTOR can't be both set");
        }

    }

    function add_html()
    {
        let styleHtml =
            `<style id="generalStyle">
                #sideBtn {position: fixed; top: 50%; display: block; font-size: 1.2rem; padding: 5px; background: green; border: 3px solid red; cursor: pointer; z-index: 99999999;}

                #custMsg {position:fixed; top:0; left: 50%; font-size:1rem; padding:10px; width:max-content; z-index: 99999999;}
                .genericCustMsg {background:blue; color:white;}
                .successCustMsg {background:green; color:white;}
                .errorCustMsg {background:red; color:white;}

                #outputBlock {background:black; position:fixed; top:0; left:0; border: 2px solid; width:1000px; height: 700px; overflow: scroll;}
                #outputBlock textarea, #outputBlock input {width:900px; border:2px solid; border-color:red; background:black;}
                #outputBlock textarea {height:250px;}
                #outputBlock button {font-size:1.2rem;}
            </style>`;
        document.querySelector(`html`).appendChild(html_to_node(styleHtml));

        let buttonsHtml = `<button id="sideBtn">Links</button>`;
        document.querySelector(`html`).appendChild(html_to_node(buttonsHtml));

        document.querySelector("#sideBtn").addEventListener("click", run);
    }

    /****************************************************/
    // RUN
    /****************************************************/

    async function run()
    {
        reset();

        SET_NAME = get_set_name_user_input();
        if (!SET_NAME) {
            alert("Can't have an empty set name");
            return;
        }

        let pageLink = get_first_page_url();
        let pageNumber = 1;

        while (pageLink)
        {
            display_msg(`Working on page ${pageNumber}`);

            let pageDom = await get_page_dom(pageLink);

            if (pageDom) {
                if (FULL_SIZE_IMG_SELECTOR) await get_fullsize_links(pageDom, pageNumber);
                else get_links_from_gallery(pageDom);
            }
            else {
                ERRORS.push(`FAILED TO FETCH PAGE:\n${pageLink}\n`);
            }

            pageLink = get_next_page_url(pageDom);
            pageNumber++;
        }

        display_msg(`Finished getting links.`);
        save_as_crawljob_file();
        //contact_jdownloader();
        if (FULL_SIZE_IMG_SELECTOR) display_output();
        else copyLinksToClip();
    }

    function reset()
    {
        // reset vars
        SET_NAME = ""; COUNTER = 1;
        OUTPUT = []; ERRORS = [];

        // remove output html
        remove_output();
    }


    function get_set_name_user_input()
    {
        return prompt("ENTER NAME OF SET:").trim();
    }

    function get_first_page_url()
    {
        if (!PAGINATION_LINKS_SELECTOR) return window.location.href;

        let allPaginationElems = document.querySelectorAll(PAGINATION_LINKS_SELECTOR);
        for (let elem of allPaginationElems)
        {
            try {
                if (elem.innerText.toLowerCase().includes("first") || elem.innerText.trim() == "1") return elem.href;
            } catch(err) {}
        }
        return window.location.href;
    }

    //---------------------------------------------------
    // Get pagedom

    // this one is rather tricky. The page dom can be either a fetched page (when multiple pages), the document element or a post element (if user needs to select it)
    async function get_page_dom(pageLink)
    {
        let pageDom;

        if (PAGINATION_LINKS_SELECTOR) pageDom = await fetch_html_data(pageLink, null, GALLERY_IMGS_SELECTOR);
        else if (POST_WRAPPER_SELECTOR) pageDom = await get_user_post_selection();
        else pageDom = document;

        return pageDom;
    }

    async function get_user_post_selection()
    {
        document.querySelector("body").addEventListener("click", get_user_post_selection_handler);
        display_msg("Click on the post body you wish to select...");

        let postDom = false;
        while (!postDom) await delay(100);
        return postDom;

        function get_user_post_selection_handler(event)
        {
            let elem = event.target;
            let matchedElem = elem.closest(POST_WRAPPER_SELECTOR); // closest(cssQuery) returns the first parent element matching the selector, null if no match
            if (matchedElem) {
                document.querySelector("body").removeEventListener("click", get_user_post_selection_handler);
                postDom = matchedElem;
            }
            else {
                display_msg("Improper selection, try again", "errorCustMsg");
            }
        }
    }

    //---------------------------------------------------
    // Get links

    async function get_fullsize_links(pageDom, pageNumber)
    {
        let antiConjestionCounter = 0; // prevents making too many simintanois requests - aka for ex. not wating on 200 iamges at once
        let antiConjestionLimit = 20;

        let allGalleryImgElems = pageDom.querySelectorAll(GALLERY_IMGS_SELECTOR);
        let promises = [];

        for (let imgElem of allGalleryImgElems)
        {
            if (antiConjestionCounter == antiConjestionLimit) {
                antiConjestionCounter = 0;
                display_msg(`Waiting for the most recent ${antiConjestionLimit} images to fetch`);
                await Promise.all(promises);
            }

            let link = get_image_link(imgElem);
            if (link) {
                promises.push(get_fullsize_link(link, COUNTER));
                antiConjestionCounter += 1;
                display_msg(`Started image ${COUNTER}`);
                await delay(100); // wait before you add the new promise since some sites don't support going too fast
            } else {
                ERRORS.push(`NO IMG LINK ELEMENT\n${imgElem.src}\n`);
            }
            COUNTER += 1;
        }

        display_msg(`Waiting for images on page ${pageNumber} to fetch`);
        await Promise.all(promises);

        async function get_fullsize_link(fullSizeImgPageUrl, counterAtTheTime)
        {
            try {
                let singleImgPageDom = await fetch_html_data(fullSizeImgPageUrl, null, FULL_SIZE_IMG_SELECTOR);
                let fullSizeImgElem = singleImgPageDom.querySelector(FULL_SIZE_IMG_SELECTOR);
                OUTPUT.push(fullSizeImgElem.src + "#custnum=" + counterAtTheTime);
            }
            catch(err) {
                ERRORS.push(`FAILED TO FETCH FULL SIZE IMAGE LINK:\n${fullSizeImgPageUrl}\n`);
            }
        }
    }

    function get_links_from_gallery(pageDom)
    {
        let allGalleryImgElems = pageDom.querySelectorAll(GALLERY_IMGS_SELECTOR);

        for (let imgElem of allGalleryImgElems)
        {
            let link = get_image_link(imgElem);
            if (link) OUTPUT.push(link + "#custnum=" + COUNTER);
            else ERRORS.push(`NO IMG LINK ELEMENT\n${imgElem.src}\n`);
            COUNTER++;
        }
    }

    function get_next_page_url(pageDom)
    {
        if (!PAGINATION_LINKS_SELECTOR) return false;

        let allPaginationElems = pageDom.querySelectorAll(PAGINATION_LINKS_SELECTOR);
        for (let elem of allPaginationElems)
        {
            try {
                if (elem.innerText.toLowerCase().includes("next") || elem.getAttribute("rel").toLowerCase().includes("next")) return elem.href;
            } catch(err) {}
        }
        return null;
    }

    function get_image_link(imgElem)
    {
        if (COPY_GALLERY_IMGS_SRCS) return imgElem.src;

        let movingElem = imgElem;
        let attempts = 0;
        let maxParents = 2;

        try {
            while (attempts < maxParents) {
                movingElem = movingElem.parentElement;
                if (movingElem.nodeName == "A") return movingElem.href;
                attempts += 1;
            }
        }
        catch(err) {
            return false;
        }
        return false;
    }


    /****************************************************/
    // OUTPUT
    /****************************************************/

    //---------------------------------------------------
    // Option 1

    async function contact_jdownloader()
    {
        // used so that the form doesn't load a new page or open a new window
        try {document.querySelector("#jdFrame").remove()} catch(e) {}
        let frameHtml = `<iframe id="jdFrame" name="jdownloader-frame" style="width:100%;" hidden></iframe>`;
        document.querySelector("body").appendChild(html_to_node(frameHtml));

        try {document.querySelector("#jdForm").remove()} catch(e) {}
        let formHtml = `<form id='jdForm' action='http://127.0.0.1:9666/flash/add' method='POST' target='jdownloader-frame'><input type="hidden" name="source" value="tampermonkey"/><input type="hidden" name="package" value="${SET_NAME}"/><input id="jdUrlsInput" type="hidden" name="urls" value="${OUTPUT.join("<br>")}"/></form>`;
        document.querySelector("body").appendChild(html_to_node(formHtml));

        let formElem = document.querySelector("#jdForm");
        formElem.submit();
    }

    //---------------------------------------------------
    // Option 2

    function save_as_crawljob_file()
    {
        let outputObj =
            [
                {
                    //forcedStart: "TRUE",
                    text: OUTPUT.join("<br>"),
                    packageName: SET_NAME
                }
            ];

        let base64Encoded = btoa(JSON.stringify(outputObj));
        GM_download({
            url:`data:text/plain;base64,${base64Encoded}`,
            name:`${SET_NAME}.crawljob`,
            saveAs:false,
            onerror:()=>{display_msg(`FAILED SAVING FILE`, "errorCustMsg")},
            onload:()=>{display_msg(`FILE SAVED with ${OUTPUT.length} links`, "successCustMsg")}
        });
    }

    //---------------------------------------------------
    // Option 3

    function display_output()
    {
        let html =
            `<div id="outputBlock">
                <p><button id="removeOutput">REMOVE OUTPUT</button></p>
                <p>SET NAME</p>
                <p><input type="text" id="setname" readonly/></p>
                <p><button id="copySetNameBtn">CLICK TO COPY SET NAME</button></p>
                <p>OUTPUT (${OUTPUT.length} links):</p>
                <p><textarea id="out" readonly></textarea></p>
                <p><button id="copyLinksBtn">CLICK TO COPY LINKS</button></p>
                <p>ERRORS:</p>
                <p><textarea id="err" readonly></textarea></p>
            </div>`;

        document.querySelector("html").appendChild(html_to_node(html));

        document.querySelector("#setname").value = SET_NAME;
        document.querySelector("#out").value = OUTPUT.join("\n");
        document.querySelector("#err").value = ERRORS.join("\n");

        document.querySelector("#copySetNameBtn").addEventListener("click", copyOutputSetNameToClip);
        document.querySelector("#copyLinksBtn").addEventListener("click", copyOutputLinksToClip);
        document.querySelector("#removeOutput").addEventListener("click", remove_output);
    }

    //---------------------------------------------------
    // Option 4

    function copyLinksToClip() {
        GM_setClipboard(OUTPUT.join("\n"), "text");
        display_msg(`COPIED ${OUTPUT.length} links`, "successCustMsg");
    }

    //---------------------------------------------------
    // Helpers

    function copyOutputLinksToClip() {
        GM_setClipboard(document.querySelector("#out").value, "text");
        display_msg(`COPIED ${OUTPUT.length} links`, "successCustMsg");
    }
    function copyOutputSetNameToClip() {
        GM_setClipboard(SET_NAME, "text");
        display_msg(`COPIED SET NAME`, "successCustMsg");
    }

    /****************************************************/
    // GLOBAL HELPERS
    /****************************************************/

    function remove_output()
    {
        try {
            document.querySelector("#outputBlock").remove();
            document.querySelector("#outputStyle").remove();
        } catch(err) {}
    }

    async function display_msg(text, htmlClass="genericCustMsg")
    {
        let prevMsg = document.querySelector(`#custMsg`);
        if (prevMsg) prevMsg.remove();
        document.querySelector(`html`).appendChild(html_to_node(`<p id="custMsg" class="${htmlClass}">${text}</p>`));
    }

    /****************************************************/
    // GENERIC HELPERS
    /****************************************************/

    function html_to_node(code)
    {
        let tempWrapper = document.createElement("div");
        tempWrapper.innerHTML = code;
        if (tempWrapper.childElementCount == 1) tempWrapper = tempWrapper.firstChild;
        return tempWrapper;
    }

    // Some sites like nudecollect will return a page BUT something like "You're magic is wating...". So you need to keep making requests until it returns the right page.
    async function fetch_html_data(url, formData, selectorToTest)
    {
        let attempts = 0;
        while (attempts < 100) {
            try {
                let response;
                if (!formData) response = await fetch(url, {method: 'get', credentials: 'include'});
                else response = await fetch(url, {method: 'get', credentials: 'include', body: formData});
                let htmlString = await response.text();
                let parser = new DOMParser();
                let pageDom = parser.parseFromString(htmlString, "text/html");
                pageDom.querySelector(selectorToTest).getAttribute("test");
                return pageDom;
            }
            catch(err) {
                await delay(100);
            }

            attempts += 1;
        }
        return false;
    }

    function delay(durationMs)
    {
        return new Promise(resolve => setTimeout(resolve, durationMs));
    }
})();
