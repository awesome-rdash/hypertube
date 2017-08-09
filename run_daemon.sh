#!/bin/sh

xcodebuild -project "transmission/source-code/transmission-svn/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
cp -v -a "transmission/source-code/transmission-svn/build/Release/." "transmission/build/"

cp -v -a "transmission/source-code/transmission-svn/web/." "transmission/build/web/"
export TRANSMISSION_WEB_HOME=transmission/source-code/web/

transmission/build/transmission-daemon -f
