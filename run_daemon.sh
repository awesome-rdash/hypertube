#!/bin/sh

TRANSMISSION_NOT_FOUND_ERROR="Impossible de trouver le daemon, utilisez l'option -d pour le compiler."
IF_TRANSMISSION_VERBOSE=""
LAUNCH_DAEMON=0

while getopts vrdlq option
do
 case "${option}"
 in
	v)
		IF_TRANSMISSION_VERBOSE="-f"
		;;
	r) 
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-remote -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-remote" "transmission/build/"
		;;
	d)
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-daemon" "transmission/build/"
		;;
  l)
	  cp -v -a "transmission/source-code/web/." "$TRANSMISSION_WEB_HOME"
	  export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
	  echo "Web folder is set to: $TRANSMISSION_WEB_HOME"
	  transmission/build/transmission-daemon $IF_TRANSMISSION_VERBOSE || echo $TRANSMISSION_NOT_FOUND_ERROR
	  ;;
  q)
		pkill -15 "transmission-daemon"
		;;
 esac
done