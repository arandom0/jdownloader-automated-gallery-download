# jdownloader-automated-gallery-download
---
**INTRO**
- This solution allows you to download various adult galleries / photo shoots from different sites.
- The way it works is for the sites that are supported there will be a button on the left side of the page.
  - When clicked, it collects the links and saves them to a file, which Jdownloader will automatically pick up.
  - Additionally, the downloaded images will be in the same order as the ones in the gallery with the help of a Jdownloader custom renameing rule.\
---
**INSTRUCTIONS**
**1. Add the custom Jdownload renaming rule**
- In Jdownloader, go to Settings, Packagizer, Add
- Condition Name: rename based on pkg name + #custnum
- If the following conditions match...
  - Sourceurl(s) contains: *#custnum=*
- ... then set
  - Filename: <jd:packagename> - <jd:source:2>.<jd:orgfiletype>
**2. Install the Jdownloader Folder Watch extension**
- In Jdownloader, go to Settings, Extension Modules, Folder Watch, Install Now
- Once installed, in Jdownloader, go to Settings, Folder Watch, Folder Watch: Folders
  - Add the location of the folder your browser is set to download things to, separated by comma, in quotes.
- Example:
```
[
 "folderwatch",
 "C:\Users\john\Downloads"
]
```
**3. Install Tampermonkey extension for your web-browser**
- In Tampermonkey, go to Settings, Advanced, Downloads BETA, Whitelisted File Extensions
  - Add .crawljob to the end on a new line
**4. Add the custom Tampermonkey script**
- In Tampermonkey, add a new script (the button beside "Installed Userscripts")
  - Empty whatever default code it gives you and copy-paste the code from this repository.
---
**ADD CUSSTOM SUPPORT FOR SITES**
- To add your custom support for sites, you need to @include (using regex) or @match it (top of the script where the other sites are)
- Then you need set the proper global (Per site) variables for it in the set_per_site_vars() function
  - The scirpt / names describe what each of those variables is for and whether it is manditroy or optional
---
**EXTRA INFO**
- If you are using a Chromium based browser, you may want to switch to something like Firefox.
  - Chromium will be implementing Manifest V3 soon which is very likely to take away functionality from the Tampermonkey extension
  - That would likely make the custom script used here useless
