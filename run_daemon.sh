#!/bin/sh

TRANSMISSION_NOT_FOUND_ERROR="Impossible de trouver le daemon, utilisez l'option -d pour le compiler."
IF_TRANSMISSION_VERBOSE=""

while getopts vrdlq option
do
 case "${option}"
 in
	v)
		IF_TRANSMISSION_VERBOSE="-f"
		;;
	r)
    @rmdir transmission/build/ 2> /dev/null || true
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-remote -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-remote" "transmission/build/"
		;;
	d)
    @rmdir transmission/build/ 2> /dev/null || true
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-daemon" "transmission/build/"
    export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
    cp -v -a "transmission/source-code/web" "$TRANSMISSION_WEB_HOME"
		;;
  l)
    export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
	  echo "Web folder is set to: $TRANSMISSION_WEB_HOME"
	  transmission/build/transmission-daemon $IF_TRANSMISSION_VERBOSE || echo $TRANSMISSION_NOT_FOUND_ERROR
	  ;;
  q)
		pkill -15 "transmission-daemon"
		;;
 esac
done
