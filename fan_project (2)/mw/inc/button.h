#ifndef BUTTON_H
#define BUTTON_H

#include <stdbool.h>
#include <stdint.h>

typedef enum
{
  BUTTON_ID_POWER = 0,
  BUTTON_ID_HIGH,
  BUTTON_ID_LOW,
  BUTTON_ID_TIMER,
  BUTTON_ID_COUNT
} ButtonId_t;

void Button_Init(void);
void Button_Tick(void);                  /* sample and debounce, one call per scan period */
bool Button_TakePress(ButtonId_t id);    /* true once per debounced press */

#endif /* BUTTON_H */
