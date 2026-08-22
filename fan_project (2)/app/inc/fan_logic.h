#ifndef FAN_LOGIC_H
#define FAN_LOGIC_H

#include <stdint.h>

void FanLogic_Init(void);
void FanLogic_Run(void);   /* called once per scan from the main loop */

#endif /* FAN_LOGIC_H */
