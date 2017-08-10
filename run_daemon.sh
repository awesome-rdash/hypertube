#!/bin/sh

xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-remote -configuration Release build

cp -v -a "transmission/source-code/build/Release/." "transmission/build/"

cp -v -a "transmission/source-code/web/." "transmission/build/web/"

export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
echo "Web folder is set to: $TRANSMISSION_WEB_HOME";

transmission/build/transmission-daemon -f
