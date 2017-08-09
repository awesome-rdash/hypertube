#!/bin/sh

xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
cp -a "transmission/source-code/build/Release/." "transmission/build/"
transmission/build/transmission-daemon -f