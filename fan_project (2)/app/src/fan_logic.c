/* Fan application: decides what the switches mean and when the fan stops. */

#include <stdio.h>

#include "button.h"
#include "fan_logic.h"
#include "hal_timer.h"
#include "relay_ctrl.h"
#include "serial_if.h"

static uint32_t timer_seconds;

static void HandleSwitches(void);
static void HandleTimer(void);
static void Fan_TimerExpired_Cb(void);

void FanLogic_Init(void)
{
  timer_seconds = 0U;
  /* Register the timer expiration callback with the HAL timer driver */
 HalTimer_RegisterCallback(Fan_TimerExpired_Cb);
  printf("[APP/FAN  ] ready: sw1 toggles the fan, sw_high/sw_low set the level\n");
}

void FanLogic_Run(void)
{
  HandleSwitches();
  HandleTimer();
}

/* Overrides the weak default in serial_if.c, so "sw_timer 5" ends up here. */
void SerialIf_OnTimerCommand(uint32_t seconds)
{
  timer_seconds = seconds;
  printf("[APP/FAN  ] run timer set to %lu s\n", (unsigned long)seconds);
}

/* Registered callback invoked by the HAL timer driver when the timer expires */
static void Fan_TimerExpired_Cb(void)
{
  timer_seconds = 0U;
  (void)RelayCtrl_SetFan(false);
  printf("[APP/FAN  ] run timer expired, fan stopped\n");
}

static void HandleSwitches(void)
{
  if (Button_TakePress(BUTTON_ID_POWER) != false)
  {
    (void)RelayCtrl_SetFan(RelayCtrl_IsFanOn() == false);
  }

  if (Button_TakePress(BUTTON_ID_HIGH) != false)
  {
    (void)RelayCtrl_SetLevel(FAN_LEVEL_HIGH);
  }

  if (Button_TakePress(BUTTON_ID_LOW) != false)
  {
    (void)RelayCtrl_SetLevel(FAN_LEVEL_LOW);
  }
}

static void HandleTimer(void)
{
  if (timer_seconds == 0U)
  {
    return;
  }

  if (RelayCtrl_IsFanOn() == false)
  {
    printf("[APP/FAN] Can't set timer while fan is off\n");
    timer_seconds = 0;
    return; /* the timer only runs while the fan runs */
  }

  printf("[APP/FAN  ] fan runs for %lu s, then stops\n", (unsigned long)timer_seconds);
  HalTimer_SetTimer(timer_seconds);
}
