#!/bin/sh

xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
cp -v -a "transmission/source-code/build/Release/." "transmission/build/"

cp -v -a "transmission/source-code/web/." "transmission/build/web/"
export TRANSMISSION_WEB_HOME=transmission/source-code/web/

transmission/build/transmission-daemon -f