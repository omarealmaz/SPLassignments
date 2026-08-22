#ifndef SERIAL_IF_H
#define SERIAL_IF_H

#include <stdbool.h>
#include <stdint.h>

void SerialIf_Init(void);
bool SerialIf_Poll(void);   /* reads one console line, false when the input ends */

/* Optional hook: define it in the application to receive "sw_timer <seconds>". */
void SerialIf_OnTimerCommand(uint32_t seconds);

#endif /* SERIAL_IF_H */
