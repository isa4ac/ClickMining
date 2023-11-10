# ClickMining

## Play Now:
https://ajwhite00.github.io/ClickMining/

## Development

### Phaser 3
Phaser 3 is the framework used to develop the web game. 

#### Installation: 
See this [link](https://phaser.io/download/stable) for download steps. 
<br><br>

### Node http-server
A simple web server that is used for local development. If you used npm to install Phaser 3 this is a quick web server to also download and set up.

#### Download and Setup:
+ Install http-server with `npm install http-server -g`.
+ Open a Terminal in the project directory and run `http-server` to start the web server.
+ In a web browser navigate to `http://127.0.0.1:8080`. 
  + Files listed in the current project directory will be accessible by the web server.
+ To stop the web server press `Ctrl + C`.
<br><br>

### Apache Web Server
Apache Lounge can be used for local development. Download for Windows can be found [here](https://www.apachelounge.com/download/) or see [Appache Web Server Downloads](https://httpd.apache.org/).

#### Installation and Setup:
+ After the zip file is finished downloading (ex filename: `httpd-2.4.56-win64-VS17.zip`) unzip it. 
+ Copy the folder named `Apache24` to your `C:` directory.
+ Open a command prompt window in `C:\Appache24\bin`.
+ To **start** Appache type `httpd.exe`.
+ Open a browser and type in the address `http://localhost`.
  + You should see the message "It worked!".
+ To **stop** Appache type `Ctrl + C`, it may take a few seconds.

#### Adding Game Files: 
+ Copy games files.
+ Navigate to `C:\Appache24\htdocs\`.
+ Paste game files.
