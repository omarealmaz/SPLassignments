/* Fan relay service: turns on/off and level requests into pin levels, and protects the relay. */

#include <stdio.h>

#include "hal_gpio.h"
#include "hal_timer.h"
#include "relay_ctrl.h"

#define RELAY_GUARD_SECONDS  3U   /* minimum time between two switch operations */

static bool relay_on;
static FanLevel_t fan_level;
static uint32_t last_switch_s;
static uint32_t switch_count;

static bool GuardElapsed(void);

void RelayCtrl_Init(void)
{
  relay_on = false;
  fan_level = FAN_LEVEL_LOW;
  last_switch_s = 0U;
  switch_count = 0U;

  HalGpio_WritePin(HAL_GPIO_PIN_RELAY, HAL_GPIO_LOW);
  HalGpio_WritePin(HAL_GPIO_PIN_SPEED, HAL_GPIO_LOW);
  printf("[MW/RELAY ] init, fan off, level low\n");
}

bool RelayCtrl_SetFan(bool on)
{
  if (on == relay_on)
  {
    return true;
  }

  /* Switching off is always allowed, restarting is not. */
  if ((on != false) && (GuardElapsed() == false))
  {
    printf("[MW/RELAY ] refused: restart guard of %u s not elapsed\n", (unsigned int)RELAY_GUARD_SECONDS);
    return false;
  }

  relay_on = on;
  last_switch_s = HalTimer_GetSeconds();
  switch_count++;
  HalGpio_WritePin(HAL_GPIO_PIN_RELAY, (on != false) ? HAL_GPIO_HIGH : HAL_GPIO_LOW);
  printf("[MW/RELAY ] fan %s (switch #%lu)\n", (on != false) ? "ON" : "OFF", (unsigned long)switch_count);

  return true;
}

bool RelayCtrl_SetLevel(FanLevel_t level)
{
  if ((level != FAN_LEVEL_LOW) && (level != FAN_LEVEL_HIGH))
  {
    return false;
  }

  fan_level = level;
  HalGpio_WritePin(HAL_GPIO_PIN_SPEED, (level == FAN_LEVEL_HIGH) ? HAL_GPIO_HIGH : HAL_GPIO_LOW);
  printf("[MW/RELAY ] level %s\n", (level == FAN_LEVEL_HIGH) ? "HIGH" : "LOW");

  return true;
}

bool RelayCtrl_IsFanOn(void)
{
  return relay_on;
}

FanLevel_t RelayCtrl_GetLevel(void)
{
  return fan_level;
}

static bool GuardElapsed(void)
{
  uint32_t now_s = HalTimer_GetSeconds();

  if (switch_count == 0U)
  {
    return true;
  }

  return ((now_s - last_switch_s) >= RELAY_GUARD_SECONDS);
}
