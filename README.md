# jdownloader-automated-gallery-download
---
  
**INTRO**
- **MULTI: behavior - fetch img links from galleries:**
  - This solution, consisting of a browser script and Jdownloader's automation capabilities, allows you to download various adult galleries / photo shoots from different sites.
    - The script lets you effortlessly get the proper links (either full-size, or ones that Jdownloader can convert to full-size) and saves them to your computer as a .crawljob file. Then, Jdownloader will read that file automatically and begin working on the newly added package.
    - With the script enabled, for the sites that are supported, there will be a button on the left side of the page saying something like "Links". Once you click it, the above process takes place.
  - The intructions below also cover how to set up a custom renaming rule in Jdownloader. The script already saves links in a special way (#custnum=n at the end) to allow this. Right before saving links, the script will ask you for a title. It can be any title, though I highly reccomend using the actual title,name etc. for the set. All that's needed is the custom renaming rule in Jdownloader, which basically tells the program that if a link contains "#custnum=", rename the downloaded file to x. This is very useful, as it allows you to be orgranized and preserves the natural order of galleries.
  - The instructions below also contain another rule you can set up, which is to start downloads automatically. That is pretty useful too, and allows complete automation.
  
- **Other scripts**
  - The rest of the scripts in this repository are helper scripts for various sites, which are not required but can make the discovery and navigation process way easier.
  - MULTI: behavior - redirect to img src on img hosts
    - Whenever you open an image from one of the common image hosts in your browser, it will automatically redirect you to the image's actual url
  - imagefap - behaviour - redirect to no page
    - Redirects to the page containing the entire gallery without pages
  - imagefap - design - simple gallery
    - Make imagefap galleries easier to navigate
  - thenude scirpts
    - Thenude is a site that has almost all the info for almost all the models / porn stars out there.
    - The first script makes it so that when you click on a set it is highlighted
    - The second script adds buttons underneath each set that you can click on to easielly find the full set
      - At the time of writing this: B, G, Y are to search using search engines (Bing, Google, Yandex). NP = search in hqnp, KK = search in kitty-kats, VG = search in vipergirls, VGE = search in vipergirls titles only (exact match)
        - hqnp (NP button) is very useful a lot of times, but requires a registration. Go to hqnp.org and register. Even after registration, make sure to visit the site (hqnp.org) and you're still logged in before you start actually looking for stuff using the NP button that day.
  - vipergirls scripts
    - "condense posts" condences large posts so that you don't have load a billion images and wait for a long time. Very useful.
    - "thenude search addon" is an addon for thenude's VG and VGE buttons work in the previous script discussed
    - "hide non-photo results" hides non-photo search results as the title suggests
  
---
  
**INSTRUCTIONS**
  
**1. Add the custom Jdownload renaming rule**
- Jdownloader > Settings > Packagizer > Add
- Condition Name:
  - rename based on pkg name + #custnum
- If the following conditions match...
  - Sourceurl(s) contains:
    - \*#custnum=\*
- ... then set
  - Filename:
    - \<jd:packagename\> - \<jd:source:2\>.\<jd:orgfiletype\>
    
**2. Add the autostart links Jdownload rule**
- Jdownloader > Settings > Packagizer > Add
- Condition Name:
  - custnum autostart
- If the following conditions match...
  - Sourceurl(s) contains:
    - \*#custnum=\*
- ... then set
  - Auto Confirm
    - enabled
  - Enable Download
    - enabled
  
**3. Install and set up the Jdownloader Folder Watch extension**
- Jdownloader > Settings > Extension Modules > Folder Watch > Install Now
  - Jdownloader > Settings > Folder Watch > Folder Watch: Folders (first thing on top) > Edit
    - Add the location of the folder your browser is set to download things to, separated by comma, in quotes.
  
- Example:
```
[
 "folderwatch",
 "C:\Users\john\Downloads"
]
```
  
**4. Install and set up the Tampermonkey extension for your web-browser**
- In Tampermonkey, go to Settings > Advanced > Downloads BETA > Whitelisted File Extensions
  - To the end of the list add:
    - .crawljob
  - (alternatively you can add /^.+$/ to the end to allow your tampermonkey scripts to download any kind of file)
  
**5. Add the custom Tampermonkey script**
- In Tampermonkey, add a new script (the button beside "Installed Userscripts")
  - Empty whatever default code it gives you and copy-paste the code from the "MULTI: behavior - fetch img links from galleries" in this repo.
  - This is also where you can add the rest of the scripts the same way
  
---
  
**EXTRA INFO**
- When downloading exclusively photos like this, you can speed up the process by unticking:
  - Jdownloader > Settings > Advanced Settings > Linkcollector: Do Link Check
    - This will prevent checking the availability of stuff. Don't forget to turn it back on though.
    - It also has the potential not to include the file extension, or download the wrong file extension such as html with a few image hosts. It will still be an image though, you just have to rename it. **So, unless you have access to a batch renamer, or can write your own script to do it for you, don't disable this.**
- If you are using a Chromium-based browser, you may want to switch to Firefox.
  - Chromium will be implementing Manifest V3 soon which is very likely to take away functionality from the Tampermonkey extension. I asusme the scripts used here would no longer work if that takes place.
