#!/bin/sh

TRANSMISSION_NOT_FOUND_ERROR="Impossible de trouver le daemon, utilisez l'option -d pour le compiler."
IF_TRANSMISSION_VERBOSE=""
BUILD_REMOTE=0
BUILD_DAEMON=0
LAUNCH_DAEMON=0

while getopts vrdlq option
do
 case "${option}"
 in
 v) IF_TRANSMISSION_VERBOSE="-f";;
 r) xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-remote -configuration Release build;;
 d) xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build;;
 l) LAUNCH_DAEMON=1;;
 q) pkill -15 "transmission-daemon";;
 esac
done

if [ "$BUILD_REMOTE" -eq "1" ] || [ "$BUILD_DAEMON" -eq "1" ] ;
then
  cp -v -a "transmission/source-code/build/Release/." "transmission/build/"
  cp -v -a "transmission/source-code/web/." "transmission/build/web/"
fi

if [ "$LAUNCH_DAEMON" -eq "1" ] ;
then
  export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
  echo "Web folder is set to: $TRANSMISSION_WEB_HOME";
  transmission/build/transmission-daemon $IF_TRANSMISSION_VERBOSE || echo $TRANSMISSION_NOT_FOUND_ERROR
fi