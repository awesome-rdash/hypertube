#!/bin/sh

TRANSMISSION_NOT_FOUND_ERROR="Impossible de trouver le daemon, utilisez l'option -d pour le compiler."
IF_TRANSMISSION_VERBOSE=""

while getopts vrdlqf option
do
 case "${option}"
 in
	v)
		IF_TRANSMISSION_VERBOSE="-f"
		;;
	r)
    mkdir $(pwd)/transmission/build 2> /dev/null || true
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-remote -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-remote" "transmission/build/"
		;;
	d)
    mkdir $(pwd)/transmission/build 2> /dev/null || true
		xcodebuild -project "transmission/source-code/Transmission.xcodeproj" -target transmission-daemon -configuration Release build
		cp -v -a "transmission/source-code/build/Release/transmission-daemon" "transmission/build/"
    export TRANSMISSION_WEB_HOME="$(pwd)/transmission/build/web/"
    cp -v -a "transmission/source-code/web" "$TRANSMISSION_WEB_HOME"
		;;
	f)
		brew install ffmpeg --with-vpx --with-vorbis --with-vpx --with-vorbis --with-theora --with-libogg --with-gpl 
			#brew install ffmpeg --with-vpx --with-vorbis --with-vpx --with-vorbis --with-theora --with-libogg --with-gpl --with-version3 --with-nonfree --with-postproc --with-libaacplus --with-libass --with-libcelt --with-libfaac --with-libfdk-aac --with-libfreetype --with-libmp3lame --with-libopencore-amrnb --with-libopencore-amrwb --with-libopenjpeg --with-openssl --with-speex --with-libtheora --with-libvo-aacenc --with-libx264 --with-libxvid --with-chromaprint --with-fontconfig --with-freetype --with-frei0r --with-game-music-emu --with-libbluray --with-libbs2b --with-libcaca --with-libgsm --with-libmodplug --with-libsoxr --with-libssh --with-libvidstab --with-opencore-amr --with-openh264 --with-openjpeg --with-opus --with-rtmpdump --with-rubberband --with-schroedinger --with-webp --with-x265
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