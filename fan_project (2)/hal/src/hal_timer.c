/* Dummy timer driver: the host clock replaces the hardware counter. */

#include <stdio.h>
#include <time.h>
#include <unistd.h>

#include "hal_timer.h"


/* Static variable to store the registered timer expiration callback function pointer. */
static TimerCallback_t app_callback = NULL;
static time_t start_time;

void HalTimer_Init(void)
{
  start_time = time(NULL);
  printf("[HAL/TIMER] init, 1 s resolution\n");
}

/* Registers the application callback to be executed upon timer expiration. */
void HalTimer_RegisterCallback(TimerCallback_t cb)
{
  /* Assign the passed function pointer to the static callback variable */
  app_callback = cb;
}

void HalTimer_SetTimer(uint32_t seconds)
{
  printf("[HAL/TIMER] Set Timer for %lu seconds\n", (unsigned long)seconds);
  sleep(seconds);
  /* Safe execution: check if a callback is registered before invoking it */
  if (app_callback != NULL)
  {
    app_callback();
  }
}

uint32_t HalTimer_GetSeconds(void)
{
  return (uint32_t)(time(NULL) - start_time);
}
