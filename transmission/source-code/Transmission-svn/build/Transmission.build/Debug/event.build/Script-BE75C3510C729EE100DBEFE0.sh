#!/bin/bash
if [ ! -e ./third-party/libevent/include/event2/config.h -a ! ./third-party/macosx-libevent-config.h -ef ./third-party/libevent/include/event2/config.h ]; then ln -s ../../../macosx-libevent-config.h ./third-party/libevent/include/event2/config.h; fi

if [ ! -e ./third-party/libevent/include/event2/event-config.h -a ! ./third-party/macosx-libevent-event-config.h -ef ./third-party/libevent/include/event2/event-config.h ]; then ln -s ../../../macosx-libevent-event-config.h ./third-party/libevent/include/event2/event-config.h; fi
