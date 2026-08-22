CC      := gcc
CFLAGS  := -Ihal/inc -Imw/inc -Iapp/inc
SRCS    := hal/src/hal_uart.c hal/src/hal_gpio.c hal/src/hal_timer.c mw/src/serial_if.c mw/src/relay_ctrl.c mw/src/button.c app/src/fan_logic.c app/src/main.c

build/fan: $(SRCS)
	mkdir -p build
	$(CC) $(SRCS) $(CFLAGS) -o build/fan

clean:
	rm -rf build
