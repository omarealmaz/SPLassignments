#ifndef RELAY_CTRL_H
#define RELAY_CTRL_H

#include <stdbool.h>
#include <stdint.h>

typedef enum
{
  FAN_LEVEL_LOW = 0,
  FAN_LEVEL_HIGH
} FanLevel_t;

void RelayCtrl_Init(void);
bool RelayCtrl_SetFan(bool on);          /* refused while the guard time runs */
bool RelayCtrl_SetLevel(FanLevel_t level);
bool RelayCtrl_IsFanOn(void);
FanLevel_t RelayCtrl_GetLevel(void);

#endif /* RELAY_CTRL_H */
