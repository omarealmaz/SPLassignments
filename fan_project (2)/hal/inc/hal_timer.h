#ifndef HAL_TIMER_H
#define HAL_TIMER_H

#include <stdint.h>

/* Function pointer type for dynamic timer expiration callback registration. */
typedef void (*TimerCallback_t)(void);

void HalTimer_Init(void);
void HalTimer_SetTimer(uint32_t seconds);
/* Dynamic callback registration function to set the timer expiration callback. */
void HalTimer_RegisterCallback(TimerCallback_t cb);
uint32_t HalTimer_GetSeconds(void);

#endif /* HAL_TIMER_H */
